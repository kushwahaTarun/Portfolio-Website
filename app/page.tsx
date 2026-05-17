import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Skills } from "@/components/home/Skills";
import { Projects } from "@/components/home/Projects";
import { Currently } from "@/components/home/Currently";
import { Experience } from "@/components/home/Experience";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <About />
      <Projects />
      <Currently />
      <Experience />
      <Stack />
      <Contact />
    </>
  );
}
