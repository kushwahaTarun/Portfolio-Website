"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/Section";
import { featuredProjects, projects, type Project } from "@/lib/data/projects";
import { TiltCard } from "@/components/ui/tilt-card";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <Section id="work" className="pb-12 md:pb-16">
      <SectionHeading
        eyebrow="Work"
        accent="orange"
        title="Stuff I've built lately."
        description="A mix of what I work on full-time and what I tinker with after hours."
      />

      <div className="grid gap-5 md:grid-cols-6 md:auto-rows-[280px]">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
        {projects
          .filter((p) => !p.featured)
          .map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={featuredProjects.length + i}
            />
          ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          See everything
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const sizeClass =
    project.size === "lg"
      ? "md:col-span-4 md:row-span-2"
      : project.size === "md"
        ? "md:col-span-3"
        : "md:col-span-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.6 }}
      className={cn(sizeClass, "group relative")}
    >
      <TiltCard className="h-full" max={6}>
      <div
        className="relative h-full min-h-[280px] overflow-hidden rounded-3xl border border-foreground/[0.08] bg-white transition-shadow duration-300 hover:shadow-[0_28px_64px_-20px_rgba(28,24,21,0.22)]"
        style={{
          boxShadow: `inset 0 -3px 0 ${project.accent}`,
        }}
      >
        {/* Color strip on top */}
        <div
          className="absolute inset-x-0 top-0 h-1.5"
          style={{ background: project.accent }}
        />

        {/* Decorative tint corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-[280px] rounded-full opacity-[0.12] transition-opacity duration-500 group-hover:opacity-30"
          style={{
            background: `radial-gradient(circle, ${project.accent}, transparent 60%)`,
          }}
        />

        {/* Cursor-aware glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at 50% 0%, ${project.accent}22, transparent 60%)`,
          }}
        />

        <div className="relative flex h-full flex-col justify-between p-7 md:p-8">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: project.accent }}
                />
                {project.year} · {project.role}
              </span>
            </div>
            <h3 className="text-balance text-[1.75rem] font-semibold tracking-tight sm:text-3xl md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 font-display text-base italic text-muted-foreground md:text-lg">
              {project.tagline}
            </p>
            {project.size === "lg" && (
              <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground/90">
                {project.description}
              </p>
            )}
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, project.size === "lg" ? 6 : 3).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/80"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 gap-1.5">
              {project.repo && (
                <Link
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} repo`}
                  className="grid size-9 place-items-center rounded-full border border-foreground/10 bg-white text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  <Github size={13} />
                </Link>
              )}
              {project.href && (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live`}
                  className="grid size-9 place-items-center rounded-full border border-foreground/10 bg-white text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  <ExternalLink size={13} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      </TiltCard>
    </motion.div>
  );
}
