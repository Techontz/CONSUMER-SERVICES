import type { MetadataRoute } from "next";
import { origin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Route handlers and the unpublished policy pages.
      disallow: ["/api/", "/privacy-policy", "/data-sharing"],
    },
    sitemap: new URL("/sitemap.xml", origin).toString(),
    host: origin,
  };
}
