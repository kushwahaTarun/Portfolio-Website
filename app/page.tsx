import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Projects } from "@/components/home/Projects";
import { Experience } from "@/components/home/Experience";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";
import { siteConfig } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/tarun_avatar.png`,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  description: siteConfig.description,
  mainEntityOfPage: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kanpur",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Redux Toolkit",
    "RTK Query",
    "Tailwind CSS",
    "Frontend Architecture",
    "Web Performance",
    "AI-powered applications",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: `${siteConfig.name} — Portfolio`,
  url: siteConfig.url,
  inLanguage: "en",
  publisher: { "@id": `${siteConfig.url}/#person` },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
      />
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Experience />
      <Stack />
      <Contact />
    </>
  );
}
