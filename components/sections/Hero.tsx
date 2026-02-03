"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";
import { personalInfo } from "@/data/resume-data";
import PersonalityModal from "@/components/ui/PersonalityModal";

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
  const [isPersonalityModalOpen, setIsPersonalityModalOpen] = useState(false);

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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-blue-50 dark:via-white dark:to-purple-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
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
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl overflow-hidden relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {personalInfo.profileImage ? (
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
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
            
          {/* <span className="text-gray-300 dark:text-gray-600">필요하신가요?</span> */}
          <span className="text-gray-300 dark:text-gray-600">이런 분 찾고 있나요?</span>
        </motion.h1>

        <motion.p
          className="text-lg text-gray-400 dark:text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          variants={itemVariants}
        >
          {personalInfo.bio.split("성향").map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <button
                  onClick={() => setIsPersonalityModalOpen(true)}
                  className="text-blue-400 dark:text-blue-500 hover:text-blue-300 dark:hover:text-blue-400 underline cursor-pointer transition-colors"
                >
                  성향
                </button>
              )}
            </span>
          ))}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-16"
          variants={itemVariants}
        >
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
            <span>이메일</span>
          </motion.a>

          <motion.a
            href={`tel:${personalInfo.phone}`}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={20} />
            <span>전화</span>
          </motion.a>

          <motion.a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:from-pink-600 hover:to-pink-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MapPin size={20} />
            <span>{personalInfo.location}</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2"
          variants={scrollIndicatorVariants}
          animate="animate"
        >
          <span className="text-base md:text-lg text-gray-400 dark:text-gray-500">스크롤하여 더 보기</span>
          <ArrowDown size={24} className="text-gray-400" />
        </motion.div>
      </motion.div>

      {/* 성향 정보 모달 */}
      <PersonalityModal
        isOpen={isPersonalityModalOpen}
        onClose={() => setIsPersonalityModalOpen(false)}
      />
    </section>
  );
}
