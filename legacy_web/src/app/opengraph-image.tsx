import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Drawn rather than photographed so it stays legible at the
 * small sizes link previews actually render at.
 */
export default async function Image() {
  // Satori treats each interpolation as a separate child node, so any string
  // built from several pieces is composed up here rather than in the markup.
  const established = `Established ${site.established} · ${site.establishedIn}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(120deg, #04120F 0%, #083430 58%, #0E463F 100%)",
          padding: "76px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 2, background: "#C9A24B" }} />
          <div
            style={{
              color: "#C9A24B",
              fontSize: 20,
              letterSpacing: 5,
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            {established}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#F6F2E9",
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            Experience. Insight. Legacy.
          </div>
          <div
            style={{
              color: "#DDBC72",
              fontSize: 82,
              lineHeight: 1.05,
              fontStyle: "italic",
              letterSpacing: -1,
            }}
          >
            Solutions That Last
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(246,242,233,0.18)",
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                color: "#F6F2E9",
                fontSize: 27,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {site.legalName}
            </div>
            <div
              style={{
                color: "rgba(246,242,233,0.55)",
                fontSize: 19,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              {site.tagline}
            </div>
          </div>
          <div
            style={{
              color: "#C9A24B",
              fontSize: 21,
              letterSpacing: 2,
              fontFamily: "sans-serif",
            }}
          >
            {site.domainLabel}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
