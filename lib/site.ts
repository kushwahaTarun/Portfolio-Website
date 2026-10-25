export const siteConfig = {
  name: "Tarun Kushwaha",
  role: "Senior React & Next.js Developer",
  tagline:
    "Web developer in Kanpur building responsive websites and full-stack apps with React, Next.js, and Node.js.",
  description:
    "Tarun Kushwaha is a web developer in Kanpur, India, building responsive websites and full-stack apps with React, Next.js, and Node.js. Available for freelance projects.",
  url: "https://tarunkushwaha.in",
  ogImage: "/opengraph-image",
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
