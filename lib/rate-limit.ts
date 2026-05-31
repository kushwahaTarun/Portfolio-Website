import { createHash } from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabase";

type RateLimitOptions = {
  request: Request;
  scope: string;
  limit: number;
  windowSeconds: number;
};

type RateLimitResult =
  | { ok: true }
  | {
      ok: false;
      retryAfter: number;
      status: 429 | 503;
      error: string;
    };

type RateLimitRow = {
  ok: boolean;
  retry_after: number | null;
};

const localBuckets = new Map<string, { count: number; reset: number }>();

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function getRateLimitKey(request: Request, scope: string) {
  const ip = getClientIp(request);
  const hash = createHash("sha256").update(`${scope}:${ip}`).digest("hex");
  return `${scope}:${hash}`;
}

function localRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const bucket = localBuckets.get(key);

  if (!bucket || bucket.reset < now) {
    localBuckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfter: Math.ceil((bucket.reset - now) / 1000),
      status: 429,
      error: "Too many requests. Try again later.",
    };
  }

  bucket.count += 1;
  return { ok: true };
}

export async function enforceRateLimit({
  request,
  scope,
  limit,
  windowSeconds,
}: RateLimitOptions): Promise<RateLimitResult> {
  const key = getRateLimitKey(request, scope);
  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });

    const row = Array.isArray(data)
      ? (data[0] as RateLimitRow | undefined)
      : (data as RateLimitRow | null);

    if (!error && row) {
      if (row.ok) return { ok: true };
      return {
        ok: false,
        retryAfter: row.retry_after ?? windowSeconds,
        status: 429,
        error: "Too many requests. Try again later.",
      };
    }

    console.error("[rate-limit] Supabase check failed", error);
  }

  if (process.env.NODE_ENV === "production") {
    return {
      ok: false,
      retryAfter: 60,
      status: 503,
      error: "Rate limiter is unavailable. Please try again shortly.",
    };
  }

  return localRateLimit(key, limit, windowSeconds);
}
