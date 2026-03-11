"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experiences } from "@/data/resume-data";
import { useSectionInView } from "@/hooks/useSectionInView";
import { handleImageError } from "@/utils/image";
import { ANIMATION_DURATION } from "@/constants/animations";

export default function Experience() {
  const [ref, inView] = useSectionInView();

  return (
    <div ref={ref} className="space-y-8">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          className="relative pl-8 border-l-4 border-blue-400 dark:border-blue-500"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL, delay: index * 0.2 }}
        >
          <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-400 dark:bg-blue-500 rounded-full border-4 border-gray-800 dark:border-white"></div>
          
          <motion.div
            className="bg-gray-800 dark:bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <Briefcase className="text-blue-400 dark:text-blue-500" size={24} />
                <h3 className="text-2xl font-bold text-gray-100 dark:text-gray-800">
                  {exp.position}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600">
                <Calendar size={18} />
                <span className="text-sm">{exp.period}</span>
              </div>
            </div>

            <div className="mb-4">
              {exp.link ? (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group cursor-pointer transition-colors duration-200"
                >
                  {exp.logo && (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={40}
                      height={40}
                      sizes="40px"
                      className="object-contain rounded-lg bg-white dark:bg-gray-100 p-1 group-hover:opacity-80 transition-opacity"
                      onError={(e) => handleImageError(e as React.SyntheticEvent<HTMLImageElement, Event>)}
                    />
                  )}
                  <h4 className="text-xl font-semibold text-blue-400 dark:text-blue-600 group-hover:text-blue-300 dark:group-hover:text-blue-500 transition-colors">
                    {exp.company}
                  </h4>
                </a>
              ) : (
                <div className="flex items-center gap-3">
                  {exp.logo && (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={40}
                      height={40}
                      sizes="40px"
                      className="object-contain rounded-lg bg-white dark:bg-gray-100 p-1"
                      onError={(e) => handleImageError(e as React.SyntheticEvent<HTMLImageElement, Event>)}
                    />
                  )}
                  <h4 className="text-xl font-semibold text-blue-400 dark:text-blue-600">
                    {exp.company}
                  </h4>
                </div>
              )}
            </div>

            <ul className="space-y-2 mb-4">
              {exp.description.map((desc, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-gray-300 dark:text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: ANIMATION_DURATION.FAST, delay: index * 0.2 + i * 0.1 }}
                >
                  <span className="text-blue-400 dark:text-blue-500 mt-1">•</span>
                  <span>{desc}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {exp.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  className="px-2 py-1 bg-gray-700 dark:bg-gray-100 text-gray-300 dark:text-gray-700 rounded-lg text-xs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.2 + i * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
