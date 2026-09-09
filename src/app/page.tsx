import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { FiberSkills } from "@/components/sections/FiberSkills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <FiberSkills />
      <ProjectShowcase />
      <Education />
      <Contact />
    </>
  );
}
