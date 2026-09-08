import Image from "next/image";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type Industry = {
  number: string;
  title: string;
  scope: string;
  summary: string;
  points: readonly string[];
  image: string;
  alt: string;
};

/**
 * The six industries, as six chapters.
 *
 * This replaces a mosaic of six landscape tiles — 1066x336 and 533x336 on a
 * 1440 screen — which had two problems the client named and one they did
 * not. The named ones: at that height a photograph is a texture rather than
 * a picture, and six equal tiles say the six are interchangeable. The
 * unnamed one is that a tile can only hold a title and a scope line, so the
 * page never said what Consumer Services actually does for any of them.
 *
 * A chapter has room for the answer. Each one carries a portrait plate, the
 * industry, what that industry requires, the three things we prepare, and a
 * way to start the conversation — and they alternate side to side so the eye
 * crosses the page as it descends rather than running down a column.
 *
 * The alternation is derived from the index, not stored per item: odd
 * chapters put the plate on the left, even ones on the right. Reordering the
 * array cannot break the rhythm, and nothing has to be kept in step by hand.
 */
export function IndustryChapters({ items }: { items: readonly Industry[] }) {
  return (
    <section className="bg-ivory-100 py-16 lg:py-24">
      <Container>
        <ol className="space-y-16 lg:space-y-24">
          {items.map((item, i) => {
            /* Plate left on 01, 03, 05; right on 02, 04, 06. */
            const plateLeft = i % 2 === 0;

            return (
              <li
                key={item.title}
                className="border-t border-rule pt-12 first:border-t-0 first:pt-0 lg:pt-14"
              >
                <article className="grid items-center gap-x-14 gap-y-9 lg:grid-cols-11 lg:gap-x-16">
                  {/* ---- Plate ---- */}
                  <Reveal
                    variant="clip"
                    className={
                      plateLeft
                        ? "lg:col-span-5 lg:col-start-1 lg:row-start-1"
                        : "lg:col-span-5 lg:col-start-7 lg:row-start-1"
                    }
                  >
                    {/* 4:5. A portrait plate is what makes this read as a
                        magazine rather than a directory, and it is the one
                        proportion that survives the crop from the landscape
                        masters the site already licenses. */}
                    {/* Capped while stacked. A 4:5 plate spanning a 768px container is
                        876px tall — most of a tablet screen for one photograph,
                        and it pushes the words that explain it below the fold.
                        30rem holds the portrait proportion at a size that still
                        leaves the chapter readable. The cap lifts at `lg`, where
                        the two-column grid already sets the width. */}
                    <div className="group relative aspect-4/5 w-full max-w-[30rem] overflow-hidden bg-evergreen-900 lg:max-w-none">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 62vw, 165vw"
                        quality={82}
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] motion-reduce:transition-none"
                      />
                      {/* Barely there: enough to seat the plate on the ivory
                          without dimming the photograph the client asked to
                          be able to see. */}
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,61,50,0.02),rgba(10,32,25,0.12))]"
                      />
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 block h-0.5 w-16 bg-brass-500"
                      />
                    </div>
                  </Reveal>

                  {/* ---- Text ---- */}
                  <Reveal
                    delay={0.08}
                    className={
                      plateLeft
                        ? "lg:col-span-6 lg:col-start-6 lg:row-start-1"
                        : "lg:col-span-6 lg:col-start-1 lg:row-start-1"
                    }
                  >
                    <p className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className="block h-px w-8 shrink-0 bg-brass-600"
                      />
                      <span className="u-eyebrow tabular-nums text-brass-700">
                        {item.number}
                      </span>
                    </p>

                    {/* The chapter title opens the width axis back to 100.
                        The site's display voice is condensed, which is right
                        for a section opener and wrong for six names that are
                        the substance of the page. */}
                    <h2 className="u-display-open mt-5 max-w-[19ch] text-[clamp(1.75rem,2.9vw,2.625rem)] text-evergreen-600">
                      {item.title}
                    </h2>

                    <p className="mt-5 text-[0.9375rem] leading-[1.7] text-ink-500">
                      {item.scope}
                    </p>

                    <p className="u-copy mt-7 max-w-[54ch] text-ink-700">
                      {item.summary}
                    </p>

                    <ul className="mt-9 border-t border-rule-soft">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-4 border-b border-rule-soft py-3.5 text-[0.9375rem] leading-[1.6] text-ink-700"
                        >
                          <span
                            aria-hidden
                            className="u-dot mt-[0.6em] shrink-0 text-brass-600"
                          />
                          <span className="min-w-0">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9">
                      <TextLink href="/contact">Discuss This Industry</TextLink>
                    </div>
                  </Reveal>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
