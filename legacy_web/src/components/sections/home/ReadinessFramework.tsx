import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { readinessFramework } from "@/lib/content/home";

/**
 * The three readiness stories, bound into one framework.
 *
 * They used to be three unrelated blocks scattered down the page with
 * Digital & Market Readiness first — which meant a business-development
 * firm introduced itself as a digital agency. They are one section now, in
 * the order the work actually happens: Infrastructure & Opportunity, then
 * Funding, then Digital & Market last.
 *
 * What makes it read as one thing rather than three is the opener. A single
 * label and heading stand above all three, and each story below keeps its
 * own kicker as a movement heading rather than as a section announcement.
 * The children are rendered untouched — this wrapper adds a head and a
 * counter and takes nothing away, so the Funding panel in particular keeps
 * its layout exactly as approved.
 *
 * The counter is the other half of it: "01 / 03" beside each kicker is what
 * tells a reader mid-page that they are inside a sequence. This is the one
 * place on the site where a numeral is doing real work rather than
 * decorating a section, which is why the decorative index numerals were
 * removed everywhere else and this one stays.
 */
export function ReadinessFramework({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate">
      <section className="u-seam-up u-grain relative isolate overflow-hidden bg-evergreen-900 pb-14 pt-20 text-ivory-100 lg:pb-16 lg:pt-26">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <SectionOpener
              label={readinessFramework.label}
              heading={readinessFramework.headline}
              tone="light"
              className="lg:col-span-6"
            />
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-14">
              <p className="u-copy text-ivory-100/75">
                {readinessFramework.standfirst}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {children}
    </div>
  );
}

/**
 * The movement counter, rendered by each story inside the framework.
 * Kept here so the three stories cannot drift apart.
 */
export function FrameworkStep({
  index,
  total = 3,
  tone = "dark",
}: {
  index: number;
  total?: number;
  tone?: "dark" | "light";
}) {
  return (
    <span
      aria-hidden
      className={
        "font-display text-[0.625rem] tracking-[0.22em] " +
        // 70%, not 45%. At 45 the counter measured 3.28:1 on Deep Evergreen
        // — it is small text a reader is meant to read, so it owes the same
        // 4.5:1 as anything else. 70 gives 6.15:1 and still reads as quiet.
        (tone === "light" ? "text-ivory-100/70" : "text-ink-300")
      }
    >
      {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </span>
  );
}
