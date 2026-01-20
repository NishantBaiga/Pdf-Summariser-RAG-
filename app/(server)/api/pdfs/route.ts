import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // your prisma instance
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    const pdfs = await db.file.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    return NextResponse.json({ error: "Failed to load PDFs" }, { status: 500 });
  }
}

export async function DELETE(fileId: string) {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    console.log("fileId :", fileId);
    const result = db.file.delete({
      where: {
        id: fileId,
      },
    });

    console.log("result :", result);
    return NextResponse.json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Error Deleting PDF:", error);
    return NextResponse.json(
      { error: "Failed to delete PDF" },
      { status: 500 },
    );
  }
}
