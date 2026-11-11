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
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-ctas",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          ".hero-character",
          { opacity: 0, x: 40, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        );

      /* Rope tension wave animation */
      gsap.to(".hero-rope", {
        attr: { d: "M0,25 Q180,40 360,25 Q540,10 720,25" },
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* Character subtle float */
      gsap.to(".hero-character-inner", {
        y: -8,
        duration: 2.6,
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
      style={{ background: "#090909", paddingTop: "80px", paddingBottom: "40px" }}
    >
      {/* Background radial atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 50%, rgba(215,255,0,0.04) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 15% 80%, rgba(255,79,154,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Subtle architectural grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,241,234,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,234,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column — Agency Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="hero-label mb-6">
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

            <div className="mb-6">
              <h1
                className="hero-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
              >
                WE DON&apos;T JUST <br />
                <span style={{ color: "#D7FF00" }}>BUILD WEBSITES.</span> <br />
                WE BUILD <br />
                DIGITAL EXPERIENCES.
              </h1>
            </div>

            <p
              className="hero-sub text-base md:text-lg max-w-lg mb-8 leading-relaxed"
              style={{ color: "#858585" }}
            >
              From bold ideas to powerful digital experiences, we help ambitious
              businesses build a stronger presence online.
            </p>

            <div className="hero-ctas flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-6 py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
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
                className="group flex items-center gap-2 px-6 py-4 text-xs tracking-widest uppercase border transition-all duration-300 hover:border-[#F4F1EA] hover:text-[#F4F1EA]"
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

            {/* Scroll Indicator */}
            <div className="mt-10 hidden md:flex items-center gap-3">
              <div
                className="w-5 h-8 border flex items-start justify-center pt-1"
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

          {/* Right Column — Character & Tension Rope */}
          <div className="hero-character lg:col-span-5 relative flex items-center justify-center py-6">
            {/* Glowing Backdrop */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(215,255,0,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Tension Rope Passing Across Hands */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-10 w-full">
              <svg
                viewBox="0 0 720 50"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: "50px" }}
              >
                <path
                  className="hero-rope"
                  d="M0,25 Q180,10 360,25 Q540,40 720,25"
                  stroke="#D7FF00"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <path
                  d="M0,25 Q180,10 360,25 Q540,40 720,25"
                  stroke="#D7FF00"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 6"
                  opacity="0.3"
                />
              </svg>
            </div>

            {/* Character Illustration */}
            <div className="hero-character-inner relative z-10 flex flex-col items-center">
              <CharacterSVG className="w-56 sm:w-64 md:w-72 lg:w-80 drop-shadow-2xl" />
              {/* Ground Shadow */}
              <div
                className="w-44 h-3 rounded-full mt-1 opacity-40 blur-xs"
                style={{ background: "#000" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
