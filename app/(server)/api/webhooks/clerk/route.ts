import { headers } from "next/headers";
import { Webhook } from "svix";
import { db } from "@/lib/db";
import type { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Missing webhook secret", { status: 500 });
  }

  let event : WebhookEvent;

  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(payload, svixHeaders) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // ✅ Handle user.created event
  if (event.type === "user.created") {
    const user = event.data;

    const email = user.email_addresses?.[0]?.email_address;

    if (!email) {
      return new Response("No email found", { status: 400 });
    }

    await db.user.create({
      data: {
        clerkId: user.id, // Clerk userId
        email,
        fullName: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
      },
    });
  }

  return new Response("Webhook received", { status: 200 });
}
