import { AssessmentForm } from "@/components/forms/AssessmentForm";
import { PageHero } from "@/components/sections/PageHero";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { assessmentPage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Business Readiness Assessment",
  description:
    "You do not need to know which Consumer Services service you need. We begin with the business.",
  path: "/assessment",
});

export default function AssessmentPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionOpener
              label={p.formLabel}
              heading={p.formHeadline}
              standfirst={p.hero.lede}
            />

            <div className="mt-11 border-l-2 border-olive-500/60 py-1 pl-6">
              <h3 className="u-display-4 text-evergreen-600">
                {p.next.headline}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-700">
                {p.next.body}
              </p>
            </div>
          </div>

          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <div className="border border-rule bg-ivory-50 p-8 lg:p-11">
              <AssessmentForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
