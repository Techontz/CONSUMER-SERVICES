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
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-evergreen-950 pb-16 pt-32 lg:min-h-dvh lg:pb-28">
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
            style={{ animationDelay: "140ms" }}
          >
            <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
            <span className="u-eyebrow text-brass-400">
              Established {site.established} · {site.establishedIn}
            </span>
          </p>

          <h1 className="u-editorial mt-8 text-[clamp(2.875rem,7vw,6rem)] text-ivory-100">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span
                  className={
                    i === closing
                      ? "u-in-mask block italic text-brass-400"
                      : "u-in-mask block"
                  }
                  style={{ animationDelay: `${260 + i * 115}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <span
            aria-hidden
            className="u-in-draw mt-10 block h-px w-32 origin-left bg-brass-500"
            style={{ animationDelay: "780ms" }}
          />

          <p
            className="u-in-rise mt-8 max-w-[42ch] text-[1.0625rem] leading-[1.75] text-ivory-100/80 lg:text-[1.1875rem]"
            style={{ animationDelay: "880ms" }}
          >
            {homeHero.lede}
          </p>

          <div
            className="u-in-rise mt-11 flex flex-wrap gap-4"
            style={{ animationDelay: "1000ms" }}
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
        className="u-in-fade pointer-events-none absolute inset-x-0 bottom-8 hidden lg:block"
        style={{ animationDelay: "1400ms" }}
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
