"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Cpu } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Sparkles,
    number: "01",
    title: "INTENTIONAL MOTION",
    tagline: "Purpose Over Decoration",
    description:
      "Choreographed GSAP interactions crafted to guide attention, not distract. Every frame serves user clarity, emotional resonance, and brand prestige.",
    metric: "60-120 FPS",
  },
  {
    icon: Layers,
    number: "02",
    title: "EDITORIAL DISCIPLINE",
    tagline: "Swiss Typographic Rigor",
    description:
      "Bold typographic scale, generous negative space, and refined rhythm inspired by contemporary design studios worldwide.",
    metric: "0% Templates",
  },
  {
    icon: Cpu,
    number: "03",
    title: "COMMERCIAL IMPACT",
    tagline: "Built to Convert",
    description:
      "Built on Next.js 16 with sub-second page loads, accessibility conformance, and conversion funnels engineered to drive tangible business growth.",
    metric: "100 PageSpeed",
  },
];

export function HumanVisualSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const monolithRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* 3D Mouse Parallax Tilt for Desktop */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // -10 to +10 deg
      const y = (e.clientY / innerHeight - 0.5) * -20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      /* Scroll-based progressive text reveal */
      gsap.utils
        .toArray<HTMLElement>(".manifesto-reveal-line")
        .forEach((line) => {
          gsap.fromTo(
            line,
            { color: "#DDDDDA", y: 24 },
            {
              color: "#111111",
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: line,
                start: "top 88%",
                end: "top 52%",
                scrub: 0.8,
              },
            }
          );
        });

      /* Staggered pillars reveal */
      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pillars-grid",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* Kinetic Parallax drift on monolith */
      gsap.to(".monolith-container", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="manifesto-section"
      ref={sectionRef}
      aria-label="Studio Manifesto & Creative Architecture"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none border-x border-[#DDDDDA]/30" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* SECTION HEADER HUD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-16 sm:mb-20 border-b border-[#DDDDDA] gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7139]" />
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase text-[#111111]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              002 // STUDIO MANIFESTO
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#777777]">
            <span>COORDINATES: 28°36&apos;N 77°12&apos;E</span>
            <span>•</span>
            <span>PHILOSOPHY: FORM FOLLOWS EMOTION</span>
          </div>
        </div>

        {/* EDITORIAL STATEMENT + 3D KINETIC MONOLITH DUAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 sm:mb-32">
          {/* LEFT 7 COLS: EDITORIAL TEXT REVEAL */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div
              className="text-[clamp(2.4rem,5.5vw,5rem)] font-normal uppercase leading-[1.04] tracking-tight select-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <div className="manifesto-reveal-line">WE REJECT</div>
              <div className="manifesto-reveal-line text-[#FF7139]">
                DIGITAL MEDIOCRITY.
              </div>
              <div className="manifesto-reveal-line">EVERY PIXEL IS</div>
              <div className="manifesto-reveal-line">MEASURED. EVERY</div>
              <div className="manifesto-reveal-line text-[#111111]">
                INTERACTION IS
              </div>
              <div className="manifesto-reveal-line text-[#FF7139]">
                INTENTIONAL.
              </div>
            </div>

            <p
              className="mt-8 text-base sm:text-lg text-[#777777] leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Too much of the modern web looks identical. Generic templates, lazy typography, and lifeless interactions create forgettable brands. We architect bespoke digital flagships designed to command authority and captivate human attention.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <MagneticButton strength={0.3}>
                <Link
                  href="/about"
                  data-cursor="READ"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-[#FF7139]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>Our Studio Philosophy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT 5 COLS: 3D KINETIC SPATIAL MONOLITH */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              ref={monolithRef}
              className="monolith-container relative w-full max-w-[420px] aspect-4/5 rounded-2xl border border-[#DDDDDA] bg-gradient-to-b from-white via-[#F5F5F2] to-white p-8 shadow-[0_20px_60px_-15px_rgba(17,17,17,0.08)] transition-transform duration-200 ease-out flex flex-col justify-between overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
              }}
            >
              {/* Monolith Header */}
              <div className="flex items-center justify-between border-b border-[#DDDDDA]/70 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
                  <span className="text-[11px] font-mono tracking-wider text-[#111111] uppercase font-semibold">
                    SPATIAL INSTALLATION
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#777777]">FIG. 01 / FORM</span>
              </div>

              {/* Monolith Center Kinetic Graphic: Orbital Geometry */}
              <div className="relative my-auto flex items-center justify-center py-12">
                {/* Outer Rotating Ring */}
                <div className="w-56 h-56 rounded-full border border-dashed border-[#FF7139]/30 animate-spin" style={{ animationDuration: "24s" }} />

                {/* Inner Counter-Rotating Ring */}
                <div className="absolute w-40 h-40 rounded-full border border-[#111111]/15 animate-spin" style={{ animationDuration: "14s", animationDirection: "reverse" }} />

                {/* Center Core Glass Monolith */}
                <div className="absolute w-24 h-32 rounded-xl bg-[#111111] text-white p-4 flex flex-col justify-between shadow-2xl transition-transform duration-300 hover:scale-105">
                  <span className="text-[9px] font-mono tracking-widest text-[#FF7139]">BXU</span>
                  <div className="w-4 h-0.5 bg-[#FF7139]" />
                  <span className="text-[11px] font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    CORE
                  </span>
                </div>

                {/* Orbiting Satellite Dot */}
                <div className="absolute top-6 right-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#DDDDDA] text-[10px] font-mono text-[#111111] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4CE36]" />
                  <span>CRAFT</span>
                </div>

                {/* Orbiting Code Pill */}
                <div className="absolute bottom-6 left-8 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#DDDDDA] text-[10px] font-mono text-[#111111] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
                  <span>NEXT.JS 16</span>
                </div>
              </div>

              {/* Monolith Footer */}
              <div className="border-t border-[#DDDDDA]/70 pt-4 flex items-center justify-between text-[10px] font-mono text-[#777777]">
                <span>REF: BXU-STUDIO-2026</span>
                <span className="text-[#FF7139] font-bold">100% HANDCRAFTED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 STUDIO PILLARS GRID */}
        <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                data-cursor="INSPECT"
                className="pillar-card group relative p-8 sm:p-10 rounded-2xl border border-[#DDDDDA] bg-white transition-all duration-300 hover:border-[#111111] hover:shadow-[0_12px_40px_rgba(17,17,17,0.06)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDA]/60">
                    <span
                      className="text-2xl font-bold text-[#FF7139]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {pillar.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#F5F5F2] group-hover:bg-[#FF7139] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5 text-[#111111] group-hover:text-white transition-colors duration-200" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF7139] font-bold">
                      {pillar.tagline}
                    </span>
                    <h3
                      className="text-xl font-bold text-[#111111] tracking-tight mt-1 mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="text-sm text-[#777777] leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#DDDDDA]/50 flex items-center justify-between text-xs font-mono text-[#111111]">
                  <span className="text-[#777777]">BENCHMARK</span>
                  <span className="font-bold text-[#FF7139]">{pillar.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
