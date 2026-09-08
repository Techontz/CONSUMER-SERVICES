import { CtaBand } from "@/components/sections/CtaBand";
import { IndustryChapters } from "@/components/sections/IndustryChapters";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { industriesPage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Industries",
  description:
    "We help entrepreneurs understand what their industry requires, identify the pieces that need to be built, and develop a practical path toward operation and opportunity.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
      />

      {/* The transition out of the hero and into the six chapters. It uses
          the approved overview label and lede rather than a new headline —
          the page already had the sentence it needed to open with, and the
          only other approved one that would fit here is the Our Role opener
          further down. A single measure rather than two columns: a label
          alone in a five-column block left a hole where a heading would go
          and made the section look like it was missing something. */}
      <section className="bg-ivory-100 pb-2 pt-16 lg:pb-4 lg:pt-20">
        <Container>
          <Reveal className="max-w-[64ch]">
            <p className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 shrink-0 bg-brass-600/70" />
              <span className="u-eyebrow text-brass-700">{p.overview.label}</span>
            </p>
            <p className="u-lede mt-7">{p.overview.lede}</p>
          </Reveal>
        </Container>
      </section>

      <IndustryChapters items={p.items} />

      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionOpener
            label={p.role.eyebrow}
            heading={p.role.headline}
            className="lg:col-span-5"
          />
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p className="u-copy text-ink-700">{p.role.body}</p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        headline={p.cta.headline}
        body={p.cta.body}
        primary={p.cta.action}
        secondary={{ label: "Start a Conversation", href: "/contact" }}
      />
    </main>
  );
}
