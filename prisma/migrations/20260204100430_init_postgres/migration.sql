-- CreateTable
CREATE TABLE "VisitCount" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitCount_date_key" ON "VisitCount"("date");

-- CreateIndex
CREATE INDEX "VisitCount_date_idx" ON "VisitCount"("date");
