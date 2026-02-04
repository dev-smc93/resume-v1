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
  uniqueKey,
}: {
  digit: string;
  uniqueKey: string;
}) {
  return (
    <div className="w-8 h-10 bg-gray-800 dark:bg-gray-700 rounded-md flex items-center justify-center shadow-lg border border-gray-700 dark:border-gray-600 relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={uniqueKey}
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
  );
}

export default function VisitCounter({ count, label, onClick }: VisitCounterProps) {
  const [displayCount, setDisplayCount] = useState(count);
  const [prevDigits, setPrevDigits] = useState<string[]>(splitDigits(count));
  const [digitKeys, setDigitKeys] = useState<number[]>(() => Array(4).fill(0).map((_, i) => i));
  const maxDigits = 4;

  useEffect(() => {
    if (count !== displayCount) {
      const currentDigits = splitDigits(displayCount, maxDigits);
      const newDigits = splitDigits(count, maxDigits);
      
      // 변경된 자릿수만 key를 증가시켜 애니메이션 트리거
      const newKeys = digitKeys.map((key, index) => {
        if (currentDigits[index] !== newDigits[index]) {
          return key + 1; // 변경된 자릿수만 key 증가
        }
        return key; // 변경되지 않은 자릿수는 같은 key 유지
      });
      
      setPrevDigits(currentDigits);
      setDigitKeys(newKeys);
      setDisplayCount(count);
    }
  }, [count, displayCount, maxDigits, digitKeys]);

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
        {digits.map((digit, index) => {
          // 변경된 자릿수만 새로운 uniqueKey 생성
          const uniqueKey = `${index}-${digit}-${digitKeys[index]}`;
          return (
            <DigitBox
              key={`${index}-${digitKeys[index]}`}
              digit={digit}
              uniqueKey={uniqueKey}
            />
          );
        })}
      </div>
      {label && (
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
          {label}
        </p>
      )}
    </motion.div>
  );
}
