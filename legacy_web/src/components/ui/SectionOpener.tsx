import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * How every section announces itself.
 *
 * A rule that draws across, the label, then the heading in letterspaced
 * capitals. The repetition is the point: it is the spine that holds the page
 * together, so nothing else on the site is allowed to introduce a section any
 * other way.
 *
 * There used to be an index numeral in front of the rule, and the sections
 * counted themselves off 01 to 07 down the homepage. That is the kind of
 * detail that makes a site read as generated from a template rather than
 * written — the reader is never once helped by knowing a section is the
 * sixth one. The rule and the label do the whole job.
 */
export function SectionOpener({
  label,
  heading,
  standfirst,
  trailing,
  tone = "dark",
  align = "left",
  className,
  children,
}: {
  label: string;
  heading: ReactNode;
  standfirst?: ReactNode;
  /** Sits on the label line, hard right. Used for the readiness counter. */
  trailing?: ReactNode;
  /** "dark" = ink on ivory. "light" = ivory on evergreen. */
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const light = tone === "light";
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      {/* --- index · rule · label --- */}
      <Reveal
        className={cn(
          "flex items-center gap-4",
          centered && "justify-center",
          trailing ? "justify-between" : undefined,
        )}
      >
        <span
          aria-hidden
          className={cn(
            "block h-px w-10 shrink-0 origin-left",
            light ? "bg-olive-400/70" : "bg-olive-600/70",
          )}
        />

        <span
          className={cn(
            "u-eyebrow",
            light ? "text-olive-400" : "text-olive-700",
          )}
        >
          {label}
        </span>

        {trailing ? <span className="ml-auto shrink-0">{trailing}</span> : null}
      </Reveal>

      {/* --- heading --- */}
      <Reveal variant="mask" className="mt-6">
        <h2
          className={cn(
            "u-display-2",
            centered ? "mx-auto max-w-[22ch]" : "max-w-[24ch]",
            light ? "text-ivory-100" : "text-evergreen-600",
          )}
        >
          {heading}
        </h2>
      </Reveal>

      {standfirst ? (
        <Reveal delay={0.08} className="mt-6">
          <p
            className={cn(
              "u-copy",
              centered ? "mx-auto max-w-[62ch]" : "max-w-[58ch]",
              light ? "text-ivory-100/75" : "text-ink-500",
            )}
          >
            {standfirst}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
