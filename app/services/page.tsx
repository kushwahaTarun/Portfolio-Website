import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Gauge,
  MessagesSquare,
  Minus,
  Rocket,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Contact } from "@/components/home/Contact";
import { siteConfig } from "@/lib/site";
import { FaqAccordion } from "./FaqAccordion";

const servicesTitle = `Services — Work with ${siteConfig.name}`;
const servicesDescription = `Freelance full-stack engagements with ${siteConfig.name} — Next.js front-ends, Node APIs, MongoDB / Firebase, Docker deploys. Audits, MVPs, and pair consulting.`;

export const metadata: Metadata = {
  title: "Services — Work with me",
  description: servicesDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/services`,
    title: servicesTitle,
    description: servicesDescription,
    siteName: siteConfig.name,
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${siteConfig.name} — Freelance Engineering`,
  url: `${siteConfig.url}/services`,
  description: servicesDescription,
  areaServed: "Worldwide",
  provider: {
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  },
  serviceType: [
    "Full-stack performance audit",
    "Full-stack MVP / new build",
    "Pair consulting & code review",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement types",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-stack performance audit",
          description:
            "1–2 week fixed-scope audit across Next.js, Node, and MongoDB with a prioritized fix list and Loom walkthrough.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full-stack MVP / new build",
          description:
            "Idea to live URL — Next.js frontend, Node API, MongoDB / Firebase, Docker deploy.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pair consulting & code review",
          description:
            "Async or scheduled pairing for senior frontend / full-stack guidance, architecture decisions, and code review.",
        },
      },
    ],
  },
};

type Service = {
  slug: string;
  name: string;
  tagline: string;
  timeline: string;
  icon: React.ReactNode;
  accent: string;
  bestFor: string;
  includes: string[];
  proof?: string;
};

const services: Service[] = [
  {
    slug: "audit",
    name: "Full-stack performance audit",
    tagline: "Your app feels slow. We'll find out exactly where — front to back.",
    timeline: "1–2 weeks · fixed scope",
    icon: <Gauge size={20} strokeWidth={1.8} />,
    accent: "#e85d04",
    bestFor:
      "Teams whose Next.js + Node / Mongo stack has gotten heavy and need a senior set of eyes across the whole pipeline before the next big build.",
    includes: [
      "Full codebase walkthrough — frontend architecture, API design, data layer",
      "Render, bundle, and cache audit on the client with Lighthouse + DevTools captures",
      "API + database review — query patterns, payload size, N+1s, indexes",
      "Written report with prioritized fixes (quick wins → 2-week wins)",
      "60-min Loom walkthrough you can share with your team",
      "Two weeks of async Q&A after delivery",
    ],
    proof: "Last in-house audit cut API calls by 85% and page loads by 80%.",
  },
  {
    slug: "build",
    name: "Full-stack MVP / new build",
    tagline: "Idea → live URL. Frontend, backend, deploy — all of it.",
    timeline: "3–8 weeks · fixed scope",
    icon: <Rocket size={20} strokeWidth={1.8} />,
    accent: "#4f46e5",
    bestFor:
      "Founders and small teams shipping their first or next product end-to-end. You want one engineer who can own UI, API, and deploy — not three vendors stitched together.",
    includes: [
      "Next.js 16 + TypeScript front-end with Tailwind and shadcn/ui",
      "Node / API routes, MongoDB or Supabase, WebSockets where it earns it",
      "Auth, payments, transactional email, role-based access — whatever the brief needs",
      "Dockerized and deployed on Vercel, your cloud, or on-prem",
      "CI/CD pipeline + handoff docs + 30-min walkthrough",
    ],
    proof:
      "Shipped multi-tenant SaaS end-to-end to 50+ enterprise clients at Fluid AI — including the on-prem version.",
  },
  {
    slug: "consulting",
    name: "Hourly consulting & pair sessions",
    tagline: "Pay-per-hour. Pair on hard problems, review PRs, unblock decisions.",
    timeline: "60 or 90-min blocks",
    icon: <MessagesSquare size={20} strokeWidth={1.8} />,
    accent: "#0891b2",
    bestFor:
      "Solo devs or teams stuck on a specific problem — state management, API design, performance, or architecture before you commit to a direction.",
    includes: [
      "1-on-1 video pair sessions over Zoom or Meet",
      "Async PR / code review on frontend, backend, or both",
      "Architecture review — data models, API shape, state strategy",
      "Whiteboard a tricky feature together end-to-end",
      "Hire-by-the-hour, no minimum commitment",
    ],
  },
];

