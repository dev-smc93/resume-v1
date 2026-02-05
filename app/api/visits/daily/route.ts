import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/utils/api";

// 일자별 방문 카운트 조회 (최근 순)
export async function GET() {
  try {
    const dailyCounts = await prisma.visitCount.findMany({
      orderBy: {
        date: "desc",
      },
      take: 30, // 최근 30일
    });

    return NextResponse.json({
      dailyCounts: dailyCounts.map((item) => ({
        date: item.date,
        count: item.count,
      })),
    });
  } catch (error) {
    return handleApiError("Failed to fetch daily visit counts");
  }
}
