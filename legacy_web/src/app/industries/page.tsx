import { CtaBand } from "@/components/sections/CtaBand";
import { IndustryMosaic } from "@/components/sections/IndustryMosaic";
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

      {/* The mosaic runs edge to edge — the photography is the section, and
          a container would turn it back into a card grid. */}
      <section className="relative isolate bg-ivory-50 py-16 lg:py-20">
        <Container className="mb-11 lg:mb-12">
          <Reveal className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-10 shrink-0 bg-olive-600/70" />
            <span className="u-eyebrow text-olive-700">{p.overview.label}</span>
          </Reveal>
          <Reveal delay={0.08} className="mt-7 max-w-[62ch]">
            <p className="u-lede">{p.overview.lede}</p>
          </Reveal>
        </Container>

        <IndustryMosaic items={p.items} />
      </section>

      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <SectionOpener
            label={p.role.eyebrow}
            heading={p.role.headline}
            className="lg:col-span-5"
          />
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <p className="u-copy text-ink-500">{p.role.body}</p>
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
