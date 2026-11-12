import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, isDemo } = body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Order ID and Payment ID are required for verification." },
        { status: 400 }
      );
    }

    // Demo Mode Verification
    if (isDemo || razorpay_order_id.startsWith("demo_order_")) {
      return NextResponse.json({
        success: true,
        verified: true,
        isDemo: true,
        message: "Payment verified successfully in Demo / Test Mode.",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Server missing RAZORPAY_KEY_SECRET configuration." },
        { status: 500 }
      );
    }

    if (!razorpay_signature) {
      return NextResponse.json({ error: "Missing payment signature." }, { status: 400 });
    }

    // Official HMAC SHA-256 signature verification
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(text)
      .digest("hex");

    const isMatch = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf-8"),
      Buffer.from(razorpay_signature, "utf-8")
    );

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid payment signature. Verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      isDemo: false,
      message: "Payment authenticity confirmed and verified by server.",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Payment verification API exception:", error);
    return NextResponse.json({ error: "Internal verification error." }, { status: 500 });
  }
}
