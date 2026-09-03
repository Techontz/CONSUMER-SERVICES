import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { CredibilityBand } from "@/components/sections/home/CredibilityBand";
import { DigitalStory } from "@/components/sections/home/DigitalStory";
import { Heritage } from "@/components/sections/home/Heritage";
import { IntroSplit } from "@/components/sections/home/IntroSplit";
import { Pathways } from "@/components/sections/home/Pathways";
import { ReadinessFramework } from "@/components/sections/home/ReadinessFramework";
import { ReadinessStory } from "@/components/sections/home/ReadinessStory";
import { SectorStory } from "@/components/sections/home/SectorStory";
import { closing, fundingStory, opportunityStory } from "@/lib/content/home";

/**
 * The homepage, in the order a visitor needs it.
 *
 * The argument runs: who we are (hero) → what standing we have
 * (credibility) → what we do (introduction) → how we do it (the five
 * stages) → who we do it for (the six business types) → the three
 * specialised readiness tracks → where the experience comes from → what to
 * do next.
 *
 * Two things moved. Digital & Market Readiness used to be the second
 * section on the page, which introduced a 1991 business-development firm as
 * a digital agency; it is now the last movement of the readiness framework.
 * And "A Practical Development Process" used to sit between Funding and the
 * heritage band with a second five-step framework in it; that is folded
 * into How We Help, so the page states its process once.
 *
 * Grounds alternate deliberately rather than by accident: paper, then the
 * evergreen framework, then paper again, so no two dark bands ever meet and
 * the reader always knows which movement they are in.
 */
export default function HomePage() {
  return (
    <main id="main">
      <HomeHero />
      <CredibilityBand />
      <IntroSplit />
      <Pathways />
      <SectorStory />

      <ReadinessFramework>
        <ReadinessStory
          step={1}
          story={opportunityStory}
          image="/media/industry-infrastructure.jpg"
          alt="Two engineers on an infrastructure project site, reviewing a set of drawings together"
          tone="ivory"
        />
        <ReadinessStory
          step={2}
          story={fundingStory}
          film="/media/funding-consult.mp4"
          filmPoster="/media/funding-consult-poster.webp"
          alt="A financial adviser at a desk in a bank office, going through financing paperwork with a business owner seated opposite"
          tone="evergreen"
          flip
        />
        <DigitalStory />
      </ReadinessFramework>

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
