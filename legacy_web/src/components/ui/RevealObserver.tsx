"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * Layout effects run after the hydration commit but *before* the browser
 * paints, which is the only window where this gate can be set without either
 * (a) diverging from the server HTML, or (b) letting content flash.
 */
const useBeforePaint =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Reveals every `.u-reveal` on the page as it comes into view. Mounted once
 * in the layout; re-scans on navigation, because App Router swaps page
 * content without a fresh document.
 *
 * Deliberately scroll-driven rather than IntersectionObserver-driven. An
 * observer only fires when an element's intersection actually changes, so
 * anything the reader *jumps past* — a hash link, a restored scroll
 * position, "skip to content" — would never fire and would stay invisible
 * for good. Checking positions on scroll cannot miss that case.
 *
 * Cost stays low: elements are collected once, revealed elements are
 * dropped from the working set, the handler is throttled to one frame, and
 * the listener detaches as soon as the set is empty.
 *
 * The `data-motion` gate is set *here*, from the client, never from the
 * server and never from a pre-hydration inline script. Two reasons, and both
 * matter more than the millisecond it costs:
 *
 * - The server HTML and the client's first render are then identical, so
 *   there is no hydration mismatch on `<html>`.
 * - Nothing is hidden until the code that un-hides it is proven to be
 *   running. A failed bundle, a blocked script, or a thrown error now leaves
 *   every section plainly visible instead of blank. The animation is an
 *   enhancement on top of a page that already works.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useBeforePaint(() => {
    const root = document.documentElement;

    // Honour the OS setting: leave the gate off entirely, so nothing is ever
    // hidden and there is nothing to reveal.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending = Array.from(
      document.querySelectorAll<HTMLElement>(".u-reveal:not(.is-visible)"),
    );
    if (pending.length === 0) return;

    // Hide, then immediately reveal whatever is already on screen — both
    // before this frame paints, so the reader never sees either step.
    root.setAttribute("data-motion", "on");

    let frame = 0;
    let stopped = false;

    const sweep = () => {
      frame = 0;
      if (stopped) return;

      // Reveal anything that has entered the lower edge of the viewport, or
      // that now sits above it entirely.
      //
      // Measure everything before touching a single class. Interleaving reads
      // and writes forces the browser to recompute layout once per element,
      // every frame — which showed up as tens of milliseconds of forced
      // reflow on the longer pages.
      const trigger = window.innerHeight * 0.94;
      const tops = pending.map((el) => el.getBoundingClientRect().top);

      const remaining: HTMLElement[] = [];
      for (let i = 0; i < pending.length; i++) {
        if (tops[i] < trigger) pending[i].classList.add("is-visible");
        else remaining.push(pending[i]);
      }

      pending = remaining;
      if (pending.length === 0) detach();
    };

    const schedule = () => {
      if (frame || stopped) return;
      frame = requestAnimationFrame(sweep);
    };

    function detach() {
      stopped = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    // Synchronously, not via rAF: this runs inside a layout effect, and a
    // rAF callback would land after the paint — long enough for everything
    // above the fold to flash out and back in.
    sweep();

    return detach;
  }, [pathname]);

  return null;
}
