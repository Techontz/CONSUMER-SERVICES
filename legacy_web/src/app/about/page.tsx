import Image from "next/image";
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
        image="/media/lake-forest.jpg"
        position="center 42%"
      />

      {/* --- Role + how we work --- */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{p.role.eyebrow}</Eyebrow>
            <h2 className="u-display-3 mt-6 text-evergreen-600">
              {p.role.headline}
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-[1.72] text-ink-500">
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

      {/* --- Our story, against the lake --- */}
      <section className="u-seam-up u-grain relative isolate overflow-hidden bg-evergreen-800 pb-18 pt-24 text-ivory-100 lg:pb-24 lg:pt-30">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="clip" className="lg:col-span-5">
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src="/media/lake-forest.jpg"
                  alt="A still mountain lake at first light, framed by evergreen forest"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={82}
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,15,0.12),rgba(4,18,15,0.45))]"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 block h-0.5 w-24 bg-brass-500"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <Eyebrow tone="light">{p.story.eyebrow}</Eyebrow>
              <h2 className="u-display-3 mt-6 text-ivory-100">
                {p.story.headline}
              </h2>
              <p className="mt-7 text-[1.0625rem] leading-[1.72] text-ivory-100/72">
                {p.story.lede}
              </p>
              <p className="mt-5 text-[1.0625rem] leading-[1.72] text-ivory-100/72">
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
            <p className="text-[1.0625rem] leading-[1.72] text-ink-500">
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
                className="mb-5 text-[1.0625rem] leading-[1.72] text-ink-500 last:mb-0"
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
                className="mx-auto mt-5 block h-px w-14 bg-brass-500"
              />
              <span className="u-eyebrow mt-5 justify-center text-brass-700">
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
