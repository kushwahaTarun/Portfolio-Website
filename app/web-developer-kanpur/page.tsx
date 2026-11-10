import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { Contact } from "@/components/home/Contact";
import { siteConfig } from "@/lib/site";

const title = "Web Developer in Kanpur, India | Tarun Kushwaha";
const description =
  "Looking for a web developer in Kanpur? Tarun Kushwaha builds responsive websites and custom web applications with React, Next.js, TypeScript, and Node.js for businesses and product teams.";

export const metadata: Metadata = {
  title: "Web Developer in Kanpur, India",
  description,
  alternates: { canonical: "/web-developer-kanpur" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/web-developer-kanpur`,
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

const services = [
  {
    title: "Business websites",
    body: "Responsive, mobile-friendly websites that explain what your business offers, make important information easy to find, and give visitors a clear way to contact you.",
  },
  {
    title: "Custom web applications",
    body: "Purpose-built web apps with interactive interfaces, authentication, dashboards, forms, API integrations, and data-driven workflows.",
  },
  {
    title: "React and Next.js development",
    body: "Modern React interfaces and Next.js applications built with TypeScript, reusable components, responsive layouts, and maintainable frontend architecture.",
  },
  {
    title: "Frontend improvements",
    body: "Practical help with existing React applications, UI bugs, performance bottlenecks, component architecture, and API integration.",
  },
];

export default function KanpurWebDeveloperPage() {
  return (
    <>
      <section className="border-b border-foreground/10 py-20 md:py-28">
        <div className="container-px mx-auto max-w-[1100px]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Web development · Kanpur, Uttar Pradesh
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Web developer in Kanpur building modern websites and web applications.
          </h1>
          <p className="mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
            I&apos;m Tarun Kushwaha, a Senior React and Next.js developer based in
            Kanpur, India. I work on responsive websites, custom web applications,
            frontend engineering, and full-stack JavaScript products. I can
            collaborate remotely with businesses, founders, and product teams in
            Kanpur, across India, and internationally when the project is a good fit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
              Discuss a project
            </Link>
            <Link href="/projects" className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium">
              View project case studies
            </Link>
          </div>
        </div>
      </section>

      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight">Web development services</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The right solution depends on the problem, users, content, and integrations
            involved. These are the areas where I can help.
          </p>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-2xl border border-foreground/10 bg-white p-6">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight">Technology and approach</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            My day-to-day engineering work focuses on React, Next.js, JavaScript,
            TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, Node.js, Express,
            REST APIs, and data integrations. I care about accessible interfaces,
            maintainable code, reliable API communication, and performance that
            can be measured rather than promised.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I share selected implementation details in my{" "}
            <Link className="underline underline-offset-4" href="/projects">project case studies</Link>
            {" "}and more about my background on the{" "}
            <Link className="underline underline-offset-4" href="/about">about page</Link>.
          </p>
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight">Working together</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I&apos;m based in Kanpur, Uttar Pradesh, and remote collaboration is
            possible for suitable projects. Before committing, I confirm the scope,
            timeline, availability, and that the work is consistent with my
            employment and confidentiality obligations.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            If you need a website developer in Kanpur, a React developer, or help
            planning a custom web application, send a short description of what
            you are trying to build.
          </p>
          <Link href="/contact" className="mt-6 inline-flex rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium">
            Contact Tarun
          </Link>
        </div>
      </Section>
      <Contact />
    </>
  );
}
