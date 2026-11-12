import { NextResponse } from "next/server";
import crypto from "crypto";

// In-memory set for duplicate webhook event deduplication (idempotency)
const processedEvents = new Set<string>();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn("RAZORPAY_WEBHOOK_SECRET not set in environment. Webhook ignored.");
      return NextResponse.json(
        { message: "Webhook secret not configured on server." },
        { status: 200 }
      );
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing webhook signature header." }, { status: 400 });
    }

    // Verify raw body with HMAC SHA256
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const isAuthentic = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(signature, "utf-8")
    );

    if (!isAuthentic) {
      return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventId = payload?.event_id || payload?.payload?.payment?.entity?.id;

    // Idempotency check
    if (eventId && processedEvents.has(eventId)) {
      return NextResponse.json({ message: "Event already processed." }, { status: 200 });
    }

    if (eventId) {
      processedEvents.add(eventId);
      // Keep memory cache trimmed
      if (processedEvents.size > 1000) {
        const first = processedEvents.values().next().value;
        if (first) processedEvents.delete(first);
      }
    }

    const event = payload?.event;
    console.log(`Razorpay webhook received: ${event}`, { eventId });

    if (event === "payment.captured") {
      const paymentEntity = payload.payload.payment.entity;
      console.log("Payment captured successfully:", {
        id: paymentEntity.id,
        amount: paymentEntity.amount,
        notes: paymentEntity.notes,
      });
    }

    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Razorpay webhook handler error:", error);
    return NextResponse.json({ error: "Webhook processing failure." }, { status: 500 });
  }
}
