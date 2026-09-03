import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { credibility } from "@/lib/content/home";

/**
 * The credibility band, directly under the hero.
 *
 * It is a statement of standing, not a section — so it gets none of the
 * section furniture. No opener, no rule above a label, no heading, no
 * padding in the double digits: one line of letterspaced capitals on
 * Charcoal Green, four claims separated by a hairline.
 *
 * It sits on Charcoal rather than on Deep Evergreen deliberately. The hero
 * ends dark and the section below it opens light, and this is the half-step
 * between them: darker than the hero's foot, so it reads as a seam the page
 * crosses rather than as another band competing with the film above it.
 *
 * The separator is a rule, not a middot. Four items separated by "·" wrap
 * badly at every width between a phone and a laptop — the dot ends up
 * orphaned at the head of a line. A bordered cell cannot do that, and it
 * lets the row become a two-up grid on a phone without any of the
 * punctuation moving.
 */
export function CredibilityBand() {
  return (
    <section
      aria-label="Company credentials"
      className="relative isolate border-b border-ivory-100/8 bg-evergreen-900 py-5 text-ivory-100 lg:py-6"
    >
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            {credibility.map((claim, i) => (
              <li
                key={claim}
                className={
                  // The divider belongs to the item on its left, so the
                  // first cell in each row never carries one.
                  "u-eyebrow text-[0.625rem] leading-[1.5] text-ivory-100/72 " +
                  (i % 2 === 1 ? "border-l border-olive-500/25 pl-6 " : "") +
                  "sm:border-l sm:border-olive-500/25 sm:pl-6 " +
                  (i === 0 ? "sm:border-l-0 sm:pl-0 " : "")
                }
              >
                {claim}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
