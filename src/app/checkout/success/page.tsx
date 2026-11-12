"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight, Calendar, MessageSquare, FileText, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id") || "ord_preview_sample";
  const paymentId = searchParams.get("payment_id") || "pay_preview_sample";
  const plan = searchParams.get("plan") || "Studio Flagship";
  const amount = searchParams.get("amount") || "27,500";
  const isDemo = searchParams.get("demo") === "true";

  return (
    <div className="pt-28 pb-24 md:pb-36 bg-[#F5F5F2] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        {/* Receipt Card */}
        <div className="rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white p-8 sm:p-12 shadow-sm text-center">
          {/* Success Check Badge */}
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span
            className="text-xs uppercase tracking-[0.16em] font-semibold text-[#FF7139] block mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {isDemo ? "Sprint Confirmed (Demo / Sandbox Mode)" : "Payment Confirmed & Verified"}
          </span>

          <h1
            className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WELCOME TO BUILDXUNIQUE.
          </h1>

          <p
            className="text-base text-[#777777] max-w-lg mx-auto leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Your project sprint has been officially funded and registered. A confirmation
            receipt and onboarding packet have been sent to your email.
          </p>

          {/* Transaction Metadata Box */}
          <div className="p-6 rounded-2xl bg-[#F5F5F2] border border-[#DDDDDA] text-left space-y-3 mb-10 text-xs">
            <div className="flex justify-between border-b border-[#DDDDDA]/70 pb-2">
              <span className="text-[#777777]">Selected Package</span>
              <span className="font-bold text-[#111111]">{plan}</span>
            </div>
            <div className="flex justify-between border-b border-[#DDDDDA]/70 pb-2">
              <span className="text-[#777777]">Amount Funded</span>
              <span className="font-mono font-bold text-[#FF7139]">
                ₹{parseInt(amount).toLocaleString("en-IN") || amount}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#DDDDDA]/70 pb-2">
              <span className="text-[#777777]">Razorpay Order ID</span>
              <span className="font-mono text-[#111111]">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Payment Reference ID</span>
              <span className="font-mono text-[#111111]">{paymentId}</span>
            </div>
          </div>

          {/* Next Steps for the Customer */}
          <div className="text-left space-y-4 mb-10">
            <h2
              className="text-xl font-bold uppercase tracking-tight text-[#111111]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHAT HAPPENS NEXT?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] space-y-2">
                <Calendar className="w-5 h-5 text-[#FF7139]" />
                <h3 className="text-xs font-bold uppercase text-[#111111]">1. Kickoff Call</h3>
                <p className="text-[11px] text-[#777777]">
                  We schedule a 45-minute discovery interview to align on design aspirations.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] space-y-2">
                <MessageSquare className="w-5 h-5 text-[#FF7139]" />
                <h3 className="text-xs font-bold uppercase text-[#111111]">2. Private Channel</h3>
                <p className="text-[11px] text-[#777777]">
                  Direct access to your dedicated lead designer and engineer via Slack.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] space-y-2">
                <FileText className="w-5 h-5 text-[#FF7139]" />
                <h3 className="text-xs font-bold uppercase text-[#111111]">3. Figma Workspace</h3>
                <p className="text-[11px] text-[#777777]">
                  Live prototypes, wireframes, and component tokens shared for real-time review.
                </p>
              </div>
            </div>
          </div>

          {/* Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Return to Homepage</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-40 flex items-center justify-center bg-[#F5F5F2]">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF7139]" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
