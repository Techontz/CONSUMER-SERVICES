import { CinematicBackdrop } from "@/components/media/CinematicBackdrop";
import { Container } from "@/components/ui/Container";

/**
 * Interior page opener.
 *
 * The same evergreen-over-photograph treatment as the approved interior
 * designs. The photograph is used here in a wide, short frame, which is
 * the proportion the supplied skyline image was made for.
 *
 * Server component — the H1 is the LCP element and its reveal is CSS only.
 */
export function PageHero({
  eyebrow,
  headline,
  lede,
  image = "/media/city-towers-dusk.jpg",
  position = "center 55%",
}: {
  eyebrow: string;
  headline: string;
  lede?: string;
  image?: string;
  position?: string;
}) {
  return (
    <section className="u-grain relative isolate flex min-h-[52svh] items-end overflow-hidden bg-evergreen-900 pb-14 pt-36 lg:min-h-[58svh] lg:pb-20 lg:pt-40">
      <CinematicBackdrop
        src={image}
        priority
        position={position}
        sizes="115vw"
        // The interior scrim runs from 96% to 24% opacity over this
        // photograph, so some compression is free — but not so much that the
        // architecture behind the type goes mushy.
        quality={78}
        className="-z-20"
      />

      {/* Horizontal wash anchors the type; the vertical one seats the header
          and keeps the lower edge from fighting the section below. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(96deg,rgba(4,18,15,0.96)_0%,rgba(6,32,27,0.92)_38%,rgba(8,52,48,0.62)_68%,rgba(8,52,48,0.24)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,18,15,0.78)_0%,rgba(4,18,15,0)_36%,rgba(4,18,15,0.46)_100%)]"
      />

      <Container className="relative">
        <p
          className="u-in-fade flex items-center gap-4"
          style={{ animationDelay: "100ms" }}
        >
          <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
          <span className="u-eyebrow text-brass-400">{eyebrow}</span>
        </p>

        <h1 className="u-display-1 mt-7 max-w-[18ch] text-ivory-100">
          <span className="block overflow-hidden pb-[0.05em]">
            <span className="u-in-mask block" style={{ animationDelay: "200ms" }}>
              {headline}
            </span>
          </span>
        </h1>

        <span
          aria-hidden
          className="u-in-draw mt-9 block h-px w-28 origin-left bg-brass-500"
          style={{ animationDelay: "600ms" }}
        />

        {lede ? (
          <p
            className="u-in-rise u-copy mt-8 max-w-[56ch] text-ivory-100/78"
            style={{ animationDelay: "700ms" }}
          >
            {lede}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
