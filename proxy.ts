import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

const legacyHosts = new Set([
  "tarunkushwaha.vercel.app",
  "www.tarunkushwaha.in",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (!host || !legacyHosts.has(host)) {
    return NextResponse.next();
  }

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    siteConfig.url,
  );

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/:path*"],
};
