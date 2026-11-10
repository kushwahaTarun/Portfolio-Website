export const siteConfig = {
  name: "Tarun Kushwaha",
  role: "Senior React & Next.js Developer",
  tagline:
    "Senior React and Next.js developer in Kanpur, India, building responsive websites, web applications, and full-stack products for teams in India and remote markets.",
  description:
    "Tarun Kushwaha is a Senior React and Next.js developer and team lead based in Kanpur, India. He builds responsive websites, custom web applications, and full-stack products using React, Next.js, TypeScript, Node.js, and modern web technologies. Open to suitable remote roles and carefully scoped freelance projects.",
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
