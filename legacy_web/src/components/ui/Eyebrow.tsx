import { cn } from "@/lib/cn";

/**
 * The small letter-spaced label that opens nearly every approved section.
 * `tone` switches it between the ivory and evergreen grounds.
 */
export function Eyebrow({
  children,
  tone = "brass",
  className,
}: {
  children: React.ReactNode;
  tone?: "brass" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "u-eyebrow flex items-center gap-3",
        tone === "brass" ? "text-brass-700" : "text-brass-400",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block h-px w-6 shrink-0",
          tone === "brass" ? "bg-brass-600/60" : "bg-brass-400/60",
        )}
      />
      {children}
    </p>
  );
}
