"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { smoothScrollTo } from "@/utils/scroll";

const ALL_NAV_ITEMS = [
  { name: "홈", href: "#hero" },
  { name: "경력", href: "#experience" },
  { name: "개발 관련", href: "#dev-related" },
  { name: "학력 및 병역", href: "#education" },
  { name: "자격 및 수상", href: "#certifications" },
  { name: "Q&A", href: "#qna" },
  { name: "문의하기", href: "#contact" },
];

interface NavigationProps {
  hideDev: boolean;
}

export default function Navigation({ hideDev }: NavigationProps) {
  const navItems = useMemo(
    () => (hideDev ? ALL_NAV_ITEMS.filter((item) => item.href !== "#dev-related") : ALL_NAV_ITEMS),
    [hideDev]
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(true);
  const programmaticScrollRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (programmaticScrollRef.current) return; // 네비 클릭 직후 스크롤 중엔 handleScroll 무시

      // 현재 활성 섹션 감지
      const sections = navItems.map((item) => item.href.substring(1));
      const navHeight = 80; // 네비게이션 바 높이
      const threshold = navHeight + 50; // 활성화 기준점
      const heroZoneEnd = window.innerHeight * 0.3; // Hero 구간: 상단 30% 미만 스크롤 시 홈 활성화
      
      // Hero(홈) 구간: 스크롤이 적으면 홈 활성화
      if (window.scrollY < heroZoneEnd) {
        setActiveSection("hero");
        return;
      }
      
      // 스크롤이 페이지 하단에 가까운지 확인 (200px 이내)
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
      
      let current = "";
      
      // 페이지 하단에 가까우면 마지막 섹션(문의하기)을 우선 활성화
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
      
      // 역순으로 확인 (hero 제외 - fixed로 항상 rect.top=0이라 경력 구간에서 hero가 잘못 선택됨)
      if (!current) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section === "hero") continue; // hero는 heroZoneEnd에서만 처리
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= threshold) {
              current = section;
              break;
            }
          }
        }
        if (!current) current = "hero"; // 상단에 다른 섹션이 없으면 hero
      }
      
      setActiveSection(current || "");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const onScrollToSection = (e: Event) => {
      setActiveSection((e as CustomEvent<string>).detail || "");
    };
    window.addEventListener("scrollToSection", onScrollToSection);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollToSection", onScrollToSection);
    };
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    setActiveSection(sectionId); // 클릭 즉시 활성 스타일 적용

    // 모바일 메뉴가 열려있으면 먼저 완전히 제거
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      const mobileMenu = document.querySelector('.md\\:hidden.mt-4') as HTMLElement;
      if (mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    }

    requestAnimationFrame(() => {
      const navHeight = 40;
      const duration = 2000; // 스크롤 애니메이션 속도 (2초)
      if (href === "#hero") {
        smoothScrollTo(0, duration);
      } else if (href === "#experience") {
        smoothScrollTo(window.innerHeight - navHeight, duration);
      } else {
        const element = document.querySelector(href);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          smoothScrollTo(elementPosition - navHeight, duration);
        }
      }
      programmaticScrollRef.current = true;
      setTimeout(() => { programmaticScrollRef.current = false; }, duration + 50);
    });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isMobile && activeSection === "hero"
          ? "bg-transparent shadow-none"
          : "bg-gray-900/40 dark:bg-gray-800/40 backdrop-blur-md shadow-lg"
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
            sungman93
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
