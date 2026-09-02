/**
 * The one approved hero film, and the only place the site names it.
 *
 * Every derivative below is generated directly from the client's master,
 * `DOCUMENTS/USE THIS.mov` — a straight downscale and re-encode, same
 * duration, same frame count, same pictures. No loop manipulation, no colour
 * grade, no substitution.
 *
 * There is deliberately no fallback chain here. `mp4` and `webm` are the same
 * film in two containers and `mobile` is the same film at a smaller size, so
 * the browser picking between them can only ever get this footage. If none of
 * them can play — reduced motion, data saver, 2G, no JavaScript — the
 * fallback is `poster`, a still frame of this same film, and never a
 * different video.
 */
export const HERO_VIDEO = {
  mp4: "/videos/legacy-hero.mp4",
  webm: "/videos/legacy-hero.webm",
  mobile: "/videos/legacy-hero-mobile.mp4",
  poster: "/videos/legacy-hero-poster.webp",
} as const;
