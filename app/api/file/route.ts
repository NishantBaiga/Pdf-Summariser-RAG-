import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) return new NextResponse("fileId required", { status: 400 });

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
    select: {
      url: true,
      name: true,
      uploadStatus: true,
    },
  });

  if (!file) return new NextResponse("File not found", { status: 404 });

  return NextResponse.json(file);
}
