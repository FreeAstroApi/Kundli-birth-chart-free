import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/site";

export const alt =
  "Jyotish Desk free Vedic astrology calculators and guides";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f7f3eb",
          color: "#1c1917",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#9a3412",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
              marginBottom: 28,
            }}
          >
            {SITE_NAME.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            Vedic Astrology Calculators
          </div>
          <div
            style={{
              display: "flex",
              color: "#57534e",
              fontSize: 30,
              lineHeight: 1.3,
              marginTop: 28,
            }}
          >
            Birth chart · Kundli · Matching · D9 · Dasha · Muhurat
          </div>
        </div>

        <div
          style={{
            width: 280,
            height: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #9a3412",
            borderRadius: 4,
            background: "#fffaf0",
          }}
        >
          <div
            style={{
              width: 192,
              height: 192,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid #d6a56f",
              borderRadius: 0,
              color: "#7c2d12",
            }}
          >
            <div style={{ display: "flex", fontSize: 54, fontWeight: 800 }}>
              JD
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              Calculators and guides
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
