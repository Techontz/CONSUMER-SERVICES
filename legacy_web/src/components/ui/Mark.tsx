/**
 * The Consumer Services mark.
 *
 * Three courses on a 64-unit grid: a wide plinth, a course laid on it, and a
 * third stepped forward with its leading edge cut away at 45 degrees.
 *
 * The idea is the company's own, taken from the words it uses about itself
 * rather than invented for it. "Readiness" is the most frequent noun on the
 * site by a wide margin; "foundation", "structure" and "the pieces" run
 * through the About and Services copy; the process it sells is Discover,
 * Structure, Develop, Prepare, Implement. So: something already established
 * and load-bearing, something built on it, and one deliberate move forward.
 * The diagonal cut is what makes the top course read as moving rather than
 * merely offset — direction without drawing an arrow.
 *
 * Why not an arrow, a graph or a building: the courses are equal in height
 * and the widest is at the bottom, so there is no ascending progression to
 * mistake for a chart, and nothing here belongs to one industry. It is not a
 * letter, which is the point — "C for Consumer" is a label, not an idea.
 *
 * Inline rather than an <img>: crisp at every density, no request, no layout
 * shift, and the fill is a prop so the same geometry serves the evergreen
 * masthead and a single-colour reverse. The rasters in /media are only for
 * the places that cannot take an SVG — favicon, social card, JSON-LD.
 */
export function Mark({
  className,
  tone = "brass",
}: {
  className?: string;
  /** "brass" everywhere by default; "current" inherits for reversed use. */
  tone?: "brass" | "current";
}) {
  const fill = tone === "current" ? "currentColor" : "#D6B268";
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role="img"
      aria-hidden
      focusable="false"
    >
      <g fill={fill}>
        <path d="M18 9h40L46 21H18Z" />
        <path d="M6 26h40v12H6Z" />
        <path d="M6 43h52v12H6Z" />
      </g>
    </svg>
  );
}
