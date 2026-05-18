import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/lib/site";
import { Experience } from "@/components/home/Experience";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";

const aboutTitle = `About — ${siteConfig.name}`;
const aboutDescription = `${siteConfig.name} is a Team Lead and Senior React / Next.js engineer based in Kanpur, India. 4+ years shipping production React at Fluid AI. Principles, off-hours, and how I think about the work.`;

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: `${siteConfig.url}/about`,
    title: aboutTitle,
    description: aboutDescription,
    siteName: siteConfig.name,
  },
};

export default function AboutPage() {
  const totalYears = new Date().getFullYear() - 2022;
  return (
    <>
      <PageHero
        eyebrow="About"
        prefix="A frontend dev who got"
        highlight="curious."
        underlineWidth="62%"
        description={
          <p>
            I&apos;m Tarun. I live in Kanpur, India, and I&apos;ve been writing
            React professionally for {totalYears}+ years — currently at Fluid AI,
            where I work on an AI workspace product. On the weekends I&apos;m
            usually playing with whatever new AI SDK just came out.
          </p>
        }
      />

      <Section className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SubHeading accent="orange" eyebrow="Principles">
              How I think about the work
            </SubHeading>
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
            <SubHeading accent="cyan" eyebrow="Off-hours">
              When I&apos;m not coding
            </SubHeading>
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
      <Contact />
    </>
  );
}

const accentMap = {
  orange: "bg-[--color-brand-orange]",
  cyan: "bg-[--color-brand-cyan]",
  lime: "bg-[--color-brand-lime]",
  pink: "bg-[--color-brand-pink]",
  indigo: "bg-[--color-brand-indigo]",
} as const;

function SubHeading({
  eyebrow,
  accent = "orange",
  children,
}: {
  eyebrow: string;
  accent?: keyof typeof accentMap;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground sticker">
        <span className={`size-1.5 rounded-full ${accentMap[accent]}`} />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {children}
      </h2>
    </div>
  );
}
