import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The project lives outside a git repo; pin the root so Turbopack does not
  // walk up and adopt an unrelated lockfile.
  turbopack: { root: __dirname },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [68, 75, 78, 82],
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
