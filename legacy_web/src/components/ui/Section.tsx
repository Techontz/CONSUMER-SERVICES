import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "paper" | "ivory" | "evergreen" | "charcoal" | "deep";

const tones: Record<Tone, string> = {
  /* The primary light surface is Warm Ivory itself — the approved colour,
     not the lighter tint this used to be. `ivory` is the alternate band, one
     soft step down, which is enough to seam two light sections without
     striping the page. Both carry Charcoal Green type. */
  paper: "bg-ivory-100 text-ink-900",
  ivory: "bg-ivory-200 text-ink-900",
  evergreen: "bg-evergreen-800 text-ivory-100",
  /** Charcoal Green. Depth beneath the brand ground, not a second
      brand ground — used where two dark bands would otherwise meet. */
  charcoal: "bg-evergreen-900 text-ivory-100",
  deep: "bg-evergreen-950 text-ivory-100",
};

export function Section({
  tone = "paper",
  id,
  className,
  containerClassName,
  tight,
  seam,
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  tight?: boolean;
  /**
   * Cuts a shallow angle into the section's edge, so a dark band does not
   * always meet a light one on a dead-flat horizontal line.
   */
  seam?: "top" | "bottom";
  children: ReactNode;
}) {
  const dark = tone === "evergreen" || tone === "charcoal" || tone === "deep";
  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-16 lg:py-22",
        tones[tone],
        dark && "u-grain",
        seam === "top" && "u-seam-up pt-22 lg:pt-28",
        seam === "bottom" && "u-seam-down pb-22 lg:pb-28",
        className,
      )}
    >
      <Container tight={tight} className={cn("relative", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}

/**
 * The two-column section opener used throughout the approved designs:
 * label + headline on the left, supporting copy on the right.
 */
export function SectionHead({
  eyebrow,
  headline,
  children,
  dark = false,
  align = "split",
}: {
  eyebrow?: ReactNode;
  headline: ReactNode;
  children?: ReactNode;
  dark?: boolean;
  align?: "split" | "stack" | "center";
}) {
  const heading = (
    <h2
      className={cn(
        "u-display-3",
        dark ? "text-ivory-100" : "text-evergreen-600",
        align === "center" ? "mx-auto max-w-[20ch]" : "max-w-[20ch]",
      )}
    >
      {headline}
    </h2>
  );

  if (align === "split") {
    return (
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          {eyebrow}
          <div className="mt-6">{heading}</div>
        </div>
        {children ? (
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-8">{children}</div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={align === "center" ? "text-center" : undefined}>
      {eyebrow ? (
        <div className={align === "center" ? "flex justify-center" : undefined}>
          {eyebrow}
        </div>
      ) : null}
      <div className="mt-6">{heading}</div>
      {children ? <div className="mt-7">{children}</div> : null}
    </div>
  );
}
