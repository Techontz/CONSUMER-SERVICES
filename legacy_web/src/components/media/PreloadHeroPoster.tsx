"use client";

import ReactDOM from "react-dom";

/**
 * Fetches the hero poster at the highest priority.
 *
 * The poster is the film's first frame and the page's largest-contentful
 * paint, so it must not queue behind anything. `ReactDOM.preload` is used
 * rather than an inline `<link>` because the framework emits a hoisted copy
 * of that as well, and the browser then sees the same file requested twice.
 */
export function PreloadHeroPoster({ href }: { href: string }) {
  ReactDOM.preload(href, {
    as: "image",
    type: "image/webp",
    fetchPriority: "high",
  });
  return null;
}
