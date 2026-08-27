"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Curtain wipe between pages.
 *
 * On navigation an evergreen panel sweeps down over the viewport and lifts
 * away, which gives the route change a beginning and an end instead of the
 * content simply popping. It is purely decorative: `pointer-events-none`
 * throughout, `aria-hidden`, and it never gates rendering — the new page is
 * already painted underneath while the curtain lifts.
 *
 * The run counter is bumped during render rather than in an effect, so the
 * curtain is in place on the very first frame of the new route. Reduced
 * motion is handled in CSS, which hides the curtain outright.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const [seen, setSeen] = useState(pathname);
  const [run, setRun] = useState(0);

  if (seen !== pathname) {
    setSeen(pathname);
    setRun((n) => n + 1);
  }

  // Nothing to draw until the reader has actually navigated.
  if (run === 0) return null;

  return (
    <div
      aria-hidden
      key={run}
      className="u-curtain pointer-events-none fixed inset-0 z-70"
    >
      <span className="u-curtain-panel absolute inset-0 bg-evergreen-900" />
      <span className="u-curtain-rule absolute inset-x-0 top-0 h-px bg-brass-500" />
    </div>
  );
}
