import { CtaBand } from "@/components/sections/CtaBand";
import { MarkerGrid } from "@/components/sections/MarkerGrid";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { infrastructurePage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Infrastructure Readiness",
  description:
    "Large projects can create opportunities throughout the surrounding business ecosystem. We help small businesses prepare to participate.",
  path: "/infrastructure-readiness",
});

export default function InfrastructurePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
        image="/media/industry-infrastructure.jpg"
        position="center 40%"
      />

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{p.where.label}</Eyebrow>
            <h2 className="u-display-3 mt-6 text-evergreen-600">
              {p.where.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p className="u-lede">{p.where.lede}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="ivory">
        <Reveal className="max-w-[54ch]">
          <Eyebrow>{p.role.label}</Eyebrow>
          <h2 className="u-display-2 mt-6 text-evergreen-600">
            {p.role.headline}
          </h2>
        </Reveal>

        <div className="mt-11 lg:mt-14">
          <MarkerGrid items={p.role.principles} columns={4} />
        </div>

        <Reveal className="mt-12 max-w-[72ch]">
          <p className="u-lede">{p.role.closing}</p>
        </Reveal>
      </Section>

      <CtaBand
        headline={p.cta.headline}
        primary={p.cta.action}
        secondary={{ label: "Explore Services", href: "/services" }}
      />
    </main>
  );
}
