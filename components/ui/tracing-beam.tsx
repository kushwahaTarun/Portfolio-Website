"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TracingBeam({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.95], [0, height]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, height]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="pointer-events-none absolute left-0 top-3 md:left-1 lg:-left-4">
        <motion.div
          className="ml-[27px] flex size-4 items-center justify-center rounded-full border border-foreground/15 bg-white shadow-sm"
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "0 0 0 0 rgba(232,93,4,0.0)",
          }}
        >
          <motion.div
            className="size-2 rounded-full"
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0
                  ? "rgba(232,93,4,1)"
                  : "rgba(255,255,255,0.0)",
              border: "1px solid rgba(232,93,4,1)",
            }}
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${height}`}
          width="20"
          height={height}
          className="ml-4 block"
          aria-hidden
        >
          <motion.path
            d={`M 1 0 V ${height}`}
            fill="none"
            stroke="rgba(28,24,21,0.08)"
            strokeWidth="1.25"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0 V ${height}`}
            fill="none"
            stroke="url(#beam-gradient)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <defs>
            <motion.linearGradient
              id="beam-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#e85d04" stopOpacity="0" />
              <stop stopColor="#e85d04" />
              <stop offset="0.325" stopColor="#db2777" />
              <stop offset="1" stopColor="#4f46e5" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div className="ml-0">{children}</div>
    </div>
  );
}
