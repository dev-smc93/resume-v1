import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/utils/api";

// 전체 방문 카운트 조회
export async function GET() {
  try {
    const totalCount = await prisma.visitCount.aggregate({
      _sum: {
        count: true,
      },
    });

    return NextResponse.json({
      total: totalCount._sum.count || 0,
    });
  } catch (error) {
    return handleApiError("Failed to fetch total visit count");
  }
}
