import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// DATABASE_URL 확인 - Next.js 환경 변수 또는 직접 설정
const databaseUrl = process.env.DATABASE_URL || 
  "postgresql://postgres.gogkjiveegqgiuqzqaoy:a6245248aa%21@aws-1-ap-south-1.pooler.supabase.com:5432/postgres";

if (!databaseUrl) {
  console.error("DATABASE_URL is not set in environment variables");
  throw new Error("DATABASE_URL environment variable is not set");
}

console.log("DATABASE_URL is set:", !!databaseUrl);

// PostgreSQL Pool 생성
const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
