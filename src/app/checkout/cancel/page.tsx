"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, RefreshCw, MessageCircle, ArrowLeft, Loader2 } from "lucide-react";

function CancelContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "Payment was cancelled by the user or gateway.";

  return (
    <div className="pt-28 pb-24 md:pb-36 bg-[#F5F5F2] min-h-screen">
      <div className="max-w-[700px] mx-auto px-6 md:px-10">
        <div className="rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white p-8 sm:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>

          <span
            className="text-xs uppercase tracking-[0.16em] font-semibold text-[#FF7139] block mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Checkout Incomplete
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TRANSACTION NOT COMPLETED.
          </h1>

          <p
            className="text-base text-[#777777] max-w-md mx-auto leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Your payment could not be finalized. No funds have been deducted from your account.
          </p>

          <div className="p-4 rounded-xl bg-[#F5F5F2] border border-[#DDDDDA] text-xs text-[#777777] max-w-md mx-auto mb-8 font-mono">
            Reason: {reason}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Checkout</span>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#DDDDDA] bg-transparent text-[#111111] text-xs font-semibold tracking-wider uppercase hover:border-[#111111] hover:bg-[#F5F5F2] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Studio Support</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-[#DDDDDA]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#777777] hover:text-[#111111] transition-colors font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-40 flex items-center justify-center bg-[#F5F5F2]">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF7139]" />
        </div>
      }
    >
      <CancelContent />
    </Suspense>
  );
}
