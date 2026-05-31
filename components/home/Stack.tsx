"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Code2,
  Database,
  Wrench,
  Compass,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/Section";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { skillGroups } from "@/lib/data/skills";

type Accent = {
  hex: string;
  hex2: string;
  text: string;
  icon: ReactNode;
  kicker: string;
  blurb: string;
};

const accents: Accent[] = [
  {
    hex: "#e85d04",
    hex2: "#f59e0b",
    text: "text-[#e85d04]",
    icon: <Code2 size={12} strokeWidth={2.4} />,
    kicker: "Interfaces",
    blurb: "Pixels, motion, and the parts users feel.",
  },
  {
    hex: "#db2777",
    hex2: "#fb923c",
    text: "text-[#db2777]",
    icon: <Database size={12} strokeWidth={2.4} />,
    kicker: "Plumbing",
    blurb: "APIs, sockets, auth — the moving parts.",
  },
  {
    hex: "#0891b2",
    hex2: "#4f46e5",
    text: "text-[#0891b2]",
    icon: <Wrench size={12} strokeWidth={2.4} />,
    kicker: "Workflow",
    blurb: "Code from machine to production.",
  },
  {
    hex: "#65a30d",
    hex2: "#f59e0b",
    text: "text-[#65a30d]",
    icon: <Compass size={12} strokeWidth={2.4} />,
    kicker: "Principles",
    blurb: "Habits, not just tools.",
  },
];

const tooltipMap: Record<string, string> = {
  "React.js": "Daily driver",
  "Next.js": "App Router lover",
  TypeScript: "Strict mode forever",
  JavaScript: "Where it all started",
  "Redux Toolkit": "State without tears",
  "RTK Query": "85% fewer API calls",
  "React Flow": "Visual workflow magic",
  "Tailwind CSS": "Utility-first life",
  Bootstrap: "Old reliable",
  "Material UI": "Year-one days",
  HTML: "The skeleton",
  CSS: "Still tricky sometimes",
  "Node.js": "Backend buddy",
  "REST APIs": "Bread & butter",
  WebSockets: "Real-time stuff",
  Firebase: "Side-project auth",
  MongoDB: "Flexible documents",
  Authentication: "Get it right",
  "Multi-tenancy": "Tenant-aware everything",
  Git: "Daily ritual",
  GitHub: "Public code",
  GitLab: "Some client repos",
  Docker: "Containerized peace",
  "CI/CD Pipelines": "Ship safely",
  Playwright: "E2E that I trust",
  "Playwright Automation": "Test the whole flow",
  "On-prem Deployment": "Enterprise reality",
  "Full-stack delivery": "End to end",
  "Code reviews": "Both giving & getting",
  Mentoring: "Pay it forward",
  "Performance optimization": "Measure first",
  "Scalable architecture": "Plan for growth",
  "Component-driven dev": "Atoms to apps",
  "E2E testing": "Catches the weird ones",
  "Agile delivery": "Ship small, often",
};

