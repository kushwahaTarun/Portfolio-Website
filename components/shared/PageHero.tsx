"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { GradientOrbs } from "@/components/shared/GradientOrbs";
import { Sparkles } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  prefix: string;
  highlight: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
  underlineWidth?: string;
};

export function PageHero({
  eyebrow,
  prefix,
  highlight,
  description,
  children,
  className,
  underlineWidth = "60%",
}: Props) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-20 pb-10 md:pt-28 md:pb-16",
        className
      )}
    >
      <GradientOrbs />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-pattern mask-radial-fade opacity-50"
      />

      <motion.div
        aria-hidden
        className="absolute left-[8%] top-[28%] hidden h-3 w-3 rounded-full bg-[--color-brand-orange] md:block"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[10%] top-[30%] hidden h-2 w-2 rotate-45 bg-[--color-brand-indigo] md:block"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[18%] bottom-[14%] hidden h-4 w-4 rounded-sm bg-[--color-brand-cyan] md:block"
        animate={{ y: [0, 12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-px relative mx-auto max-w-[1400px]">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground sticker"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-brand-orange] opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-[--color-brand-orange]" />
          </span>
          / {eyebrow}
        </motion.span>

        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
          <span className="block">
            <AnimatedText text={prefix} />
          </span>
          <span className="relative mt-2 inline-block md:mt-3">
            <span className="relative z-10 inline-block pr-[0.12em] font-display italic gradient-text">
              {highlight}
            </span>
            <Sparkles className="-inset-y-6 -inset-x-4" count={4} />
            <svg
              aria-hidden
              viewBox="0 0 220 14"
              className="absolute -bottom-3 left-0 h-3 md:-bottom-4 md:h-4"
              style={{ width: underlineWidth }}
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
                d="M2 7 Q 55 2, 110 7 T 218 6"
                stroke="#e85d04"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg"
        >
          {description}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
