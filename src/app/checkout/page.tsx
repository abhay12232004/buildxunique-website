"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, ShieldCheck, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PRICING_PACKAGES, getPackageById, PricingPackage } from "@/lib/pricingData";
import { cn } from "@/lib/utils";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planParam = searchParams.get("plan") || "flagship";
  const billingParam = searchParams.get("billing") || "deposit";

  const selectedPkg: PricingPackage = getPackageById(planParam) || PRICING_PACKAGES[1];
  const [billingChoice, setBillingChoice] = useState<"deposit" | "full">(
    billingParam === "full" ? "full" : "deposit"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const payableAmount =
    billingChoice === "deposit"
      ? Math.round((selectedPkg.indicativePrice * selectedPkg.depositPercentage) / 100)
      : selectedPkg.indicativePrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please provide your name and email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Step 1: Create Order via Server-side API
      const orderRes = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedPkg.id,
          billingChoice,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to create checkout order.");
      }

      // Step 2A: DEMO MODE HANDLING
      if (orderData.isDemo) {
        // Simulate real confirmation after small natural delay
        setTimeout(async () => {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: orderData.orderId,
              razorpay_payment_id: `pay_demo_${Date.now()}`,
              isDemo: true,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.verified) {
            router.push(
              `/checkout/success?order_id=${orderData.orderId}&payment_id=${verifyData.paymentId}&plan=${selectedPkg.name}&amount=${payableAmount}&demo=true`
            );
          } else {
            setIsLoading(false);
            setErrorMessage("Demo verification failed. Please try again.");
          }
        }, 1200);
        return;
      }

      // Step 2B: REAL RAZORPAY GATEWAY MODAL
      if (!window.Razorpay) {
        setIsLoading(false);
        setErrorMessage("Payment gateway SDK failed to load. Please refresh.");
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "BUILDXUNIQUE Studio",
        description: `${selectedPkg.name} — ${billingChoice === "deposit" ? "50% Milestone Deposit" : "Full Scope"}`,
        order_id: orderData.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            // Step 3: Server-side signature verification
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.verified) {
              router.push(
                `/checkout/success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}&plan=${selectedPkg.name}&amount=${payableAmount}`
              );
            } else {
              router.push(`/checkout/cancel?reason=signature_mismatch`);
            }
          } catch {
            router.push(`/checkout/cancel?reason=verification_exception`);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          package_id: selectedPkg.id,
          billing_choice: billingChoice,
        },
        theme: {
          color: "#FF7139",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      setIsLoading(false);
      setErrorMessage(
        err instanceof Error ? err.message : "An error occurred during checkout setup."
      );
    }
  };

  return (
    <div className="pt-28 pb-24 md:pb-36 bg-[#F5F5F2] min-h-screen">
      {/* Razorpay Standard Client Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Pricing Packages</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="border-b border-[#DDDDDA] pb-8 mb-12">
          <span
            className="text-xs uppercase tracking-[0.16em] font-semibold text-[#FF7139] block mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Secure Checkout
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#111111] leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CONFIRM YOUR <span className="text-[#FF7139]">PROJECT SPRINT</span>.
          </h1>
        </div>

        {/* Main Grid: Form vs Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Client Details Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white p-8 sm:p-10 shadow-sm">
              <h2
                className="text-2xl font-bold uppercase tracking-tight text-[#111111] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                1. CLIENT & PROJECT DETAILS
              </h2>

              <form onSubmit={handleInitiatePayment} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="customer-name"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Full Name <span className="text-[#FF7139]">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="customer-email"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Email Address <span className="text-[#FF7139]">*</span>
                    </label>
                    <input
                      id="customer-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sarah@studio.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label
                      htmlFor="customer-phone"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Contact Phone
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label
                      htmlFor="customer-company"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Brand / Company
                    </label>
                    <input
                      id="customer-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Jenkins Design Co"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>

                {/* Project Brief Notes */}
                <div className="space-y-2">
                  <label
                    htmlFor="customer-notes"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Project Brief & Key Deliverable Requirements
                  </label>
                  <textarea
                    id="customer-notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Briefly describe your current website state, reference sites you admire, and any critical deadlines..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all resize-y"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                {/* Payment Option Selector */}
                <div className="pt-4 border-t border-[#DDDDDA]">
                  <label
                    className="block text-xs uppercase tracking-wider font-semibold text-[#111111] mb-3"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Payment Structure Choice
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setBillingChoice("deposit")}
                      className={cn(
                        "p-4 rounded-xl border cursor-pointer transition-all",
                        billingChoice === "deposit"
                          ? "border-[#FF7139] bg-[#FF7139]/5 ring-1 ring-[#FF7139]"
                          : "border-[#DDDDDA] bg-[#F5F5F2] hover:border-[#111111]"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase text-[#111111]">50% Milestone Deposit</span>
                        <span className="text-xs font-mono font-bold text-[#FF7139]">
                          ₹{(selectedPkg.indicativePrice / 2).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777777]">
                        Initiates technical discovery & sprint. Balance due on deployment.
                      </p>
                    </div>

                    <div
                      onClick={() => setBillingChoice("full")}
                      className={cn(
                        "p-4 rounded-xl border cursor-pointer transition-all",
                        billingChoice === "full"
                          ? "border-[#FF7139] bg-[#FF7139]/5 ring-1 ring-[#FF7139]"
                          : "border-[#DDDDDA] bg-[#F5F5F2] hover:border-[#111111]"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase text-[#111111]">100% Full Upfront</span>
                        <span className="text-xs font-mono font-bold text-[#111111]">
                          ₹{selectedPkg.indicativePrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#777777]">
                        Full project lock with priority development sprint queue.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group inline-flex items-center justify-center gap-3 py-4.5 rounded-full bg-[#111111] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FF7139] hover:shadow-md disabled:opacity-50 cursor-pointer"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Secure Checkout...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Payment (₹{payableAmount.toLocaleString("en-IN")})</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white p-8 sm:p-10 shadow-sm space-y-6">
              <h2
                className="text-2xl font-bold uppercase tracking-tight text-[#111111]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                2. ORDER SUMMARY
              </h2>

              <div className="p-4 rounded-xl bg-[#F5F5F2] border border-[#DDDDDA] flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF7139] block">
                    SELECTED PACKAGE
                  </span>
                  <span className="text-xl font-bold text-[#111111]" style={{ fontFamily: "var(--font-display)" }}>
                    {selectedPkg.name}
                  </span>
                </div>
                <Link
                  href="/pricing"
                  className="text-xs text-[#777777] hover:text-[#111111] underline font-medium"
                >
                  Change
                </Link>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-[#DDDDDA] pt-4 text-xs">
                <div className="flex justify-between text-[#777777]">
                  <span>Total Scope Value</span>
                  <span className="font-mono text-[#111111]">
                    ₹{selectedPkg.indicativePrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Billing Model</span>
                  <span>{billingChoice === "deposit" ? "50% Milestone Deposit" : "100% Upfront"}</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Estimated Sprints</span>
                  <span>{selectedPkg.timeline}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-3 border-t border-[#DDDDDA]">
                  <span>Amount Due Now</span>
                  <span className="text-base text-[#FF7139] font-mono">
                    ₹{payableAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="border-t border-[#DDDDDA] pt-4 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] block">
                  KEY DELIVERABLES
                </span>
                <ul className="space-y-1.5">
                  {selectedPkg.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-[#111111]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7139] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Badge */}
              <div className="p-4 rounded-xl bg-white border border-[#DDDDDA] flex items-start gap-3 text-xs text-[#777777]">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  Encrypted 256-bit TLS transaction processed via Razorpay. Real signatures verified on server.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-40 flex items-center justify-center bg-[#F5F5F2]">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF7139]" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
