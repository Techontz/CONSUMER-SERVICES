import { TextLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { pathways } from "@/lib/content/home";

/**
 * The five development pathways, as an editorial index rather than a card
 * grid: an oversized verb, a rule, and the title. Hovering floods the row and
 * pushes the verb into brass.
 */
export function Pathways() {
  return (
    <Section tone="ivory" className="py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <SectionOpener
          index="03"
          label={pathways.label}
          heading={pathways.headline}
          className="lg:col-span-7"
        />

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:pt-24">
          <p className="text-sm leading-[1.9] text-ink-500">{pathways.micro}</p>
          <div className="mt-9">
            <TextLink href={pathways.link.href}>{pathways.link.label}</TextLink>
          </div>
        </Reveal>
      </div>

      <RevealGroup as="ul" className="mt-18 border-t border-rule lg:mt-24">
        {pathways.items.map((item, i) => (
          <RevealItem as="li" key={item.verb}>
            <div className="group relative grid grid-cols-12 items-baseline gap-x-4 border-b border-rule py-8 transition-colors duration-500 sm:gap-x-8 lg:py-10">
              {/* Hover wash — a paper-white lift, not a shadow. */}
              <span
                aria-hidden
                className="absolute -inset-x-[var(--spacing-gutter)] inset-y-0 -z-10 origin-bottom scale-y-0 bg-ivory-50 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
              />

              <span className="u-index col-span-2 text-brass-700 sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="col-span-10 sm:col-span-2">
                <span className="u-display-4 block text-evergreen-600 transition-colors duration-400 group-hover:text-brass-700">
                  {item.verb}
                </span>
              </span>

              <h3 className="u-display-4 col-span-12 mt-4 max-w-[22ch] text-[clamp(1.125rem,1.9vw,1.75rem)] text-evergreen-600 sm:col-span-6 sm:mt-0">
                {item.title}
              </h3>

              <p className="col-span-12 mt-3 text-sm text-ink-500 sm:col-span-3 sm:mt-0">
                {item.note}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
