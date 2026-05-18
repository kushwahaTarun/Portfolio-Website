export const siteConfig = {
  name: "Tarun Kushwaha",
  role: "Senior React & Next.js Developer",
  tagline:
    "Frontend engineer who likes React, Next.js, and the parts of the web that feel like magic.",
  description:
    "Tarun Kushwaha — frontend engineer from Kanpur, India. I build React and Next.js apps and dabble in the rest of the MERN stack on the side.",
  url: "https://tarunkushwaha.dev",
  ogImage: "/og.png",
  email: "kushwahatarun9@gmail.com",
  phone: "+91-8874500350",
  location: "Kanpur, India",
  availability: "Currently open to work",
  links: {
    github: "https://github.com/kushwahaTarun",
    linkedin: "https://www.linkedin.com/in/tarun-kushwaha-413363213",
    twitter: "https://twitter.com/",
    resume: "/resume.pdf",
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
