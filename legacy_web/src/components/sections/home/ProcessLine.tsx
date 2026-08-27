import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { processStory } from "@/lib/content/home";

/**
 * The five-stage development process, drawn on a single continuous rule with
 * a marker per stage.
 */
export function ProcessLine() {
  return (
    <Section tone="paper" className="py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <SectionOpener
          index="07"
          label={processStory.label}
          heading={processStory.headline}
          className="lg:col-span-6"
        />
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-24">
          <p className="u-copy text-ink-500">{processStory.body}</p>
        </Reveal>
      </div>

      <RevealGroup
        as="ol"
        className="relative mt-20 grid gap-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-5 lg:gap-6"
      >
        {/* The through-line the markers sit on. */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-[0.4375rem] hidden h-px bg-rule lg:block"
        />

        {processStory.steps.map((step) => (
          <RevealItem as="li" key={step.n} className="group relative">
            <span
              aria-hidden
              className="relative z-10 block size-3.5 rounded-full border border-brass-600 bg-ivory-50 transition-colors duration-500 group-hover:bg-brass-500"
            />
            <span className="u-index mt-7 block text-brass-700">{step.n}</span>
            <h3 className="u-display-4 mt-3 text-evergreen-600">{step.title}</h3>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-ink-500">
              {step.note}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
