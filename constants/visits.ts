/**
 * 방문 카운트 관련 상수
 * - 필터 항목 추가 시 EXCLUDED_USER_AGENT_PATTERNS에 문자열 추가
 * - IP 제외 시 EXCLUDED_IPS 배열에 IP 추가
 */

/** 방문 카운트에서 제외할 User-Agent 패턴 (부분 일치, 대소문자 무시) */
export const EXCLUDED_USER_AGENT_PATTERNS = [
  "vercel-screenshot",
  // 필요 시 추가: "googlebot", "bingbot" 등
] as const;

/** 방문 카운트에서 제외할 IP (로컬호스트 등) */
export const EXCLUDED_IPS = ["::1", "127.0.0.1", "localhost"] as const;

/** 제외 대상 봇/스크립트인지 여부 */
export function isExcludedVisit(userAgent: string): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return EXCLUDED_USER_AGENT_PATTERNS.some((p) => ua.includes(p.toLowerCase()));
}

/** 제외 대상 IP인지 여부 (로컬호스트 등) */
export function isExcludedIp(ip: string): boolean {
  if (!ip || ip === "unknown") return false;
  return EXCLUDED_IPS.includes(ip as (typeof EXCLUDED_IPS)[number]);
}
