"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/data/resume-data";

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {skills.map((skillGroup, groupIndex) => (
        <motion.div
          key={skillGroup.category}
          className="bg-gray-800 dark:bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-blue-400 dark:text-blue-600">
            {skillGroup.category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {skillGroup.items.map((skill, skillIndex) => (
              <motion.div
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-md"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  delay: groupIndex * 0.2 + skillIndex * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
