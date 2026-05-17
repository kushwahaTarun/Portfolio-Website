"use client";

import { motion } from "framer-motion";
import { Music2, Sparkles, BookOpenText, Cpu } from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/Section";

const blocks = [
  {
    icon: Cpu,
    label: "Building",
    title: "Interactive Avatar",
    body: "A real-time AI face I can talk to. Next.js + HeyGen Streaming SDK.",
    bg: "bg-[--color-brand-orange]",
    text: "text-white",
    rotate: "lg:-rotate-1",
  },
  {
    icon: Sparkles,
    label: "Learning",
    title: "Next.js 16 patterns",
    body: "Cache Components, PPR, and pretending I understand Server Components.",
    bg: "bg-white",
    text: "text-foreground",
    rotate: "lg:rotate-1",
  },
  {
    icon: BookOpenText,
    label: "Reading",
    title: "Refactoring UI",
    body: "Re-reading it. Still my favourite frontend design book.",
    bg: "bg-[--color-brand-indigo]",
    text: "text-white",
    rotate: "lg:-rotate-1",
  },
  {
    icon: Music2,
    label: "On loop",
    title: "Hindi indie + lo-fi",
    body: "Headphones on. Anuv Jain on one tab, lo-fi beats on the other.",
    bg: "bg-[--color-brand-lime]",
    text: "text-foreground",
    rotate: "lg:rotate-1",
  },
];

export function Currently() {
  return (
    <Section id="currently">
      <SectionHeading
        eyebrow="This month"
        accent="pink"
        title="What I'm currently into."
        description="A snapshot — refreshed whenever life or work changes lanes."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {blocks.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={`group rounded-3xl border border-foreground/[0.08] p-6 transition-transform hover:-translate-y-1 sticker ${b.bg} ${b.text} ${b.rotate}`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10">
              <b.icon size={18} />
            </div>
            <div className="mt-5 text-[10px] uppercase tracking-[0.18em] opacity-70">
              {b.label}
            </div>
            <h3 className="mt-1 font-display text-2xl italic leading-tight">
              {b.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed opacity-80">{b.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
