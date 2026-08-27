import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * How every section announces itself.
 *
 * An index numeral, a rule that draws across, the label, then the heading in
 * letterspaced capitals. The reference opens each section this way and the
 * repetition is the point: it is the spine that holds the page together, so
 * nothing else on the site is allowed to introduce a section any other way.
 */
export function SectionOpener({
  index,
  label,
  heading,
  standfirst,
  tone = "dark",
  align = "left",
  className,
  children,
}: {
  /** Two digits — "01". Omit on the rare section that is not part of a run. */
  index?: string;
  label: string;
  heading: ReactNode;
  standfirst?: ReactNode;
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
        )}
      >
        {index ? (
          <span
            className={cn(
              "u-index shrink-0",
              light ? "text-brass-400" : "text-brass-700",
            )}
          >
            {index}
          </span>
        ) : null}

        <span
          aria-hidden
          className={cn(
            "block h-px w-10 shrink-0 origin-left",
            light ? "bg-brass-400/70" : "bg-brass-600/70",
          )}
        />

        <span
          className={cn(
            "u-eyebrow",
            light ? "text-brass-400" : "text-brass-700",
          )}
        >
          {label}
        </span>
      </Reveal>

      {/* --- heading --- */}
      <Reveal variant="mask" className="mt-7">
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
        <Reveal delay={0.08} className="mt-7">
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
