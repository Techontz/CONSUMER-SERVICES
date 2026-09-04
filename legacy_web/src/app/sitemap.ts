import type { MetadataRoute } from "next";
import { origin } from "@/lib/seo";

/** Every public route, ranked by how central it is to the site. */
const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, freq: "monthly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/industries", priority: 0.9, freq: "monthly" },
  { path: "/about", priority: 0.8, freq: "yearly" },
  { path: "/contact", priority: 0.8, freq: "yearly" },
  { path: "/assessment", priority: 0.8, freq: "yearly" },
  { path: "/resources", priority: 0.7, freq: "weekly" },
  { path: "/funding-readiness", priority: 0.7, freq: "monthly" },
  { path: "/infrastructure-readiness", priority: 0.7, freq: "monthly" },
  { path: "/healthcare-development", priority: 0.7, freq: "monthly" },
  // The two legal documents whose text the client has supplied. The privacy
  // policy stays out until its own copy arrives.
  { path: "/terms-of-use", priority: 0.3, freq: "yearly" },
  { path: "/data-sharing", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: new URL(r.path, origin).toString(),
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
