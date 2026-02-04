import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Navigation from "@/components/layout/Navigation";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import EducationAndMilitary from "@/components/sections/EducationAndMilitary";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 dark:bg-white">
      <Navigation />
      <div id="hero">
        <Hero />
      </div>
      <Section id="experience" title="경력" className="bg-gray-800 dark:bg-gray-50">
        <Experience />
      </Section>
      <Section id="skills" title="기술 스택" className="bg-gray-900 dark:bg-white">
        <Skills />
      </Section>
      <Section id="projects" title="프로젝트" className="bg-gray-800 dark:bg-gray-50">
        <Projects />
      </Section>
      <Section id="education" title="학력 및 병적" className="bg-gray-900 dark:bg-white">
        <EducationAndMilitary />
      </Section>
      <Section id="certifications" title="자격 및 수상" className="bg-gray-800 dark:bg-gray-50 !py-28 min-h-[70vh]">
        <Certifications />
      </Section>
      <Section id="contact" title="연락처" className="bg-gray-900 dark:bg-white">
        <Contact />
      </Section>
      <footer className="bg-black dark:bg-gray-100 text-gray-400 dark:text-gray-600 text-center py-8">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
