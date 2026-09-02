import { HeroFilm } from "@/components/media/HeroFilm";

/**
 * The film every masthead on the site stands on, and the grade over it.
 *
 * One component rather than five copies. Each opener used to carry its own
 * photograph — a lake behind About, a glass tower behind Services,
 * Industries, Resources and Contact — which made five unrelated stock pages
 * rather than one brand. They all show the same waterfront now, and the only
 * thing a page varies is the words in front of it.
 *
 * The grade is in four layers. It began as a fix for a 720p source that
 * could not cover a 1920 frame, and it stays because it is also what makes
 * the film read as this company's rather than as stock: the veil is the
 * brand, not a repair. The current master is 2158px, so the layers that were
 * hiding artefacts have been eased back accordingly.
 *
 *  1. An evergreen veil across the frame, in a mid evergreen rather than the
 *     near-black the scrims use: it tints strongly at a third opacity while
 *     costing almost no brightness, which is the difference between veiled
 *     and dark. It is warmer than the brand green — 18 of red rather than 4 —
 *     because a veil with no red in it takes the golden hour out of a
 *     golden-hour clip.
 *  2. The directional wash the type sits on, denser to the left, and flipped
 *     bottom-up below `lg` where copy fills the frame rather than sitting in
 *     a column down its side.
 *  3. A vignette, shallow enough to read as a lens rather than an effect.
 *  4. Grain, at a lighter dose than the standard utility, which is tuned for
 *     flat evergreen fields and reads as haze over footage this bright.
 *
 * `full` is the homepage's taller frame; `page` is the short interior
 * opener, where the type sits nearer the foot and the wash has less height
 * to travel, so it starts denser and falls away faster.
 */
export function HeroBackdrop({ variant = "page" }: { variant?: "full" | "page" }) {
  const full = variant === "full";

  return (
    <>
      <HeroFilm
        poster="/media/hero-canal-poster.webp"
        src="/media/hero-canal-desktop.mp4"
        webmSrc="/media/hero-canal-desktop.webm"
        mobileSrc="/media/hero-canal-mobile.mp4"
        className="-z-20"
      />

      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(18,58,42,0.33)]" />

      <div
        aria-hidden
        className={
          full
            ? "absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,18,15,0.14)_0%,rgba(4,18,15,0.34)_16%,rgba(6,32,27,0.62)_34%,rgba(4,18,15,0.82)_66%,rgba(4,18,15,0.88)_100%)] lg:bg-[linear-gradient(96deg,rgba(4,18,15,0.80)_0%,rgba(4,18,15,0.66)_30%,rgba(6,32,27,0.26)_58%,rgba(8,52,48,0.05)_80%,rgba(8,52,48,0)_92%)]"
            : "absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,18,15,0.30)_0%,rgba(6,32,27,0.52)_38%,rgba(4,18,15,0.80)_100%)] lg:bg-[linear-gradient(96deg,rgba(4,18,15,0.84)_0%,rgba(4,18,15,0.72)_32%,rgba(6,32,27,0.34)_60%,rgba(8,52,48,0.08)_82%,rgba(8,52,48,0)_94%)]"
        }
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(125%_105%_at_50%_44%,rgba(4,18,15,0)_52%,rgba(4,18,15,0.16)_78%,rgba(4,18,15,0.34)_100%)]"
      />

      {/* The standing rule and the scroll cue sit along the foot of the
          homepage frame — 10px ivory at 60%, the least legible thing in the
          composition — and the directional wash has largely run out by the
          time it reaches them. They get their own short band.

          It is measured: without this the foot rule reads 4.45:1 against the
          current master, which is under AA. The brighter the footage, the
          more this one earns its place. Desktop only, because below `lg`
          that rule is not rendered and the bottom-up wash already covers the
          ground. */}
      {full ? (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 hidden h-[32%] bg-[linear-gradient(180deg,rgba(4,18,15,0)_0%,rgba(4,18,15,0.12)_44%,rgba(4,18,15,0.48)_100%)] lg:block"
        />
      ) : null}

      <div aria-hidden className="u-grain absolute inset-0 -z-10 [&::after]:opacity-[0.10]" />
    </>
  );
}
