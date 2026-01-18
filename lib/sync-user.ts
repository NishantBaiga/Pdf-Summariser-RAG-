import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function syncUser() {
  try {
    // 1. Get Clerk user (server-side only)
    const user = await currentUser();
    if (!user) {
      return new Error("Unauthorized");
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return new Error("Email not found");
    }

    // 2. Check if user already exists in DB
    const existingUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });
    // 3. If exists → return
    if (existingUser) {
      return existingUser;
    }

    // 4. Otherwise → create user in DB
    const newUser = await db.user.create({
      data: {
        clerkId: user.id,
        fullName: user.fullName ?? "",
        email,
        name: user.firstName || "user",
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
}
