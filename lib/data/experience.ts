export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    company: "Fluid AI",
    role: "Senior React & Next.js Developer",
    start: "Jan 2025",
    end: "Present",
    summary:
      "Owning a big chunk of the Fluid GPT frontend — performance, multitenancy, and the move to on-prem deployments. Most days are equal parts code, code review, and arguing about state-management patterns.",
    highlights: [
      "Got the cloud app running fully on-prem so enterprise clients can host it inside their own networks.",
      "Replaced ConfigCat with a custom tenant-level feature-flag system that reads from env vars at boot.",
      "Migrated to RTK Query and watched API calls drop ~85% and page loads improve ~80% on the heavy modules.",
      "Spent way too long getting the Playwright suite to run reliably on tenant-aware fixtures. Worth it.",
    ],
  },
  {
    company: "Fluid AI",
    role: "Senior React.js Developer",
    start: "Aug 2024",
    end: "Jan 2025",
    summary:
      "Promoted into the senior role and tasked with designing the Fluid GPT Admin frontend from scratch — Knowledge Base, Chat, Admin Settings, and the workflow editor that I'm still proud of.",
    highlights: [
      "Built the visual workflow editor on React Flow — draggable nodes, conditional edges, dynamic configs.",
      "Wrote the multitenancy layer that lets a single frontend serve every client.",
      "Set up a URL-config panel so backend devs could test the frontend against their Codespaces in real time.",
      "Shipped the Integrations Store — in-app marketplace for installable plugins.",
    ],
  },
  {
    company: "Fluid AI",
    role: "React.js Developer",
    start: "Jan 2022",
    end: "Aug 2024",
    summary:
      "First job out of college. Started on the chatbot platform and learned production React the hard way — bug by bug, PR review by PR review.",
    highlights: [
      "Shipped features into a multi-tenant chatbot used by 50+ teams across the world.",
      "Wired up video calling, co-browsing, and rich media into the chat UI.",
      "Spent a lot of time fixing UI on foldables and small screens; mobile retention thanked me.",
      "Learned Redux properly. Then learned why I'd eventually want RTK Query.",
    ],
  },
  {
    company: "Learnovate",
    role: "Frontend Intern",
    start: "2021",
    end: "2021",
    summary:
      "Month-long internship building the admin UI for a hotel-management product. Mostly a lesson in how much I still didn't know.",
    highlights: [
      "Designed and built admin panel components alongside the senior team.",
      "Hunted bugs, fixed flows, and learned what code review actually feels like.",
    ],
  },
];
