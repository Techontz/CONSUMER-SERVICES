import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { Container } from "@/components/ui/Container";

/**
 * Interior page opener — the same masthead as the homepage, at half height.
 *
 * It used to stand on a photograph, and which photograph was a per-page
 * decision: a lake behind About, a glass tower behind everything else. That
 * made five pages that looked like five different companies. The film is
 * shared now, so the only thing an opener varies is the words in front of
 * it, and the `image`/`position` props are gone rather than left on the
 * signature as a way to reintroduce the problem.
 *
 * Server component — the H1 is the LCP element and its reveal is CSS only.
 */
export function PageHero({
  eyebrow,
  headline,
  lede,
}: {
  eyebrow: string;
  headline: string;
  lede?: string;
}) {
  return (
    <section className="u-grain relative isolate flex min-h-[42svh] items-end overflow-hidden bg-evergreen-900 pb-12 pt-32 lg:min-h-[46svh] lg:pb-16 lg:pt-36">
      <HeroBackdrop />

      <Container className="relative">
        <p
          className="u-in-fade flex items-center gap-4"
          style={{ animationDelay: "100ms" }}
        >
          <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
          <span className="u-eyebrow text-brass-400">{eyebrow}</span>
        </p>

        <h1 className="u-display-1 mt-6 max-w-[18ch] text-ivory-100">
          <span className="block overflow-hidden pb-[0.05em]">
            <span className="u-in-mask block" style={{ animationDelay: "200ms" }}>
              {headline}
            </span>
          </span>
        </h1>

        <span
          aria-hidden
          className="u-in-draw mt-7 block h-px w-28 origin-left bg-brass-500"
          style={{ animationDelay: "600ms" }}
        />

        {lede ? (
          <p
            className="u-in-rise u-copy mt-7 max-w-[56ch] text-ivory-100/78"
            style={{ animationDelay: "700ms" }}
          >
            {lede}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
