"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  { name: "홈", href: "#hero" },
  { name: "경력", href: "#experience" },
  { name: "기술", href: "#skills" },
  { name: "프로젝트", href: "#projects" },
  { name: "학력", href: "#education" },
  { name: "자격 및 수상", href: "#certifications" },
  { name: "연락처", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // 현재 활성 섹션 감지
      const sections = navItems.map((item) => item.href.substring(1));
      const navHeight = 80; // 네비게이션 바 높이
      const threshold = navHeight + 50; // 활성화 기준점
      
      // 스크롤이 페이지 하단에 가까운지 확인 (200px 이내)
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      
      let current = "";
      
      // 페이지 하단에 가까우면 마지막 섹션(연락처)을 우선 활성화
      if (isNearBottom) {
        const lastSection = sections[sections.length - 1];
        const lastElement = document.getElementById(lastSection);
        if (lastElement) {
          const rect = lastElement.getBoundingClientRect();
          // 마지막 섹션이 화면에 보이면 활성화
          if (rect.top < window.innerHeight) {
            current = lastSection;
          }
        }
      }
      
      // 그렇지 않으면 역순으로 확인하여 가장 위에 있는 활성 섹션을 찾음
      if (!current) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // 섹션이 화면 상단 기준점을 지나갔는지 확인
            if (rect.top <= threshold) {
              current = section;
              break;
            }
          }
        }
      }
      
      setActiveSection(current || "");
    };

    // 초기 실행
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.1 }}
          >
            Portfolio
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.href.substring(1)
                    ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-gray-700"
                    : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="text-gray-400 dark:text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 space-y-2 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-gray-700"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
