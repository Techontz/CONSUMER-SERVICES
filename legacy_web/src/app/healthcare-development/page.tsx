import { CtaBand } from "@/components/sections/CtaBand";
import { NumberedGrid } from "@/components/sections/NumberedGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { healthcarePage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Healthcare & Residential Care Development",
  description:
    "Development and implementation support for selected residential care, senior living, healthcare-support and community-based service models.",
  path: "/healthcare-development",
});

export default function HealthcarePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
        image="/media/industry-healthcare.jpg"
        position="center 36%"
      />

      <Section tone="paper">
        <Reveal className="max-w-[54ch]">
          <Eyebrow>{p.process.label}</Eyebrow>
          <h2 className="u-display-2 mt-7 text-evergreen-600">
            {p.process.headline}
          </h2>
          <p className="u-lede mt-7">{p.process.lede}</p>
        </Reveal>

        <div className="mt-14 lg:mt-18">
          <NumberedGrid items={p.process.steps} columns={3} />
        </div>
      </Section>

      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{p.models.label}</Eyebrow>
            <h2 className="u-display-2 mt-7 text-evergreen-600">
              {p.models.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p className="u-lede">{p.models.lede}</p>
            <div className="mt-10">
              <Disclaimer>{p.models.disclaimer}</Disclaimer>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        headline={p.cta.headline}
        primary={p.cta.action}
        secondary={{
          label: "Begin a Readiness Assessment",
          href: "/assessment",
        }}
      />
    </main>
  );
}
