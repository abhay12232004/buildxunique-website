"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Palette, Code2, Rocket, Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Search,
    phase: "DISCOVER & STRATEGIZE",
    timeline: "Week 01",
    tagline: "Uncovering Commercial Intent",
    description:
      "We dissect your target audience, commercial goals, competitors, and technical requirements. We establish the typographic direction, information architecture, and core funnel metrics.",
    deliverables: [
      "Brand & audience positioning alignment",
      "Sitemap & information architecture",
      "Moodboards & creative direction deck",
      "Technical architecture specification",
    ],
  },
  {
    number: "02",
    icon: Palette,
    phase: "DESIGN & PROTOTYPE",
    timeline: "Weeks 02–03",
    tagline: "Translating Brand Into Visual Form",
    description:
      "We craft high-fidelity desktop and mobile viewports in Figma. We define the design tokens, spatial rhythm, custom iconography, and interactive prototypes for full client review.",
    deliverables: [
      "High-fidelity responsive Figma UI layouts",
      "Interactive clickable prototypes",
      "Complete design system & token variables",
      "Async Loom video walkthrough for feedback",
    ],
  },
  {
    number: "03",
    icon: Code2,
    phase: "DEVELOP & CHOREOGRAPH",
    timeline: "Weeks 03–05",
    tagline: "Native React 19 & Next.js 16 Engineering",
    description:
      "We convert approved designs into clean, modular code. We implement fluid GSAP animations, optimize asset pipelines, and wire up database, CMS, or payment gateways.",
    deliverables: [
      "Custom Next.js App Router codebase",
      "Choreographed GSAP scroll animations",
      "Private live staging URL on Vercel",
      "Zero-latency API & gateway integrations",
    ],
  },
  {
    number: "04",
    icon: Rocket,
    phase: "QA, BENCHMARK & LAUNCH",
    timeline: "Week 05–06",
    tagline: "Precision Deployment to Production",
    description:
      "We conduct cross-browser and mobile device audits, verify WCAG accessibility, stress-test Lighthouse scores, point your custom domain, and hand over complete source code.",
    deliverables: [
      "100/100 Lighthouse performance validation",
      "DNS configuration & SSL deployment",
      "PostHog / Google Analytics instrumentation",
      "30-day post-launch warranty & handover docs",
    ],
  },
];

export function ProcessSection() {
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
        ".process-step-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-step-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Studio 4-Step Process & Execution Methodology"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* SECTION HEADER HUD */}
        <div className="section-intro flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#DDDDDA] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              <span>006 // SYSTEMATIC METHODOLOGY</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#111111] uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              4-STEP PROCESS.
            </h2>
          </div>

          <p
            className="max-w-md text-sm sm:text-base text-[#777777] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A disciplined, transparent delivery framework engineered to eliminate guesswork, respect turnaround deadlines, and produce award-worthy results.
          </p>
        </div>

        {/* 4-STEP PIPELINE CARDS */}
        <div className="process-step-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                data-cursor="STEP"
                className="process-step-card motion-card group relative p-8 rounded-2xl border border-[#DDDDDA] bg-white flex flex-col justify-between transition-all duration-300 hover:border-[#111111] hover:shadow-[0_12px_40px_rgba(17,17,17,0.06)]"
              >
                <div>
                  {/* Top Step Meta */}
                  <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDA]/60">
                    <span
                      className="text-3xl font-bold text-[#FF7139]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-full border border-[#DDDDDA] bg-[#F5F5F2] text-[10px] font-mono text-[#111111] uppercase">
                      {step.timeline}
                    </span>
                  </div>

                  {/* Icon & Phase */}
                  <div className="mt-6">
                    <div className="p-2.5 w-fit rounded-xl bg-[#F5F5F2] group-hover:bg-[#FF7139] group-hover:text-white transition-colors duration-200 mb-3">
                      <Icon className="w-5 h-5 text-[#111111] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF7139] font-bold block mb-1">
                      {step.tagline}
                    </span>
                    <h3
                      className="text-xl font-bold text-[#111111] uppercase tracking-tight mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.phase}
                    </h3>
                    <p
                      className="text-sm text-[#777777] leading-relaxed mb-6"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="mt-4 pt-4 border-t border-[#DDDDDA]/50">
                  <span className="text-[10px] font-mono uppercase text-[#777777] font-semibold block mb-2.5">
                    KEY MILESTONES:
                  </span>
                  <ul className="space-y-2">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#111111]">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#F5F5F2] border border-[#DDDDDA] flex items-center justify-center shrink-0 mt-0.5 text-[#FF7139]">
                          <Check className="w-2 h-2" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM INITIATE CALLOUT */}
        <div className="mt-16 p-8 rounded-2xl border border-[#DDDDDA] bg-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h4
              className="text-xl sm:text-2xl font-bold text-[#111111] uppercase tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              READY TO COMMENCE STEP 01?
            </h4>
            <p className="text-xs sm:text-sm text-[#777777] mt-1 font-mono">
              We onboard only 2 new projects per month to maintain uncompromised craft.
            </p>
          </div>
          <MagneticButton strength={0.25}>
            <Link
              href="/contact"
              data-cursor="DISCUSS"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
            >
              <span>Schedule Discovery Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
