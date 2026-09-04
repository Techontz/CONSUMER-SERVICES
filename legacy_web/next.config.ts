import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project lives outside a git repo; pin the root so Turbopack does not
  // walk up and adopt an unrelated lockfile.
  turbopack: { root: __dirname },

  images: {
    // Images are resized at build time, not per request.
    //
    // These used to go through Vercel's /_next/image optimiser, which is a
    // metered service. When the account's quota ran out it answered every
    // optimised request with HTTP 402 — cached immutable for a year — and
    // every photograph on the deployed site rendered as a broken-image icon
    // while the underlying files in public/media were still serving 200.
    //
    // scripts/generate-image-derivatives.mjs now builds the widths ahead of
    // time and src/lib/imageLoader.ts points <Image> at them, so the pictures
    // are ordinary static assets on the CDN with no quota in front of them.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",

    // These are the only widths the generator writes, so restricting Next to
    // them is what guarantees it can never request a derivative that was not
    // built. Change one of these three lists and you must change all three.
    imageSizes: [64, 128, 256],
    deviceSizes: [640, 1080, 1600, 2048, 2560],
  },

  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        // Fingerprint-stable media can be cached hard.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
