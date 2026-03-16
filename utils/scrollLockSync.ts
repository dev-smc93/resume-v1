/**
 * 모달 스크롤 잠금 시 Hero opacity 계산용.
 * React state 배치와 관계없이 동기로 읽을 수 있어 Vercel 배포 등 prod 환경에서도 동작 보장.
 */
let _lockedScrollY: number | null = null;

export function setLockedScrollYSync(y: number | null): void {
  _lockedScrollY = y;
}

export function getLockedScrollYSync(): number | null {
  return _lockedScrollY;
}
