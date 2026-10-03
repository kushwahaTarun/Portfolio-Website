export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: number;
  role: string;
  stack: string[];
  techDetails: { name: string; detail: string }[];
  href?: string;
  repo?: string;
  featured?: boolean;
  size?: "sm" | "md" | "lg";
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "rag-knowledge-assistant",
    title: "RAG Knowledge Assistant",
    tagline: "Ask questions across your own documents",
    description:
      "A document question-answering app that accepts pasted text and uploads, extracts and chunks content, stores embeddings, retrieves relevant passages, and streams grounded answers through a separate API.",
    year: 2026,
    role: "Active project",
    stack: ["Next.js", "TypeScript", "Express", "Supabase", "Gemini", "pgvector"],
    techDetails: [
      { name: "Next.js + TypeScript", detail: "App Router interface for document management and streamed chat responses." },
      { name: "Express", detail: "Separate API handles ingestion, chunking, embedding, retrieval, and answer generation." },
      { name: "Supabase", detail: "Authentication, PostgreSQL data, and uploaded file storage." },
      { name: "Gemini", detail: "Creates document embeddings and generates answers grounded in retrieved context." },
      { name: "pgvector", detail: "Similarity matching retrieves relevant document chunks for a question." },
    ],
    repo: "https://github.com/kushwahaTarun/rag-knowledge-assistant",
    featured: true,
    size: "md",
    accent: "#38bdf8",
  },
  {
    slug: "tool-calling-research-agent",
    title: "Tool-Calling Research Agent",
    tagline: "An agent that searches, reads, and reports",
    description:
      "A streaming research assistant that calls web-search and page-extraction tools, then returns findings in a chat interface. The app includes a separate API and persists conversations and messages.",
    year: 2026,
    role: "Active project",
    stack: ["Next.js", "TypeScript", "Express", "OpenRouter", "Tavily", "Supabase"],
    techDetails: [
      { name: "Next.js + TypeScript", detail: "Chat interface consumes server-sent events and displays agent progress." },
      { name: "Express 5", detail: "API coordinates model requests, tool execution, streaming, and persistence." },
      { name: "OpenRouter", detail: "Model API with structured tool calls and a bounded multi-step agent loop." },
      { name: "Tavily", detail: "Web search and page extraction tools provide current source material." },
      { name: "Supabase", detail: "Stores conversation and message records." },
    ],
    repo: "https://github.com/kushwahaTarun/Tool-Calling-Research-Agent",
    featured: true,
    size: "md",
    accent: "#a78bfa",
  },
  {
    slug: "content-repurposing-tool",
    title: "Content Repurposing Tool",
    tagline: "Turn source material into short-form scripts",
    description:
      "An AI application that takes user-provided source text and generates hooks, short-form video scripts, and captions through a Next.js interface and an Express API.",
    year: 2026,
    role: "Active project",
    stack: ["Next.js", "React", "TypeScript", "Express", "Gemini", "Tailwind CSS"],
    techDetails: [
      { name: "Next.js + React", detail: "Responsive interface for entering source material and reviewing generated content." },
      { name: "Express", detail: "Provides the generation endpoint and keeps model calls on the server." },
      { name: "Gemini Interactions API", detail: "Uses a content-generation prompt to produce hooks, reel scripts, and captions." },
      { name: "Tailwind CSS", detail: "Utility styling for the application interface." },
    ],
    repo: "https://github.com/kushwahaTarun/Content-Repurposing-Tool",
    featured: true,
    size: "md",
    accent: "#fb7185",
  },
  {
    slug: "qr-digital-dining",
    title: "QR Digital Dining",
    tagline: "A guest ordering flow backed by a restaurant API",
    description:
      "A multi-app QR dining project spanning a customer interface, staff dashboard, and NestJS API. The backend models restaurants, menus, dining sessions, and orders, with signed table access and staff authentication.",
    year: 2026,
    role: "Active project",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "JWT"],
    techDetails: [
      { name: "Next.js", detail: "Separate customer and staff-facing applications." },
      { name: "NestJS + TypeScript", detail: "REST API for restaurant data, menu operations, dining sessions, and order endpoints." },
      { name: "PostgreSQL + Prisma", detail: "Relational persistence and schema for restaurant, menu, session, and order data." },
      { name: "Signed table sessions", detail: "HMAC-signed tokens establish access to a table session; staff routes use JWT authentication." },
      { name: "Current scope", detail: "The customer checkout and payment/loyalty flow still uses browser-side mock data; backend order endpoints are implemented separately." },
    ],
    repo: "https://github.com/kushwahaTarun/QR-Ordering-Interface-Backend",
    featured: true,
    size: "md",
    accent: "#34d399",
  },
];

export const featuredProjects = projects;
