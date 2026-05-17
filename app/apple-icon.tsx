import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 156,
              fontWeight: 900,
              color: "#1c1815",
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            tk
          </div>
          <div
            style={{
              display: "flex",
              width: 36,
              height: 36,
              borderRadius: 36,
              background: "#e85d04",
              marginBottom: 8,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
