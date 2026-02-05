import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { personalInfo } from "@/data/resume-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 입력 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 형식을 입력해주세요." },
        { status: 400 }
      );
    }

    // 데이터베이스에 메시지 저장 (선택사항 - 테이블이 없어도 에러 발생 안 함)
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message,
        },
      });
    } catch (dbError: any) {
      // 테이블이 없거나 DB 연결 문제는 무시하고 이메일 전송 계속
      if (dbError?.code !== 'P2021' && dbError?.code !== 'P1001') {
        console.error("Database error (non-critical):", dbError);
      }
    }

    // Resend를 통해 이메일 전송
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "이메일 서비스가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Resend에서 도메인 설정 후 변경 필요
      to: personalInfo.email,
      subject: `이력서 문의: ${name}님으로부터`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">새로운 문의 메시지</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>메시지:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">이 메시지는 이력서 웹사이트의 연락처 폼을 통해 전송되었습니다.</p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json(
        { error: "이메일 전송에 실패했습니다. 다시 시도해주세요." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "메시지가 성공적으로 전송되었습니다!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
