import { CtaBand } from "@/components/sections/CtaBand";
import { MarkerGrid } from "@/components/sections/MarkerGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutPage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "About",
  description:
    "Consumer Services, Inc. was established in Georgia in 1991. Our focus today is helping entrepreneurs bring the pieces of a business together.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
      />

      {/* --- Role + how we work --- */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{p.role.eyebrow}</Eyebrow>
            <h2 className="u-display-3 mt-6 text-evergreen-600">
              {p.role.headline}
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-[1.72] text-ink-700">
              {p.role.body}
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <Eyebrow>{p.how.eyebrow}</Eyebrow>
            </Reveal>
            <div className="mt-7">
              <MarkerGrid items={p.how.steps} columns={2} />
            </div>
          </div>
        </div>
      </Section>

      {/* --- Our story ---

          This band used to be a tall lake photograph in one column and four
          short paragraphs in the other, which left a lot of empty evergreen
          between them and put a forest at the centre of a page about a
          business-development firm. The photograph is gone rather than
          replaced: there is no image in the set that says "thirty-five years
          of advising businesses", and a picture chosen only because it was
          available is worse than none.

          What carries it instead is structure — the founding year at display
          scale as the anchor, an olive rule, and the approved copy in a
          measured reading column beside it. Not a word of it changed. */}
      <section className="u-seam-up u-grain relative isolate overflow-hidden bg-evergreen-800 pb-16 pt-20 text-ivory-100 lg:pb-20 lg:pt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow tone="light">{p.story.eyebrow}</Eyebrow>
              <h2 className="u-display-2 mt-6 max-w-[14ch] text-ivory-100">
                {p.story.headline}
              </h2>
              <span
                aria-hidden
                className="mt-8 block h-px w-24 bg-olive-500"
              />
              {/* /60, not /55. Warm Ivory at 55% over Deep Evergreen measures
                  4.41:1 — just under AA for text this size. One opacity step
                  up is 4.95:1. Same colour, same palette; it is the alpha
                  that was wrong, not the ink. */}
              <p className="u-eyebrow mt-8 text-ivory-100/60">
                {site.established} &middot; {site.establishedIn}
              </p>
            </Reveal>

            {/* A hairline down the grid rather than a drawn box: the column
                is separated by structure, not by a container. */}
            <Reveal
              delay={0.1}
              className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-ivory-100/12 lg:pl-14"
            >
              <p className="text-[1.125rem] leading-[1.7] text-ivory-100/85">
                {p.story.lede}
              </p>
              <p className="mt-6 text-[1.0625rem] leading-[1.72] text-ivory-100/70">
                {p.story.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --- Approach --- */}
      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{p.approach.eyebrow}</Eyebrow>
            <h2 className="u-display-2 mt-6 max-w-[16ch] text-evergreen-600">
              {p.approach.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-[1.0625rem] leading-[1.72] text-ink-700">
              {p.approach.body}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --- Who we are today --- */}
      <Section tone="paper">
        <Reveal className="max-w-[62ch]">
          <Eyebrow>{p.today.eyebrow}</Eyebrow>
          <h2 className="u-display-2 mt-6 text-evergreen-600">
            {p.today.headline}
          </h2>
          <p className="u-lede mt-6">{p.today.lede}</p>
        </Reveal>

        <div className="mt-11 lg:mt-14">
          <MarkerGrid items={p.today.principles} columns={4} />
        </div>
      </Section>

      {/* --- Collaboration, with the 1991 mark --- */}
      <Section tone="ivory">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{p.collaboration.eyebrow}</Eyebrow>
            <h2 className="u-display-3 mt-6 text-evergreen-600">
              {p.collaboration.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:pt-14">
            {p.collaboration.body.map((t) => (
              <p
                key={t}
                className="mb-5 text-[1.0625rem] leading-[1.72] text-ink-700 last:mb-0"
              >
                {t}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-3">
            <div className="flex h-full flex-col justify-center border border-rule bg-ivory-50 p-10 text-center">
              <span className="font-display text-[clamp(3.5rem,7vw,5rem)] font-semibold leading-none text-evergreen-600">
                {site.established}
              </span>
              <span
                aria-hidden
                className="mx-auto mt-5 block h-px w-14 bg-olive-500"
              />
              <span className="u-eyebrow mt-5 justify-center text-olive-700">
                Established
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        headline={p.cta.headline}
        primary={p.cta.action}
        secondary={{ label: "Explore Services", href: "/services" }}
      />
    </main>
  );
}
