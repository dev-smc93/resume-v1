import { NextResponse } from "next/server";

// 공통 API 에러 핸들러
export function handleApiError(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}
