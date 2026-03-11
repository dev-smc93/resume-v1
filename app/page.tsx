import Hero from "@/components/sections/Hero";
import Section from "@/components/ui/Section";
import Navigation from "@/components/layout/Navigation";
import Experience from "@/components/sections/Experience";
import DevelopmentSection from "@/components/sections/DevelopmentSection";
import EducationAndMilitary from "@/components/sections/EducationAndMilitary";
import Certifications from "@/components/sections/Certifications";
import QnA from "@/components/sections/QnA";
import Contact from "@/components/sections/Contact";
import PersonalInfoModalGate from "@/components/ui/PersonalInfoModalGate";
import { personalInfo } from "@/data/resume-data";
import { Github } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ dev?: string }>;
}) {
  const params = await searchParams;
  const hideDev = params.dev === "false";

  return (
    <main className="min-h-screen min-h-[100svh] bg-gray-900 dark:bg-white">
      <Navigation hideDev={hideDev} />
      <div id="hero">
        <Hero />
      </div>
      <Section id="experience" title="경력" className="bg-gray-800 dark:bg-gray-50">
        <Experience />
      </Section>
      <DevelopmentSection hideDev={hideDev} />
      <Section id="education" title="학력 및 병역" className="bg-gray-900 dark:bg-white">
        <EducationAndMilitary />
      </Section>
      <Section id="certifications" title="자격 및 수상" className="bg-gray-800 dark:bg-gray-50 !py-28 min-h-[70vh] min-h-[70svh]">
        <Certifications />
      </Section>
      <Section id="qna" title="Q&A" className="bg-gray-800 dark:bg-gray-50">
        <QnA />
      </Section>
      <Section id="contact" title="문의하기" className="bg-gray-900 dark:bg-white">
        <Contact />
      </Section>
      <PersonalInfoModalGate />
      <footer className="bg-black dark:bg-gray-100 text-gray-400 dark:text-gray-600 text-center py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0">
          <p className="text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} sungman93. resume.
          </p>
          {personalInfo.githubUrl && (
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </footer>
    </main>
  );
}
