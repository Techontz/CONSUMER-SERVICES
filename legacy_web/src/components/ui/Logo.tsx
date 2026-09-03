import { cn } from "@/lib/cn";
import { Mark } from "./Mark";
import { site } from "@/lib/site";

/**
 * The identity lockup: the brand mark beside a typographic wordmark.
 *
 * Both halves are live rather than raster — the mark is inline SVG and the
 * name is set type — so the lockup is crisp at any density, reflows on small
 * screens, costs no image request, and is read as text by search engines and
 * screen readers.
 *
 * `tone` covers the three grounds the lockup has to sit on: the evergreen
 * header and footer, ivory sections, and photography.
 */
export function Logo({
  tone = "light",
  size = "md",
  showTagline = true,
  className,
}: {
  /** "light" = pale type for dark grounds. "dark" = for ivory grounds. */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}) {
  // The mark is what gives the masthead its height: 68px at the wide tier,
  // which is most of the bar's 116. Everything else in the lockup is smaller
  // than it and centres against it. The middle tier takes as much of that as
  // its rail will carry — the bar there is 100px, short of the wide one
  // because 1024 has to fit the same five nav items and a button in 300
  // fewer pixels.
  const mark = {
    sm: "size-11",
    md: "size-13 lg:size-15 wide:size-17",
    lg: "size-14",
  }[size];

  // Tracking tightens on the narrowest screens so the name still sets on two
  // comfortable lines beside the mark rather than three cramped ones.
  const name = {
    sm: "text-[0.625rem] tracking-[0.08em] sm:text-[0.8125rem] sm:tracking-[0.13em]",
    md: "text-[0.625rem] tracking-[0.08em] sm:text-[0.875rem] sm:tracking-[0.13em] lg:text-[0.9375rem] lg:tracking-[0.09em] wide:text-[1.125rem] wide:tracking-[0.12em]",
    lg: "text-[0.6875rem] tracking-[0.1em] sm:text-[0.9375rem] sm:tracking-[0.13em]",
  }[size];

  return (
    <span className={cn("flex min-w-0 items-center gap-3 wide:gap-4", className)}>
      <span className={cn("block shrink-0", mark)}>
        <Mark className="size-full" />
      </span>

      <span className="min-w-0">
        {/* Wraps to two lines on a phone rather than truncating — a clipped
            company name reads as a broken header. */}
        <span
          className={cn(
            "block font-display uppercase leading-[1.25]",
            "sm:leading-none",
            name,
            tone === "light" ? "text-ivory-100" : "text-evergreen-600",
          )}
        >
          {site.legalName}
        </span>
        {showTagline ? (
          <span
            className={cn(
              "mt-2 hidden font-display text-[0.5625rem] uppercase tracking-[0.26em] sm:block wide:mt-2.5 wide:text-[0.625rem]",
              tone === "light" ? "text-ivory-100/60" : "text-olive-700",
            )}
          >
            {site.tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
