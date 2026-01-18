import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // your prisma instance

export async function GET() {
  try {
    const pdfs = await db.file.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return NextResponse.json({ error: "Failed to load PDFs" }, { status: 500 });
  }
}
