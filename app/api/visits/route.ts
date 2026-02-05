import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTodayDateString } from "@/utils/date";
import { handleApiError } from "@/utils/api";

// 방문 카운트 증가
export async function POST() {
  try {
    const today = getTodayDateString();

    const existingRecord = await prisma.visitCount.findUnique({
      where: { date: today },
    });

    if (existingRecord) {
      const updated = await prisma.visitCount.update({
        where: { date: today },
        data: { count: { increment: 1 } },
      });
      return NextResponse.json({ count: updated.count, date: today });
    } else {
      const created = await prisma.visitCount.create({
        data: { date: today, count: 1 },
      });
      return NextResponse.json({ count: created.count, date: today });
    }
  } catch (error) {
    return handleApiError("Failed to increment visit count");
  }
}

// 오늘의 방문 카운트 조회
export async function GET() {
  try {
    const today = getTodayDateString();

    const record = await prisma.visitCount.findUnique({
      where: { date: today },
    });

    return NextResponse.json({
      count: record?.count || 0,
      date: today,
    });
  } catch (error) {
    return handleApiError("Failed to fetch visit count");
  }
}
