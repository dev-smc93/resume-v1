import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTodayDateString } from "@/utils/date";
import { handleApiError } from "@/utils/api";

function getClientIp(request: NextRequest): string {
  // Vercel / Proxy 환경 고려
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();
    if (ip) return ip;
  }

  // Next.js 16에서 제공하는 ip 필드 (환경에 따라 undefined일 수 있음)
  // @ts-ignore
  if (request.ip) {
    // @ts-ignore
    return request.ip as string;
  }

  return "unknown";
}

function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/mobile|iphone|android/.test(ua)) return "mobile";
  if (/ipad|tablet/.test(ua)) return "tablet";
  if (ua === "unknown") return "unknown";
  return "pc";
}

// 방문 카운트 증가 (IP 기준 30분 이내 중복 방문은 카운트 증가 제외)
export async function POST(request: NextRequest) {
  try {
    const today = getTodayDateString();
    const now = new Date();
    const THIRTY_MINUTES = 30 * 60 * 1000;

    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";
    const deviceType = getDeviceType(userAgent);

    // IP 로그 확인 및 30분 이내 중복 방문인지 체크
    if (ip !== "unknown") {
      const existingLog = await prisma.visitLog.findUnique({
        where: { ip },
      });

      if (existingLog) {
        const lastVisited = existingLog.lastVisited;
        const diff = now.getTime() - lastVisited.getTime();

        if (diff < THIRTY_MINUTES) {
          // 30분 이내 재방문: 카운트는 증가시키지 않고 로그만 최신화
          await prisma.visitLog.update({
            where: { ip },
            data: {
              userAgent,
              deviceType,
              lastVisited: now,
            },
          });

          const record = await prisma.visitCount.findUnique({
            where: { date: today },
          });

          return NextResponse.json({
            count: record?.count || 0,
            date: today,
            deduped: true,
          });
        } else {
          // 30분 이상 경과: 방문으로 인정하고 lastVisited 갱신
          await prisma.visitLog.update({
            where: { ip },
            data: {
              userAgent,
              deviceType,
              lastVisited: now,
            },
          });
        }
      } else {
        // 최초 방문 IP
        await prisma.visitLog.create({
          data: {
            ip,
            userAgent,
            deviceType,
            lastVisited: now,
          },
        });
      }
    }

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
