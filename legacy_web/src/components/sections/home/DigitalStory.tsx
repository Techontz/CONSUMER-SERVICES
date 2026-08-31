import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { digitalStory } from "@/lib/content/home";

/**
 * Evergreen band. The five-step progression runs the full width of the
 * container as a numbered rule, so it reads as one movement rather than five
 * separate boxes.
 */
export function DigitalStory() {
  return (
    <Section tone="evergreen" seam="top" className="py-18 lg:pb-22 lg:pt-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionOpener
          label={digitalStory.kicker}
          heading={digitalStory.headline}
          tone="light"
          className="lg:col-span-6"
        />

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-12">
          {digitalStory.body.map((p) => (
            <p key={p} className="u-copy mb-7 text-ivory-100/75 last:mb-0">
              {p}
            </p>
          ))}
        </Reveal>
      </div>

      <RevealGroup
        as="ol"
        className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5 lg:gap-x-8"
      >
        {digitalStory.flow.map((step) => (
          <RevealItem
            as="li"
            key={step.label}
            className="group relative border-t border-ivory-100/20 pt-6"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 block h-px origin-left scale-x-0 bg-brass-500 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none"
            />
            <span aria-hidden className="u-dot text-brass-500" />
            <span className="u-display-4 mt-4 block text-ivory-100">
              {step.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