export function Stack() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="My toolkit"
        accent="orange"
        title="What I usually reach for."
        description="Four areas I keep returning to. Hover any chip for a bit of context."
      />

      <div
        className="grid gap-2 md:grid-cols-2 xl:grid-cols-4"
        onMouseLeave={() => setHovered(null)}
      >
        {skillGroups.map((group, gi) => {
          const a = accents[gi % accents.length];
          return (
            <div
              key={group.label}
              className="group relative block h-full w-full p-2"
              onMouseEnter={() => setHovered(gi)}
            >
              {/* Aceternity hover blob — shared layoutId glides between cards */}
              <AnimatePresence>
                {hovered === gi && (
                  <motion.span
                    layoutId="toolkit-hover"
                    className="absolute inset-0 block h-full w-full rounded-3xl"
                    style={{
                      background: `radial-gradient(120% 100% at 50% 0%, ${a.hex}1f, transparent 60%), linear-gradient(180deg, ${a.hex}14, ${a.hex2}0a)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  />
                )}
              </AnimatePresence>

              <ToolkitCard
                index={gi}
                label={group.label}
                items={group.items}
                accent={a}
                active={hovered === gi}
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function ToolkitCard({
  index,
  label,
  items,
  accent,
  active,
}: {
  index: number;
  label: string;
  items: string[];
  accent: Accent;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="relative z-10 h-full"
    >
      <div
        className="relative h-full overflow-hidden rounded-[22px] bg-white p-5 transition-all duration-300"
        style={{
          boxShadow: active
            ? `0 1px 0 rgba(255,255,255,0.8) inset, 0 22px 44px -22px rgba(28,24,21,0.22), 0 0 0 1px ${accent.hex}44`
            : `0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 32px -18px rgba(28,24,21,0.14), 0 0 0 1px rgba(28,24,21,0.08)`,
        }}
      >
        {/* Subtle dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 dot-pattern opacity-25"
          style={{
            maskImage:
              "radial-gradient(70% 50% at 50% 0%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(70% 50% at 50% 0%, black, transparent 80%)",
          }}
        />

        {/* Corner blur halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-[200px] rounded-full blur-3xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${accent.hex}, transparent 65%)`,
            opacity: active ? 0.22 : 0.1,
          }}
        />

        {/* Top hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 top-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent.hex}, transparent)`,
            opacity: active ? 1 : 0.55,
          }}
        />

        <div className="relative flex h-full flex-col">
          {/* Top row: icon + count badge */}
          <div className="flex items-center justify-between">
            <div
              className="grid size-9 place-items-center rounded-xl text-white shadow-sm transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${accent.hex}, ${accent.hex2})`,
                boxShadow: `0 6px 18px -6px ${accent.hex}66, inset 0 1px 0 rgba(255,255,255,0.3)`,
                transform: active ? "rotate(-6deg) scale(1.05)" : "rotate(0deg) scale(1)",
              }}
            >
              {accent.icon}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <Sparkles size={9} className={accent.text} />
              {items.length}
            </span>
          </div>

          {/* Kicker + title */}
          <div className="mt-4">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.28em]"
              style={{ color: accent.hex }}
            >
              {String(index + 1).padStart(2, "0")} · {accent.kicker}
            </span>
            <h3 className="mt-1 font-display text-[1.6rem] italic leading-[0.95] tracking-tight text-foreground">
              {label}.
            </h3>
            <p className="mt-1.5 text-[12px] leading-snug text-muted-foreground">
              {accent.blurb}
            </p>
          </div>

          {/* divider */}
          <div
            aria-hidden
            className="mb-3 mt-4 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(28,24,21,0.1), transparent)",
            }}
          />

          {/* Chips */}
          <ul className="flex flex-wrap gap-1.5">
            {items.map((item) => (
              <li key={item}>
                <AnimatedTooltip
                  label={item}
                  description={tooltipMap[item]}
                  accent={accent.hex}
                >
                  <span className="group/chip relative inline-flex cursor-default items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.025] px-2 py-0.5 text-[10.5px] font-medium text-foreground/80 transition-all duration-300 hover:border-foreground/20 hover:bg-white hover:text-foreground">
                    <span
                      aria-hidden
                      className="size-1 rounded-full transition-all duration-300 group-hover/chip:scale-[2]"
                      style={{
                        background: accent.hex,
                        boxShadow: `0 0 6px ${accent.hex}`,
                      }}
                    />
                    {item}
                  </span>
                </AnimatedTooltip>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="mt-auto flex items-end justify-between pt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground/70">
              shelf · {label.toLowerCase()}
            </span>
            <div
              aria-hidden
              className="grid size-7 place-items-center rounded-full border border-foreground/10 transition-all duration-300"
              style={{
                color: active ? "#ffffff" : accent.hex,
                background: active ? accent.hex : "rgba(255,255,255,0.6)",
              }}
            >
              <ArrowUpRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
