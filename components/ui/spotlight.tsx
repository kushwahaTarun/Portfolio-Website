"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
};

export function Spotlight({
  children,
  className,
  size = 560,
  color = "rgba(232, 93, 4, 0.22)",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const x = useSpring(mx, { stiffness: 200, damping: 30, mass: 0.3 });
  const y = useSpring(my, { stiffness: 200, damping: 30, mass: 0.3 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - size / 2);
    my.set(e.clientY - rect.top - size / 2);
  };

  const onLeave = () => {
    mx.set(-9999);
    my.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("relative", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 rounded-full"
        style={{
          x,
          y,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 65%)`,
          filter: "blur(6px)",
        }}
      />
      {children}
    </div>
  );
}
