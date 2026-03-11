import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/utils/api";

// 특정 일자의 방문 로그(IP, 기기 타입 등) 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // YYYY-MM-DD

    if (!date) {
      return NextResponse.json({ logs: [] });
    }

    // 날짜 범위 계산: VisitCount와 동일하게 로컬 타임존 기준 사용
    const [y, m, d] = date.split("-").map(Number);
    const start = new Date(y, m - 1, d, 0, 0, 0, 0);
    const end = new Date(y, m - 1, d + 1, 0, 0, 0, 0);

    const logs = await prisma.visitLog.findMany({
      where: {
        lastVisited: {
          gte: start,
          lt: end,
        },
      },
      orderBy: {
        lastVisited: "desc",
      },
    });

    return NextResponse.json({
      logs: logs.map((log) => ({
        ip: log.ip,
        userAgent: log.userAgent,
        deviceType: log.deviceType,
        lastVisited: log.lastVisited,
      })),
    });
  } catch (error) {
    return handleApiError("Failed to fetch visit logs");
  }
}

