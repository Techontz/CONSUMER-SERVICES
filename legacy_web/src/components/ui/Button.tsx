import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "accent" | "quiet" | "quietLight";

/**
 * Buttons follow the reference: a thin rule, generous horizontal air, and
 * heavy letterspaced capitals. No fill by default — the fill arrives on
 * hover, wiping in from the left behind an arrow that steps forward.
 */
const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden " +
  "px-8 py-4 font-display text-[0.625rem] uppercase tracking-[0.22em] " +
  "border transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  solid: "border-evergreen-800 bg-evergreen-800 text-ivory-100",
  // Primary: the metallic gold ground, dark type. One weight of border and
  // no radius, as before — the fill is the only thing that changed.
  //
  // The border stays flat gold-500 on purpose. A gradient edge one pixel
  // wide cannot show a highlight; it just makes the outline read as an
  // uneven colour. Flat gold at 4.48:1 on evergreen is the boundary, the
  // metal is the ground inside it.
  //
  // The label is evergreen-950, not ink-900. The fill's darkest stop is
  // gold-600, where Charcoal Green measures 4.29:1 and misses AA for small
  // text — and a 10px letterspaced capital is small text. evergreen-950
  // reads 4.75:1 against that same worst-case stop, and 8.4:1 at the shine
  // in the middle, so the label clears AA at every point along the sweep
  // rather than only where the metal happens to be bright.
  accent: "border-gold-500 u-metal-fill text-evergreen-950",
  // Secondary on a light ground. The border is olive rather than a tint of
  // the evergreen it used to be — the accent is what marks an action, and a
  // faded structural colour marked nothing.
  //
  // gold-700, and the ramp step matters: a control's boundary owes 3:1, and
  // on ivory Light Olive itself measures 1.85:1 and gold-500 only 2.41:1.
  // 700 clears it with room to spare at 6.88:1, which is what lets this
  // border also carry the label's weight. It is the same value the eyebrows
  // use on a light ground, so the accent reads as one colour across the
  // site even though two different tints are doing the work.
  quiet: "border-gold-700 bg-transparent text-evergreen-700 hover:text-ivory-100",
  // Secondary on a dark ground: the accent at full strength, which is what
  // the brief specifies for a secondary control, and 4.48:1 on Deep
  // Evergreen against the 3:1 a boundary owes. It was 70% — a diluted
  // accent reads as a weaker button rather than a quieter one, and one
  // border weight across the site is the point of having a button system at
  // all. The label is ivory, so the gold here only ever draws the edge.
  quietLight:
    "border-gold-500 bg-transparent text-ivory-100 hover:text-ink-900",
};

/** The wash that wipes across on hover, per variant. */
const sweeps: Record<Variant, string> = {
  solid: "bg-evergreen-950",
  // The same metal with the light swung across it, rather than a different
  // colour wiping over the top. A flat wash arriving on a metallic ground
  // reads as the finish being painted out; this reads as the highlight
  // moving, which is what the material is meant to do when you touch it.
  // Its darkest stop is a step brighter than the resting fill, so the label
  // gains contrast on hover instead of losing it.
  accent: "u-metal-fill-lit",
  quiet: "bg-evergreen-800",
  quietLight: "bg-ivory-100",
};

function Inner({
  variant,
  children,
  withArrow,
}: {
  variant: Variant;
  children: React.ReactNode;
  withArrow?: boolean;
}) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-500",
          "ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
          "motion-reduce:transition-none",
          sweeps[variant],
        )}
      />
      <span className="relative">{children}</span>
      {withArrow ? (
        <span
          aria-hidden
          className="relative block h-px w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-9 motion-reduce:transition-none"
        />
      ) : null}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "solid",
  withArrow = true,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <Inner variant={variant} withArrow={withArrow}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  variant = "solid",
  withArrow = true,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  withArrow?: boolean;
}) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <Inner variant={variant} withArrow={withArrow}>
        {children}
      </Inner>
    </button>
  );
}

/** The quieter inline link — a rule that extends rather than an arrow glyph. */
export function TextLink({
  href,
  tone = "dark",
  className,
  children,
}: {
  href: string;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 font-display text-[0.625rem] uppercase tracking-[0.22em]",
        "transition-colors duration-300",
        tone === "dark"
          ? "text-evergreen-700 hover:text-gold-700"
          : "text-gold-400 hover:text-ivory-100",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="block h-px w-7 bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-12 motion-reduce:transition-none"
      />
    </Link>
  );
}
