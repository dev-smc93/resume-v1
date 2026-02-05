import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

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
    return NextResponse.json(
      { error: "Failed to increment visit count" },
      { status: 500 }
    );
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
    return NextResponse.json(
      { error: "Failed to fetch visit count" },
      { status: 500 }
    );
  }
}
