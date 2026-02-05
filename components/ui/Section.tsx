"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";
import { ANIMATION_DURATION } from "@/constants/animations";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = "" }: SectionProps) {
  const [ref, inView] = useSectionInView();

  return (
    <section id={id} className={`py-20 px-6 ${className}`} ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL }}
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
