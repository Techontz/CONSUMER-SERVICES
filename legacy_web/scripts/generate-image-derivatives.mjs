/**
 * Builds the responsive image derivatives the site serves.
 *
 * Why this exists
 * ---------------
 * Every <Image> on this site used to be resized on demand by Vercel's image
 * optimiser at /_next/image. That is a metered, paid service, and when the
 * account's quota ran out every optimised request on the site began returning
 *
 *     HTTP 402  x-vercel-error: OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED
 *
 * cached `immutable` for a year — so every photograph on the deployed site
 * rendered as a broken-image icon. The source files were never missing; the
 * service in front of them was refusing to serve.
 *
 * So the resizing happens here, at build time, and the results are plain
 * static files under public/. They are served by the CDN like any other asset:
 * no per-request optimiser, no quota, nothing to run out. Pair with
 * src/lib/imageLoader.ts, which is what points <Image> at these files.
 *
 * Contract with the loader — both sides must agree, or a derivative 404s:
 *
 *   /media/<name>.<ext>  ->  /media/opt/<name>-<width>.webp
 *
 * WIDTHS below is the single source of truth, and it is mirrored by
 * deviceSizes/imageSizes in next.config.ts so Next never asks for a width
 * that was not generated. Every width is written even when the source is
 * smaller than it (the resize simply does not enlarge), so the loader can
 * never reference a file that does not exist.
 *
 * Output is gitignored: it is derived data, rebuilt on every build, and
 * committing ~70 binaries that `npm run build` recreates would be noise.
 */
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MEDIA = path.join(process.cwd(), "public", "media");
const OUT = path.join(MEDIA, "opt");

/** Must equal imageSizes ++ deviceSizes in next.config.ts. */
const WIDTHS = [64, 128, 256, 640, 1080, 1600, 2048, 2560];

/** The brand mark is an icon set, not photography — it is served as-is. */
const SKIP = /^mark[-.]/;

const SOURCES = /\.(jpe?g|png|webp)$/i;

/**
 * Quality by size. Thumbnails are shown at 56px and can take heavier
 * compression than a full-bleed backdrop; the large end stays generous
 * because these are the client's approved photographs.
 */
const qualityFor = (w) => (w <= 256 ? 72 : w <= 1080 ? 78 : 82);

async function main() {
  if (!existsSync(MEDIA)) {
    throw new Error(`No media directory at ${MEDIA}`);
  }
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(MEDIA))
    .filter((f) => SOURCES.test(f) && !SKIP.test(f))
    .sort();

  if (files.length === 0) throw new Error(`No source images in ${MEDIA}`);

  let written = 0;
  let skipped = 0;

  for (const file of files) {
    const src = path.join(MEDIA, file);
    const name = file.replace(SOURCES, "");
    const srcStat = await stat(src);
    const meta = await sharp(src).metadata();

    for (const width of WIDTHS) {
      const dest = path.join(OUT, `${name}-${width}.webp`);

      // Rebuild only when the source is newer than what we made from it.
      if (existsSync(dest) && (await stat(dest)).mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue;
      }

      await sharp(src)
        .resize(width, null, { withoutEnlargement: true, fit: "inside" })
        .webp({ quality: qualityFor(width), effort: 5 })
        .toFile(dest);
      written++;
    }

    process.stdout.write(
      `  ${file.padEnd(32)} ${meta.width}x${meta.height} -> ${WIDTHS.length} widths\n`,
    );
  }

  // A manifest nothing imports, but which makes the output inspectable and
  // gives CI something to assert against.
  await writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify({ widths: WIDTHS, sources: files, generated: files.length * WIDTHS.length }, null, 2),
  );

  console.log(
    `\n  ${files.length} sources -> ${files.length * WIDTHS.length} derivatives ` +
      `(${written} written, ${skipped} already current)\n`,
  );
}

main().catch((err) => {
  console.error("\n[images] generation failed:", err.message);
  process.exit(1);
});
