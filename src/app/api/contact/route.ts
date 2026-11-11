import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, details, honeypot } = body;

    // Spam honeypot detection
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    // Required fields validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid Email Address is required." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { error: "Please select a required service." },
        { status: 400 }
      );
    }

    if (!details || typeof details !== "string" || details.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide project details (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // In production, configure RESEND_API_KEY or SMTP
    // If not configured, we acknowledge the receipt and log securely on server
    const isConfigured = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);

    // Sanitize and structure the lead payload
    const submission = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      company: (company || "").trim().slice(0, 100),
      service,
      budget: budget || "Not decided",
      details: details.trim().slice(0, 2000),
      timestamp: new Date().toISOString(),
    };

    console.log("[BUILDXUNIQUE] New Project Enquiry Submitted:", submission);

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out! We have received your project enquiry and will get back to you within 24-48 business hours.",
        isConfigured,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[BUILDXUNIQUE Contact API Error]:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again shortly." },
      { status: 500 }
    );
  }
}
