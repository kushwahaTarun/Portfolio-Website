import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
            gap: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 900,
              color: "#1c1815",
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            tk
          </div>
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 14,
              background: "#e85d04",
              marginBottom: 3,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
