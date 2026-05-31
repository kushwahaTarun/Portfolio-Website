"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiDocker,
  SiFramer,
  SiGraphql,
  SiJavascript,
  SiBootstrap,
} from "react-icons/si";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";

const dockItems: DockItem[] = [
  {
    name: "React",
    icon: <SiReact />,
    gradient: "linear-gradient(135deg, #61dafb 0%, #2196f3 100%)",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    gradient: "linear-gradient(135deg, #1c1815 0%, #4a4642 100%)",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    gradient: "linear-gradient(135deg, #3178c6 0%, #1e3a8a 100%)",
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    gradient: "linear-gradient(135deg, #f7df1e 0%, #d4af00 100%)",
    textColor: "#1c1815",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    gradient: "linear-gradient(135deg, #38bdf8 0%, #0e7490 100%)",
  },
  {
    name: "Bootstrap",
    icon: <SiBootstrap />,
    gradient: "linear-gradient(135deg, #a855f7 0%, #5b21b6 100%)",
  },
  {
    name: "Redux Toolkit",
    icon: <SiRedux />,
    gradient: "linear-gradient(135deg, #c084fc 0%, #6b21a8 100%)",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs />,
    gradient: "linear-gradient(135deg, #84cc16 0%, #3f6212 100%)",
  },
  {
    name: "Express.js",
    icon: <SiExpress />,
    gradient: "linear-gradient(135deg, #4b5563 0%, #1f2937 100%)",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb />,
    gradient: "linear-gradient(135deg, #34d399 0%, #047857 100%)",
  },
  {
    name: "Firebase",
    icon: <SiFirebase />,
    gradient: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
    textColor: "#1c1815",
  },
  {
    name: "Docker",
    icon: <SiDocker />,
    gradient: "linear-gradient(135deg, #38bdf8 0%, #0369a1 100%)",
  },
  {
    name: "Framer Motion",
    icon: <SiFramer />,
    gradient: "linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)",
  },
  {
    name: "GraphQL",
    icon: <SiGraphql />,
    gradient: "linear-gradient(135deg, #ec4899 0%, #9d174d 100%)",
  },
];

export function Skills() {
  return (
    <section className="relative w-full border-y border-foreground/[0.08] bg-white/50 py-12 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-pattern opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(232,93,4,0.08),transparent_70%)]"
      />
      <div className="container-px relative mx-auto max-w-[1400px]">
        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          — what I build with —
        </p>
        {/* Mobile: wrapped grid (no horizontal overflow) */}
        <div className="grid grid-cols-5 gap-2.5 rounded-3xl border border-foreground/[0.08] bg-white p-4 shadow-[0_24px_64px_-32px_rgba(28,24,21,0.22)] sm:grid-cols-7 md:hidden">
          {dockItems.map((item) => (
            <div
              key={item.name}
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[26%] shadow-[0_4px_12px_-4px_rgba(28,24,21,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]"
              style={{
                background: item.gradient,
                color: item.textColor ?? "#ffffff",
              }}
              aria-label={item.name}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[26%]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.04) 100%)",
                }}
              />
              <div className="relative flex h-1/2 w-1/2 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: original floating dock */}
        <div className="hidden justify-center md:flex">
          <FloatingDock items={dockItems} />
        </div>
      </div>
    </section>
  );
}
