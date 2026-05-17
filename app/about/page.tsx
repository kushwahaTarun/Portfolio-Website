import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { GradientOrbs } from "@/components/shared/GradientOrbs";
import { siteConfig } from "@/lib/site";
import { Experience } from "@/components/home/Experience";
import { Stack } from "@/components/home/Stack";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.role}.`,
};

export default function AboutPage() {
  const totalYears = new Date().getFullYear() - 2022;
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16">
        <GradientOrbs />
        <div className="container-px mx-auto max-w-[1400px]">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            / About
          </span>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            A frontend dev who got <span className="gradient-text">curious</span>{" "}
            and never quite stopped.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            I&apos;m Tarun. I live in Kanpur, India, and I&apos;ve been writing
            React professionally for {totalYears}+ years — currently at Fluid AI,
            where I work on an AI workspace product. On the weekends I&apos;m
            usually playing with whatever new AI SDK just came out.
          </p>
        </div>
      </section>

      <Section className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-semibold tracking-tight md:text-4xl">
              How I think about the work
            </h2>
            <ul className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              <li>
                <span className="text-foreground">Small PRs over big ones.</span>{" "}
                Easier to review, easier to revert, easier to actually understand.
              </li>
              <li>
                <span className="text-foreground">Performance is a habit.</span>{" "}
                Most apps aren&apos;t slow because of one big thing — they&apos;re
                slow because nobody noticed the small ones. I notice.
              </li>
              <li>
                <span className="text-foreground">Boring tech is good tech.</span>{" "}
                I&apos;ll happily pick the obvious tool over the shiny one and
                spend the time saved on things users actually feel.
              </li>
              <li>
                <span className="text-foreground">Tests when they earn it.</span>{" "}
                Playwright on critical flows. Not chasing coverage numbers.
              </li>
              <li>
                <span className="text-foreground">Stay curious.</span> Every new
                Next.js release, every new model, every new R3F demo — I poke at
                it. That&apos;s the fun part.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-semibold tracking-tight md:text-4xl">
              When I&apos;m not coding
            </h2>
            <ul className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              <li>
                Reading too much about state management and motion design.
              </li>
              <li>
                Listening to lo-fi and Hindi indie while debugging.
              </li>
              <li>
                Long evening walks around the neighborhood. Best place to think.
              </li>
              <li>
                Trying to convince friends that frontend is, in fact, real
                engineering.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Experience />
      <Stack />
    </>
  );
}
