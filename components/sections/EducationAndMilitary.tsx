"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Calendar } from "lucide-react";
import { education } from "@/data/resume-data";

export default function EducationAndMilitary() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div ref={ref} className="space-y-6">
      {education.map((edu, index) => (
        <motion.div
          key={index}
          className="bg-gray-800 dark:bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-900 dark:bg-blue-100 rounded-lg">
              <GraduationCap className="text-blue-400 dark:text-blue-600" size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-100 dark:text-gray-800 mb-2">
                {edu.school}
              </h3>
              <p className="text-xl text-blue-400 dark:text-blue-600 mb-3">
                {edu.degree}
              </p>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600 mb-2">
                <Calendar size={18} />
                <span>{edu.period}</span>
              </div>
              {edu.description && (
                <p className="text-gray-400 dark:text-gray-600 mt-3">
                  {edu.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
