// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 날짜 문자열을 포맷팅 (YYYY.MM.DD (요일))
export function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];
  return `${year}.${month}.${day} (${weekday})`;
}
