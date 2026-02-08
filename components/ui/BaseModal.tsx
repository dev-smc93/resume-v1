"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import {
  modalBackdropVariants,
  modalContainerVariants,
  modalCardVariants,
  modalCardStyle,
} from "./modal-animations";

// 여러 모달이 동시에 열릴 수 있는 경우를 위한 전역 카운터
let openModalCount = 0;

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  titleIcon?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

export default function BaseModal({
  isOpen,
  onClose,
  children,
  title,
  titleIcon,
  maxWidth = "md",
  className = "",
}: BaseModalProps) {
  // 모달이 열려있을 때 배경 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 카운터 증가
      openModalCount++;
      
      // 첫 번째 모달이 열릴 때만 스크롤 막기
      if (openModalCount === 1) {
        // 현재 스크롤 위치 저장 (iOS Safari 대응)
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
      }
    } else {
      // 모달이 닫힐 때 카운터 감소
      if (openModalCount > 0) {
        openModalCount--;
      }
      
      // 모든 모달이 닫혔을 때만 스크롤 복원
      if (openModalCount === 0) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // 저장된 스크롤 위치로 복원 (iOS Safari 대응)
        if (scrollY) {
          const parsedScrollY = parseInt(scrollY.replace('px', '').replace('-', ''), 10);
          if (!isNaN(parsedScrollY)) {
            window.scrollTo(0, parsedScrollY);
          }
        }
      }
    }
    
    // cleanup: 컴포넌트 언마운트 시에도 처리
    return () => {
      if (isOpen && openModalCount > 0) {
        openModalCount--;
      }
      
      if (openModalCount === 0) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        if (scrollY) {
          const parsedScrollY = parseInt(scrollY.replace('px', '').replace('-', ''), 10);
          if (!isNaN(parsedScrollY)) {
            window.scrollTo(0, parsedScrollY);
          }
        }
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            {...modalBackdropVariants}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            {...modalContainerVariants}
          >
            <motion.div
              className={`bg-gray-800/80 dark:bg-white/80 rounded-2xl p-6 md:p-8 ${maxWidthClasses[maxWidth]} w-full max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-2xl relative backdrop-blur-sm ${className}`}
              onClick={(e) => e.stopPropagation()}
              {...modalCardVariants}
              style={modalCardStyle}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-700 transition-colors z-10"
              >
                <X size={24} />
              </button>
              {title && (
                <h3 className="text-2xl font-bold mb-6 text-gray-100 dark:text-gray-800 flex items-center gap-2 drop-shadow-lg">
                  {titleIcon}
                  <span className="drop-shadow-lg">{title}</span>
                </h3>
              )}
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
