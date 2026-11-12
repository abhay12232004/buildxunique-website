"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Zap, Target, Shield, Award, Check, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    icon: Zap,
    number: "01",
    title: "100% BESPOKE ARCHITECTURE",
    description:
      "We write clean, modular React & Next.js code from the ground up. Zero drag-and-drop builder bloat, zero brittle templates, zero third-party plugin spaghetti.",
    stat: "0%",
    statLabel: "Templates Used",
  },
  {
    icon: Target,
    number: "02",
    title: "SUB-SECOND SPEED BENCHMARKS",
    description:
      "Modern visitors abandon sluggish sites. We obsessively optimize server components, WebP assets, and font loading to guarantee sub-second LCP scores.",
    stat: "< 0.8s",
    statLabel: "Average Page Load",
  },
  {
    icon: Shield,
    number: "03",
    title: "DIRECT SENIOR COLLABORATION",
    description:
      "You collaborate directly with senior design and engineering leads. No junior delegation, no account-manager game of telephone, no bureaucratic lag.",
    stat: "1:1",
    statLabel: "Dedicated Focus",
  },
  {
    icon: Award,
    number: "04",
    title: "TRANSPARENT FIXED INVESTMENT",
    description:
      "We provide explicit scope definitions, fixed 50% deposit milestones, and guaranteed turnaround dates. You always know exactly what you are paying and when it arrives.",
    stat: "100%",
    statLabel: "Fixed Milestones",
  },
];

const comparisons = [
  {
    criterion: "Frontend Foundation",
    bxu: "Native Next.js 16 + React 19 App Router",
    others: "Bloated WordPress, Elementor, or Wix theme",
  },
  {
    criterion: "Motion & Polish",
    bxu: "Bespoke 60-120fps GSAP scroll choreographies",
    others: "Stock CSS hover effects or clunky sliders",
  },
  {
    criterion: "Page Speed Benchmark",
    bxu: "95-100 Google Lighthouse across mobile & desktop",
    others: "Sub-50 score weighed down by 30+ plugins",
  },
  {
    criterion: "Communication Cadence",
    bxu: "Async Loom recordings + weekly direct milestone syncs",
    others: "Slow email back-and-forth through junior accounts",
  },
  {
    criterion: "Pricing Structure",
    bxu: "Transparent 50% deposit with documented deliverables",
    others: "Vague hourly estimates with unexpected scope creep",
  },
];

export function WhySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.utils.toArray<HTMLElement>(".why-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Why Buildxunique — The Studio Standard"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* SECTION HEADER HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#DDDDDA] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              <span>005 // THE STUDIO STANDARD</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#111111] uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHY BUILDXUNIQUE.
            </h2>
          </div>

          <p
            className="max-w-md text-sm sm:text-base text-[#777777] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We reject the churn-and-burn template agency model. We build high-conviction digital products designed to establish lasting competitive advantage.
          </p>
        </div>

        {/* 4 CORE DIFFERENTIATORS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 sm:mb-24">
          {differentiators.map((diff) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.number}
                data-cursor="STANDARD"
                className="why-card group relative p-8 rounded-2xl border border-[#DDDDDA] bg-white flex flex-col justify-between transition-all duration-300 hover:border-[#111111] hover:shadow-[0_12px_36px_rgba(17,17,17,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDA]/60">
                    <span
                      className="text-2xl font-bold text-[#FF7139]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {diff.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#F5F5F2] group-hover:bg-[#FF7139] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-200" />
                    </div>
                  </div>

                  <h3
                    className="text-lg font-bold text-[#111111] uppercase tracking-tight mt-6 mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {diff.title}
                  </h3>
                  <p
                    className="text-sm text-[#777777] leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {diff.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#DDDDDA]/50 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#777777]">{diff.statLabel}</span>
                  <span className="text-xl font-bold text-[#111111]" style={{ fontFamily: "var(--font-display)" }}>
                    {diff.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPARISON MATRIX TABLE */}
        <div className="rounded-2xl border border-[#DDDDDA] bg-white p-6 sm:p-10 shadow-xs">
          <div className="pb-6 mb-8 border-b border-[#DDDDDA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF7139] block mb-1">
                SIDE-BY-SIDE BENCHMARK
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#111111] uppercase tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                THE BUILDXUNIQUE DIFFERENCE
              </h3>
            </div>
            <MagneticButton strength={0.25}>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#FF7139] transition-colors"
              >
                <span>View Transparent Pricing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </MagneticButton>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#DDDDDA] text-[11px] font-mono text-[#777777] uppercase tracking-wider">
                  <th className="py-3 px-4 w-1/4">BENCHMARK</th>
                  <th className="py-3 px-4 w-5/12 text-[#FF7139] font-bold">BUILDXUNIQUE STUDIO</th>
                  <th className="py-3 px-4 w-1/3 text-[#777777]">TRADITIONAL AGENCY / FREELANCER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDDDDA]/60">
                {comparisons.map((row) => (
                  <tr key={row.criterion} className="hover:bg-[#F5F5F2]/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#111111]">{row.criterion}</td>
                    <td className="py-4 px-4 font-medium text-[#111111] flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{row.bxu}</span>
                    </td>
                    <td className="py-4 px-4 text-[#777777]">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                          <X className="w-2.5 h-2.5" />
                        </span>
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
