// 모달 애니메이션 variants - 재활용 가능한 구조

export const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const modalCardVariants = {
  initial: {
    opacity: 0,
    rotateY: -90,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    rotateY: 90,
    scale: 0.8,
  },
  transition: {
    duration: 0.7,
    ease: [0.34, 1.56, 0.64, 1],
  },
};

export const modalCardStyle = {
  transformStyle: "preserve-3d" as const,
  perspective: "1000px",
};
