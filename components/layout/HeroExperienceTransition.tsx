"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";

export default function HeroExperienceTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "end start"],
  });

  // Hero: 고정(fixed), Experience가 올라올 때 페이드아웃
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Experience: 스크롤 시 아래에서 위로 슬라이드 업
  const experienceY = useTransform(scrollYProgress, [0, 1], ["100vh", "0px"]);

  // Hero 페이드아웃 시 pointer-events: none으로 전환 → 아래 섹션 클릭 가능하도록
  const heroPointerEvents = useTransform(scrollYProgress, [0, 0.3], ["auto", "none"]);

  return (
    <>
      {/* Hero - 고정, 스크롤해도 움직이지 않음 */}
      <motion.div
        id="hero"
        className="fixed inset-0 w-full h-screen min-h-[100svh] z-10"
        style={{
          opacity: heroOpacity,
          pointerEvents: heroPointerEvents,
        }}
      >
        <div className="w-full h-full">
          <Hero />
        </div>
      </motion.div>

      {/* 전환 스크롤 영역: 100vh 스크롤 시 Experience 슬라이드업 */}
      <div ref={transitionRef} className="relative h-screen min-h-[100svh]" aria-hidden />

      {/* Experience - 전환 영역 아래, 스크롤 시 아래에서 올라옴 */}
      <motion.section
        id="experience"
        className="relative z-20 py-20 px-6 bg-gray-800 dark:bg-gray-50"
        style={{ y: experienceY }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            경력
          </h2>
          <Experience />
        </div>
      </motion.section>
    </>
  );
}
