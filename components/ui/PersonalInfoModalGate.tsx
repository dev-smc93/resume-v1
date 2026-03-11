"use client";

import { useState, useEffect } from "react";
import PersonalInfoModal from "./PersonalInfoModal";
import { takeSavedScrollY } from "@/utils/personalInfoModalScroll";

/**
 * openPersonalInfoModal 이벤트만 구독하고 인적사항 모달을 렌더합니다.
 * 클릭 시점 스크롤 위치는 personalInfoModalScroll 모듈에서 가져와 사용합니다.
 */
export default function PersonalInfoModalGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [savedScrollY, setSavedScrollY] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handler = () => {
      const scrollY = takeSavedScrollY();
      setSavedScrollY(scrollY ?? undefined);
      setIsOpen(true);
    };
    window.addEventListener("openPersonalInfoModal", handler);
    return () => window.removeEventListener("openPersonalInfoModal", handler);
  }, []);

  return (
    <PersonalInfoModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      savedScrollY={savedScrollY}
    />
  );
}
