import { TextLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { pathways } from "@/lib/content/home";

/**
 * How We Help — the five stages, as an editorial index rather than a card
 * grid: the verb, the service grouping, and one line on what the stage is
 * for. Hovering floods the row and lifts the verb.
 *
 * This section used to have a twin. "A Practical Development Process" sat
 * six sections further down with its own five steps — Discover, Structure,
 * Develop, Prepare, Implement — describing the same sequence in different
 * words. Two five-step frameworks on one page do not reinforce each other;
 * they make the reader work out which is the real one. That section is gone
 * and its headline and framing sentence are here, which is why this opener
 * now carries a standfirst it did not have before.
 */
export function Pathways() {
  return (
    <Section tone="ivory" className="py-18 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <SectionOpener
          label={pathways.label}
          heading={pathways.headline}
          className="lg:col-span-6"
        />

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-14">
          <p className="u-copy text-ink-500">{pathways.standfirst}</p>
          <p className="mt-6 text-sm leading-[1.9] text-ink-300">
            {pathways.micro}
          </p>
          <div className="mt-9">
            <TextLink href={pathways.link.href}>{pathways.link.label}</TextLink>
          </div>
        </Reveal>
      </div>

      <RevealGroup as="ul" className="mt-12 border-t border-rule lg:mt-16">
        {pathways.items.map((item) => (
          <RevealItem as="li" key={item.verb}>
            {/* Rows, not cards. The three parts used to be spread 2 / 7 / 3
                across the full 1210px rail, which put the verb alone at the
                far left, the title adrift in a column twice the width it
                needed, and the note pinned to the right margin — three
                islands with a dead middle between them. 2 / 5 / 4 with the
                note starting at column 8 closes that gap, and the title is
                allowed a wider measure so it sets on one line instead of
                breaking in half inside an over-wide column. */}
            <div className="group relative grid grid-cols-12 items-baseline gap-x-4 border-b border-rule py-6 transition-colors duration-500 sm:gap-x-8 lg:py-7">
              {/* Hover wash — a paper-white lift, not a shadow. */}
              <span
                aria-hidden
                className="absolute -inset-x-[var(--spacing-gutter)] inset-y-0 -z-10 origin-bottom scale-y-0 bg-ivory-50 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
              />

              <span className="col-span-12 sm:col-span-2">
                <span className="u-eyebrow block text-olive-700 transition-colors duration-400 group-hover:text-evergreen-600">
                  {item.verb}
                </span>
              </span>

              <h3 className="u-display-4 col-span-12 mt-3 max-w-[34ch] text-[clamp(1.125rem,1.75vw,1.625rem)] text-evergreen-600 sm:col-span-5 sm:mt-0">
                {item.title}
              </h3>

              <p className="col-span-12 mt-3 text-sm leading-[1.7] text-ink-500 sm:col-span-4 sm:col-start-8 sm:mt-0">
                {item.note}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
