/**
 * The Consumer Services mark.
 *
 * A squared C, cut rather than drawn: constant twelve-unit arms on a strict
 * grid, with the two terminals facing the aperture chamfered at 45 degrees so
 * each ends in a chisel rather than a blunt stop. That single detail is what
 * keeps it from reading as a default icon, and it is the only detail — the
 * mark is one path, one flat brass, no gradient, which is why it survives at
 * favicon size and in a single colour on a printed page.
 *
 * Inline rather than an <img>: it is crisp at every density, costs no
 * request, cannot shift the layout while it loads, and takes its colour from
 * the prop so the same mark serves the evergreen masthead and an ivory
 * ground. The raster masters in /media are for the places that cannot take
 * an SVG — favicons, social cards, JSON-LD.
 */
export function Mark({
  className,
  tone = "brass",
}: {
  className?: string;
  /** "brass" everywhere by default; "ivory" for a single-colour reverse. */
  tone?: "brass" | "ivory";
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role="img"
      aria-hidden
      focusable="false"
    >
      <path
        d="M8 8H56L48 20H20V44H48L56 56H8Z"
        fill={tone === "ivory" ? "var(--color-ivory-100)" : "#D6B268"}
      />
    </svg>
  );
}
