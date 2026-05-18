"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/shared/Section";
import { experiences, type Experience as Role } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  const [active, setActive] = useState(0);
  const role = experiences[active];
  const total = experiences.length;

  return (
    <Section id="experience" className="relative">
      <SectionHeading
        eyebrow="Path so far"
        accent="orange"
        title="A short version of the journey."
        description="Four years at one company, three different roles, a lot of late nights."
      />

      <div className="relative">
        <div className="paper relative overflow-hidden rounded-[28px] border border-foreground/[0.08] bg-white shadow-[0_30px_80px_-30px_rgba(28,24,21,0.18)]">
          {/* Static dot grid backdrop */}
          <ConsoleBackdrop />

          {/* Window chrome header */}
          <ConsoleHeader />

          {/* Main grid */}
          <div className="relative grid gap-0 px-6 pb-6 pt-2 md:px-10 md:pb-10 md:pt-4 lg:grid-cols-[260px_1fr_240px]">
            <RoleTabs roles={experiences} active={active} onChange={setActive} />
            <RoleStage role={role} active={active} />
            <RoleStats role={role} active={active} total={total} />
          </div>

          <Highlights role={role} active={active} />
          <ConsoleFooter />
          <CornerBrackets />
        </div>
      </div>
    </Section>
  );
}

/* ───────── Console chrome ───────── */

function ConsoleBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-pattern opacity-[0.5]"
        style={{
          maskImage:
            "radial-gradient(80% 60% at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 30%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(28,24,21,0.10), transparent)",
        }}
      />
    </>
  );
}

function ConsoleHeader() {
  return (
    <div className="relative flex items-center justify-between border-b border-foreground/[0.08] px-6 py-4 md:px-10">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
          ~/career.os
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 rounded-full border border-foreground/10 bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground sticker md:inline-flex">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          Open to work
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          v4.0
        </span>
      </div>
    </div>
  );
}

function ConsoleFooter() {
  const keywords = [
    "React", "Next.js", "TypeScript", "Redux Toolkit", "RTK Query",
    "Tailwind", "Framer Motion", "React Flow", "Playwright", "Vite",
    "Node", "REST", "WebSockets", "Multitenancy", "Feature Flags",
    "Performance", "Architecture", "DX",
  ];
  const items = [...keywords, ...keywords];

  return (
    <div className="relative overflow-hidden border-t border-foreground/[0.08] bg-foreground/[0.015] py-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
      />
      <div
        className="flex w-max animate-marquee gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        style={{ ["--duration" as never]: "55s" }}
      >
        {items.map((k, i) => (
          <span key={i} className="flex items-center gap-8">
            {k}
            <span className="size-1 rounded-full bg-foreground/20" />
          </span>
        ))}
      </div>
    </div>
  );
}

function CornerBrackets() {
  const base = "absolute size-5 border-foreground/20";
  return (
    <>
      <span aria-hidden className={cn(base, "left-2 top-2 border-l border-t")} />
      <span aria-hidden className={cn(base, "right-2 top-2 border-r border-t")} />
      <span aria-hidden className={cn(base, "bottom-2 left-2 border-b border-l")} />
      <span aria-hidden className={cn(base, "bottom-2 right-2 border-b border-r")} />
    </>
  );
}

/* ───────── Left tabs ───────── */

