// easing 함수 (easeInOutCubic)
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// 부드러운 스크롤 애니메이션 (easeInOutCubic)
export function smoothScrollTo(targetY: number, duration: number = 800) {
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

// 섹션으로 스크롤 이동 (Hero "스크롤하여 더 보기" 등에서 호출)
export function scrollToSection(sectionId: string) {
  window.dispatchEvent(new CustomEvent("scrollToSection", { detail: sectionId }));
  requestAnimationFrame(() => {
    const navHeight = 80;
    if (sectionId === "hero") {
      smoothScrollTo(0, 1000);
      return;
    }
    if (sectionId === "experience") {
      smoothScrollTo(window.innerHeight - navHeight, 1000);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      smoothScrollTo(elementPosition - navHeight, 1000);
    }
  });
}
