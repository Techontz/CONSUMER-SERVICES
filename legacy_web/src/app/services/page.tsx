import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { servicesPage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Every business is different. We help determine what needs to be structured, planned, prepared, positioned, and implemented based on the business you are building.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
        position="center 52%"
      />

      <Section tone="paper">
        <Reveal className="max-w-[62ch]">
          <Eyebrow>Services</Eyebrow>
          <p className="u-lede mt-7">{p.intro}</p>
        </Reveal>

        <div className="mt-14 lg:mt-18">
          <ServiceSelector items={p.cards} />
        </div>

        <Reveal className="mt-12 max-w-[74ch]">
          <Disclaimer>{p.note}</Disclaimer>
        </Reveal>
      </Section>

      <CtaBand
        eyebrow={p.cta.label}
        headline={p.cta.headline}
        body={p.cta.body}
        primary={p.cta.action}
        secondary={{ label: "Start a Conversation", href: "/contact" }}
      />
    </main>
  );
}
