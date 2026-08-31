import { HeroFilm } from "@/components/media/HeroFilm";
import { PreloadHeroPoster } from "@/components/media/PreloadHeroPoster";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homeHero } from "@/lib/content/home";
import { site } from "@/lib/site";

/**
 * The opening frame.
 *
 * Real footage fills the viewport — a slow push along a city canal at golden
 * hour, water and park and towers in one frame — and the type sits on it,
 * anchored low and left behind a directional scrim.
 *
 * The headline is the one place on the site that speaks in the editorial
 * serif rather than letterspaced capitals: three nouns set roman, the promise
 * set italic in brass. That contrast is the whole point of the frame, and it
 * is why the serif is kept for this and nothing else.
 *
 * A server component on purpose — the headline is the LCP element and its
 * reveal is pure CSS, so the first thing a reader sees never waits on
 * hydration.
 */
export function HomeHero() {
  const lines = homeHero.headlineLines;
  const closing = lines.length - 1;

  return (
    // Padding and the gaps below are keyed to viewport HEIGHT, not width.
    // Their floors came down a notch when the header became a 116px band:
    // at 1280x720 the composition was six pixels past the viewport, and
    // sixteen pixels spread across five gaps is the whole of the fix.
    // The old fixed values (128px top, 112px bottom, 32/40/32/44 between the
    // parts) came to 1055px of composition, which fits 1080 and nothing
    // shorter — at 1366x768 the buttons sat 175px below the fold. Height-aware
    // clamps let the frame breathe on a tall screen and close up on a short
    // one without a single type size changing.
    <section
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-evergreen-950"
      style={{
        paddingTop: "clamp(7.75rem, 14svh, 9.5rem)",
        paddingBottom: "clamp(1.5rem, 3.6svh, 3rem)",
      }}
    >
      <PreloadHeroPoster href="/media/hero-waterfront-poster.webp" />
      <HeroFilm
        poster="/media/hero-waterfront-poster.webp"
        src="/media/hero-waterfront-desktop.mp4"
        webmSrc="/media/hero-waterfront-desktop.webm"
        mobileSrc="/media/hero-waterfront-mobile.mp4"
        className="-z-20"
      />

      {/* The grade, in four layers.

          The film is a 720p source being asked to cover a 1920 frame, and
          played raw it looks like exactly that: soft edges, visible
          compression in the water, detail that does not survive the scale.
          The answer is not blur — blur announces itself — it is the thing a
          colourist would do, which is to put the picture under a veil and
          let tone rather than resolution carry it.

          1. An evergreen veil across the whole frame. The colour is
             deliberately a mid evergreen rather than the near-black the
             scrims use: at luminance 48 against the film's 64 it tints
             strongly at a third opacity while costing almost no brightness,
             which is the difference between veiled and dark. It is also
             warmer than the brand evergreen — 18 of red rather than 4 —
             because a veil with almost no red in it takes the golden hour
             out of a golden hour clip, and the point is to harmonise with
             that light rather than cancel it.
          2. The directional wash the type sits on, denser to the left, and
             flipped bottom-up below `lg` where the copy fills the frame
             rather than sitting in a column down its side.
          3. A vignette, shallow enough to read as a lens rather than an
             effect.
          4. A grade on the video element itself — contrast slightly down to
             flatten the artefacts, brightness slightly up to pay for the
             veil, saturation slightly down so the evergreen reads as a grade
             over the footage rather than a filter laid on it. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[rgba(18,58,42,0.33)]"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,18,15,0)_0%,rgba(4,18,15,0.16)_18%,rgba(6,32,27,0.46)_40%,rgba(4,18,15,0.72)_70%,rgba(4,18,15,0.78)_100%)] lg:bg-[linear-gradient(96deg,rgba(4,18,15,0.80)_0%,rgba(4,18,15,0.66)_30%,rgba(6,32,27,0.26)_58%,rgba(8,52,48,0.05)_80%,rgba(8,52,48,0)_92%)]"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(125%_105%_at_50%_44%,rgba(4,18,15,0)_52%,rgba(4,18,15,0.16)_78%,rgba(4,18,15,0.34)_100%)]"
      />

      {/* The standing rule and the scroll cue reach out over open water on
          the right, past where the directional wash has run out — 10px ivory
          at 60% over sunlit reflections is the least legible thing in the
          frame, and it needs its own ground. Desktop only: below `lg` that
          rule is not rendered and the bottom-up wash already covers it. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-[30%] bg-[linear-gradient(180deg,rgba(4,18,15,0)_0%,rgba(4,18,15,0.14)_44%,rgba(4,18,15,0.46)_100%)] lg:block"
      />

      <div aria-hidden className="u-grain absolute inset-0 -z-10 [&::after]:opacity-[0.10]" />

      <Container className="relative">
        <div className="max-w-[48rem]">
          <p
            className="u-in-fade flex items-center gap-4"
            style={{ animationDelay: "100ms" }}
          >
            <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
            <span className="u-eyebrow text-brass-400">
              Established {site.established} · {site.establishedIn}
            </span>
          </p>

          {/* Down roughly a tenth from where it was — 6rem to 5.375rem at
              the top, and every term in the clamp scaled with it, so the
              relationship between the width and height limits is unchanged.
              It is still far and away the loudest thing on the page; it was
              simply loud enough to crowd the film it is standing on, and the
              27px this returns at 1366x768 is what pays for the taller
              navigation above it.

              The height term still only engages on short viewports, where
              the choice is otherwise between a smaller headline and buttons
              below the fold. */}
          <h1
            className="u-editorial text-ivory-100"
            style={{
              marginTop: "clamp(0.75rem, 2.3svh, 2rem)",
              fontSize: "clamp(2.5625rem, min(6.3vw, 8.1svh), 5.375rem)",
            }}
          >
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <span
                  className={
                    i === closing
                      ? "u-in-mask block italic text-brass-400"
                      : "u-in-mask block"
                  }
                  style={{ animationDelay: `${200 + i * 80}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <span
            aria-hidden
            className="u-in-draw block h-px w-32 origin-left bg-brass-500"
            style={{
              marginTop: "clamp(1rem, 2.7svh, 2.5rem)",
              animationDelay: "480ms",
            }}
          />

          <p
            className="u-in-rise-lcp max-w-[42ch] text-[1.0625rem] leading-[1.75] text-ivory-100/80 lg:text-[1.1875rem]"
            style={{
              marginTop: "clamp(0.875rem, 2.3svh, 2rem)",
              animationDelay: "560ms",
            }}
          >
            {homeHero.lede}
          </p>

          <div
            className="u-in-rise flex flex-wrap gap-4"
            style={{
              marginTop: "clamp(1.125rem, 3.1svh, 2.75rem)",
              animationDelay: "660ms",
            }}
          >
            <ButtonLink href={homeHero.primaryCta.href} variant="gold">
              {homeHero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={homeHero.secondaryCta.href}
              variant="quietLight"
              withArrow={false}
            >
              {homeHero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* Footer rule of the frame: the standing line on the left, the scroll
          cue on the right.

          In normal flow, deliberately. This used to be absolutely positioned
          against `bottom`, which made the rule's height a viewport coordinate
          while the buttons above it were laid out by the flow — two systems
          that only agreed by luck. Once the section padding tightened, the
          rule cut straight through both CTAs. As a flow sibling it can only
          ever sit below the content, and its margin is real separation rather
          than a gap that happens to survive at one window size. */}
      <div
        aria-hidden
        className="u-in-fade pointer-events-none relative hidden lg:block"
        style={{
          marginTop: "clamp(1.5rem, 3.8svh, 3rem)",
          animationDelay: "900ms",
        }}
      >
        <div className="u-container flex items-center justify-between border-t border-ivory-100/15 pt-[clamp(0.875rem,2svh,1.25rem)]">
          <span className="u-eyebrow text-ivory-100/60">{site.tagline}</span>
          <span className="flex items-center gap-4">
            <span className="u-eyebrow text-ivory-100/60">Scroll</span>
            <span className="relative block h-[clamp(2.25rem,4.5svh,3rem)] w-px overflow-hidden bg-ivory-100/25">
              <span className="absolute inset-x-0 top-0 block h-1/2 animate-[lbc-scroll-cue_2.4s_ease-in-out_infinite] bg-brass-500" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
