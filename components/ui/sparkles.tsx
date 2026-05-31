"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  count?: number;
  colors?: string[];
};

type Spark = {
  id: number;
  top: number;
  left: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  repeatDelay: number;
};

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function Sparkles({
  className,
  count = 14,
  colors = ["#e85d04", "#db2777", "#4f46e5", "#0891b2", "#65a30d", "#f59e0b"],
}: Props) {
  const sparks: Spark[] = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: seededUnit(i + 1) * 100,
        left: seededUnit(i + 11) * 100,
        size: 4 + seededUnit(i + 21) * 8,
        color: colors[i % colors.length],
        delay: seededUnit(i + 31) * 2,
        duration: 1.4 + seededUnit(i + 41) * 1.8,
        repeatDelay: seededUnit(i + 51) * 2,
      })),
    [count, colors]
  );

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {sparks.map((s) => (
        <motion.svg
          key={s.id}
          width={s.size}
          height={s.size}
          viewBox="0 0 24 24"
          fill={s.color}
          className="absolute"
          style={{ top: `${s.top}%`, left: `${s.left}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            delay: s.delay,
            duration: s.duration,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: "easeInOut",
          }}
        >
          <path d="M12 0 L13.5 9.5 L24 12 L13.5 14.5 L12 24 L10.5 14.5 L0 12 L10.5 9.5 Z" />
        </motion.svg>
      ))}
    </div>
  );
}
