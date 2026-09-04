import { cn } from "@/lib/cn";

/**
 * Regulatory and scope notices from the approved copy. These are legally
 * meaningful, so they are given a deliberate, readable treatment rather
 * than being tucked away in fine print.
 */
export function Disclaimer({
  title,
  children,
  dark = false,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-l-2 py-1 pl-6",
        dark ? "border-olive-500/50" : "border-olive-500/60",
        className,
      )}
    >
      {title ? (
        <p
          className={cn(
            "text-lg",
            dark ? "text-ivory-100" : "text-evergreen-600",
          )}
        >
          {title}
        </p>
      ) : null}
      <p
        className={cn(
          "text-sm leading-relaxed",
          title && "mt-2",
          dark ? "text-ivory-100/60" : "text-ink-700",
        )}
      >
        {children}
      </p>
    </div>
  );
}
