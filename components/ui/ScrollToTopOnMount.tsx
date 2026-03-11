"use client";

import { useEffect } from "react";

/**
 * 페이지 로드/새로고침 시 스크롤을 최상단으로 복원하여 홈 섹션만 보이도록 함
 */
export default function ScrollToTopOnMount() {
  useEffect(() => {
    // 브라우저 기본 스크롤 복원 비활성화 후 최상단으로 스크롤
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
