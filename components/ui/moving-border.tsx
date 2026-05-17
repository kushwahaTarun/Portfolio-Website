"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
  borderRadius?: string;
};

/**
 * Aceternity-style moving gradient border using a spinning conic gradient.
 */
export function MovingBorder({
  children,
  className,
  containerClassName,
  duration = 6,
  borderRadius = "9999px",
}: Props) {
  return (
    <div
      className={cn(
        "relative inline-block overflow-hidden p-[1.5px]",
        containerClassName
      )}
      style={
        {
          borderRadius,
          ["--mb-duration" as string]: `${duration}s`,
        } as React.CSSProperties
      }
    >
      <span
        aria-hidden
        className="absolute inset-[-100%] animate-mb-spin"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #e85d04 60deg, #db2777 120deg, #4f46e5 180deg, transparent 240deg)",
        }}
      />
      <div
        className={cn("relative bg-background", className)}
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
}
