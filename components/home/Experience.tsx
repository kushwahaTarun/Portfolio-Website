"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/shared/Section";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { experiences } from "@/lib/data/experience";

const dotColors = [
  "var(--color-brand-orange)",
  "var(--color-brand-cyan)",
  "var(--color-brand-pink)",
  "var(--color-brand-lime)",
];

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Path so far"
        accent="indigo"
        title="A short version of the journey."
        description="Four years at one company, three different roles, a lot of late nights."
      />

      <div className="mx-auto max-w-3xl">
        <TracingBeam>
          <ol className="space-y-14 pl-10 md:pl-14">
            {experiences.map((exp, i) => (
              <motion.li
                key={`${exp.company}-${exp.start}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative"
              >
                <span
                  className="absolute -left-[42px] top-1.5 grid size-4 place-items-center rounded-full border-2 bg-background md:-left-[50px]"
                  style={{ borderColor: dotColors[i % dotColors.length] }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: dotColors[i % dotColors.length] }}
                  />
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    <span className="font-display italic">{exp.role}</span>{" "}
                    <span className="text-muted-foreground">· {exp.company}</span>
                  </h3>
                  <span className="rounded-full bg-foreground/[0.04] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {exp.start} — {exp.end}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground md:text-base">
                  {exp.summary}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full"
                        style={{ background: dotColors[i % dotColors.length] }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </TracingBeam>
      </div>
    </Section>
  );
}
