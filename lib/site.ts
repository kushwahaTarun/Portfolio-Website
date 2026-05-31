export const siteConfig = {
  name: "Tarun Kushwaha",
  role: "Senior React & Next.js Developer",
  tagline:
    "Senior frontend engineer building production React and Next.js apps — open to full-time roles and freelance work.",
  description:
    "Tarun Kushwaha — Team Lead & Senior React / Next.js engineer with 4 years at Fluid AI. Open to full-time roles and freelance engagements.",
  url: "https://tarunkushwaha.dev",
  ogImage: "/og.png",
  email: "kushwahatarun9@gmail.com",
  phone: "+91-8874500350",
  location: "Kanpur, India",
  availability: "Open to full-time roles & freelance work",
  links: {
    github: "https://github.com/kushwahaTarun",
    linkedin: "https://www.linkedin.com/in/tarun-kushwaha-413363213",
    resume: "/tarun_resume.pdf",
  },
  nav: [
    { label: "Work", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Stack", href: "/uses" },
    { label: "Now", href: "/now" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
