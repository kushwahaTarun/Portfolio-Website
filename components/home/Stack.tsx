"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/shared/Section";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { skillGroups } from "@/lib/data/skills";

const accents = [
  {
    stripe: "bg-[--color-brand-orange]",
    chip: "hover:border-[--color-brand-orange] hover:text-[--color-brand-orange]",
  },
  {
    stripe: "bg-[--color-brand-cyan]",
    chip: "hover:border-[--color-brand-cyan] hover:text-[--color-brand-cyan]",
  },
  {
    stripe: "bg-[--color-brand-pink]",
    chip: "hover:border-[--color-brand-pink] hover:text-[--color-brand-pink]",
  },
  {
    stripe: "bg-[--color-brand-indigo]",
    chip: "hover:border-[--color-brand-indigo] hover:text-[--color-brand-indigo]",
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
  return (
    <Section id="stack">
      <SectionHeading
        eyebrow="My toolkit"
        accent="lime"
        title="What I usually reach for."
        description="The tools I know well and trust. Hover any chip — they have opinions about themselves."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, gi) => {
          const a = accents[gi % accents.length];
          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: gi * 0.08, duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-foreground/[0.08] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_48px_-16px_rgba(28,24,21,0.15)]"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 ${a.stripe}`} />
              <h3 className="mb-5 mt-2 font-display text-xl italic text-foreground">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <AnimatedTooltip label={item} description={tooltipMap[item]}>
                      <span
                        className={`block cursor-default rounded-full border border-foreground/10 bg-foreground/[0.02] px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-colors ${a.chip}`}
                      >
                        {item}
                      </span>
                    </AnimatedTooltip>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
