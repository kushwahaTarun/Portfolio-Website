"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Pricing" | "Process" | "Tech" | "Logistics";

type Faq = {
  q: string;
  a: string;
  category: Category;
};

const faqs: Faq[] = [
  {
    category: "Logistics",
    q: "Do you work with clients outside India?",
    a: "Yes — most of my freelance is async. I cover early-morning and late-evening IST windows for sync calls, which overlaps cleanly with both US and Europe.",
  },
  {
    category: "Logistics",
    q: "How fast can you start?",
    a: "Usually 1–2 weeks notice. Audits can sometimes start sooner; bigger builds get scheduled into the next available block.",
  },
  {
    category: "Logistics",
    q: "Evenings and weekends?",
    a: "Yes — that's exactly when freelance happens. My day job at Fluid AI runs business hours IST; freelance fills evenings and weekends with no conflict.",
  },
  {
    category: "Process",
    q: "Will you sign an NDA?",
    a: "Standard mutual NDA — happy to. Send it over with your first message and I'll sign before our intro call.",
  },
  {
    category: "Tech",
    q: "What's your stack — front-end only or full-stack?",
    a: "Full-stack JavaScript / TypeScript is the sweet spot: Next.js + React on the front, Node / API routes / Express on the back, MongoDB / Firebase / Supabase for data, WebSockets for real-time, Docker + CI/CD for deploy. I skip PHP, WordPress, Shopify themes, native iOS / Android, and pure visual design.",
  },
  {
    category: "Pricing",
    q: "Do you take retainers?",
    a: "Not right now — I lead with fixed-scope projects. If a build goes well we can talk about an ongoing arrangement afterwards.",
  },
  {
    category: "Pricing",
    q: "What's pricing like?",
    a: "Rates on request. Send your scope through the form and I'll send a written estimate within 2–3 working days.",
  },
  {
    category: "Process",
    q: "Can you take on a 2-week scope?",
    a: "Yes — audits are designed exactly for that window. Smaller builds and unblocks fit too.",
  },
];

const categoryStyle: Record<Category, { dot: string; text: string }> = {
  Pricing: { dot: "bg-[--color-brand-orange]", text: "text-[--color-brand-orange]" },
  Process: { dot: "bg-[--color-brand-indigo]", text: "text-[--color-brand-indigo]" },
  Tech: { dot: "bg-[--color-brand-cyan]", text: "text-[--color-brand-cyan]" },
  Logistics: { dot: "bg-[--color-brand-pink]", text: "text-[--color-brand-pink]" },
};

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="relative mx-auto max-w-3xl">
      {/* Floating decorative sparkle in the gutter */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -left-3 -top-8 hidden text-[--color-brand-orange]/60 md:block"
      >
        <Sparkles size={20} fill="currentColor" strokeWidth={1.6} />
      </motion.span>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <FaqRow
            key={item.q}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: Faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const cat = categoryStyle[item.category];

  function handleMouseMove(e: React.MouseEvent) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-white paper transition-colors duration-300",
        isOpen
          ? "border-[--color-brand-orange]/35 shadow-[0_18px_40px_-20px_rgba(232,93,4,0.25)]"
          : "border-foreground/[0.08] hover:border-foreground/20"
      )}
    >
      {/* Left accent rail when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.span
            aria-hidden
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-3 left-0 w-[2px] origin-top rounded-full bg-gradient-to-b from-[--color-brand-orange] via-[--color-brand-orange]/70 to-transparent"
          />
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        onClick={onToggle}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouse(null)}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${index}`}
        id={`faq-trigger-${index}`}
        className="relative flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left md:gap-6 md:px-7 md:py-6"
      >
        {/* Mouse-tracking radial glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: mouse
              ? `radial-gradient(360px circle at ${mouse.x}px ${mouse.y}px, rgba(232,93,4,0.10), transparent 55%)`
              : undefined,
          }}
        />

        {/* Number badge */}
        <span
          className={cn(
            "relative shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] tabular-nums transition-colors duration-300 md:text-xs",
            isOpen ? "text-[--color-brand-orange]" : "text-muted-foreground/70 group-hover:text-foreground"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question + category */}
        <span className="relative flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="text-pretty text-[15px] font-medium leading-snug tracking-tight text-foreground md:text-[17px]">
            {item.q}
          </span>
          <span className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", cat.dot)} />
            <span
              className={cn(
                "font-mono text-[9px] uppercase tracking-[0.22em] transition-opacity",
                cat.text,
                "opacity-70"
              )}
            >
              {item.category}
            </span>
          </span>
        </span>

        {/* Animated plus → cross */}
        <motion.span
          animate={{
            rotate: isOpen ? 135 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300",
            isOpen
              ? "border-transparent bg-[--color-brand-orange] text-white shadow-[0_8px_20px_-6px_rgba(232,93,4,0.5)]"
              : "border-foreground/10 bg-white text-foreground/70 group-hover:border-foreground/30 group-hover:text-foreground"
          )}
        >
          <Plus size={15} strokeWidth={2.4} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 md:px-7 md:pb-7">
              {/* Hairline divider with brand fade */}
              <div
                aria-hidden
                className="mb-5 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(232,93,4,0.35), rgba(28,24,21,0.08) 45%, transparent)",
                }}
              />
              <motion.p
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-pretty text-[14px] leading-relaxed text-muted-foreground md:text-[15px]"
              >
                {item.a}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
