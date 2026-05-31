import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import { siteConfig } from "@/lib/site";
import { ContactNotification } from "@/emails/ContactNotification";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const LIMIT = 5;
const WINDOW_SECONDS = 60 * 60;

export async function POST(request: Request) {
  const limit = await enforceRateLimit({
    request,
    scope: "contact",
    limit: LIMIT,
    windowSeconds: WINDOW_SECONDS,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: limit.error },
      { status: limit.status, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — message logged only.");
    console.info("[contact] payload:", { name, email, subject, message });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      react: ContactNotification({ name, email, subject, message }),
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Failed to send. Please email me directly." },
      { status: 500 }
    );
  }
}
