import { NextResponse } from "next/server";
import { getPackageById } from "@/lib/pricingData";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packageId, billingChoice, customerName, customerEmail, customerPhone } = body;

    if (!packageId || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Package ID, client name, and email are required." },
        { status: 400 }
      );
    }

    const pkg = getPackageById(packageId);
    if (!pkg) {
      return NextResponse.json({ error: "Invalid package specified." }, { status: 400 });
    }

    const isDeposit = billingChoice === "deposit";
    const amountInINR = isDeposit
      ? Math.round((pkg.indicativePrice * pkg.depositPercentage) / 100)
      : pkg.indicativePrice;

    const amountInPaise = amountInINR * 100;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If real Razorpay credentials exist, create official order
    if (keyId && keySecret) {
      try {
        const Razorpay = (await import("razorpay")).default;
        const razorpay = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const order = await razorpay.orders.create({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${Date.now().toString().slice(-8)}`,
          notes: {
            package: pkg.name,
            billing: billingChoice,
            client_name: customerName,
            client_email: customerEmail,
            client_phone: customerPhone || "N/A",
          },
        });

        return NextResponse.json({
          success: true,
          isDemo: false,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: keyId,
          package: pkg,
        });
      } catch (err: unknown) {
        console.error("Razorpay order creation error:", err);
        return NextResponse.json(
          { error: "Payment gateway error. Please try again later." },
          { status: 502 }
        );
      }
    }

    // DEMO / TEST MODE FALLBACK
    // Generated when RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET are not set in environment
    const demoOrderId = `demo_order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return NextResponse.json({
      success: true,
      isDemo: true,
      orderId: demoOrderId,
      amount: amountInPaise,
      currency: "INR",
      keyId: "demo_key_unconfigured",
      package: pkg,
      notice:
        "Demo Mode Active: Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local to enable real gateway orders.",
    });
  } catch (error) {
    console.error("Checkout order API exception:", error);
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
