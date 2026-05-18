"use client";

import { useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  description?: string;
  accent?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Premium animated tooltip with cursor-tracked tilt, gradient glow,
 * and a glassy warm-paper card that matches the site's identity.
 */
export function AnimatedTooltip({
  label,
  description,
  accent = "#e85d04",
  children,
  className,
}: Props) {
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.4 });
  const rotateY = useTransform(springX, [-1, 1], [-14, 14]);
  const translateX = useTransform(springX, [-1, 1], [-8, 8]);

  const onMove = (e: ReactMouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const half = rect.width / 2;
    const offset = (e.clientX - rect.left - half) / half;
    x.set(Math.max(-1, Math.min(1, offset)));
  };

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        x.set(0);
      }}
      onMouseMove={onMove}
    >
      <AnimatePresence mode="wait">
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 14, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 380, damping: 20 },
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.9,
              transition: { duration: 0.14 },
            }}
            style={{ rotateY, translateX, perspective: 800 }}
            className="pointer-events-none absolute -top-2.5 left-1/2 z-30 flex -translate-x-1/2 -translate-y-full flex-col items-center"
          >
            {/* Outer glow halo */}
            <span
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-2xl opacity-70 blur-2xl"
              style={{ background: `radial-gradient(circle, ${accent}55, transparent 70%)` }}
            />

            <span
              className="relative overflow-hidden rounded-2xl px-3.5 py-2.5 text-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,253,247,0.98) 0%, rgba(251,246,237,0.98) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: `0 0 0 1px ${accent}33, 0 1px 0 rgba(255,255,255,0.8) inset, 0 18px 48px -12px rgba(28,24,21,0.35), 0 0 24px ${accent}28`,
              }}
            >
              {/* Top accent stripe */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
                }}
              />

              {/* Inner soft glow */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-8 left-1/2 size-20 -translate-x-1/2 rounded-full opacity-50 blur-2xl"
                style={{ background: accent }}
              />

              {/* Subtle noise/grain */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(28,24,21,1) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />

              {/* Label */}
              <span
                className="relative block whitespace-nowrap font-display text-[14px] italic font-medium leading-tight tracking-tight"
                style={{
                  background: `linear-gradient(135deg, #1c1815 0%, ${accent} 130%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {label}
              </span>

              {/* Description */}
              {description && (
                <>
                  <span
                    aria-hidden
                    className="relative mx-auto mt-1.5 block h-px w-6 opacity-40"
                    style={{ background: accent }}
                  />
                  <span className="relative mt-1.5 block whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/55">
                    {description}
                  </span>
                </>
              )}
            </span>

            {/* Arrow */}
            <span
              aria-hidden
              className="-mt-1.5 size-2.5 rotate-45"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,253,247,0.98), rgba(251,246,237,0.98))",
                boxShadow: `1px 1px 0 ${accent}33`,
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </span>
  );
}
