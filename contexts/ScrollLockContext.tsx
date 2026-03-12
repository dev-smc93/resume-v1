"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ScrollLockContextType {
  /** 모달 열림 시 저장된 스크롤 Y (null이면 모달 닫힘) */
  lockedScrollY: number | null;
  /** 모달 열 때 호출 */
  setLockedScrollY: (y: number | null) => void;
}

const ScrollLockContext = createContext<ScrollLockContextType | undefined>(undefined);

export function ScrollLockProvider({ children }: { children: ReactNode }) {
  const [lockedScrollY, setLockedScrollYState] = useState<number | null>(null);
  const setLockedScrollY = useCallback((y: number | null) => {
    setLockedScrollYState(y);
  }, []);

  return (
    <ScrollLockContext.Provider value={{ lockedScrollY, setLockedScrollY }}>
      {children}
    </ScrollLockContext.Provider>
  );
}

export function useScrollLock() {
  const ctx = useContext(ScrollLockContext);
  if (ctx === undefined) {
    return { lockedScrollY: null, setLockedScrollY: () => {} };
  }
  return ctx;
}
