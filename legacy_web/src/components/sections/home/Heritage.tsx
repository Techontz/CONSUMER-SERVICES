import Image from "next/image";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { heritage } from "@/lib/content/home";

/**
 * The 1991 heritage band.
 *
 * The ridge photograph runs full-bleed behind a deep evergreen scrim with the
 * founding year set at display scale — the most emphatic moment on the page.
 *
 * The parallax is CSS-only, driven by a scroll-progress timeline. Browsers
 * without it simply render the photograph still, which costs the section
 * nothing.
 */
export function Heritage() {
  return (
    <section
      id="heritage"
      className="u-grain relative isolate overflow-hidden bg-evergreen-950 py-26 text-ivory-100 lg:py-36"
    >
      <div aria-hidden className="absolute inset-x-0 -inset-y-[10%] -z-20 u-parallax">
        <Image
          src="/media/ridge-forest.jpg"
          alt=""
          fill
          sizes="125vw"
          quality={78}
          className="object-cover"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(4,18,15,0.96)_0%,rgba(6,32,27,0.9)_46%,rgba(8,52,48,0.68)_100%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
              <span className="u-eyebrow text-brass-400">{heritage.kicker}</span>
            </p>

            <p className="mt-8 font-display text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.84] tracking-[0.01em] text-ivory-100">
              {heritage.year}
            </p>

            <span aria-hidden className="mt-8 block h-px w-28 bg-brass-500" />
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <p className="u-eyebrow text-brass-400">
              {heritage.establishedLabel}
            </p>
            <h2 className="u-display-2 mt-7 max-w-[22ch] text-ivory-100">
              {heritage.headline}
            </h2>
            <p className="u-copy mt-8 max-w-[54ch] text-ivory-100/75">
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
