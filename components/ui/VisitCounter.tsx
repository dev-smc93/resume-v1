"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VisitCounterProps {
  count: number;
  onClick?: () => void;
}

// 숫자를 개별 자릿수로 분리
function splitDigits(num: number, maxDigits: number = 4): string[] {
  const numStr = num.toString().padStart(maxDigits, "0");
  return numStr.split("");
}

export default function VisitCounter({ count, onClick }: VisitCounterProps) {
  const [displayCount, setDisplayCount] = useState(count);
  const [animationKey, setAnimationKey] = useState(0);
  const maxDigits = 4;

  useEffect(() => {
    if (count !== displayCount) {
      // 카운트가 변경되면 애니메이션 key 증가
      setAnimationKey(prev => prev + 1);
      setDisplayCount(count);
    }
  }, [count, displayCount]);

  const digits = splitDigits(displayCount, maxDigits);

  return (
    <motion.div
      className={`flex flex-col items-center gap-2 ${onClick ? "cursor-pointer" : ""}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      <div className="flex items-center gap-1">
        {digits.map((digit, index) => (
          <div
            key={`${index}-box`}
            className="w-8 h-10 bg-gray-800 dark:bg-gray-700 rounded-md flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-600 relative overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${digit}-${animationKey}`}
                className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
