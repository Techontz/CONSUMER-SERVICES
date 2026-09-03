import { FrameworkStep } from "@/components/sections/home/ReadinessFramework";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { digitalStory } from "@/lib/content/home";

/**
 * Digital & Market Readiness — the third and last movement of the readiness
 * framework.
 *
 * It used to be the second section on the homepage, immediately after the
 * introduction, which meant the first specific thing a visitor learned about
 * a business-development firm founded in 1991 was that it does digital work.
 * It is the same content, moved to where it belongs in the sequence: after
 * infrastructure, after funding, as the last thing a business gets ready for
 * rather than the first thing this company appears to sell.
 *
 * It keeps its own treatment — the five-step progression across the full
 * width — because the framework's other two movements are argument-and-image
 * and this one is a progression. What ties it to them is the shared opener
 * above all three and the counter on its label line, not a forced sameness.
 */
export function DigitalStory() {
  return (
    // Charcoal, not the brand evergreen: the Funding movement above it is
    // already Deep Evergreen, and two identical dark grounds meeting would
    // read as one over-long band. Stepping down instead of repeating also
    // sets up the descent into the history band, which is deeper again.
    <Section tone="charcoal" className="py-16 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionOpener
          label={digitalStory.kicker}
          heading={digitalStory.headline}
          tone="light"
          className="lg:col-span-6"
          trailing={<FrameworkStep index={3} tone="light" />}
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
              className="absolute inset-x-0 top-0 block h-px origin-left scale-x-0 bg-olive-500 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none"
            />
            <span aria-hidden className="u-dot text-olive-500" />
            <span className="u-display-4 mt-4 block text-ivory-100">
              {step.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
