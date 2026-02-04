import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 환경 변수 확인
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

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
    console.log("POST /api/visits - Today:", today);

    // 오늘 날짜의 레코드가 있는지 확인
    const existingRecord = await prisma.visitCount.findUnique({
      where: { date: today },
    });

    console.log("Existing record:", existingRecord);

    if (existingRecord) {
      // 기존 레코드가 있으면 카운트 증가
      const updated = await prisma.visitCount.update({
        where: { date: today },
        data: { count: { increment: 1 } },
      });
      console.log("Updated count:", updated.count);
      return NextResponse.json({ count: updated.count, date: today });
    } else {
      // 새 레코드 생성
      const created = await prisma.visitCount.create({
        data: { date: today, count: 1 },
      });
      console.log("Created new record:", created);
      return NextResponse.json({ count: created.count, date: today });
    }
  } catch (error) {
    console.error("Error incrementing visit count:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { 
        error: "Failed to increment visit count",
        details: error instanceof Error ? error.message : String(error)
      },
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
    console.error("Error fetching visit count:", error);
    return NextResponse.json(
      { error: "Failed to fetch visit count" },
      { status: 500 }
    );
  }
}
