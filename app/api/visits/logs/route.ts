import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/utils/api";
import { getKoreaDateRangeUTC } from "@/utils/date";

// 특정 일자의 방문 로그(IP, 기기 타입 등) 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // YYYY-MM-DD (한국 날짜)

    if (!date) {
      return NextResponse.json({ logs: [] });
    }

    // VisitCount와 동일하게 한국(Asia/Seoul) 시간대 기준
    const { start, end } = getKoreaDateRangeUTC(date);

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

