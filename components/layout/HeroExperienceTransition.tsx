"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import { useScrollLock } from "@/contexts/ScrollLockContext";
import { getLockedScrollYSync } from "@/utils/scrollLockSync";

export default function HeroExperienceTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);
  const { lockedScrollY } = useScrollLock();
  const lockedScrollYVal = getLockedScrollYSync() ?? lockedScrollY;

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "end start"],
  });

  // Hero: 고정(fixed), Experience가 올라올 때 페이드아웃
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Experience: 스크롤 시 아래에서 위로 슬라이드 업
  const experienceY = useTransform(scrollYProgress, [0, 1], ["100vh", "0px"]);

  // Experience: 반투명에서 스크롤 진행 시 100% 불투명으로
  const experienceOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  // Hero 페이드아웃 시 pointer-events: none으로 전환 → 아래 섹션 클릭 가능하도록
  const heroPointerEvents = useTransform(scrollYProgress, [0, 0.3], ["auto", "none"]);

  // 모달 열림 시 body가 position:fixed 되어 window.scrollY가 0으로 리셋됨 → Hero가 다시 보이는 현상 방지 (동기 변수 우선, prod 배치 이슈 대응)
  const lockedOpacity = lockedScrollYVal !== null && typeof window !== "undefined"
    ? Math.max(0, 1 - lockedScrollYVal / window.innerHeight)
    : null;
  const lockedPointerEvents = lockedScrollYVal !== null && typeof window !== "undefined"
    ? (lockedScrollYVal / window.innerHeight > 0.3 ? "none" : "auto")
    : null;

  return (
    <>
      {/* Hero - 고정, 스크롤해도 움직이지 않음 */}
      <motion.div
        id="hero"
        className="fixed inset-0 w-full h-screen min-h-[100svh] z-10"
        style={{
          opacity: lockedOpacity !== null ? lockedOpacity : heroOpacity,
          pointerEvents: lockedPointerEvents !== null ? lockedPointerEvents : heroPointerEvents,
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
        style={{ y: experienceY, opacity: experienceOpacity }}
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
