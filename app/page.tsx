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
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/images/tarun_avatar.png`,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phone,
  description: siteConfig.description,
  worksFor: {
    "@type": "Organization",
    name: "Fluid AI",
  },
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
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Frontend Architecture",
    "Performance Optimization",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
