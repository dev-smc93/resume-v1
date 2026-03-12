"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  modalBackdropVariants,
  modalContainerVariants,
  modalCardVariants,
  modalCardStyle,
} from "./modal-animations";
import { useScrollLock } from "@/contexts/ScrollLockContext";

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
  /** true면 카드 스크롤 비활성(overflow-hidden), 내용이 남는 공간만 사용. ImageModal 등에 사용 */
  noScroll?: boolean;
  /** 클릭 시점에 저장한 스크롤 위치(스크롤 이동 방지용). 없으면 window.scrollY 사용 */
  savedScrollY?: number;
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
  noScroll = false,
  savedScrollY: savedScrollYProp,
}: BaseModalProps) {
  const { setLockedScrollY } = useScrollLock();

  // 모달이 열려있을 때 배경 스크롤 막기 (paint 전 실행으로 홈 섹션 깜빡임 방지)
  useLayoutEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 카운터 증가
      openModalCount++;
      
      // 첫 번째 모달이 열릴 때만 스크롤 막기
      if (openModalCount === 1) {
        // 클릭 시점에 저장된 값 우선 사용 (QnA 등에서 스크롤 이동 방지)
        const scrollY = savedScrollYProp !== undefined && savedScrollYProp >= 0 ? savedScrollYProp : window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        // Hero opacity 유지를 위해 잠긴 스크롤 위치 전달 (window.scrollY가 0으로 리셋되는 문제 방지)
        setLockedScrollY(scrollY);
      }
    } else {
      // 모달이 닫힐 때 카운터 감소
      if (openModalCount > 0) {
        openModalCount--;
      }
      
      // 모든 모달이 닫혔을 때만 스크롤 복원 (모바일: 스타일 제거와 scrollTo를 같은 프레임에 처리해 홈으로 깜빡이는 현상 방지)
      if (openModalCount === 0) {
        setLockedScrollY(null);
        const savedScrollY = document.body.style.top;
        requestAnimationFrame(() => {
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          if (savedScrollY) {
            const parsedScrollY = parseInt(savedScrollY.replace('px', '').replace('-', ''), 10);
            if (!isNaN(parsedScrollY)) {
              window.scrollTo(0, parsedScrollY);
            }
          }
        });
      }
    }

    // cleanup: 컴포넌트 언마운트 시에도 처리
    return () => {
      if (isOpen && openModalCount > 0) {
        openModalCount--;
      }

      if (openModalCount === 0) {
        setLockedScrollY(null);
        const savedScrollY = document.body.style.top;
        requestAnimationFrame(() => {
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';
          if (savedScrollY) {
            const parsedScrollY = parseInt(savedScrollY.replace('px', '').replace('-', ''), 10);
            if (!isNaN(parsedScrollY)) {
              window.scrollTo(0, parsedScrollY);
            }
          }
        });
      }
    };
  }, [isOpen, savedScrollYProp, setLockedScrollY]);

  const modalContent = (
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
              className={`bg-gray-800/80 dark:bg-white/80 rounded-2xl p-6 md:p-8 ${maxWidthClasses[maxWidth]} w-full shadow-2xl relative backdrop-blur-sm ${className} ${
                noScroll
                  ? "h-[80vh] h-[80svh] max-h-[80vh] max-h-[80svh] flex flex-col min-h-0 overflow-hidden"
                  : "max-h-[80vh] max-h-[80svh] overflow-y-auto overflow-x-hidden"
              }`}
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

  if (typeof document === "undefined") return modalContent;
  return createPortal(modalContent, document.body);
}
