const TIMEZONE = "Asia/Seoul";

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환 (한국 시간 기준)
export function getTodayDateString(): string {
  const str = new Date().toLocaleDateString("sv-SE", { timeZone: TIMEZONE });
  return str; // sv-SE → YYYY-MM-DD
}

// 한국 날짜(YYYY-MM-DD)의 UTC 시간 범위 반환 (로그 조회용)
export function getKoreaDateRangeUTC(dateStr: string): { start: Date; end: Date } {
  const [y, m, d] = dateStr.split("-").map(Number);
  const msPerHour = 60 * 60 * 1000;
  const kstOffset = 9 * msPerHour;
  const start = new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0) - kstOffset);
  const end = new Date(Date.UTC(y, m - 1, d + 1, 0, 0, 0, 0) - kstOffset);
  return { start, end };
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

// 방문 시간 포맷 (ISO 문자열 → HH:mm, 한국 시간)
export function formatVisitTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("ko-KR", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
