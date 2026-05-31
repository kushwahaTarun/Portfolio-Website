import { NextResponse } from "next/server";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/assistant";

export const runtime = "nodejs";

const MAX_TURNS = 10;
const MAX_MESSAGE_LENGTH = 800;
const RATE_LIMIT_PER_HOUR = 20;
const WINDOW_MS = 60 * 60 * 1000;

const buckets = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.reset < now) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { ok: true as const };
  }
  if (bucket.count >= RATE_LIMIT_PER_HOUR) {
    return { ok: false as const, retryAfter: Math.ceil((bucket.reset - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true as const };
}

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(MAX_MESSAGE_LENGTH),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_TURNS * 2),
});

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "You've hit the hourly limit. Please try again later or use the contact form." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
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
