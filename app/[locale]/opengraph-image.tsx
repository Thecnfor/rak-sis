import { ImageResponse } from "next/og";

// Open Graph image generated at build time. Renders a 1200x630 image
// with the brand name and tagline. Uses the Edge runtime.
//
// Reference: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

export const alt = "海涛旅行定制 — Travel China";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1a5632 0%, #0e3d22 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          海涛旅行定制
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#c8a45c",
            marginBottom: 16,
          }}
        >
          Travel China
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
            marginTop: 24,
          }}
        >
          品質無憂 · 純玩無購物
        </div>
      </div>
    ),
    { ...size },
  );
}