"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 초기값을 함수로 설정하여 SSR 시 에러 방지
  const [theme, setTheme] = useState<Theme>(() => {
    // 클라이언트에서만 localStorage 확인
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && ["light", "dark"].includes(savedTheme)) {
        return savedTheme;
      }
    }
    return "dark"; // 기본값
  });
  const [mounted, setMounted] = useState(false);

  // HTML 클래스 업데이트
  const updateHtmlClass = (isDark: boolean) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // 클라이언트 마운트 후 초기화 및 HTML 클래스 설정
  useEffect(() => {
    setMounted(true);
    
    // localStorage에서 테마 다시 확인 (초기화 시점에 맞춰)
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const currentTheme = savedTheme && ["light", "dark"].includes(savedTheme) 
      ? savedTheme 
      : "dark";
    
    // HTML 클래스 강제 설정
    const root = document.documentElement;
    root.classList.remove("dark");
    if (currentTheme === "dark") {
      root.classList.add("dark");
    }
    
    // 상태 동기화
    if (currentTheme !== theme) {
      setTheme(currentTheme);
    }
  }, []);

  // 테마 변경 시 HTML 클래스 업데이트
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    
    console.log("Toggle theme:", { current: theme, new: newTheme });
    
    // localStorage 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      
      // HTML 클래스 즉시 업데이트 (상태 업데이트 전에)
      const root = document.documentElement;
      root.classList.remove("dark");
      if (newTheme === "dark") {
        root.classList.add("dark");
      }
      console.log("HTML classes after toggle:", root.className);
      console.log("Has dark class:", root.classList.contains("dark"));
      
      // 강제로 스타일 재계산
      void root.offsetHeight;
    }
    
    // 상태 업데이트
    setTheme(newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