const idealFit = [
  "You're building on a JavaScript / TypeScript stack — React, Next.js, Node, Mongo, Supabase, Firebase",
  "You'd rather hire one engineer who can own UI, API, and deploy than juggle three vendors",
  "You care about craft — perf, UX, accessibility, motion — not just shipping",
  "Async-first; Loom and PR threads beat 8 standups a week",
  "Comfortable with IST-overlap hours (I cover early-morning and late-evening windows for sync calls)",
];

const notAFit = [
  "WordPress, Shopify themes, or pure design work",
  "You need 9-to-5 live presence in your Slack",
  "Brief is \"make it look like X\" with no problem definition",
  "Anything that conflicts with my day job at Fluid AI (no competing AI workspace platforms)",
];

const process = [
  {
    n: "01",
    title: "You reach out",
    body: "Drop a note via the contact form — what you're building, rough timeline, what's on fire. I reply within a day, two on weekends.",
  },
  {
    n: "02",
    title: "20-min intro call",
    body: "We figure out if it's a fit. No pitch, no contract, no commitment. I'll be honest if I'm not the right person.",
  },
  {
    n: "03",
    title: "Scope + written estimate",
    body: "Within 2–3 days I send a one-pager: deliverables, timeline, price, payment terms. You say go or pass.",
  },
  {
    n: "04",
    title: "We build",
    body: "Daily-ish updates, async-first, Loom over meetings. You see commits as they happen on a shared branch.",
  },
  {
    n: "05",
    title: "Handoff",
    body: "Docs, deployed URL, and a 30-min walkthrough. Optional follow-on hours if you want me on call afterwards.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with me"
        prefix="Need a full-stack"
        highlight="shipper?"
        underlineWidth="58%"
        description={
          <p>
            I freelance on top of my Team Lead role at Fluid AI — fixed-scope
            full-stack engagements for founders and small product teams.
            Next.js front-ends, Node / Mongo / Firebase back-ends, Docker
            and on-prem deploys when you need them. Audits, MVPs, and pair
            consulting. Async-first, evenings &amp; weekends, ships fast.
          </p>
        }
      >
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          <Calendar size={14} />
          Book a 20-min intro call
        </Link>
        <Link
          href="#services"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-foreground bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          See engagement types
        </Link>
      </PageHero>

      {/* Trust strip */}
      <Section className="py-12 md:py-16">
        <div className="grid gap-3 rounded-3xl border border-foreground/[0.08] bg-white paper p-6 sm:grid-cols-2 md:grid-cols-4 md:p-8">
          <TrustStat value="4+" label="Years writing React" />
          <TrustStat value="50+" label="Enterprise tenants shipped" />
          <TrustStat value="85%" label="API calls cut in last audit" />
          <TrustStat value="80%" label="Page-load improvement" />
        </div>
      </Section>

      {/* Services */}
      <Section id="services" className="py-16 md:py-28">
        <SectionHeading
          eyebrow="Engagement types"
          accent="orange"
          title="Three ways we can work together."
          description="Pick the one that fits where you are. Unsure? Book the intro call and I'll tell you which (or none) makes sense."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* Ideal client / not a fit */}
      <Section className="py-16 md:py-28">
        <SectionHeading
          eyebrow="Honest fit check"
          accent="cyan"
          title="This works best when…"
          description="I'd rather lose a bad-fit project on this page than three weeks in. Here's how to tell."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FitCard
            kind="fit"
            title="Good fit"
            accent="#65a30d"
            items={idealFit}
          />
          <FitCard
            kind="nofit"
            title="Probably not a fit"
            accent="#db2777"
            items={notAFit}
          />
        </div>
      </Section>

      {/* Process */}
      <Section className="py-16 md:py-28">
        <SectionHeading
          eyebrow="How it works"
          accent="indigo"
          title="From first email to deployed app."
          description="No sales calls, no decks, no friction. Five steps from inbox to handoff."
        />

        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {process.map((step) => (
            <li
              key={step.n}
              className="relative rounded-2xl border border-foreground/[0.08] bg-white paper p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[--color-brand-orange]">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-xl italic leading-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section className="py-16 md:py-28">
        <SectionHeading
          eyebrow="FAQ"
          accent="pink"
          title="Quick answers."
          description="The questions I get most. Tap any row. If yours isn't here, ask in the form — I read every message."
          align="center"
        />

        <FaqAccordion />
      </Section>

      <Contact />
    </>
  );
}

function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1">
      <span className="font-display text-3xl italic leading-none text-foreground md:text-4xl">
        {value}
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs">
        {label}
      </span>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/[0.08] bg-white paper p-7 transition-shadow duration-300 hover:shadow-[0_24px_56px_-20px_rgba(28,24,21,0.18)]"
      style={{ boxShadow: `inset 0 -3px 0 ${service.accent}` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ background: service.accent }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-[280px] rounded-full opacity-[0.10] transition-opacity duration-500 group-hover:opacity-[0.22]"
        style={{
          background: `radial-gradient(circle, ${service.accent}, transparent 60%)`,
        }}
      />

      <div className="relative flex items-center gap-3">
        <span
          className="grid size-11 place-items-center rounded-xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_8px_18px_-8px_rgba(28,24,21,0.3)]"
          style={{
            background: `linear-gradient(135deg, ${service.accent} 0%, ${service.accent}aa 100%)`,
          }}
        >
          {service.icon}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {service.timeline}
        </span>
      </div>

      <h3 className="relative mt-5 text-balance text-2xl font-semibold tracking-tight md:text-[1.7rem]">
        {service.name}
      </h3>
      <p className="relative mt-1 font-display text-base italic text-muted-foreground">
        {service.tagline}
      </p>

      <p className="relative mt-5 text-sm leading-relaxed text-foreground/80">
        <span className="font-medium text-foreground">Best for: </span>
        {service.bestFor}
      </p>

      <div
        aria-hidden
        className="relative my-6 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(28,24,21,0.1), transparent)",
        }}
      />

      <ul className="relative space-y-2.5">
        {service.includes.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm text-foreground/85">
            <span
              className="mt-1 inline-grid size-4 shrink-0 place-items-center rounded-full"
              style={{ background: `${service.accent}1f`, color: service.accent }}
            >
              <Check size={10} strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>

      {service.proof && (
        <p className="relative mt-6 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] px-3.5 py-2.5 text-xs italic leading-relaxed text-muted-foreground">
          {service.proof}
        </p>
      )}

      <div className="relative mt-7 flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Pricing
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground">
          Rates on request
        </span>
      </div>

      <Link
        href="/contact"
        className="relative mt-5 inline-flex items-center justify-between gap-2 rounded-full border-2 border-foreground bg-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        Start the conversation
        <ArrowUpRight size={14} />
      </Link>
    </article>
  );
}

function FitCard({
  kind,
  title,
  accent,
  items,
}: {
  kind: "fit" | "nofit";
  title: string;
  accent: string;
  items: string[];
}) {
  const Icon = kind === "fit" ? Check : Minus;
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-foreground/[0.08] bg-white paper p-7"
      style={{ boxShadow: `inset 0 -3px 0 ${accent}` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ background: accent }}
      />
      <span
        className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground sticker"
      >
        <span className="size-1.5 rounded-full" style={{ background: accent }} />
        {title}
      </span>
      <ul className="mt-5 space-y-3">
        {items.map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-sm text-foreground/85 md:text-[15px]">
            <span
              className="mt-0.5 inline-grid size-5 shrink-0 place-items-center rounded-full"
              style={{ background: `${accent}1f`, color: accent }}
            >
              <Icon size={12} strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
