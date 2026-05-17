"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
};

export function SpotlightCard({ children, className, glowColor = "232,93,4" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--x", `${e.clientX - rect.left}px`);
    node.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-foreground/[0.08] bg-white p-px transition-all hover:border-foreground/20 hover:shadow-[0_18px_48px_-16px_rgba(28,24,21,0.18)]",
        className
      )}
      style={
        {
          ["--glow" as string]: glowColor,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--x) var(--y), rgba(var(--glow),0.16), transparent 50%)",
        }}
      />
      <div className="relative h-full rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white">
        {children}
      </div>
    </div>
  );
}
