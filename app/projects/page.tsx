import type { Metadata } from "next";
import { ProjectsContent } from "./ProjectsContent";
import { siteConfig } from "@/lib/site";

const projectsTitle = `Projects — ${siteConfig.name}`;
const projectsDescription =
  "Selected work by Tarun Kushwaha — production React / Next.js products, design systems, AI-driven interfaces, and creative engineering builds.";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsDescription,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/projects`,
    title: projectsTitle,
    description: projectsDescription,
    siteName: siteConfig.name,
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
