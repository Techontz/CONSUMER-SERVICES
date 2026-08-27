import { TextLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { sectorStory } from "@/lib/content/home";

export function SectorStory() {
  return (
    <Section tone="paper" className="py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <SectionOpener
          index="04"
          label={sectorStory.label}
          heading={sectorStory.headline}
          className="lg:col-span-6"
        />

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-24">
          <p className="u-copy text-ink-500">{sectorStory.body}</p>
          <div className="mt-9">
            <TextLink href={sectorStory.link.href}>
              {sectorStory.link.label}
            </TextLink>
          </div>
        </Reveal>
      </div>

      <RevealGroup
        as="ul"
        className="mt-18 grid gap-px border-y border-rule bg-rule sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
      >
        {sectorStory.items.map((item) => (
          <RevealItem
            as="li"
            key={item.title}
            className="group relative overflow-hidden bg-ivory-50 p-9 transition-colors duration-500 lg:p-11"
          >
            {/* An evergreen wash rises from the foot of the cell. */}
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-evergreen-800 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
            />
            <h3 className="relative u-display-4 text-evergreen-600 transition-colors duration-400 group-hover:text-ivory-100">
              {item.title}
            </h3>
            <p className="relative mt-5 text-sm leading-relaxed text-ink-500 transition-colors duration-400 group-hover:text-ivory-100/70">
              {item.note}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
