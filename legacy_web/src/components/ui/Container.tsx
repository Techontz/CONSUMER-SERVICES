import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  as: Tag = "div",
  tight = false,
  wide = false,
  className,
  children,
}: {
  as?: ElementType;
  /** Narrow reading column, for long-form text. */
  tight?: boolean;
  /** Full-width rail, for the header. Reaches nearer the edges than body copy. */
  wide?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const rail = tight
    ? "u-container-tight"
    : wide
      ? "u-container-wide"
      : "u-container";
  return <Tag className={cn(rail, className)}>{children}</Tag>;
}
