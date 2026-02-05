// 이미지 에러 핸들링 유틸리티
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  e.currentTarget.style.display = "none";
}
