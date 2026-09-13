import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Deep Chadamiya · Product · Design · Dev";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#edebe8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#4A3B33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F2F0ED",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            D
          </div>
          <div style={{ fontSize: 24, color: "#61605c", letterSpacing: 2 }}>PRODUCT · DESIGN · DEV</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 88, fontWeight: 600, color: "#131210", letterSpacing: -3, lineHeight: 1.02 }}>
            Deep Chadamiya
          </div>
          <div style={{ fontSize: 30, color: "#4b4a46", maxWidth: 900, lineHeight: 1.4 }}>
            Product designer, design engineer, and frontend developer designing and building thoughtful digital
            experiences.
          </div>
        </div>
      </div>
    ),
    size
  );
}
