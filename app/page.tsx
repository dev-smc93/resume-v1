import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Navigation from "@/components/layout/Navigation";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <div id="hero">
        <Hero />
      </div>
      <Section id="experience" title="경력" className="bg-gray-50 dark:bg-gray-800">
        <Experience />
      </Section>
      <Section id="skills" title="기술 스택" className="bg-white dark:bg-gray-900">
        <Skills />
      </Section>
      <Section id="projects" title="프로젝트" className="bg-gray-50 dark:bg-gray-800">
        <Projects />
      </Section>
      <Section id="education" title="학력" className="bg-white dark:bg-gray-900">
        <Education />
      </Section>
      <Section id="contact" title="연락처" className="bg-gray-50 dark:bg-gray-800">
        <Contact />
      </Section>
      <footer className="bg-gray-900 dark:bg-black text-white text-center py-8">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
