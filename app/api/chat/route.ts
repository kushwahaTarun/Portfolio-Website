import { NextResponse } from "next/server";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/assistant";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_TURNS = 10;
const MAX_MESSAGE_LENGTH = 800;
const RATE_LIMIT_PER_HOUR = 20;
const WINDOW_SECONDS = 60 * 60;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(MAX_MESSAGE_LENGTH),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_TURNS * 2),
});

export async function POST(request: Request) {
  const limit = await enforceRateLimit({
    request,
    scope: "chat",
    limit: RATE_LIMIT_PER_HOUR,
    windowSeconds: WINDOW_SECONDS,
  });
  if (!limit.ok) {
    return NextResponse.json(
      {
        error:
          limit.status === 429
            ? "You've hit the hourly limit. Please try again later or use the contact form."
            : limit.error,
      },
      { status: limit.status, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const userTurns = parsed.data.messages.filter((m) => m.role === "user").length;
  if (userTurns > MAX_TURNS) {
    return NextResponse.json(
      { error: "This conversation has reached its limit. Please refresh to start a new one." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Assistant is not configured. Please use the contact form." },
      { status: 503 }
    );
  }

  const model = process.env.OPENROUTER_MODEL ?? "anthropic/claude-haiku-4.5";

  const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.5,
      max_tokens: 180,
      messages: [
        { role: "system", content: await buildSystemPrompt() },
        ...parsed.data.messages,
      ],
    }),
  });

  if (!openRouterResponse.ok || !openRouterResponse.body) {
    const text = await openRouterResponse.text().catch(() => "");
    console.error("[chat] OpenRouter error", openRouterResponse.status, text);
    return NextResponse.json(
      { error: "The assistant is unavailable right now. Please try again or use the contact form." },
      { status: 502 }
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = openRouterResponse.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta.length > 0) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // Some upstream events are keep-alives or comments; ignore parse failures.
            }
          }
        }
      } catch (err) {
        console.error("[chat] stream error", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
