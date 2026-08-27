import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { homeIntro } from "@/lib/content/home";

export function IntroSplit() {
  return (
    <Section tone="paper" className="py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionOpener
          index="01"
          label={homeIntro.kicker}
          heading={homeIntro.headline.join(" ")}
          className="lg:col-span-6"
        />

        <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-20">
          {homeIntro.body.map((p) => (
            <p key={p} className="u-copy mb-7 text-ink-500 last:mb-0">
              {p}
            </p>
          ))}
          <div className="mt-10">
            <TextLink href={homeIntro.link.href}>{homeIntro.link.label}</TextLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
