"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function AnimatedTooltip({
  label,
  description,
  children,
  className,
}: Props) {
  const [hover, setHover] = useState(false);

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }}
            exit={{ opacity: 0, y: 4, scale: 0.95, transition: { duration: 0.12 } }}
            className="pointer-events-none absolute -top-2 left-1/2 z-30 -translate-x-1/2 -translate-y-full rounded-xl bg-foreground px-3 py-2 text-[11px] font-medium leading-snug text-background shadow-[0_12px_32px_-12px_rgba(28,24,21,0.4)]"
          >
            <span className="font-display italic text-[--color-brand-orange] [text-shadow:0_0_18px_rgba(232,93,4,0.4)]">
              {label}
            </span>
            {description && (
              <span className="mt-0.5 block whitespace-nowrap text-background/80">
                {description}
              </span>
            )}
            <span
              aria-hidden
              className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground"
            />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </span>
  );
}