function RoleTabs({
  roles,
  active,
  onChange,
}: {
  roles: Role[];
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="relative border-b border-foreground/[0.08] py-6 md:border-b-0 md:border-r md:pr-6">
      <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="h-px w-4 bg-foreground/15" />
        Roles
        <span className="ml-auto rounded-sm bg-foreground/[0.04] px-1.5 py-0.5 text-foreground/70">
          {String(active + 1).padStart(2, "0")}/
          {String(roles.length).padStart(2, "0")}
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto md:flex-col md:gap-1.5 md:overflow-visible">
        {roles.map((r, i) => {
          const isActive = i === active;
          return (
            <button
              key={`${r.company}-${r.start}`}
              onClick={() => onChange(i)}
              className={cn(
                "group relative w-full shrink-0 cursor-pointer rounded-xl border px-3.5 py-3 text-left transition-colors md:w-auto",
                isActive
                  ? "border-foreground/15 bg-white sticker"
                  : "border-foreground/[0.08] bg-foreground/[0.015] hover:border-foreground/15 hover:bg-foreground/[0.03]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="role-active-rail"
                  aria-hidden
                  className="absolute -left-px top-2 bottom-2 w-px bg-gradient-to-b from-[--color-brand-orange] via-[--color-brand-orange]/70 to-transparent md:left-[-1px]"
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                />
              )}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.22em] transition-colors",
                    isActive ? "text-[--color-brand-orange]" : "text-muted-foreground"
                  )}
                >
                  {r.start.split(" ").pop()} —{" "}
                  {r.end.toLowerCase() === "present" ? "Now" : r.end.split(" ").pop()}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="role-active-dot"
                    className="size-1.5 rounded-full bg-[--color-brand-orange] shadow-[0_0_10px_#e85d04]"
                  />
                )}
              </div>
              <div
                className={cn(
                  "mt-1.5 text-pretty text-sm font-medium leading-snug transition-colors",
                  isActive ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
                )}
              >
                {r.role}
              </div>
              <div className="mt-0.5 font-display text-[13px] italic leading-snug text-muted-foreground">
                {r.company}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────── Center stage ───────── */

function RoleStage({ role, active }: { role: Role; active: number }) {
  const isLive = role.end.toLowerCase() === "present";
  const yearDisplay = isLive ? "Now" : (role.end.split(" ").pop() ?? role.end);
  const startYear = role.start.split(" ").pop() ?? role.start;

  return (
    <div className="relative px-0 py-6 md:px-10 md:py-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground sticker">
              <span className="size-1.5 rounded-full bg-[--color-brand-orange]" />
              {role.company}
            </span>
            {isLive && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                </span>
                Current
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {role.start} → {role.end}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-4">
            <h3 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-[2.6rem]">
              {role.role}
            </h3>
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span
              className="relative inline-block bg-clip-text pr-2 font-display text-[3.2rem] italic leading-[1] tracking-tight text-transparent md:text-[4.4rem]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #1c1815 0%, #e85d04 65%, #f59e0b 100%)",
              }}
            >
              {yearDisplay}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              ← from {startYear}
            </span>
          </div>

          <p className="mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
            {role.summary}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ───────── Right stats ───────── */

function RoleStats({
  role,
  active,
  total,
}: {
  role: Role;
  active: number;
  total: number;
}) {
  const months = useMemo(() => calcMonths(role.start, role.end), [role.start, role.end]);
  const shipped = role.highlights.length;

  return (
    <div className="relative border-t border-foreground/[0.08] py-6 md:border-l md:border-t-0 md:pl-6">
      <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="h-px w-4 bg-foreground/15" />
        Stats
      </div>

      <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
        <StatCard label="Months" value={months} suffix="mo" activeKey={active} />
        <StatCard label="Shipped" value={shipped} activeKey={active} accent="indigo" />
        <StatCard
          label="Chapter"
          value={active + 1}
          suffix={`/${total}`}
          activeKey={active}
          accent="cyan"
        />
      </div>

      <YearBar role={role} />
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  activeKey,
  accent = "orange",
}: {
  label: string;
  value: number;
  suffix?: string;
  activeKey: number;
  accent?: "orange" | "indigo" | "cyan";
}) {
  const dotColor = {
    orange: "bg-[--color-brand-orange]",
    indigo: "bg-[--color-brand-indigo]",
    cyan: "bg-[--color-brand-cyan]",
  }[accent];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-foreground/[0.08] bg-white p-3.5 transition-all hover:border-foreground/15 hover:shadow-[0_8px_24px_-12px_rgba(28,24,21,0.18)]">
      <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
        <span className={cn("size-1 rounded-full", dotColor)} />
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <Counter to={value} resetKey={activeKey} />
        {suffix && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* Eased count-up — animates from 0 to `to` on every resetKey change. */
function Counter({ to, resetKey }: { to: number; resetKey: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, resetKey]);
  return (
    <span className="font-display text-3xl italic leading-none tabular-nums text-foreground">
      {value}
    </span>
  );
}

function YearBar({ role }: { role: Role }) {
  const years = [2022, 2023, 2024, 2025, 2026];
  const startYear = yearOf(role.start);
  const endYear =
    role.end.toLowerCase() === "present"
      ? new Date().getFullYear()
      : yearOf(role.end);

  const left = ((startYear - years[0]) / (years.length - 1)) * 100;
  const width = Math.max(8, ((endYear - startYear) / (years.length - 1)) * 100);

  return (
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
        <span>Timeline</span>
        <span>
          {startYear}–{endYear}
        </span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.06]">
        <motion.span
          className="absolute inset-y-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #e85d04, #f59e0b)",
            boxShadow: "0 0 10px rgba(232,93,4,0.45)",
          }}
          initial={false}
          animate={{ left: `${left}%`, width: `${width}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground/80">
        {years.map((y) => (
          <span key={y}>{String(y).slice(2)}</span>
        ))}
      </div>
    </div>
  );
}

/* ───────── Highlights row ───────── */

function Highlights({ role, active }: { role: Role; active: number }) {
  return (
    <div className="relative border-t border-foreground/[0.08] px-6 py-6 md:px-10 md:py-8">
      <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="h-px w-4 bg-foreground/15" />
        Shipped
        <span className="text-muted-foreground/60">// what moved</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {role.highlights.map((h, i) => (
            <motion.div
              key={`${active}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                delay: 0.05 + i * 0.06,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-foreground/[0.08] bg-white p-4 transition-all hover:border-foreground/15 hover:shadow-[0_10px_28px_-14px_rgba(28,24,21,0.18)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px -z-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(232,93,4,0.14), transparent 50%)",
                }}
              />
              <span className="relative mt-0.5 inline-flex shrink-0 items-baseline">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  0{i + 1}
                </span>
                <span
                  aria-hidden
                  className="ml-2 inline-block h-px w-4 bg-gradient-to-r from-[--color-brand-orange] to-transparent align-middle"
                />
              </span>
              <p className="relative text-[14px] leading-relaxed text-foreground/85">
                {h}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────── date utilities ───────── */

function yearOf(s: string) {
  if (/^\d{4}$/.test(s)) return Number(s);
  const parts = s.split(/\s+/);
  return Number(parts[parts.length - 1]);
}

function calcMonths(start: string, end: string) {
  const parse = (s: string) => {
    if (/^\d{4}$/.test(s)) return { y: Number(s), m: 0 };
    const [mon, yr] = s.split(/\s+/);
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    return { y: Number(yr), m: months[mon] ?? 0 };
  };
  const a = parse(start);
  const b =
    end.toLowerCase() === "present"
      ? { y: new Date().getFullYear(), m: new Date().getMonth() }
      : parse(end);
  return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m));
}
