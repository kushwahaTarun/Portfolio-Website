"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  duration?: number;
  delay?: number;
  size?: number;
  colorFrom?: string;
  colorTo?: string;
  borderRadius?: number;
};

/**
 * Animated border beam — a small streak that travels around the perimeter
 * of its rounded, relatively-positioned parent. Renders only the spark;
 * does not paint a static border (so the parent's own border stays visible).
 */
export function BorderBeam({
  className,
  duration = 6,
  delay = 0,
  size = 200,
  colorFrom = "#e85d04",
  colorTo = "#4f46e5",
  borderRadius = 24,
}: Props) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        "pointer-events-none absolute aspect-square rounded-full",
        className
      )}
      style={{
        width: size,
        offsetPath: `rect(0 auto auto 0 round ${borderRadius}px)`,
        offsetDistance: "0%",
        background: `radial-gradient(circle, ${colorFrom} 0%, ${colorTo} 30%, transparent 60%)`,
        filter: "blur(2px)",
      }}
      animate={{ offsetDistance: ["0%", "100%"] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
