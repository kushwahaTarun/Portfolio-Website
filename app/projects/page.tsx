import type { Metadata } from "next";
import { ProjectsContent } from "./ProjectsContent";
import { siteConfig } from "@/lib/site";

const projectsTitle = `React, Next.js & Full-Stack Projects | ${siteConfig.name}`;
const projectsDescription =
  "Explore web application case studies by Tarun Kushwaha: a RAG knowledge assistant, tool-calling research agent, AI content repurposing app, and QR-based digital dining system. See architecture, technologies, and implementation decisions.";

export const metadata: Metadata = {
  title: "React, Next.js & Full-Stack Projects",
  description: projectsDescription,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: projectsTitle,
    description: projectsDescription,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: projectsTitle,
    description: projectsDescription,
    images: [siteConfig.ogImage],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
