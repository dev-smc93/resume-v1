"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Youtube, FileText } from "lucide-react";
import { projects, type Project } from "@/data/resume-data";
import { useSectionInView } from "@/hooks/useSectionInView";
import { ANIMATION_DURATION } from "@/constants/animations";
import { handleImageError } from "@/utils/image";

// 데이터 필드 순서와 동일하게 표시 (link → manual → github → youtube)
const LINK_ORDER: { key: keyof Project; icon: typeof ExternalLink; label: string; className: string }[] = [
  { key: "link", icon: ExternalLink, label: "사이트", className: "text-blue-400 dark:text-blue-600 hover:text-blue-300 dark:hover:text-blue-700" },
  { key: "manual", icon: FileText, label: "매뉴얼", className: "text-amber-400 dark:text-amber-600 hover:text-amber-300 dark:hover:text-amber-700" },
  { key: "github", icon: Github, label: "코드", className: "text-gray-400 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-700" },
  { key: "youtube", icon: Youtube, label: "유튜브", className: "text-red-400 dark:text-red-600 hover:text-red-300 dark:hover:text-red-700" },
];

export default function Projects() {
  const [ref, inView] = useSectionInView();

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="bg-gray-800 dark:bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL, delay: index * 0.15 }}
          whileHover={{ y: -10 }}
        >
          <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden relative">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            ) : (
              <Code size={64} className="text-white opacity-50" />
            )}
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2 text-gray-100 dark:text-gray-800 group-hover:text-blue-400 dark:group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 dark:text-gray-600 mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-700 dark:bg-gray-100 text-gray-300 dark:text-gray-700 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              {LINK_ORDER.map(({ key, icon: Icon, label, className }) => {
                const url = project[key];
                if (typeof url !== "string" || !url) return null;
                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 transition-colors ${className}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{label}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
