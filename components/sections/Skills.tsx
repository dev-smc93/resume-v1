"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { skills } from "@/data/resume-data";
import { useSectionInView } from "@/hooks/useSectionInView";
import { handleImageError } from "@/utils/image";
import { ANIMATION_DURATION } from "@/constants/animations";

const skillTagClassName =
  "px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-md flex items-center gap-2";

export default function Skills() {
  const [ref, inView] = useSectionInView();

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {skills.map((skillGroup, groupIndex) => (
        <motion.div
          key={skillGroup.category}
          className="bg-gray-800 dark:bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL, delay: groupIndex * 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-blue-400 dark:text-blue-600">
            {skillGroup.category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {skillGroup.items.map((skill) => {
              const skillName = typeof skill === "string" ? skill : skill.name;
              const skillImage = typeof skill === "string" ? undefined : skill.image;
              const skillLink = typeof skill === "string" ? undefined : skill.link;
              const skillKey = typeof skill === "string" ? skill : skill.name;

              const content = (
                <>
                  {skillImage && (
                    <Image
                      src={skillImage}
                      alt={skillName}
                      width={20}
                      height={20}
                      sizes="20px"
                      className="object-contain w-5 h-5"
                      unoptimized={skillImage.endsWith(".svg")}
                      onError={(e) => handleImageError(e as React.SyntheticEvent<HTMLImageElement, Event>)}
                    />
                  )}
                  <span>{skillName}</span>
                </>
              );

              if (skillLink) {
                return (
                  <a
                    key={skillKey}
                    href={skillLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${skillTagClassName} cursor-pointer hover:opacity-90 transition-opacity`}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={skillKey} className={skillTagClassName}>
                  {content}
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
