"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Code, CheckCircle2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const tenets = [
  {
    number: "01",
    title: "RADICAL TYPOGRAPHIC DISCIPLINE",
    description:
      "Typography is not decoration; it is the structural backbone of communication. We treat type hierarchy, proportion, and micro-kerning with the discipline of architectural print.",
  },
  {
    number: "02",
    title: "PERFORMANCE AS A DESIGN ATTRIBUTE",
    description:
      "A gorgeous website that stutters or takes 3 seconds to load is a commercial failure. Every interaction, script, and font file is weighed to protect fluid frame rates.",
  },
  {
    number: "03",
    title: "RESPECT FOR CAPITAL & TIMELINES",
    description:
      "We operate with fixed milestone deposits, transparent deliverable scopes, and clear launch dates. We respect your commercial investment and treat your project as our own flagship.",
  },
];

const technologies = [
  { name: "Next.js 16 App Router", category: "Framework" },
  { name: "React 19 Server Components", category: "Core UI" },
  { name: "TypeScript 5", category: "Type Safety" },
  { name: "GSAP & ScrollTrigger", category: "Motion" },
  { name: "Tailwind CSS v4", category: "Styling" },
  { name: "Shopify Storefront API", category: "E-Commerce" },
  { name: "Razorpay & Stripe SDK", category: "Payments" },
  { name: "PostHog & Vercel Analytics", category: "Telemetry" },
];

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".section-intro",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-intro",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".tenet-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tenets-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="About Buildxunique — Studio Manifesto"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* SECTION HEADER HUD */}
        <div className="section-intro flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#DDDDDA] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              <span>007 // STUDIO MANIFESTO</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#111111] uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WHO WE ARE.
            </h2>
          </div>

          <p
            className="max-w-md text-sm sm:text-base text-[#777777] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Buildxunique is an independent digital design and frontend engineering studio. We build bold, bespoke digital products for visionary companies.
          </p>
        </div>

        {/* EDITORIAL MANIFESTO SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 sm:mb-24">
          <div className="lg:col-span-7">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] uppercase leading-[1.05] tracking-tight mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WE BUILD WEBSITES THAT LOOK LIKE THEY WERE CRAFTED BY HAND — BECAUSE THEY WERE.
            </h3>
            <div
              className="space-y-4 text-base sm:text-lg text-[#777777] leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <p>
                We do not sell cookie-cutter WordPress installations, generic Webflow themes, or bloated page-builder templates. Every single project we accept is treated as a piece of digital architecture.
              </p>
              <p>
                Founded on the belief that commercial software can possess editorial elegance, we bring together Swiss typographic precision, fluid 60-120fps motion design, and cutting-edge React 19 engineering.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <MagneticButton strength={0.3}>
                <Link
                  href="/about"
                  data-cursor="STUDIO"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
                >
                  <span>Read Full Studio Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT: TECH CAPABILITY MATRIX */}
          <div className="lg:col-span-5 rounded-2xl border border-[#DDDDDA] bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#DDDDDA]/70">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#FF7139]" />
                <span className="text-xs font-mono tracking-wider uppercase font-bold text-[#111111]">
                  CORE PRODUCTION STACK
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#777777]">100% NATIVE</span>
            </div>

            <div className="space-y-3">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F2] hover:bg-white border border-[#DDDDDA]/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7139]" />
                    <span className="text-xs font-semibold text-[#111111]">
                      {tech.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#777777] uppercase">
                    {tech.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#DDDDDA]/70 flex items-center justify-between text-[11px] font-mono text-[#777777]">
              <span>ZERO TEMPLATES</span>
              <span className="text-[#FF7139] font-bold">100% TYPED CODE</span>
            </div>
          </div>
        </div>

        {/* 3 WORKING TENETS */}
        <div className="tenets-container grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenets.map((tenet) => (
            <div
              key={tenet.number}
              data-cursor="TENET"
              className="tenet-card motion-card p-8 rounded-2xl border border-[#DDDDDA] bg-white flex flex-col justify-between hover:border-[#111111] transition-all duration-300"
            >
              <div>
                <span
                  className="text-3xl font-bold text-[#FF7139] block mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tenet.number}
                </span>
                <h4
                  className="text-xl font-bold text-[#111111] uppercase tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tenet.title}
                </h4>
                <p
                  className="text-sm text-[#777777] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {tenet.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
