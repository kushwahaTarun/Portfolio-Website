import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(circle at 80% 20%, rgba(255,181,71,0.25), transparent 55%), radial-gradient(circle at 10% 90%, rgba(125,211,252,0.18), transparent 55%), #05060a",
          color: "#f5f5f7",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "linear-gradient(135deg, #ffb547, rgba(255,181,71,0.4))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0c12",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            TK
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#8a8f9c", letterSpacing: 4 }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 110,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {`${siteConfig.name}.`}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#a1a1aa",
              maxWidth: 920,
              lineHeight: 1.2,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#8a8f9c",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.role}</div>
          <div style={{ display: "flex" }}>tarunkushwaha.dev</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
