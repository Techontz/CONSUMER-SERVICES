/** Minimal class joiner — avoids pulling in a dependency for one job. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
