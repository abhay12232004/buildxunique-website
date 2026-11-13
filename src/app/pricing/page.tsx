"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRICING_PACKAGES } from "@/lib/pricingData";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [billingChoice, setBillingChoice] = useState<"deposit" | "full">("deposit");

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".pricing-hero-title",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
      gsap.fromTo(
        ".pricing-hero-copy",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.12,
          ease: "power2.out",
        }
      );
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pricing-card-grid",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="pt-28 pb-24 md:pb-36 bg-[#F5F5F2] min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <div className="max-w-[1440px] mx-auto border-b border-[#DDDDDA] pb-12 sm:pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[#777777]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Investment & Packages
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
          </div>

          <h1
            className="pricing-hero-title text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#111111] leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TRANSPARENT VALUE. <br />
            <span className="text-[#FF7139]">NO HIDDEN AGENDAS.</span>
          </h1>

          <p
            className="pricing-hero-copy text-base sm:text-lg text-[#777777] max-w-2xl leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We provide milestone-based pricing tailored to project complexity.
            Select a package to start a project sprint, or request a custom architectural scope.
          </p>

          {/* Development Notice Disclaimer */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-[#DDDDDA] text-xs text-[#777777]">
            <AlertCircle className="w-4 h-4 text-[#FF7139] flex-shrink-0" />
            <span>
              <strong>Note:</strong> Package figures below represent configurable indicative starting scopes during development. Final proposals are customized following technical discovery.
            </span>
          </div>
        </div>
      </section>

      {/* Payment Model Toggle */}
      <section className="px-6 md:px-10 lg:px-16 mb-12">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white border border-[#DDDDDA]">
            <button
              type="button"
              onClick={() => setBillingChoice("deposit")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer",
                billingChoice === "deposit"
                  ? "bg-[#111111] text-white shadow-xs"
                  : "text-[#777777] hover:text-[#111111]"
              )}
              style={{ fontFamily: "var(--font-body)" }}
            >
              50% Milestone Deposit
            </button>
            <button
              type="button"
              onClick={() => setBillingChoice("full")}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer",
                billingChoice === "full"
                  ? "bg-[#111111] text-white shadow-xs"
                  : "text-[#777777] hover:text-[#111111]"
              )}
              style={{ fontFamily: "var(--font-body)" }}
            >
              100% Full Upfront
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#777777]">
            <Shield className="w-4 h-4 text-[#FF7139]" />
            <span>Milestone-protected sprints with verified stage gates</span>
          </div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="pricing-card-grid max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRICING_PACKAGES.map((pkg) => {
            const payableAmount =
              billingChoice === "deposit"
                ? Math.round((pkg.indicativePrice * pkg.depositPercentage) / 100)
                : pkg.indicativePrice;

            return (
              <div
                key={pkg.id}
                className={cn(
                  "pricing-card motion-card relative rounded-2xl md:rounded-3xl border p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-lg",
                  pkg.popular
                    ? "bg-white border-[#FF7139] shadow-md ring-2 ring-[#FF7139]/20"
                    : "bg-white border-[#DDDDDA] hover:border-[#111111]"
                )}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-[#FF7139] text-white text-[11px] font-semibold uppercase tracking-wider shadow-xs">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139]">
                      EST. TURNAROUND: {pkg.timeline}
                    </span>
                    <h3
                      className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111] mt-1 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className="text-sm text-[#777777] leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing Number */}
                  <div className="p-6 rounded-2xl bg-[#F5F5F2] border border-[#DDDDDA] mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-[#777777]">Starting from</span>
                      <span
                        className="text-4xl sm:text-5xl font-bold text-[#111111]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        ₹{payableAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777777] mt-1">
                      {billingChoice === "deposit"
                        ? `50% initial deposit (Total scope: ₹${pkg.indicativePrice.toLocaleString("en-IN")})`
                        : "Full upfront payment"}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold block">
                      WHAT IS INCLUDED
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-[#111111] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#FF7139] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 border-t border-[#DDDDDA] mt-6">
                  <Link
                    href={`/checkout?plan=${pkg.id}&billing=${billingChoice}`}
                    className={cn(
                      "w-full group inline-flex items-center justify-center gap-2.5 py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300",
                      pkg.popular
                        ? "bg-[#FF7139] text-white hover:bg-[#111111] shadow-xs"
                        : "bg-[#111111] text-white hover:bg-[#FF7139]"
                    )}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <span>Select {pkg.name}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Quote Banner */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto p-8 sm:p-12 md:p-16 rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139] block mb-2">
              BESPOKE ENTERPRISE SCOPE
            </span>
            <h3
              className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111] mb-3 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NEED A CUSTOM ARCHITECTURAL QUOTATION?
            </h3>
            <p className="text-sm sm:text-base text-[#777777] max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              If your platform requires tailored multi-tenant databases, custom 3D WebGL experiences, or existing system migrations, let&apos;s build a dedicated proposal.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4.5 rounded-full border border-[#111111] bg-transparent text-[#111111] text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#111111] hover:text-white flex-shrink-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Request Custom Scope</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
