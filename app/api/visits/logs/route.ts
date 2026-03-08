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

    // 날짜 범위 계산 (UTC 기준 하루 범위)
    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

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

