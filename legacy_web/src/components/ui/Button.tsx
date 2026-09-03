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
  accent: "border-olive-500 bg-olive-500 text-evergreen-950",
  quiet: "border-evergreen-800/40 bg-transparent text-evergreen-700 hover:text-ivory-100",
  quietLight:
    "border-ivory-100/45 bg-transparent text-ivory-100 hover:text-evergreen-950",
};

/** The wash that wipes across on hover, per variant. */
const sweeps: Record<Variant, string> = {
  solid: "bg-evergreen-950",
  accent: "bg-olive-400",
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
          ? "text-evergreen-700 hover:text-olive-700"
          : "text-olive-400 hover:text-ivory-100",
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
