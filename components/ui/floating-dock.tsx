"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DockItem = {
  name: string;
  short?: string;
  gradient: string;
  textColor?: string;
  icon?: ReactNode;
};

type Props = {
  items: DockItem[];
  className?: string;
  baseSize?: number;
  maxSize?: number;
};

export function FloatingDock({
  items,
  className,
  baseSize = 48,
  maxSize = 80,
}: Props) {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "relative inline-flex items-center gap-3 rounded-3xl border border-foreground/[0.08] bg-white px-5 py-3 shadow-[0_24px_64px_-32px_rgba(28,24,21,0.22)]",
        className
      )}
      style={{ minHeight: maxSize + 24 }}
    >
      {items.map((item) => (
        <DockTile
          key={item.name}
          item={item}
          mouseX={mouseX}
          baseSize={baseSize}
          maxSize={maxSize}
        />
      ))}
    </motion.div>
  );
}

function DockTile({
  item,
  mouseX,
  baseSize,
  maxSize,
}: {
  item: DockItem;
  mouseX: MotionValue<number>;
  baseSize: number;
  maxSize: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return val - (rect.left + rect.width / 2);
  });

  const sizeRaw = useTransform(
    distance,
    [-160, 0, 160],
    [baseSize, maxSize, baseSize]
  );
  const size = useSpring(sizeRaw, { mass: 0.1, stiffness: 220, damping: 14 });

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width: size, height: size }}
      className="relative flex aspect-square shrink-0 items-center justify-center"
    >
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            className="pointer-events-none absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-[0_8px_24px_-8px_rgba(28,24,21,0.4)]"
          >
            {item.name}
            <span
              aria-hidden
              className="absolute left-1/2 top-full size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground"
            />
          </motion.span>
        )}
      </AnimatePresence>

      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[26%] shadow-[0_6px_20px_-6px_rgba(28,24,21,0.35),inset_0_1px_0_rgba(255,255,255,0.35)]"
        style={{
          background: item.gradient,
          color: item.textColor ?? "#ffffff",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[26%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.04) 100%)",
          }}
        />
        {item.icon ? (
          <div className="relative flex h-1/2 w-1/2 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
            {item.icon}
          </div>
        ) : (
          <span className="relative font-display text-[44%] font-bold leading-none tracking-tight">
            {item.short}
          </span>
        )}
      </div>
    </motion.div>
  );
}
