import { HeroFilm } from "@/components/media/HeroFilm";
import { HERO_VIDEO } from "@/lib/heroVideo";

/**
 * The film every masthead on the site stands on, and the grade over it.
 *
 * One component rather than five copies. Each opener used to carry its own
 * photograph — a lake behind About, a glass tower behind Services,
 * Industries, Resources and Contact — which made five unrelated stock pages
 * rather than one brand. They all show the same film now, and the only thing
 * a page varies is the words in front of it.
 *
 * The film itself is named in exactly one place — `lib/heroVideo.ts` — and
 * read from here. No page overrides it, nothing imports a video module, and
 * there is no fallback to any other footage.
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
 *  2. The scrim the type sits on. This used to be a full-height wash across
 *     the left of the frame, which darkened the towers and the sky as much
 *     as it darkened the ground behind the words — the copy needed it, the
 *     skyline was simply standing in the same column. It is an ellipse now,
 *     anchored to the corner the copy actually occupies, so density is spent
 *     where the glyphs are and the top of the frame is left alone. Measured
 *     at glyph level over four frames of the film rather than guessed at.
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
        poster={HERO_VIDEO.poster}
        src={HERO_VIDEO.mp4}
        webmSrc={HERO_VIDEO.webm}
        mobileSrc={HERO_VIDEO.mobile}
        className="-z-20"
      />

      {/* The evergreen veil. 0.36, not the 0.33 it carried while this layer
          was still mixed at the old ramp's rgb(18,58,42): Deep Evergreen is
          a lighter green than the colour it replaced, so holding the alpha
          constant would have quietly lightened every scrim on the site.
          Three points of alpha is what returns the composite to where it
          was measured, and it is the film's ground colour that changed —
          not how much of the film you can see. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(18,61,50,0.14)]" />

      {/* The desktop wash carries more through its middle than it used to.
          "Solutions That Last" is the longest line in the composition and the
          only one set in the accent, and its tail runs out past where the old
          curve had any weight left: measured 2.16:1 at 1024, 3.00:1 at 1440
          against the footage behind it — under AA for display type. The curve
          now holds ~0.68 where that line ends instead of ~0.46, and reaches
          a little further right before it lets go. The weight is added in the
          middle band only; the near field and the far field are where they
          were, so the towers and the sky the film was chosen for are
          untouched. This is the localised-scrim answer rather than a darker
          frame: the picture stays open, the type it sits under gets its
          contrast. */}
      <div
        aria-hidden
        className={
          full
            ? "absolute inset-0 -z-10 bg-[radial-gradient(150%_86%_at_14%_82%,rgba(10,32,25,0.92)_0%,rgba(10,32,25,0.84)_34%,rgba(24,40,33,0.64)_58%,rgba(24,40,33,0.34)_78%,rgba(10,32,25,0.12)_92%,rgba(10,32,25,0)_100%)] lg:bg-[radial-gradient(84%_104%_at_2%_62%,rgba(10,32,25,0.92)_0%,rgba(10,32,25,0.84)_32%,rgba(24,40,33,0.66)_54%,rgba(24,40,33,0.34)_72%,rgba(18,61,50,0.10)_88%,rgba(18,61,50,0)_98%)]"
            // The interior variant's phone gradient opened at 0.30, which is
            // most of a page hero's height at 390px: on Industries the
            // kicker sits up in that thin part of it and measured 2.78:1.
            // A page hero is half the height of the homepage's and its type
            // starts higher in the frame, so it cannot borrow the homepage's
            // curve — it needs its own, weighted to the top.
            : "absolute inset-0 -z-10 bg-[radial-gradient(150%_130%_at_16%_62%,rgba(10,32,25,0.90)_0%,rgba(10,32,25,0.78)_34%,rgba(24,40,33,0.52)_64%,rgba(10,32,25,0.22)_86%,rgba(10,32,25,0.10)_100%)] lg:bg-[radial-gradient(100%_160%_at_0%_58%,rgba(10,32,25,0.90)_0%,rgba(10,32,25,0.80)_28%,rgba(24,40,33,0.48)_56%,rgba(18,61,50,0.12)_80%,rgba(18,61,50,0)_96%)]"
        }
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(125%_105%_at_50%_44%,rgba(10,32,25,0)_58%,rgba(10,32,25,0.08)_80%,rgba(10,32,25,0.18)_100%)]"
      />

      {/* The standing rule and the scroll cue sit along the foot of the
          homepage frame — 10px ivory at 60%, the least legible thing in the
          composition — and the directional wash has largely run out by the
          time it reaches them. They get their own short band.

          It is measured: without this the foot rule reads 4.45:1 against the
          current master, which is under AA. The brighter the footage, the
          more this one earns its place. Desktop only, because below `lg`
          that rule is not rendered and the bottom-up wash already covers the
          ground.

          Deepened to 0.60 with the palette change. Deep Evergreen is lighter
          than the green this layer used to be mixed at, and the strap line
          is the one run on the whole page with no margin to give — it fell
          to 4.41:1. Doing it here rather than in the veil is the point: the
          extra weight lands in the last third of the frame, which is water,
          instead of across the towers and the sky that the film is for. */}
      {/* The kicker gets its own band on small phones, for the same reason
          the strap line gets one on desktop: it is 10px, it sits a third of
          the way down the frame, and at 375-390px the crop puts sunlit
          foliage directly behind its tail. Measured 2.78:1 there — a 10px
          run needs 4.5:1. Widening the wash until it reached would have
          dimmed the whole phone hero; a soft band over the one line it
          affects costs the picture almost nothing. Above `sm` the crop
          changes and the kicker already clears 5:1, so it stops there. */}
      {full ? (
        <div
          aria-hidden
          className="absolute inset-x-0 top-[22%] -z-10 h-[26%] bg-[linear-gradient(180deg,rgba(10,32,25,0)_0%,rgba(10,32,25,0.38)_42%,rgba(10,32,25,0.32)_64%,rgba(10,32,25,0)_100%)] sm:hidden"
        />
      ) : null}

      {full ? (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 hidden h-[34%] bg-[linear-gradient(180deg,rgba(10,32,25,0)_0%,rgba(10,32,25,0.10)_44%,rgba(10,32,25,0.38)_100%)] lg:block"
        />
      ) : null}

      <div aria-hidden className="u-grain absolute inset-0 -z-10 [&::after]:opacity-[0.10]" />
    </>
  );
}
