import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
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
 * The crop is anchored at 20% rather than centred. `cover` on a frame this
 * wide throws away nearly 40% of a 3:2 photograph's height, and centred it
 * threw away the deep blue overhead and kept the hazy horizon — the one part
 * of the sky that does not read as a clear afternoon.
 *
 * The scrim is tuned, not defaulted; see the note on the two layers below.
 * It used to open at 96% opacity, which would have rendered any photograph,
 * noon or midnight, as night. Every contrast ratio in the band was measured
 * against the composite the new one produces — the painted ink against the
 * same pixels with the type hidden, at seven widths from 1920 down to 360 —
 * rather than against the token colours. Lowest anywhere: 4.64:1.
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
          the paragraph its contrast without paying for it in sky.

          It carries more weight below `lg`, and not arbitrarily. A phone sees
          a far narrower slice of the same photograph, and at the end of the
          parallax travel that slice puts a lit cloud directly behind the
          kicker — measured at 4.13:1 there while every desktop width was
          comfortably clear. The mobile crop is a different picture and needs
          its own number. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,32,25,0.80)_0%,rgba(24,40,33,0.71)_46%,rgba(18,61,50,0.64)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,32,25,0.18)_0%,rgba(10,32,25,0.19)_24%,rgba(10,32,25,0.23)_58%,rgba(10,32,25,0.15)_100%)] lg:bg-[linear-gradient(180deg,rgba(10,32,25,0.06)_0%,rgba(10,32,25,0.11)_24%,rgba(10,32,25,0.24)_58%,rgba(10,32,25,0.15)_100%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-olive-500/80" />
              {/* Ivory, not the accent — the one rule this band adds to the
                  system: the accent colour never sets type over a
                  photograph. Light Olive has 6-8:1 on the flat evergreen
                  grounds every other eyebrow sits on, but over sunlit sky
                  it measured 3.70:1 on a phone, and the amount of scrim it
                  would take to fix that is the amount that turns a clear
                  afternoon into dusk. Ivory reads at 5.9:1 on the same
                  pixels and costs the picture nothing. The rule beside it
                  and the button below it still carry the olive, which is
                  also the more restrained composition — three accent
                  elements in one band was one too many. */}
              <span className="u-eyebrow text-ivory-100">{heritage.kicker}</span>
            </p>

            <p className="mt-7 font-display text-[clamp(4rem,9vw,7.5rem)] leading-[0.84] tracking-[0.01em] text-ivory-100">
              {heritage.year}
            </p>

            <span aria-hidden className="mt-7 block h-px w-28 bg-olive-500" />
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            {/* The eyebrow used to read "Established in Georgia" while the
                column beside it set 1991 at display scale, which said the
                same thing twice. The approved copy folds the year into the
                kicker on the left, so this line is now the headline's own
                and the band states its credential once. */}
            <h2 className="u-display-2 max-w-[22ch] text-ivory-100">
              {heritage.headline}
            </h2>
            {heritage.body.map((t, i) => (
              <p
                key={t}
                className={
                  "u-copy max-w-[56ch] " +
                  (i === 0 ? "mt-7 text-ivory-100/80" : "mt-6 text-ivory-100/70")
                }
              >
                {t}
              </p>
            ))}
            <div className="mt-10">
              <ButtonLink href={heritage.link.href} variant="accent">
                {heritage.link.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
