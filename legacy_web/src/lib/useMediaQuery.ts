"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * `useSyncExternalStore` is the right tool here rather than an effect: the
 * match is external state that can change under us, and this keeps the value
 * correct across a rotation or a resize instead of resolving it once on mount.
 * The server snapshot is `false`, so markup renders as though the query does
 * not match and is corrected on hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
