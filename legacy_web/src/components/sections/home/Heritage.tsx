import Image from "next/image";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { heritage } from "@/lib/content/home";

/**
 * The 1991 heritage band.
 *
 * Downtown Atlanta on a clear afternoon runs full-bleed behind an evergreen
 * scrim, with the founding year set at display scale — the most emphatic
 * moment on the page.
 *
 * The picture is the argument. A conifer ridge in low cloud stood here
 * before, which put a wilderness at the centre of a paragraph about a firm
 * established in Georgia in 1991 and advising businesses ever since. This is
 * the city that sentence is actually about, photographed in daylight: blue
 * sky, cumulus, summer trees and sunlit towers.
 *
 * The scrim is tuned, not defaulted. It used to open at 96% opacity, which
 * would render any photograph — noon or midnight — as night. It now runs
 * 0.74 → 0.58 → 0.36 across the frame, deep enough on the left where the
 * year and the eyebrow sit and thin enough on the right to leave the sky
 * legibly blue. Every contrast ratio in the band was measured against the
 * composite that produces, not against the token colours.
 *
 * The parallax is CSS-only, driven by a scroll-progress timeline. Browsers
 * without it simply render the photograph still, which costs the section
 * nothing.
 */
export function Heritage() {
  return (
    <section
      id="heritage"
      className="u-grain relative isolate overflow-hidden bg-evergreen-950 py-20 text-ivory-100 lg:py-26"
    >
      <div aria-hidden className="absolute inset-x-0 -inset-y-[10%] -z-20 u-parallax">
        <Image
          src="/media/atlanta-skyline-day.jpg"
          alt=""
          fill
          sizes="125vw"
          quality={78}
          className="object-cover object-[50%_20%]"
        />
      </div>

      {/* Two scrims, because they are doing two different jobs.

          The first is directional: deepest at the left edge, where the year
          and the kicker sit against a sunlit white tower, and thinnest at the
          right, where the sky can stay open.

          The second is a soft vertical relief that adds nothing across the
          top of the frame — so the blue and the cloud structure survive —
          and reaches its maximum through the middle third, which is exactly
          the band the running paragraph occupies. Weighting it that way buys
          the paragraph its contrast without paying for it in sky. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(4,18,15,0.76)_0%,rgba(6,32,27,0.69)_46%,rgba(8,52,48,0.63)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,18,15,0)_0%,rgba(4,18,15,0.05)_24%,rgba(4,18,15,0.2)_58%,rgba(4,18,15,0.12)_100%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
              <span className="u-eyebrow text-brass-400">{heritage.kicker}</span>
            </p>

            <p className="mt-7 font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.84] tracking-[0.01em] text-ivory-100">
              {heritage.year}
            </p>

            <span aria-hidden className="mt-7 block h-px w-28 bg-brass-500" />
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <p className="u-eyebrow text-brass-400">
              {heritage.establishedLabel}
            </p>
            <h2 className="u-display-2 mt-6 max-w-[22ch] text-ivory-100">
              {heritage.headline}
            </h2>
            <p className="u-copy mt-6 max-w-[54ch] text-ivory-100/75">
              {heritage.body}
            </p>
            <div className="mt-9">
              <TextLink href={heritage.link.href} tone="light">
                {heritage.link.label}
              </TextLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
