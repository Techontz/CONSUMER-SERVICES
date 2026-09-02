import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { DigitalStory } from "@/components/sections/home/DigitalStory";
import { Heritage } from "@/components/sections/home/Heritage";
import { IntroSplit } from "@/components/sections/home/IntroSplit";
import { Pathways } from "@/components/sections/home/Pathways";
import { ProcessLine } from "@/components/sections/home/ProcessLine";
import { ReadinessStory } from "@/components/sections/home/ReadinessStory";
import { SectorStory } from "@/components/sections/home/SectorStory";
import { closing, fundingStory, opportunityStory } from "@/lib/content/home";

export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
      <IntroSplit />
      <DigitalStory />
      <Pathways />
      <SectorStory />

      <ReadinessStory
        story={opportunityStory}
        image="/media/industry-infrastructure.jpg"
        alt="Site engineers reviewing drawings on a construction project"
        tone="ivory"
      />
      <ReadinessStory
        story={fundingStory}
        film="/media/funding-consult.mp4"
        filmPoster="/media/funding-consult-poster.webp"
        alt="A financial adviser going through financing paperwork with a client across a desk"
        tone="evergreen"
        flip
      />

      <ProcessLine />
      <Heritage />

      <CtaBand
        eyebrow={closing.kicker}
        headline={closing.headline}
        body={closing.body}
        primary={closing.primaryCta}
        secondary={closing.secondaryCta}
      />
    </main>
  );
}
