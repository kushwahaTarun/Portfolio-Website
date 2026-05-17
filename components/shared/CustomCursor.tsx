"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 350, mass: 0.3 });
  const springY = useSpring(y, { damping: 30, stiffness: 350, mass: 0.3 });

  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    let lastInteractive = false;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        "a, button, [role='button'], [data-cursor='hover']"
      );
      if (isInteractive !== lastInteractive) {
        lastInteractive = isInteractive;
        setHovering(isInteractive);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x: springX, y: springY, willChange: "transform" }}
      >
        <motion.div
          className="rounded-full border border-foreground/40 bg-foreground/5"
          animate={{
            width: hovering ? 44 : 14,
            height: hovering ? 44 : 14,
            x: hovering ? -22 : -7,
            y: hovering ? -22 : -7,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{ x, y, willChange: "transform" }}
      >
        <div className="size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      </motion.div>
    </>
  );
}
