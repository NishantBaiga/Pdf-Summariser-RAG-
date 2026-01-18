-- CreateTable
CREATE TABLE "Pdf" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pdf_pkey" PRIMARY KEY ("id")
);
