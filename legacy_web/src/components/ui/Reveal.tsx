import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Scroll reveals.
 *
 * These are plain server components: they emit a class, and a single
 * observer mounted once in the layout adds `is-visible` as each element
 * enters the viewport. The hiding itself lives in CSS behind
 * `html[data-motion="on"]`, so nothing here ships JavaScript per section and
 * nothing stays hidden if scripts fail. See RevealObserver and globals.css.
 */

type Variant = "rise" | "clip" | "mask";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds to hold before starting. */
  delay?: number;
  tight?: boolean;
  /**
   * "rise" — fade and lift. The default, for copy.
   * "clip" — wipe open from the lower edge, for media.
   * "mask" — the child rises out from behind its own edge, for headlines.
   *          Requires exactly one block-level child.
   */
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  rise: "",
  clip: "u-reveal-clip overflow-hidden",
  mask: "u-reveal-mask overflow-hidden",
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  tight,
  variant = "rise",
}: Props) {
  return (
    <Tag
      className={cn(
        "u-reveal",
        tight && variant === "rise" && "u-reveal-tight",
        variants[variant],
        className,
      )}
      style={delay ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals its direct children one after another. The stagger comes from
 * nth-child rules in globals.css, so call sites do not thread an index.
 */
export function RevealGroup({
  children,
  as: Tag = "div",
  className,
}: Omit<Props, "tight" | "delay"> & { amount?: number }) {
  return <Tag className={cn("u-reveal-group", className)}>{children}</Tag>;
}

export function RevealItem({
  children,
  as: Tag = "div",
  className,
  tight = true,
}: Omit<Props, "delay">) {
  return (
    <Tag className={cn("u-reveal", tight && "u-reveal-tight", className)}>
      {children}
    </Tag>
  );
}
