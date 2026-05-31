import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { Contact } from "@/components/home/Contact";
import { siteConfig } from "@/lib/site";

const usesTitle = `Stack & Tools — ${siteConfig.name}`;
const usesDescription =
  "The hardware, editor setup, frontend stack, testing tools, and cloud services Tarun Kushwaha relies on every day. Inspired by uses.tech.";

export const metadata: Metadata = {
  title: "Stack & Tools",
  description: usesDescription,
  alternates: { canonical: "/uses" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/uses`,
    title: usesTitle,
    description: usesDescription,
    siteName: siteConfig.name,
  },
};

const groups = [
  {
    label: "Hardware",
    items: [
      ["Windows 11 dev machine", "Daily driver"],
      ["External monitor + ergo setup", "Second screen for docs & DevTools"],
      ["Mechanical keyboard", "Tactile switches for long sessions"],
      ["Wired headphones", "Calls and deep-focus mode"],
    ],
  },
  {
    label: "Editor & AI",
    items: [
      ["VS Code", "Daily editor — Geist Mono"],
      ["Claude Code", "AI pair on tap inside the terminal"],
      ["GitHub Copilot", "Autocomplete for the boring parts"],
      ["ESLint + Prettier", "Lint and format on save"],
    ],
  },
  {
    label: "Frontend Stack",
    items: [
      ["React.js + Next.js", "App Router by default"],
      ["TypeScript", "Strict mode, end-to-end"],
      ["Redux Toolkit + RTK Query", "State + cached data fetching"],
      ["Tailwind CSS", "Utility-first styling"],
      ["shadcn/ui + Radix", "Accessible component primitives"],
      ["Framer Motion", "Motion that earns its bytes"],
    ],
  },
  {
    label: "Testing & DevOps",
    items: [
      ["Playwright", "E2E + component tests"],
      ["Docker", "Local parity + on-prem packaging"],
      ["GitHub Actions", "CI/CD pipelines"],
      ["GitLab", "Some client repos live here"],
    ],
  },
  {
    label: "Browser & API",
    items: [
      ["Chrome + DevTools", "Daily browser"],
      ["React DevTools + Profiler", "Always open"],
      ["Postman", "API tinkering"],
      ["MongoDB Compass", "Document inspector"],
    ],
  },
  {
    label: "Cloud & Services",
    items: [
      ["Vercel", "Frontend deploys"],
      ["Firebase", "Auth + realtime for side projects"],
      ["Resend", "Transactional email"],
      ["HeyGen Streaming SDK", "AI avatar experiments"],
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <PageHero
        eyebrow="Uses"
        prefix="The tools I"
        highlight="reach for."
        underlineWidth="72%"
        description={
          <p>
            Inspired by{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              uses.tech
            </a>
            . The hardware, software, and quiet rituals that make the work
            happen.
          </p>
        }
      />

      <Section className="py-16 md:py-28">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.label}
              className="rounded-2xl border border-foreground/[0.08] bg-white paper p-7"
            >
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {g.label}
              </h2>
              <ul className="space-y-3.5">
                {g.items.map(([name, note]) => (
                  <li key={name} className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {name}
                    </span>
                    <span className="text-xs text-muted-foreground">{note}</span>
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
