"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    toggleTheme();
  };

  // 서버 사이드 렌더링 시 기본 아이콘 표시 (하이드레이션 에러 방지)
  if (!mounted) {
    return (
      <button
        className="relative p-2 rounded-lg bg-gray-800 dark:bg-gray-100 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
        aria-label="테마 전환"
      >
        <Moon size={20} className="text-gray-300" />
      </button>
    );
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative p-2 rounded-lg bg-gray-800 dark:bg-gray-100 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="테마 전환"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <Moon size={20} className="text-gray-300" />
        ) : (
          <Sun size={20} className="text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
