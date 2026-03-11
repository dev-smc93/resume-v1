"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowDown, MessageCircle, User } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import VisitCounter from "@/components/ui/VisitCounter";
import VisitCounterModal from "@/components/ui/VisitCounterModal";
import { scrollToSection } from "@/utils/scroll";
import { captureScrollY } from "@/utils/personalInfoModalScroll";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  },
};

const scrollIndicatorVariants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  },
};

export default function Hero() {
  const typingTexts = personalInfo.typingTexts || ["개발자"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [visitCount, setVisitCount] = useState(0);
  const [isVisitCounterModalOpen, setIsVisitCounterModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const tryPlay = () => video.play().catch(() => {});
    video.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();
    const t = setTimeout(tryPlay, 800);
    return () => { clearTimeout(t); video.removeEventListener("canplay", tryPlay); };
  }, []);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // 타이핑 중
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
          setTypingSpeed(100);
        } else {
          // 타이핑 완료 후 잠시 대기
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // 삭제 중
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
          setTypingSpeed(50);
        } else {
          // 삭제 완료 후 다음 텍스트로
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typingTexts, typingSpeed]);

  // 방문 카운트 증가 및 조회
  useEffect(() => {
    const incrementVisitCount = async () => {
      try {
        const response = await fetch("/api/visits", { method: "POST" });
        if (response.ok) {
          const data = await response.json();
          setVisitCount(data.count);
        }
      } catch (error) {
        try {
          const response = await fetch("/api/visits");
          if (response.ok) {
            const data = await response.json();
            setVisitCount(data.count);
          }
        } catch (err) {}
      }
    };

    incrementVisitCount();

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("/api/visits");
        if (response.ok) {
          const data = await response.json();
          setVisitCount(data.count);
        }
      } catch (error) {}
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-screen min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-blue-50 dark:via-white dark:to-purple-50 overflow-hidden">
      {/* MP4 백그라운드 비디오 (무한 재생, 음소거) - public/video/hero/background.mp4 */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: "cover" }}
          aria-hidden
        >
          <source src="/video/hero/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 dark:bg-gradient-to-br dark:from-blue-950/40 dark:via-gray-900/30 dark:to-purple-950/40" aria-hidden />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl overflow-hidden relative cursor-pointer group"
            style={{ borderRadius: "50%" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => { captureScrollY(); window.dispatchEvent(new CustomEvent("openPersonalInfoModal")); }}
          >
            {personalInfo.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover rounded-full"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
            )}
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-center flex flex-col items-center gap-2"
          variants={itemVariants}
        >
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {currentText}
              </span>
              <span className="animate-blink-fast text-blue-600 relative -top-1">|</span>
            </div>
          <span className="text-gray-300 dark:text-gray-600 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] dark:[text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">이런 분 찾고 있나요?</span>
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-10"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => { captureScrollY(); window.dispatchEvent(new CustomEvent("openPersonalInfoModal")); }}
            className="flex items-center justify-center gap-2 px-4 py-3 md:px-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:from-teal-600 hover:to-cyan-600 transition-colors shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <User size={20} />
            <span className="hidden md:inline">인적사항</span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("contact")}
            className="flex items-center justify-center gap-2 px-4 py-3 md:px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            <span className="hidden md:inline">문의하기</span>
          </motion.button>
        </motion.div>

        {/* 방문 카운터 - 스크롤하여 더 보기 위에 표시 */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <VisitCounter 
            count={visitCount} 
            onClick={() => setIsVisitCounterModalOpen(true)}
          />
        </motion.div>

        <motion.div 
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("experience")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-base md:text-lg text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-600 transition-colors">
            스크롤하여 더 보기
          </span>
          <motion.div
            variants={scrollIndicatorVariants}
            animate="animate"
          >
            <ArrowDown size={24} className="text-gray-400" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 방문 카운터 모달 */}
      <VisitCounterModal
        isOpen={isVisitCounterModalOpen}
        onClose={() => setIsVisitCounterModalOpen(false)}
      />
    </section>
  );
}
