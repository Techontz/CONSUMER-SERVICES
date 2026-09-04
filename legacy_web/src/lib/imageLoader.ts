/**
 * Points <Image> at the derivatives built by scripts/generate-image-derivatives.mjs
 * instead of at Vercel's /_next/image service.
 *
 * The optimiser is metered. When the account's quota ran out it began
 * answering every optimised request with HTTP 402
 * (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED), cached immutable for a year,
 * and every photograph on the deployed site turned into a broken-image icon.
 * The files under public/media were always fine — they still returned 200 —
 * so the fix is to stop putting a paid service in front of them.
 *
 * Nothing about the markup changes. <Image> still emits srcset/sizes and the
 * browser still picks a width; the URLs in that srcset are now static files.
 *
 * The path shape here is a contract with the generator:
 *
 *     /media/<name>.<ext>  ->  /media/opt/<name>-<width>.webp
 *
 * Anything that is not a generated source — the SVG brand mark, an absolute
 * URL — is returned untouched, so an unexpected src degrades to "served as
 * it is" rather than to a 404.
 */

/** Mirrors WIDTHS in the generator and imageSizes+deviceSizes in next.config. */
const WIDTHS = [64, 128, 256, 640, 1080, 1600, 2048, 2560];

/** Only these are pre-built; .svg is vector and needs no derivative. */
const RASTER = /\.(jpe?g|png|webp)$/i;

/** The smallest built width that still covers what was asked for. */
function snap(width: number): number {
  return WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
}

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  /** Baked into the derivative at build time; nothing to apply per request. */
  quality?: number;
}): string {
  if (!src.startsWith("/media/") || !RASTER.test(src)) return src;

  const name = src.slice("/media/".length).replace(RASTER, "");
  return `/media/opt/${name}-${snap(width)}.webp`;
}
