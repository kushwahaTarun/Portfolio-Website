export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "RTK Query",
      "React Flow",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "Backend & Data",
    items: [
      "Node.js",
      "REST APIs",
      "WebSockets",
      "Firebase",
      "MongoDB",
      "Authentication",
      "Multi-tenancy",
    ],
  },
  {
    label: "Tooling & DevOps",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "CI/CD Pipelines",
      "Playwright",
      "Playwright Automation",
      "On-prem Deployment",
    ],
  },
  {
    label: "Practices",
    items: [
      "Full-stack delivery",
      "Code reviews",
      "Mentoring",
      "Performance optimization",
      "Scalable architecture",
      "Component-driven dev",
      "E2E testing",
      "Agile delivery",
    ],
  },
];

export const marqueeStack: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Redux Toolkit",
  "RTK Query",
  "Tailwind",
  "Bootstrap",
  "Material UI",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Docker",
  "Playwright",
  "React Flow",
  "GitLab",
  "CI/CD",
];
