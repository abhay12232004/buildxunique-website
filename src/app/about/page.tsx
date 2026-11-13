"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: "01",
    title: "Direction Before Decoration",
    description:
      "Visual aesthetics mean nothing without purposeful narrative, clear user pathways, and business alignment.",
  },
  {
    number: "02",
    title: "Engineering Discipline",
    description:
      "We write clean, semantic TypeScript with zero unnecessary bloat. Every component is built for speed and long-term maintainability.",
  },
  {
    number: "03",
    title: "Uncompromising Polish",
    description:
      "From easing curves in GSAP to typographic scale and spacing, obsessive attention to detail separates good sites from memorable ones.",
  },
  {
    number: "04",
    title: "Transparent Partnership",
    description:
      "Direct collaboration with the creators. Milestone-based sprints, clear timelines, and proactive communication from day one.",
  },
];

const capabilities = [
  "Bespoke Website Architecture",
  "Headless Next.js Storefronts",
  "High-Converting Campaign Pages",
  "UI/UX Design Systems & Tokens",
  "GSAP Motion Choreography",
  "Next.js 16 App Router",
  "Core Web Vitals Optimization",
  "Technical SEO & Accessibility",
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".about-hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".about-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
      gsap.utils.toArray<HTMLElement>(".about-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
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
    <div ref={containerRef} className="pt-28 pb-24 md:pb-36 bg-[#F5F5F2] min-h-screen">
      {/* Header */}
      <section className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <div className="max-w-[1440px] mx-auto border-b border-[#DDDDDA] pb-12 sm:pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[#777777]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Studio Profile & Philosophy
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
          </div>

          <h1
            className="about-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#111111] leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            WE BUILD DIGITAL <br />
            <span className="text-[#FF7139]">AUTHORITY FOR BRANDS</span>.
          </h1>

          <p
            className="about-hero-sub text-base sm:text-lg md:text-xl text-[#777777] max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Buildxunique is an independent digital design and development studio.
            We craft websites, e-commerce storefronts, and digital experiences that
            combine bold editorial aesthetics with rigorous engineering.
          </p>
        </div>
      </section>

      {/* Studio Story Section */}
      <section className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span
              className="text-xs font-mono uppercase tracking-widest text-[#FF7139] block mb-3"
            >
              OUR MISSION
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111] leading-[0.98]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NO SHORTCUTS. <br />
              NO TEMPLATE COPIES.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#777777] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            <p>
              In a digital landscape flooded with generic templates, businesses often lose their voice before a visitor even scrolls. We believe your digital presence should feel as deliberate, memorable, and high-caliber as your product itself.
            </p>
            <p>
              We approach every engagement as a design-engineering partnership. We work without account managers or layers of bureaucracy — our clients collaborate directly with the creators shaping the architecture, typography, motion curves, and code.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="border-b border-[#DDDDDA] pb-8 mb-12">
            <span
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[#777777] block mb-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Working Standards
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CORE PRINCIPLES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((val) => (
              <div
                key={val.number}
                className="about-card motion-card p-8 rounded-2xl border border-[#DDDDDA] bg-white hover:border-[#111111] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs font-mono tracking-widest text-[#FF7139] block mb-6">
                    {val.number}
                  </span>
                  <h3
                    className="text-2xl font-bold uppercase tracking-tight text-[#111111] mb-3 leading-[1.05]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {val.title}
                  </h3>
                  <p
                    className="text-sm text-[#777777] leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Tech Stack */}
      <section className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="max-w-[1440px] mx-auto p-8 sm:p-12 md:p-16 rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139]">
                TECHNICAL COMPETENCE
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DISCIPLINE & TECH STACK
              </h2>
              <p
                className="text-sm text-[#777777] leading-relaxed max-w-md"
                style={{ fontFamily: "var(--font-body)" }}
              >
                We build with modern frameworks that guarantee fast rendering, secure data boundaries, and long-term maintainability.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#111111]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139] flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto p-8 sm:p-12 md:p-16 rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              READY TO DISCUSS YOUR PROJECT?
            </h2>
            <p className="text-sm text-[#777777]" style={{ fontFamily: "var(--font-body)" }}>
              Tell us about your brand and requirements. We respond within 24 hours.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
