import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Пьяная Москва — Доставка алкоголя 24/7";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0606 0%, #1a0d0d 50%, #2a1515 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            color: "#c9a96e",
            fontSize: 22,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          18+ &middot; Москва &middot; 24/7
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 300,
            color: "#f5f0e8",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          Пьяная
          <span style={{ color: "#c9a96e", marginLeft: 18 }}>Москва</span>
        </div>
        <div
          style={{
            width: 120,
            height: 2,
            background: "#c9a96e",
            opacity: 0.5,
            marginBottom: 28,
          }}
        />
        <div
          style={{
            display: "flex",
            color: "#a89886",
            fontSize: 38,
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          Доставка алкоголя по Москве за 20 минут
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            color: "#c9a96e",
            fontSize: 28,
            letterSpacing: "0.15em",
            display: "flex",
          }}
        >
          +7 (495) 095-95-99
        </div>
      </div>
    ),
    { ...size }
  );
}
