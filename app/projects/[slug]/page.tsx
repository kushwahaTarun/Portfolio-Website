import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";
import { Section } from "@/components/shared/Section";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.title} — Architecture & Implementation`;
  const description = project.description;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    codeRepository: project.repo,
    programmingLanguage: project.stack,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative overflow-hidden border-b border-foreground/10 pb-14 pt-20 md:pb-20 md:pt-28">
        <div className="container-px mx-auto max-w-[1100px]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} /> All projects
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span>{project.year}</span>
            <span aria-hidden>·</span>
            <span>{project.role}</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl font-display text-xl italic text-muted-foreground md:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-8 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {project.description}
          </p>
          {project.repo && (
            <Link
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              <Github size={16} /> View source <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </section>

      <Section className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Architecture & implementation
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              How it is put together
            </h2>
            <div className="mt-8 space-y-7">
              {project.techDetails.map((detail) => (
                <article key={detail.name} className="border-l-2 border-[--color-brand-orange] pl-5">
                  <h3 className="text-lg font-semibold">{detail.name}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {detail.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-foreground/10 bg-white p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Technology
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Stack overview</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <li key={technology} className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1.5 text-xs font-medium">
                  {technology}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-foreground/10 pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                This project is presented as an active build. Features and implementation details reflect the current project scope.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <section className="container-px mx-auto max-w-[1100px] pb-20 md:pb-28">
        <div className="rounded-3xl bg-foreground p-8 text-background md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-background/60">
            More work
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
            Explore other projects or get in touch.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground">
              Browse projects
            </Link>
            <Link href="/contact" className="rounded-full border border-background/30 px-5 py-3 text-sm font-semibold text-background">
              Contact Tarun
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
