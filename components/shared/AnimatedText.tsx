"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function AnimatedText({ text, className, delay = 0, stagger = 0.04 }: Props) {
  const words = text.split(" ");

  return (
    <span
      className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}
      aria-label={text}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex overflow-hidden pb-[0.1em]">
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              aria-hidden
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + (wIdx * 0.06 + cIdx * stagger),
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
