"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  MapPin,
  Coffee,
  Code2,
  Headphones,
  Sparkles as SparkleIcon,
  Quote,
  Music2,
  Command,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/shared/Section";
import { TiltCard } from "@/components/ui/tilt-card";
import { Sparkles } from "@/components/ui/sparkles";

const stats = [
  { value: 4, suffix: "+", label: "Years of React", accent: "#e85d04" },
  { value: 50, suffix: "+", label: "Tenants shipped", accent: "#0891b2" },
  { value: 12, suffix: "", label: "Side projects", accent: "#db2777" },
];

const facts = [
  { label: "Based in", value: "Kanpur, India", icon: MapPin, color: "text-[--color-brand-orange]" },
  { label: "Writing React", value: "since 2022", icon: Code2, color: "text-[--color-brand-cyan]" },
  { label: "Fuel", value: "Chai · lo-fi", icon: Coffee, color: "text-[--color-brand-pink]" },
  { label: "Vibe", value: "Headphones on", icon: Headphones, color: "text-[--color-brand-indigo]" },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        {/* ----- LEFT: premium prose ----- */}
        <div className="relative">
          {/* Decorative blur behind */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-12 -z-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(232,93,4,0.15),transparent_70%)]"
          />
          {/* Decorative dot grid top-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-2 top-4 -z-10 hidden h-28 w-28 dot-pattern opacity-60 [mask-image:radial-gradient(circle,black,transparent_70%)] md:block"
          />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-foreground sticker"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-brand-orange] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[--color-brand-orange]" />
            </span>
            <SparkleIcon size={12} className="text-[--color-brand-orange]" />
            A bit about me
          </motion.div>

          {/* Headline with animated underline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]"
          >
            Frontend by day,{" "}
            <span className="relative inline-block">
              <span className="font-display italic text-[--color-brand-orange]">
                side-projects
              </span>
              <svg
                aria-hidden
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-2 w-full"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
                  d="M2 5 Q 50 1, 100 5 T 198 4"
                  stroke="#e85d04"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              {/* tiny floating star */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 220 }}
                className="absolute -right-5 -top-3 text-[--color-brand-orange]"
              >
                <SparkleIcon size={18} fill="currentColor" />
              </motion.span>
            </span>{" "}
            by night.
          </motion.h2>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 grid grid-cols-3 gap-3"
          >
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} accent={s.accent} index={i} />
            ))}
          </motion.div>

          {/* "Now playing" widget */}
          <NowPlaying />

          {/* Prose */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            <p className="relative pl-5">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-px bg-gradient-to-b from-[--color-brand-orange]/60 via-foreground/10 to-transparent"
              />
              I&apos;m Tarun. I&apos;ve been writing React for about four years —
              long enough to have strong opinions about{" "}
              <Highlight>folder structure</Highlight>, short enough that every new
              Next.js release still feels exciting.
            </p>
            <p className="relative pl-5">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 h-[calc(100%-12px)] w-px bg-gradient-to-b from-[--color-brand-indigo]/60 via-foreground/10 to-transparent"
              />
              These days I work on a platform that lets enterprises run their own
              AI assistants. The kind of app where one bad render costs
              someone&apos;s afternoon, so I&apos;ve learned to care about{" "}
              <Highlight>caching</Highlight>, <Highlight>re-renders</Highlight>,
              and the small decisions that compound across a hundred screens.
            </p>
          </motion.div>

          {/* Pull quote with washi tape */}
          <motion.blockquote
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="paper relative mt-10 rounded-2xl border-l-[3px] border-[--color-brand-orange] px-6 py-5 pr-5"
          >
            {/* washi tape strips */}
            <span
              aria-hidden
              className="absolute -top-2 left-8 h-4 w-16 -rotate-6 rounded-[2px] bg-[--color-brand-yellow]/55 shadow-sm"
            />
            <span
              aria-hidden
              className="absolute -top-2 right-8 h-4 w-12 rotate-3 rounded-[2px] bg-[--color-brand-cyan]/40 shadow-sm"
            />
            <Quote
              size={18}
              className="absolute -left-[12px] top-5 rounded-full bg-[--color-brand-orange] p-1 text-white shadow-[0_4px_12px_-4px_rgba(232,93,4,0.55)]"
              fill="currentColor"
            />
            <p className="font-display text-xl italic leading-snug text-foreground md:text-2xl">
              The web still feels like a playground if you let it.
            </p>
          </motion.blockquote>

          {/* Final paragraph with branded project tags */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            On the side I build with whatever new AI SDK looks interesting —
            recently a{" "}
            <ProjectTag color="#e85d04">Interactive Avatar</ProjectTag>{" "}
            with HeyGen, and a{" "}
            <ProjectTag color="#4f46e5">Gen-AI Chat</ProjectTag> with voice in and
            out.
          </motion.p>

          {/* Signature row with shortcut hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-14 bg-foreground/20" />
              <span className="font-display text-lg italic text-foreground">
                — Tarun
              </span>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <span className="inline-flex items-center gap-1 rounded-md border border-foreground/15 bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                <Command size={10} />K
              </span>
              <span>say hello</span>
            </a>
          </motion.div>
        </div>

        {/* ----- RIGHT: avatar card + quick facts (unchanged) ----- */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="-rotate-2"
          >
            <TiltCard className="paper overflow-hidden rounded-3xl" max={10}>
              <div className="relative aspect-[17/18] w-full overflow-hidden bg-gradient-to-br from-[--color-brand-orange] via-[--color-brand-pink] to-[--color-brand-indigo]">
                <Image
                  src="/images/tarun_avatar.png"
                  alt="Tarun Kushwaha — illustrated avatar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                  className="object-cover object-[center_25%]"
                />
                {/* warm brand overlay — gives image cohesion with site palette */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[--color-brand-orange]/15 via-transparent to-[--color-brand-indigo]/20 mix-blend-soft-light"
                />
                {/* subtle top vignette for status pill legibility */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent"
                />
                <Sparkles className="inset-0" count={3} colors={["#ffffff"]} />
                <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground sticker">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-brand-lime] opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[--color-brand-lime]" />
                  </span>
                  Available
                </div>
                {/* tiny decorative sparkle */}
                <SparkleIcon
                  size={16}
                  className="absolute right-5 top-6 z-10 text-white/90 drop-shadow"
                  fill="currentColor"
                />
              </div>
              <div className="border-t border-foreground/[0.06] bg-white p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <div className="font-display text-2xl italic text-foreground">
                      Tarun Kushwaha
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Senior React &amp; Next.js Developer
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Years
                    </div>
                    <div className="font-display text-2xl italic text-[--color-brand-orange]">
                      4+
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-foreground/[0.08] bg-white p-4 transition-transform hover:-translate-y-0.5"
              >
                <f.icon size={16} className={f.color} />
                <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </div>
                <div className="mt-0.5 text-sm font-medium text-foreground">
                  {f.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/** Stat card with count-up animation when in view. */
function StatCard({
  value,
  suffix,
  label,
  accent,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  accent: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1200, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    return () => unsub();
  }, [rounded]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-foreground/[0.08] bg-white p-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full opacity-25 transition-opacity duration-300 group-hover:opacity-50"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 60%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
      />
      <div className="font-display text-3xl italic leading-none text-foreground tabular-nums md:text-4xl">
        {display}
        <span style={{ color: accent }}>{suffix}</span>
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-[9px] font-mono text-foreground/30">0{index + 1}</div>
    </motion.div>
  );
}

/** Spotify-style "Now playing" mini widget. */
function NowPlaying() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-6 flex items-center gap-3 rounded-2xl border border-foreground/[0.08] bg-white px-4 py-3"
    >
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[--color-brand-lime] to-[--color-brand-cyan] text-white">
        <Music2 size={16} />
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-[--color-brand-lime]" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Now playing
          </div>
          <div className="truncate text-sm font-medium text-foreground">
            lo-fi beats · focus mix
          </div>
        </div>
        {/* equalizer bars */}
        <div className="flex h-5 items-end gap-[3px]">
          {[0.4, 0.9, 0.6, 1, 0.7].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-sm bg-[--color-brand-orange]"
              animate={{ scaleY: [h, h * 0.4, h] }}
              style={{ height: "100%", transformOrigin: "bottom" }}
              transition={{
                duration: 0.9 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.08,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/** Highlighter-style marker behind a word/phrase. */
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap font-semibold text-foreground">
      <span
        aria-hidden
        className="absolute inset-x-[-3px] bottom-[1px] -z-10 h-[55%] rounded-sm"
        style={{
          background:
            "linear-gradient(180deg, rgba(232,93,4,0.0) 0%, rgba(232,93,4,0.28) 100%)",
        }}
      />
      {children}
    </span>
  );
}

/** Branded inline project chip. */
function ProjectTag({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm font-semibold align-baseline"
      style={{
        borderColor: `${color}55`,
        background: `${color}12`,
        color,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: color }}
      />
      {children}
    </span>
  );
}
