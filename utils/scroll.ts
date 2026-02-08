// easing 함수 (easeInOutCubic)
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// 부드러운 스크롤 애니메이션
function smoothScrollTo(targetY: number, duration: number = 800) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // easing 함수 적용
    const ease = easeInOutCubic(progress);
    const currentY = startY + distance * ease;
    
    window.scrollTo(0, currentY);
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// 섹션으로 스크롤 이동
export function scrollToSection(sectionId: string) {
  // requestAnimationFrame으로 다음 프레임에 스크롤 시작 (레이아웃 안정화 후)
  requestAnimationFrame(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // 네비게이션 바 높이 (고정 네비게이션 바 고려)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      // 커스텀 부드러운 스크롤 애니메이션 사용
      smoothScrollTo(offsetPosition, 1000); // 1초 동안 부드럽게 이동
    }
  });
}
