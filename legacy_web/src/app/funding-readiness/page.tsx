import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { fundingPage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Funding Readiness",
  description:
    "Capital starts with preparation. We help clients research, organize and prepare before they pursue appropriate funding opportunities.",
  path: "/funding-readiness",
});

export default function FundingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
      />

      {/* --- Purpose: six single-word objectives --- */}
      <Section tone="paper">
        <Reveal className="max-w-[52ch]">
          <Eyebrow>{p.purpose.label}</Eyebrow>
          <h2 className="u-display-2 mt-6 text-evergreen-600">
            {p.purpose.headline}
          </h2>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-11 grid gap-px border border-rule bg-rule sm:grid-cols-3 lg:mt-14 lg:grid-cols-6"
        >
          {p.purpose.items.map((item) => (
            <RevealItem
              as="li"
              key={item}
              className="group relative overflow-hidden bg-ivory-50 px-6 py-8 text-center transition-colors duration-500"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-evergreen-800 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
              />
              <span
                aria-hidden
                className="relative mx-auto u-dot text-olive-700 transition-colors duration-400 group-hover:text-olive-400"
              />
              <h3 className="relative mt-4 text-[1.25rem] text-evergreen-600 transition-colors duration-400 group-hover:text-ivory-100">
                {item}
              </h3>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <p className="u-lede max-w-[52ch]">{p.purpose.closing}</p>
        </Reveal>
      </Section>

      {/* --- Pathways --- */}
      <section className="u-seam-up u-grain relative isolate overflow-hidden bg-evergreen-800 pb-18 pt-24 text-ivory-100 lg:pb-24 lg:pt-30">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow tone="light">{p.pathways.label}</Eyebrow>
              <h2 className="u-display-2 mt-6 text-ivory-100">
                {p.pathways.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
              <p className="text-[1.0625rem] leading-[1.72] text-ivory-100/72">
                {p.pathways.lede}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --- What we do --- */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{p.work.label}</Eyebrow>
            <h2 className="u-display-2 mt-6 text-evergreen-600">
              {p.work.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p className="u-lede">{p.work.lede}</p>
            <div className="mt-10">
              <Disclaimer title={p.work.disclaimerTitle}>
                {p.work.disclaimer}
              </Disclaimer>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        headline="Tell us what the capital needs to accomplish."
        primary={{ label: "Begin a Readiness Assessment", href: "/assessment" }}
        secondary={{ label: "Start a Conversation", href: "/contact" }}
      />
    </main>
  );
}
