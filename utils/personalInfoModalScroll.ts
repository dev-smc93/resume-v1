/**
 * 인적사항 모달을 열 때 스크롤 위치를 보존하기 위해,
 * 버튼 클릭 직후(같은 호출 스택) 저장하고 모달에서 사용합니다.
 */
let savedScrollY: number | null = null;

export function captureScrollY(): void {
  savedScrollY = typeof window !== "undefined" ? window.scrollY : 0;
}

export function takeSavedScrollY(): number | null {
  const value = savedScrollY;
  savedScrollY = null;
  return value;
}

/** 클릭 직후 동기 호출로 body 스크롤 즉시 잠금 (모달 paint 전 홈 섹션 깜빡임 방지) */
export function applyScrollLockImmediate(scrollY: number): void {
  if (typeof document === "undefined") return;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
}
