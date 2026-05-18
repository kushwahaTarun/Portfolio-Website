"use client";

import Link from "next/link";
import { ArrowDown, Github, Linkedin, Sparkles as SparklesIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { AnimatedText } from "@/components/shared/AnimatedText";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { Typewriter } from "@/components/ui/typewriter";
import { Sparkles } from "@/components/ui/sparkles";
import { MovingBorder } from "@/components/ui/moving-border";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <HeroDecor />

      <div className="container-px relative mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-12 pb-24 pt-16 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-32 lg:pt-24">
          {/* Left: Text content */}
          <div>
            <h1 className="text-balance text-4xl font-semibold leading-[1] tracking-tight md:text-6xl lg:text-[5.5rem]">
              <span className="block">
                <AnimatedText text="Hey, I'm" />
              </span>
              <span className="relative inline-block">
                <span className="relative z-10 font-display italic gradient-text">
                  <AnimatedText text="Tarun." delay={0.15} />
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 220 14"
                  className="absolute -bottom-3 left-0 h-3 w-[88%] md:-bottom-4 md:h-4"
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
              <span className="mt-2 block md:mt-3">
                <span className="block whitespace-nowrap">I build</span>
                <Typewriter
                  words={[
                    "for the web.",
                    "with care.",
                    "side projects.",
                    "for humans.",
                    "and learn.",
                  ]}
                  className="font-display italic text-foreground/80"
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-10 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Frontend engineer based in{" "}
              <HighlightWord>Kanpur, India</HighlightWord>. Days writing React
              and Next.js, nights tinkering with the rest of the MERN stack,
              weekends chasing whatever new AI API just shipped.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <MagneticButton>
                <MovingBorder containerClassName="rounded-full">
                  <Link
                    href="/projects"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                  >
                    <SparklesIcon size={14} />
                    Things I&apos;ve made
                  </Link>
                </MovingBorder>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-foreground bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Say hello
                </Link>
              </MagneticButton>
              <div className="ml-1 flex items-center gap-1.5">
                <SocialPill href={siteConfig.links.github} label="GitHub">
                  <Github size={14} />
                </SocialPill>
                <SocialPill href={siteConfig.links.linkedin} label="LinkedIn">
                  <Linkedin size={14} />
                </SocialPill>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual stack */}
          <div className="relative hidden h-[520px] lg:block">
            <FloatingCard
              className="absolute right-0 top-0 w-[280px] rotate-[3deg] paper"
              delay={0.4}
            >
              <div className="flex items-center gap-2 border-b border-foreground/[0.08] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <Zap size={11} className="text-[--color-brand-orange]" />
                Currently building
              </div>
              <div className="p-4">
                <div className="font-display text-2xl italic leading-tight text-foreground">
                  Interactive Avatar
                </div>
                <p className="mt-2 text-xs leading-snug text-muted-foreground">
                  A real-time AI avatar app on Next.js + HeyGen. Talks back.
                  Mostly works.
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {["Next.js", "HeyGen", "Tailwind"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-foreground/[0.05] px-2 py-0.5 text-[10px] font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute left-2 top-[170px] w-[220px] -rotate-[4deg] paper"
              delay={0.6}
            >
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Now playing
                </div>
                <div className="mt-2 font-display text-lg italic text-foreground">
                  lo-fi + Hindi indie
                </div>
                <div className="mt-3 flex h-4 items-end gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.span
                      key={i}
                      className="block w-1 rounded-full bg-[--color-brand-orange]"
                      style={{ height: "100%", transformOrigin: "bottom" }}
                      animate={{ scaleY: [0.4, 1, 0.5, 1, 0.4] }}
                      transition={{
                        duration: 1.2 + i * 0.15,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  <span className="ml-2 text-[10px] text-muted-foreground">
                    while coding
                  </span>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute right-8 top-[290px] w-[180px] rotate-[6deg] sticker"
              delay={0.8}
              style={{ background: "var(--color-brand-orange)" }}
            >
              <div className="relative p-4 text-white">
                <Sparkles className="inset-0" count={5} colors={["#ffffff"]} />
                <div className="text-[10px] uppercase tracking-[0.18em] opacity-80">
                  Years writing React
                </div>
                <div className="mt-1 font-display text-5xl italic">4+</div>
                <div className="mt-1 text-[11px] opacity-80">
                  &amp; still finding new ways to use useEffect wrong
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute left-0 top-[380px] w-[240px] rotate-[-2deg] paper"
              delay={1.0}
            >
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Toolkit
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    { t: "React", c: "bg-[#61dafb]/15 text-[#0078a4]" },
                    { t: "Next.js", c: "bg-foreground/[0.08] text-foreground" },
                    { t: "TypeScript", c: "bg-[#3178c6]/15 text-[#3178c6]" },
                    { t: "Tailwind", c: "bg-[#06b6d4]/15 text-[#0e7490]" },
                    { t: "Node", c: "bg-[#84cc16]/20 text-[#3f6212]" },
                    { t: "Mongo", c: "bg-[#10b981]/20 text-[#065f46]" },
                  ].map(({ t, c }) => (
                    <span
                      key={t}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${c}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingCard({
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
      className={`overflow-hidden rounded-2xl ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function HighlightWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span
        aria-hidden
        className="absolute inset-x-[-4px] inset-y-[2px] -z-10 rounded-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(232,93,4,0) 60%, rgba(232,93,4,0.25) 60%)",
        }}
      />
      <span className="relative font-medium text-foreground">{children}</span>
    </span>
  );
}

function HeroDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-32 top-20 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(232,93,4,0.18),transparent_60%)]" />
      <div className="absolute -right-24 top-60 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.16),transparent_60%)]" />
      <div className="absolute bottom-0 left-1/3 size-[380px] rounded-full bg-[radial-gradient(circle,rgba(101,163,13,0.14),transparent_60%)]" />
      <div className="absolute inset-0 dot-pattern mask-radial-fade opacity-50" />
    </div>
  );
}

function SocialPill({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-foreground/10 bg-white text-foreground/80 transition-all hover:scale-110 hover:bg-foreground hover:text-background"
    >
      {children}
    </Link>
  );
}
