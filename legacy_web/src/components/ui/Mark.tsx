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

/* The mark is struck in the same metal as the primary buttons.
 *
 * Its stops are the palette tokens, which is what keeps it honest: the CSS
 * `--metal-fill` the buttons use and this gradient cannot drift apart in
 * hue, because neither owns a colour — both read gold-600, gold-400 and the
 * shine. The one thing that has to be maintained in two places is the shape
 * of the ramp, so the percentages below are the fill's percentages, and a
 * change to one is a change to both.
 *
 * `userSpaceOnUse`, and this is the whole trick: the default
 * objectBoundingBox resolves against the element being painted, and the fill
 * is inherited by three separate paths. Each course would get its own full
 * sweep — three highlights stacked up the mark rather than one light
 * crossing it. In user space the gradient is fixed to the 64-unit grid and
 * all three courses are lit by the same source.
 *
 * The axis runs from (3,27) to (61,37) — a direction of about 100 degrees,
 * matching the buttons, measured across the mark's real extent (x 6–58,
 * y 9–55) rather than the viewBox, so the shine lands on the middle of the
 * artwork instead of the middle of its padding.
 */
const GRADIENT_ID = "csi-mark-metal";

export function Mark({
  className,
  tone = "olive",
}: {
  className?: string;
  /** "olive" everywhere by default; "current" inherits for reversed use. */
  tone?: "olive" | "current";
}) {
  // The reverse is still flat, and has to be: `tone="current"` exists for
  // the places that stamp the mark in one ink — a single colour inherited
  // from its surroundings. A gradient cannot inherit, so this branch is not
  // a lesser version of the metal, it is a different job.
  const metal = tone !== "current";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role="img"
      aria-hidden
      focusable="false"
    >
      {metal ? (
        <defs>
          {/* Every instance carries its own copy rather than depending on a
              definition rendered elsewhere in the document — the mark is in
              the header, the footer and the mobile sheet, across a server
              tree and a client one, and a fill that resolves only when some
              other component happens to have rendered is a fill that will
              eventually paint nothing. The copies are identical, so the
              duplicate id resolves to the same paint wherever it is used. */}
          <linearGradient
            id={GRADIENT_ID}
            gradientUnits="userSpaceOnUse"
            x1="3"
            y1="27"
            x2="61"
            y2="37"
          >
            <stop offset="0%" stopColor="var(--color-gold-600)" />
            <stop offset="35%" stopColor="var(--color-gold-400)" />
            <stop offset="50%" stopColor="var(--gold-shine)" />
            <stop offset="65%" stopColor="var(--color-gold-400)" />
            <stop offset="100%" stopColor="var(--color-gold-600)" />
          </linearGradient>
        </defs>
      ) : null}

      <g fill={metal ? `url(#${GRADIENT_ID})` : "currentColor"}>
        <path d="M18 9h40L46 21H18Z" />
        <path d="M6 26h40v12H6Z" />
        <path d="M6 43h52v12H6Z" />
      </g>
    </svg>
  );
}
