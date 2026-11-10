import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/shared/Section";
import { Contact } from "@/components/home/Contact";
import { siteConfig } from "@/lib/site";

const title = "Custom Web Application Development | React & Next.js";
const description =
  "Explore custom web application development with React, Next.js, TypeScript, and Node.js. Tarun Kushwaha builds responsive interfaces, dashboards, API-connected products, and full-stack JavaScript applications.";

export const metadata: Metadata = {
  title: "Custom Web Application Development",
  description,
  alternates: { canonical: "/web-application-development" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/web-application-development`,
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

const capabilities = [
  ["Frontend application development", "React and Next.js interfaces, reusable components, responsive layouts, forms, tables, dashboards, and accessible user flows."],
  ["API and backend integration", "Connecting frontend applications to REST APIs, Node.js and Express services, authentication providers, and third-party platforms."],
  ["Data-driven products", "Working with application data, Supabase and PostgreSQL integrations, state management, and reliable loading and error states."],
  ["AI-enabled web experiences", "Building interfaces around model APIs, streamed responses, document-based question answering, and tool-using workflows where the product needs them."],
  ["Performance and maintainability", "Reviewing rendering, client-side state, API usage, component boundaries, and practical opportunities to improve responsiveness and maintainability."],
];

export default function WebApplicationDevelopmentPage() {
  return (
    <>
      <section className="border-b border-foreground/10 py-20 md:py-28">
        <div className="container-px mx-auto max-w-[1100px]">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            React · Next.js · TypeScript · Node.js
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Custom web application development with React and Next.js.
          </h1>
          <p className="mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground">
            A web application should solve a real workflow, not just look good in
            a browser. I build and improve full-stack JavaScript applications,
            focusing on clear user journeys, reliable API integrations, maintainable
            frontend architecture, and responsive experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
              Discuss your application
            </Link>
            <Link href="/projects" className="rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium">
              Explore implementation examples
            </Link>
          </div>
        </div>
      </section>

      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight">Web application development capabilities</h2>
          <div className="mt-8 space-y-5">
            {capabilities.map(([heading, body]) => (
              <article key={heading} className="rounded-2xl border border-foreground/10 bg-white p-6">
                <h3 className="text-xl font-semibold">{heading}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight">Examples of application architecture</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            My case studies cover a retrieval-augmented generation knowledge
            assistant, a tool-calling research agent, an AI content repurposing
            application, and a QR-based digital dining system. Each write-up
            explains its current scope, technology choices, and implementation
            details without implying that every project is a publicly launched product.
          </p>
          <Link href="/projects" className="mt-6 inline-flex rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium">
            Read project case studies
          </Link>
        </div>
      </Section>

      <Section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight">Is this a fit for your project?</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I&apos;m based in Kanpur, India and consider carefully scoped remote
            projects subject to availability and existing employment and
            confidentiality obligations. Share the problem, users, required
            integrations, and timeline so we can determine whether I can help.
          </p>
          <Link href="/services" className="mt-6 inline-flex rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium">
            See engagement options
          </Link>
        </div>
      </Section>
      <Contact />
    </>
  );
}
