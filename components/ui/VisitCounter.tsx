"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VisitCounterProps {
  count: number;
  label?: string;
  onClick?: () => void;
}

// 숫자를 개별 자릿수로 분리
function splitDigits(num: number, maxDigits: number = 4): string[] {
  const numStr = num.toString().padStart(maxDigits, "0");
  return numStr.split("");
}

// 개별 숫자 박스 컴포넌트
function DigitBox({
  digit,
  keyValue,
}: {
  digit: string;
  keyValue: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={keyValue}
        className="w-8 h-10 bg-gray-800 dark:bg-gray-700 rounded-md flex items-center justify-center shadow-lg border border-gray-700 dark:border-gray-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white text-sm font-bold">
          {digit}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

export default function VisitCounter({ count, label, onClick }: VisitCounterProps) {
  const [displayCount, setDisplayCount] = useState(count);
  const maxDigits = 4;

  useEffect(() => {
    setDisplayCount(count);
  }, [count]);

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
          <DigitBox
            key={`${digit}-${index}-${displayCount}`}
            digit={digit}
            keyValue={`${digit}-${index}-${displayCount}`}
          />
        ))}
      </div>
      {label && (
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
          {label}
        </p>
      )}
    </motion.div>
  );
}
