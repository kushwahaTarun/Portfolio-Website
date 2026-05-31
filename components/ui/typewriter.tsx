"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
};

export function Typewriter({
  words,
  className,
  cursorClassName,
  typeSpeed = 70,
  deleteSpeed = 38,
  pause = 1400,
}: Props) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Hold latest words in a ref so a fresh array reference from the parent
  // doesn't reset the effect mid-cycle.
  const wordsRef = useRef(words);
  const wordsKey = words.join("");

  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    const list = wordsRef.current;
    const word = list[index] ?? "";

    // Finished typing the word — pause, then start deleting
    if (!deleting && sub === word.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    // Finished deleting — advance to next word on the next tick to avoid
    // cascading renders within the same effect body.
    if (deleting && sub === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % list.length);
      }, 0);
      return () => clearTimeout(t);
    }

    // Type or delete one character
    const t = setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, wordsKey, typeSpeed, deleteSpeed, pause]);

  const visible = words[index]?.substring(0, sub) ?? "";

  return (
    <span className={cn("inline-block whitespace-nowrap leading-[1.1]", className)}>
      {/*
        Render a non-breaking space when the word is empty so the line-height
        of the inline box stays constant. Without this, the line collapses
        between cycles and the layout jumps.
      */}
      <span>{visible || " "}</span>
      <span
        aria-hidden
        className={cn(
          "ml-1 inline-block h-[0.8em] w-[3px] -translate-y-[1px] rounded-sm bg-[--color-brand-orange] align-baseline animate-blink",
          cursorClassName
        )}
      />
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
