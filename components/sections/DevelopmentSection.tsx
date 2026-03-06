import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";

interface DevelopmentSectionProps {
  hideDev: boolean;
}

export default function DevelopmentSection({ hideDev }: DevelopmentSectionProps) {
  if (hideDev) return null;

  return (
    <section id="dev-related" className="py-20 px-6 bg-gray-900 dark:bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          개발 관련
        </h2>
        <div id="skills">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-400 dark:text-gray-600">
            기술 스택
          </h3>
          <Skills />
        </div>
        <div id="projects" className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-400 dark:text-gray-600">
            프로젝트
          </h3>
          <Projects />
        </div>
      </div>
    </section>
  );
}
