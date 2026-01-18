import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return new NextResponse("fileId is required", { status: 400 });
  }

  const messages = await db.message.findMany({
    where: {
      fileId,
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(messages);
}
