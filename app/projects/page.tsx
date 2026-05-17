import type { Metadata } from "next";
import { ProjectsContent } from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work — products, design systems, and creative engineering builds.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
