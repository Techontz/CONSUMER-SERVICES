import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  as: Tag = "div",
  tight = false,
  className,
  children,
}: {
  as?: ElementType;
  tight?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn(tight ? "u-container-tight" : "u-container", className)}>
      {children}
    </Tag>
  );
}
