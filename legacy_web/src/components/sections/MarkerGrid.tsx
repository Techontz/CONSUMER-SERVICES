import { cn } from "@/lib/cn";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * A sequence rendered as a hairline grid — used for the process, readiness
 * and "ways we help" blocks across the interior pages.
 *
 * Each cell used to open with its own two-digit index. They were removed
 * everywhere: the order of these is rarely meaningful and the numerals made
 * four ordinary points look like a procedure. A dot holds the same column.
 */
export function MarkerGrid({
  items,
  dark = false,
  columns = 3,
}: {
  items: { title: string; note?: string; body?: string }[];
  dark?: boolean;
  columns?: 2 | 3 | 4;
}) {
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <RevealGroup
      as="ol"
      className={cn(
        "grid gap-px",
        cols,
        dark ? "bg-ivory-100/12" : "border border-rule bg-rule",
      )}
    >
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item.title}
          className={cn(
            "group relative p-7 transition-colors duration-500 lg:p-8",
            dark
              ? "bg-evergreen-800 hover:bg-evergreen-700"
              : "bg-ivory-50 hover:bg-ivory-200",
          )}
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 block h-px origin-left scale-x-0 bg-olive-500 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none"
          />

          <span
            aria-hidden
            className={cn("u-dot", dark ? "text-olive-500" : "text-olive-700")}
          />

          <h3
            className={cn(
              "u-display-4 mt-5",
              dark ? "text-ivory-100" : "text-evergreen-600",
            )}
          >
            {item.title}
          </h3>

          {item.note || item.body ? (
            <p
              className={cn(
                "mt-4 text-sm leading-relaxed",
                dark ? "text-ivory-100/65" : "text-ink-500",
              )}
            >
              {item.note ?? item.body}
            </p>
          ) : null}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
