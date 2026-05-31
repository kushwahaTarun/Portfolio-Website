"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Sparkles as SparklesIcon,
  Filter,
  Workflow,
  MessageSquare,
  Mic,
  Bot,
  Blocks,
  Wrench,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { GradientOrbs } from "@/components/shared/GradientOrbs";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { Typewriter } from "@/components/ui/typewriter";
import { Sparkles } from "@/components/ui/sparkles";
import { TiltCard } from "@/components/ui/tilt-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { projects, type Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type FilterKey = "all" | "Day job" | "Side project";

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "Day job", label: "Day job" },
  { key: "Side project", label: "Side projects" },
];

const previewIcons: Record<string, React.ReactNode> = {
  "fluid-gpt-admin": <Bot size={28} strokeWidth={1.6} />,
  "agentic-workflow-editor": <Workflow size={28} strokeWidth={1.6} />,
  "fluid-chatbot-platform": <MessageSquare size={28} strokeWidth={1.6} />,
  "interactive-avatar": <Mic size={28} strokeWidth={1.6} />,
  "gen-ai-chat": <MessageSquare size={28} strokeWidth={1.6} />,
  "fluid-integrate-store": <Blocks size={28} strokeWidth={1.6} />,
};

const sizeSpan: Record<NonNullable<Project["size"]>, string> = {
  lg: "md:col-span-12 md:row-span-2",
  md: "md:col-span-6",
  sm: "md:col-span-4",
};

export function ProjectsContent() {
  const [active, setActive] = useState<FilterKey>("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.role === active)),
    [active]
  );

  const counts = useMemo(
    () => ({
      total: projects.length,
      day: projects.filter((p) => p.role === "Day job").length,
      side: projects.filter((p) => p.role === "Side project").length,
      years: new Set(projects.map((p) => p.year)).size,
    }),
    []
  );

  return (
    <>
      <ProjectsHero counts={counts} active={active} setActive={setActive} />

      <Section className="pb-24 pt-4 md:pb-32 md:pt-8">
        <AnimatePresence mode="popLayout">
          <div className="grid gap-5 md:grid-cols-12 md:auto-rows-[280px]">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="rounded-3xl border border-dashed border-foreground/15 bg-white/50 p-12 text-center text-sm text-muted-foreground">
            Nothing here yet. Check back soon.
          </div>
        )}

        <BottomCTA />
      </Section>
    </>
  );
}

