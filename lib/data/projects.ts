export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: number;
  role: string;
  stack: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
  size?: "sm" | "md" | "lg";
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "fluid-gpt-admin",
    title: "Fluid GPT Admin",
    tagline: "An AI workspace for the enterprise crowd",
    description:
      "The platform I spend most of my workdays in — a multi-tenant AI workspace with a knowledge base, chat, and a visual workflow editor. I owned the frontend architecture, made it on-prem-friendly, and got page loads down by roughly 80% with smarter caching.",
    year: 2025,
    role: "Day job",
    stack: ["Next.js", "TypeScript", "Redux Toolkit", "RTK Query", "Tailwind", "Docker"],
    featured: true,
    size: "lg",
    accent: "#ffb547",
  },
  {
    slug: "agentic-workflow-editor",
    title: "Workflow Editor",
    tagline: "A canvas for chaining AI actions together",
    description:
      "Drag-and-drop nodes, conditional edges, the works. Built on React Flow to let non-developers wire up AI workflows without touching code.",
    year: 2024,
    role: "Day job",
    stack: ["React Flow", "TypeScript", "Redux Toolkit", "Tailwind"],
    featured: true,
    size: "md",
    accent: "#7dd3fc",
  },
  {
    slug: "fluid-chatbot-platform",
    title: "Conversational Platform",
    tagline: "A chatbot product used by 50+ teams",
    description:
      "My first real production codebase — a multi-tenant chatbot with video calling and co-browsing baked in. I learned most of what I know about scaling React here.",
    year: 2023,
    role: "Day job",
    stack: ["React", "Redux", "JavaScript", "Bootstrap", "WebRTC"],
    featured: true,
    size: "md",
    accent: "#c084fc",
  },
  {
    slug: "interactive-avatar",
    title: "Interactive Avatar",
    tagline: "Talking to an AI face in real time",
    description:
      "A weekend experiment that turned into a small obsession. Real-time voice + video chat with an AI avatar using the HeyGen streaming SDK, wrapped in a clean Next.js shell.",
    year: 2025,
    role: "Side project",
    stack: ["Next.js", "HeyGen SDK", "React Context", "Tailwind", "Radix UI"],
    href: "#",
    repo: "#",
    size: "md",
    accent: "#fb7185",
  },
  {
    slug: "gen-ai-chat",
    title: "Gen-AI Chat",
    tagline: "ChatGPT-style UI with voice in and out",
    description:
      "I wanted to learn the new App Router and ended up building a chat app with speech-to-text, text-to-speech, Firebase auth, and a WebSocket stream. Containerized it for fun.",
    year: 2025,
    role: "Side project",
    stack: ["Next.js", "Redux Toolkit", "Firebase", "WebSockets", "Tailwind", "Docker"],
    href: "#",
    repo: "#",
    size: "md",
    accent: "#34d399",
  },
  {
    slug: "fluid-integrate-store",
    title: "Integrations Store",
    tagline: "One-click installs inside the platform",
    description:
      "A small but satisfying build — a marketplace inside the product where users browse, install, and configure integrations without leaving the page.",
    year: 2024,
    role: "Day job",
    stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind"],
    size: "sm",
    accent: "#f472b6",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
