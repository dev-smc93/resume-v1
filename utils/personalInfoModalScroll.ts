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
