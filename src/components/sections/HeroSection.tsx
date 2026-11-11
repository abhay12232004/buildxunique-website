"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CharacterSVG } from "@/components/ui/CharacterSVG";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".hero-headline",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".hero-character",
          { opacity: 0, x: 60, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" },
          "-=0.6"
        );

      /* Rope tension float */
      gsap.to(".hero-rope", {
        attr: { d: "M0,30 Q180,65 360,30 Q540,0 720,30" },
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* Character subtle float */
      gsap.to(".hero-character", {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#090909", paddingTop: "72px" }}
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(215,255,0,0.04) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 80%, rgba(255,79,154,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,241,234,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,234,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-72px)]">
          {/* Left — Content */}
          <div className="flex flex-col justify-center">
            <div className="hero-label mb-8 opacity-0">
              <span
                className="inline-block text-xs tracking-widest uppercase border px-3 py-1.5"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#858585",
                  borderColor: "rgba(133,133,133,0.3)",
                }}
              >
                Independent Digital Design & Development Studio
              </span>
            </div>

            <div className="mb-8 overflow-hidden">
              <h1
                className="hero-headline opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
              >
                WE DON&apos;T JUST
              </h1>
              <h1
                className="hero-headline opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D7FF00" }}
              >
                BUILD WEBSITES.
              </h1>
              <h1
                className="hero-headline opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
              >
                WE BUILD
              </h1>
              <h1
                className="hero-headline opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
              >
                DIGITAL EXPERIENCES.
              </h1>
            </div>

            <p
              className="hero-sub opacity-0 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
              style={{ color: "#858585" }}
            >
              From bold ideas to powerful digital experiences, we help ambitious
              businesses build a stronger presence online.
            </p>

            <div className="hero-ctas opacity-0 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-6 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:gap-3"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  background: "#D7FF00",
                  color: "#090909",
                }}
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/work"
                className="group flex items-center gap-2 px-6 py-4 text-sm tracking-widest uppercase border transition-all duration-300 hover:border-[#F4F1EA] hover:text-[#F4F1EA]"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#858585",
                  borderColor: "rgba(133,133,133,0.3)",
                }}
              >
                Explore Our Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Scroll hint */}
            <div className="mt-12 hidden md:flex items-center gap-3">
              <div
                className="w-6 h-9 border flex items-start justify-center pt-1.5"
                style={{ borderColor: "rgba(133,133,133,0.3)" }}
              >
                <div
                  className="w-1 h-2 rounded-full"
                  style={{
                    background: "#D7FF00",
                    animation: "scrollDot 1.6s ease-in-out infinite",
                  }}
                />
              </div>
              <span
                className="text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#858585",
                }}
              >
                Scroll to Pull ↓
              </span>
            </div>
          </div>

          {/* Right — Character & Rope Visual */}
          <div className="hero-character opacity-0 relative flex items-center justify-center">
            {/* Glow behind character */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 60%, rgba(215,255,0,0.08) 0%, transparent 70%)",
              }}
            />

            {/* Rope SVG */}
            <div className="absolute inset-0 flex items-center">
              <svg
                viewBox="0 0 720 60"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: "60px" }}
              >
                <path
                  className="hero-rope"
                  d="M0,30 Q180,10 360,30 Q540,50 720,30"
                  stroke="#D7FF00"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Rope texture */}
                <path
                  d="M0,30 Q180,10 360,30 Q540,50 720,30"
                  stroke="#D7FF00"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="4 8"
                  opacity="0.3"
                />
              </svg>
            </div>

            {/* Character */}
            <CharacterSVG className="relative z-10 w-64 md:w-80 xl:w-96 drop-shadow-2xl" />

            {/* Floating elements */}
            <div
              className="absolute top-10 right-10 w-24 h-24 border border-dashed opacity-20"
              style={{ borderColor: "#D7FF00", borderRadius: "50%" }}
            />
            <div
              className="absolute bottom-20 left-10 w-12 h-12 border border-dashed opacity-15"
              style={{ borderColor: "#FF4F9A" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
