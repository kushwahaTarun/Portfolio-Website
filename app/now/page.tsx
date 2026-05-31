import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Contact } from "@/components/home/Contact";
import { siteConfig } from "@/lib/site";

const nowTitle = `Now — ${siteConfig.name}`;
const nowDescription =
  "What Tarun Kushwaha is focused on right now — current work at Fluid AI, side projects, what I'm learning, and what I'm open to. Inspired by Derek Sivers' /now page.";

export const metadata: Metadata = {
  title: "Now",
  description: nowDescription,
  alternates: { canonical: "/now" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/now`,
    title: nowTitle,
    description: nowDescription,
    siteName: siteConfig.name,
  },
};

const now = [
  {
    label: "At work",
    items: [
      "Working on the Fluid GPT frontend — mostly performance, caching, and making the app feel a bit less heavy.",
      "Helping a couple of clients get the platform running on their own servers.",
    ],
  },
  {
    label: "Learning",
    items: [
      "The new App Router patterns in Next.js 16 — Server Components still surprise me sometimes.",
      "GLSL and WebGL, slowly. Hoping one of these shader demos turns into something real.",
      "Reading more about how good motion design works in product UIs.",
    ],
  },
  {
    label: "On the side",
    items: [
      "Interactive Avatar — a small Next.js app that lets you actually talk to an AI face.",
      "A Gen-AI chat with voice in and out. Probably my favourite weekend build of the year.",
      "This site. Which I keep redesigning instead of finishing other things.",
    ],
  },
  {
    label: "Listening to / reading",
    items: [
      "A lot of Hindi indie and lo-fi while I code.",
      "Refactoring UI (still my favorite frontend book).",
      "Whatever Lee Robinson and Theo just posted, probably.",
    ],
  },
  {
    label: "Open for",
    items: [
      "Freelance full-stack engagements — Next.js front-ends, Node / Mongo back-ends, Docker deploys. Audits, MVPs, and pair consulting. Details on the services page.",
      "Interesting frontend or full-stack roles — remote or hybrid.",
      "Pairing with newer devs who are trying to figure out React.",
    ],
  },
];

export default function NowPage() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <>
      <PageHero
        eyebrow={`Now — updated ${today}`}
        prefix="What I'm up to"
        highlight="right now."
        underlineWidth="78%"
        description={
          <p>
            A tiny, honest snapshot of what&apos;s taking up my brain this
            month — updated whenever life or work shifts gears. Inspired by
            Derek Sivers&apos;{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              /now
            </a>{" "}
            page.
          </p>
        }
      />

      <Section className="py-16 md:py-28">
        <div className="grid gap-8 md:grid-cols-2">
          {now.map((block) => (
            <div
              key={block.label}
              className="rounded-2xl border border-foreground/[0.08] bg-white paper p-7"
            >
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {block.label}
              </h2>
              <ul className="space-y-3 text-pretty text-base text-foreground/85 md:text-lg">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Contact />
    </>
  );
}