function ProjectsHero({
  counts,
  active,
  setActive,
}: {
  counts: { total: number; day: number; side: number; years: number };
  active: FilterKey;
  setActive: (k: FilterKey) => void;
}) {
  return (
    <section className="relative overflow-hidden pt-20 pb-10 md:pt-28 md:pb-16">
      <GradientOrbs />

      {/* Animated subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-pattern mask-radial-fade opacity-50"
      />

      {/* Floating decorative shapes */}
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

      <div className="container-px relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
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
          / Projects
        </motion.span>

        <h1 className="mt-6 text-balance text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-[5.5rem]">
          <span className="block">
            <AnimatedText text="Things I've" />
          </span>
          <span className="relative mt-2 block md:mt-3">
            <span className="relative z-10 font-display italic gradient-text">
              <Typewriter
                words={[
                  "built.",
                  "shipped.",
                  "tinkered with.",
                  "obsessed over.",
                  "broken & fixed.",
                ]}
                typeSpeed={75}
                deleteSpeed={40}
                pause={1600}
              />
            </span>
            <Sparkles className="-inset-y-6 -inset-x-4" count={10} />
            <svg
              aria-hidden
              viewBox="0 0 220 14"
              className="absolute -bottom-3 left-0 h-3 w-[60%] md:-bottom-4 md:h-4"
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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A mix of work I do full-time and projects I keep open in a second
          editor window. Some are years old, some shipped last weekend — all
          of them taught me something I didn&apos;t know going in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <StatChip label="Total" value={counts.total} accent="--color-brand-orange" />
          <StatChip label="At work" value={counts.day} accent="--color-brand-indigo" />
          <StatChip label="After hours" value={counts.side} accent="--color-brand-lime" />
          <StatChip label="Years span" value={counts.years} accent="--color-brand-cyan" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <Filter size={11} /> filter
          </span>
          {filters.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={cn(
                  "relative rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/10 bg-white text-foreground/70 hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            );
          })}
        </motion.div>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}

function HeroFloatingCard({
  children,
  className,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn("overflow-hidden rounded-2xl", className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function HeroCollage() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const sideCount = projects.filter((p) => p.role === "Side project").length;
  const sideProjects = projects.filter((p) => p.role === "Side project");

  return (
    <div className="relative hidden h-[520px] w-full lg:block">
      {/* Top: featured project preview card */}
      <HeroFloatingCard
        className="absolute right-0 top-0 w-[300px] rotate-[3deg] paper"
        delay={0.4}
      >
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{ background: featured.accent }}
        />
        <div className="flex items-center gap-2 border-b border-foreground/[0.06] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <SparklesIcon size={11} className="text-[--color-brand-orange]" />
          Top of the deck
        </div>
        <div className="p-4">
          <div className="font-display text-2xl italic leading-tight text-foreground">
            {featured.title}
          </div>
          <p className="mt-2 text-xs leading-snug text-muted-foreground">
            {featured.tagline}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {featured.stack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-foreground/[0.05] px-2 py-0.5 text-[10px] font-medium text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </HeroFloatingCard>

      {/* Middle-left: big stat sticker */}
      <HeroFloatingCard
        className="absolute left-0 top-[180px] w-[220px] -rotate-[4deg] sticker"
        delay={0.6}
        style={{ background: "var(--color-brand-orange)" }}
      >
        <div className="relative p-4 text-white">
          <Sparkles className="inset-0" count={6} colors={["#ffffff"]} />
          <div className="text-[10px] uppercase tracking-[0.18em] opacity-80">
            Page loads dropped
          </div>
          <div className="mt-1 font-display text-5xl italic leading-none">
            80%
          </div>
          <div className="mt-2 text-[11px] opacity-85">
            after RTK Query + smarter cache
          </div>
        </div>
      </HeroFloatingCard>

      {/* Right-middle: years span paper card */}
      <HeroFloatingCard
        className="absolute right-6 top-[260px] w-[200px] rotate-[6deg] paper"
        delay={0.8}
      >
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Shipping since
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-5xl italic leading-none gradient-text-warm">
              2022
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            {[2022, 2023, 2024, 2025].map((y) => (
              <span
                key={y}
                className="h-1 flex-1 rounded-full bg-[--color-brand-orange]/30 first:bg-[--color-brand-orange] [&:nth-child(2)]:bg-[--color-brand-orange]/80 [&:nth-child(3)]:bg-[--color-brand-orange]/60"
              />
            ))}
          </div>
          <div className="mt-2 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            4 years · still shipping
          </div>
        </div>
      </HeroFloatingCard>

      {/* Bottom-left: side projects mini list */}
      <HeroFloatingCard
        className="absolute left-4 top-[400px] w-[240px] -rotate-[2deg] paper"
        delay={1.0}
      >
        <div className="p-4">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Built after hours</span>
            <span className="rounded-full bg-[--color-brand-lime]/15 px-1.5 py-0.5 font-mono text-[9px] text-[#3f6212]">
              {sideCount}
            </span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {sideProjects.slice(0, 3).map((p) => (
              <li key={p.slug} className="flex items-center gap-2">
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ background: p.accent }}
                />
                <span className="truncate text-xs text-foreground/80">
                  {p.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </HeroFloatingCard>

      {/* Drifting decorative confetti */}
      <motion.div
        aria-hidden
        className="absolute right-[40%] top-[80px] size-1.5 rounded-full bg-[--color-brand-pink]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[60%] top-[150px] size-2 rotate-45 bg-[--color-brand-cyan]"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[10%] top-[440px] size-2 rounded-sm bg-[--color-brand-lime]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-white px-3.5 py-1.5 sticker">
      <span
        className="size-2 rounded-full"
        style={{ background: `var(${accent})` }}
      />
      <span className="font-display text-lg italic leading-none text-foreground tabular-nums">
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const size = project.size ?? "md";
  const span = sizeSpan[size];
  const isLg = size === "lg";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      transition={{
        delay: Math.min(index * 0.06, 0.32),
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(span, "group relative")}
    >
      <TiltCard className="h-full" max={isLg ? 4 : 6}>
        {isLg ? (
          <FeaturedCard project={project} index={index} />
        ) : (
          <CompactCard project={project} index={index} />
        )}
      </TiltCard>
    </motion.div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <CardShell project={project}>
      <div className="relative grid h-full grid-cols-1 gap-8 p-7 md:grid-cols-[1.05fr_1fr] md:p-9 lg:gap-12 lg:p-12">
        {/* Left: copy */}
        <div className="relative flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: project.accent }}
                />
                {project.year} · {project.role}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                {indexLabel} / featured
              </span>
            </div>
            <h3 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="mt-3 font-display text-lg italic text-muted-foreground md:text-xl">
              {project.tagline}
            </p>
            <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground/90 md:text-base">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-foreground/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.href ? (
              <MagneticButton>
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  <ExternalLink size={14} />
                  Live preview
                </Link>
              </MagneticButton>
            ) : (
              <span className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-dashed border-foreground/20 px-5 text-sm font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[--color-brand-orange]" />
                Internal product
              </span>
            )}
            {project.repo && (
              <Link
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-foreground bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <Github size={14} />
                Source
              </Link>
            )}
          </div>
        </div>

        {/* Right: preview */}
        <div className="relative hidden md:block">
          <ProjectPreview project={project} />
        </div>
      </div>
    </CardShell>
  );
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  const indexLabel = String(index + 1).padStart(2, "0");
  const Icon = previewIcons[project.slug];

  return (
    <CardShell project={project}>
      <div className="relative flex h-full flex-col p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span
              className="size-1.5 rounded-full"
              style={{ background: project.accent }}
            />
            {project.year} · {project.role}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            {indexLabel}
          </span>
        </div>

        {/* Title row with icon orb */}
        <div className="mt-4 flex items-start gap-3.5">
          <div
            className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-foreground/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_18px_-8px_rgba(28,24,21,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-3deg]"
            style={{
              background: `linear-gradient(135deg, ${project.accent} 0%, ${project.accent}aa 100%)`,
            }}
          >
            {Icon ?? <Wrench size={20} strokeWidth={1.6} />}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-balance text-xl font-semibold leading-tight tracking-tight md:text-[1.4rem]">
              <span className="bg-gradient-to-r from-foreground to-foreground bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {project.title}
              </span>
            </h3>
            <p className="mt-0.5 font-display text-sm italic text-muted-foreground md:text-[15px]">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Mini preview that fills available space */}
        <div className="relative mt-4 min-h-[120px] flex-1 overflow-hidden rounded-2xl border border-foreground/[0.06] bg-[--color-muted]/30">
          <CompactPreview project={project} />
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/70"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-full px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
          {(project.href || project.repo) && (
            <Link
              href={project.href ?? project.repo ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-foreground/10 bg-white text-foreground/70 transition-all duration-300 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background"
            >
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          )}
        </div>
      </div>
    </CardShell>
  );
}

function CompactPreview({ project }: { project: Project }) {
  switch (project.slug) {
    case "agentic-workflow-editor":
      return <MiniWorkflow accent={project.accent} />;
    case "fluid-chatbot-platform":
      return <MiniChatbot accent={project.accent} />;
    case "interactive-avatar":
      return <MiniAvatar accent={project.accent} />;
    case "gen-ai-chat":
      return <MiniGenAI accent={project.accent} />;
    case "fluid-integrate-store":
      return <MiniIntegrations accent={project.accent} />;
    default:
      return <MiniGeneric project={project} />;
  }
}

function MiniWorkflow({ accent }: { accent: string }) {
  return (
    <div className="relative grid h-full place-items-center">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, ${accent}1f 0%, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 320 140"
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d="M 50 40 C 90 40, 90 70, 130 70"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
        <motion.path
          d="M 50 100 C 90 100, 90 70, 130 70"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        />
        <motion.path
          d="M 190 70 C 220 70, 220 70, 260 70"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        {[
          { x: 10, y: 22, label: "in" },
          { x: 10, y: 82, label: "filter" },
          { x: 130, y: 52, label: "llm" },
          { x: 260, y: 52, label: "out" },
        ].map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={50}
              height={36}
              rx={8}
              fill="white"
              stroke="rgba(28,24,21,0.12)"
            />
            <circle cx={n.x + 10} cy={n.y + 18} r={3.5} fill={accent} />
            <text
              x={n.x + 18}
              y={n.y + 22}
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fill="rgba(28,24,21,0.7)"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function MiniChatbot({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full flex-col justify-end gap-1.5 p-3">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${accent}10 100%)`,
        }}
      />
      <div className="relative max-w-[78%] rounded-2xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10px] text-foreground/80 shadow-[0_2px_8px_-4px_rgba(28,24,21,0.1)]">
        Hi, can I get a refund for #45891?
      </div>
      <div
        className="relative ml-auto max-w-[78%] rounded-2xl rounded-tr-sm px-2.5 py-1.5 text-[10px] text-white"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        }}
      >
        Sure — pulling that up for you now.
      </div>
      <div className="relative flex items-center gap-1.5 pl-1">
        <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-[0_2px_6px_-3px_rgba(28,24,21,0.15)]">
          <span
            className="size-1.5 rounded-full"
            style={{ background: accent }}
          />
          <span className="font-mono text-[8px] uppercase tracking-wider text-foreground/70">
            video on
          </span>
        </div>
      </div>
    </div>
  );
}

function MiniAvatar({ accent }: { accent: string }) {
  return (
    <div className="relative grid h-full place-items-center">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accent}22 0%, transparent 60%)`,
        }}
      />
      <div className="relative flex flex-col items-center gap-3">
        <div
          className="relative size-16 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${accent}, ${accent}55, ${accent})`,
          }}
        >
          <div className="absolute inset-1.5 rounded-full bg-white grid place-items-center">
            <div
              className="size-7 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${accent}77)`,
              }}
            />
          </div>
          <motion.span
            className="absolute -inset-2 rounded-full border border-dashed"
            style={{ borderColor: `${accent}55` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flex items-center gap-1">
          {[0.4, 0.9, 0.6, 1, 0.7, 0.5, 0.85].map((h, i) => (
            <motion.span
              key={i}
              className="block w-[3px] rounded-full"
              style={{ background: accent, height: 18 }}
              animate={{ scaleY: [h, h * 0.35, h] }}
              transition={{
                duration: 1.2 + i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniGenAI({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full flex-col justify-between gap-2 p-3">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${accent}10 100%)`,
        }}
      />
      <div className="relative space-y-1.5">
        <div
          className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm px-2.5 py-1.5 text-[10px] text-white"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
          }}
        >
          What did I miss today?
        </div>
        <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[10px] text-foreground/80 shadow-[0_2px_8px_-4px_rgba(28,24,21,0.1)]">
          3 PRs merged, 1 deploy, a coffee.
        </div>
      </div>
      <div className="relative flex items-center gap-2 rounded-full border border-foreground/[0.08] bg-white px-3 py-1.5 shadow-[0_2px_8px_-4px_rgba(28,24,21,0.1)]">
        <div className="size-1.5 rounded-full bg-foreground/30" />
        <div className="h-1.5 flex-1 rounded-full bg-foreground/[0.06]" />
        <div
          className="grid size-6 place-items-center rounded-full text-white"
          style={{ background: accent }}
        >
          <Mic size={11} />
        </div>
      </div>
    </div>
  );
}

function MiniIntegrations({ accent }: { accent: string }) {
  const tiles = [
    { color: "#0891b2", letter: "S" },
    { color: "#84cc16", letter: "G" },
    { color: "#db2777", letter: "F" },
    { color: "#4f46e5", letter: "N" },
    { color: "#f59e0b", letter: "Z" },
    { color: "#0ea5e9", letter: "T" },
  ];
  return (
    <div className="relative h-full p-3">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(140% 100% at 100% 0%, ${accent}18 0%, transparent 60%)`,
        }}
      />
      <div className="relative grid h-full grid-cols-3 gap-2">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="grid place-items-center rounded-lg border border-foreground/[0.06] bg-white text-[10px] font-semibold text-white"
          >
            <div
              className="grid size-7 place-items-center rounded-md"
              style={{
                background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`,
              }}
            >
              {t.letter}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function MiniGeneric({ project }: { project: Project }) {
  const monogram = project.title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="relative grid h-full place-items-center"
      style={{
        background: `linear-gradient(140deg, ${project.accent}1f 0%, transparent 70%), radial-gradient(circle at 30% 20%, ${project.accent}18, transparent 60%)`,
      }}
    >
      <div
        className="grid size-16 place-items-center rounded-2xl text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_18px_40px_-16px_rgba(28,24,21,0.4)]"
        style={{
          background: `linear-gradient(135deg, ${project.accent} 0%, ${project.accent}cc 100%)`,
        }}
      >
        <span className="font-display text-2xl italic">{monogram}</span>
      </div>
    </div>
  );
}

function CardShell({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-foreground/[0.08] bg-white transition-shadow duration-300 hover:shadow-[0_28px_64px_-20px_rgba(28,24,21,0.22)]"
      style={{ boxShadow: `inset 0 -3px 0 ${project.accent}` }}
    >
      {/* Top color strip */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-1.5"
        style={{ background: project.accent }}
      />

      {/* Decorative tint corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[320px] rounded-full opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.22]"
        style={{
          background: `radial-gradient(circle, ${project.accent}, transparent 60%)`,
        }}
      />

      {/* Hover spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(540px circle at 80% 0%, ${project.accent}22, transparent 60%)`,
        }}
      />

      {/* Hover-only animated border beam */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <BorderBeam
          colorFrom={project.accent}
          colorTo="#4f46e5"
          duration={6}
          size={180}
          borderRadius={24}
        />
      </span>

      {children}
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const url = `tarun.dev/${project.slug}`;

  return (
    <div className="relative h-full">
      {/* Big background accent orb */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-90"
        style={{
          background: `radial-gradient(120% 80% at 70% 20%, ${project.accent}55 0%, transparent 60%), linear-gradient(160deg, ${project.accent}18 0%, transparent 100%)`,
        }}
      />

      <BrowserFrame
        url={url}
        className="relative h-full border-foreground/[0.1] backdrop-blur-sm"
        bodyClassName="h-[calc(100%-32px)] min-h-[260px]"
      >
        <PreviewBody project={project} />
      </BrowserFrame>

      {/* Decorative floating sticker */}
      <motion.div
        className="absolute -bottom-4 -right-3 z-10 rotate-[6deg] rounded-xl border border-foreground/10 bg-white px-3 py-1.5 sticker"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ background: project.accent }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/80">
            shipped
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function PreviewBody({ project }: { project: Project }) {
  if (project.slug === "fluid-gpt-admin") return <ChatPreview project={project} />;
  if (project.slug === "agentic-workflow-editor")
    return <WorkflowPreview project={project} />;
  return <GenericPreview project={project} />;
}

function ChatPreview({ project }: { project: Project }) {
  return (
    <div className="relative grid h-full grid-cols-[80px_1fr] gap-0 bg-[--color-muted]/40">
      {/* Sidebar */}
      <div className="flex flex-col gap-2 border-r border-foreground/[0.06] bg-white p-3">
        <div
          className="size-8 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${project.accent}, ${project.accent}88)`,
          }}
        />
        {[0.7, 0.5, 0.6, 0.4].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full bg-foreground/[0.08]"
            style={{ width: `${w * 100}%` }}
          />
        ))}
      </div>

      {/* Chat area */}
      <div className="relative flex flex-col gap-2.5 p-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[11px] text-foreground/80 shadow-[0_2px_8px_-4px_rgba(28,24,21,0.1)]"
        >
          How do I configure the new pipeline?
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-2 text-[11px] text-white"
          style={{
            background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
          }}
        >
          Open Settings → Pipelines and click <em>New flow</em>…
        </motion.div>
        <div className="flex items-center gap-1 pl-1 text-foreground/40">
          <motion.span
            className="block size-1.5 rounded-full bg-foreground/40"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.span
            className="block size-1.5 rounded-full bg-foreground/40"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="block size-1.5 rounded-full bg-foreground/40"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

function WorkflowPreview({ project }: { project: Project }) {
  return (
    <div className="relative grid h-full place-items-center bg-[--color-muted]/40">
      <svg
        viewBox="0 0 360 220"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* edges */}
        <motion.path
          d="M 75 60 C 130 60, 130 110, 185 110"
          stroke={project.accent}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M 75 160 C 130 160, 130 110, 185 110"
          stroke={project.accent}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.path
          d="M 245 110 C 280 110, 280 110, 315 110"
          stroke={project.accent}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        {/* nodes */}
        {[
          { x: 25, y: 40, label: "Trigger" },
          { x: 25, y: 140, label: "Filter" },
          { x: 185, y: 90, label: "LLM" },
          { x: 295, y: 90, label: "Output" },
        ].map((n, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={60}
              height={40}
              rx={10}
              fill="white"
              stroke="rgba(28,24,21,0.12)"
            />
            <circle cx={n.x + 12} cy={n.y + 20} r={4} fill={project.accent} />
            <text
              x={n.x + 22}
              y={n.y + 24}
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fill="rgba(28,24,21,0.7)"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function GenericPreview({ project }: { project: Project }) {
  const Icon = previewIcons[project.slug];
  const monogram = project.title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className="relative grid h-full place-items-center"
      style={{
        background: `linear-gradient(140deg, ${project.accent}28 0%, transparent 70%), radial-gradient(circle at 30% 20%, ${project.accent}1f, transparent 60%)`,
      }}
    >
      <div className="relative">
        <div
          className="grid size-24 place-items-center rounded-3xl text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_18px_40px_-16px_rgba(28,24,21,0.4)]"
          style={{
            background: `linear-gradient(135deg, ${project.accent} 0%, ${project.accent}cc 100%)`,
          }}
        >
          {Icon ?? (
            <span className="font-display text-3xl italic">{monogram}</span>
          )}
        </div>
        <Sparkles className="-inset-6" count={6} colors={["#ffffff", project.accent]} />
      </div>

      {/* floating mini stickers */}
      <div className="absolute left-4 top-4 rotate-[-6deg] rounded-lg border border-foreground/10 bg-white px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-foreground/70 sticker">
        v{project.year - 2020}
      </div>
      <div className="absolute bottom-4 right-4 rotate-[5deg] rounded-lg border border-foreground/10 bg-white px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-foreground/70 sticker">
        {project.role}
      </div>
    </div>
  );
}

function BottomCTA() {
  return (
    <div className="mt-16 overflow-hidden rounded-3xl border border-foreground/[0.08] bg-white p-8 md:p-12">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <SparklesIcon size={11} className="text-[--color-brand-orange]" />
            More on the way
          </div>
          <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Got something you&apos;d like to{" "}
            <span className="gradient-text font-display italic">build together</span>?
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            I&apos;m always up for an interesting build — drop a note and
            let&apos;s talk shape.
          </p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Start a conversation
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
