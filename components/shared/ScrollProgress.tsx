"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-px w-full origin-left bg-gradient-to-r from-accent via-accent/80 to-transparent"
      style={{ scaleX }}
    />
  );
}
