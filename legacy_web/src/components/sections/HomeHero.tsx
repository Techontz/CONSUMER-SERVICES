import { HeroFilm } from "@/components/media/HeroFilm";
import { PreloadHeroPoster } from "@/components/media/PreloadHeroPoster";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { homeHero } from "@/lib/content/home";
import { site } from "@/lib/site";

/**
 * The opening frame.
 *
 * Real footage fills the viewport — a slow aerial push through a downtown
 * canyon — and the type sits on it, anchored low and left behind a
 * directional scrim, following the composition in the hero reference.
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
    // The old fixed values (128px top, 112px bottom, 32/40/32/44 between the
    // parts) came to 1055px of composition, which fits 1080 and nothing
    // shorter — at 1366x768 the buttons sat 175px below the fold. Height-aware
    // clamps let the frame breathe on a tall screen and close up on a short
    // one without a single type size changing.
    <section
      className="relative isolate flex min-h-svh items-end overflow-hidden bg-evergreen-950"
      style={{
        paddingTop: "clamp(5.5rem, 11svh, 8.25rem)",
        paddingBottom: "clamp(4.25rem, 9svh, 7rem)",
      }}
    >
      <PreloadHeroPoster href="/media/hero-poster.webp" />
      <HeroFilm
        poster="/media/hero-poster.webp"
        src="/media/hero-desktop.mp4"
        webmSrc="/media/hero-desktop.webm"
        mobileSrc="/media/hero-mobile.mp4"
        className="-z-20"
      />

      {/* Directional scrim. Dense behind the type on the left, opening up
          across the frame so the architecture stays legible on the right —
          not a flat wash over the whole film. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(92deg,rgba(4,18,15,0.95)_0%,rgba(4,18,15,0.88)_24%,rgba(6,32,27,0.66)_46%,rgba(8,52,48,0.34)_68%,rgba(8,52,48,0.18)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,18,15,0.86)_0%,rgba(4,18,15,0.16)_28%,rgba(4,18,15,0.12)_56%,rgba(4,18,15,0.78)_100%)]"
      />
      <div aria-hidden className="u-grain absolute inset-0 -z-10" />

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

          {/* The size is unchanged wherever there is room for it: at 1080
              tall this still resolves to the same 6rem it always did. The
              height term only engages on short viewports, where the choice is
              otherwise between a smaller headline and buttons below the fold. */}
          <h1
            className="u-editorial text-ivory-100"
            style={{
              marginTop: "clamp(1rem, 2.6svh, 2rem)",
              fontSize: "clamp(2.875rem, min(7vw, 9svh), 6rem)",
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
              marginTop: "clamp(1.25rem, 3svh, 2.5rem)",
              animationDelay: "480ms",
            }}
          />

          <p
            className="u-in-rise-lcp max-w-[42ch] text-[1.0625rem] leading-[1.75] text-ivory-100/80 lg:text-[1.1875rem]"
            style={{
              marginTop: "clamp(1rem, 2.6svh, 2rem)",
              animationDelay: "560ms",
            }}
          >
            {homeHero.lede}
          </p>

          <div
            className="u-in-rise flex flex-wrap gap-4"
            style={{
              marginTop: "clamp(1.25rem, 3.4svh, 2.75rem)",
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
          cue on the right. */}
      <div
        aria-hidden
        className="u-in-fade pointer-events-none absolute inset-x-0 bottom-[clamp(1rem,2.4svh,2rem)] hidden lg:block"
        style={{ animationDelay: "900ms" }}
      >
        <div className="u-container flex items-center justify-between border-t border-ivory-100/15 pt-5">
          <span className="u-eyebrow text-ivory-100/60">{site.tagline}</span>
          <span className="flex items-center gap-4">
            <span className="u-eyebrow text-ivory-100/60">Scroll</span>
            <span className="relative block h-12 w-px overflow-hidden bg-ivory-100/25">
              <span className="absolute inset-x-0 top-0 block h-1/2 animate-[lbc-scroll-cue_2.4s_ease-in-out_infinite] bg-brass-500" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
