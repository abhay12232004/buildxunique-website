"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDown, Activity, Sparkles, Zap } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";

const services = [
  "WEBSITES.",
  "E-COMMERCE.",
  "LANDING PAGES.",
  "UI/UX DESIGN.",
  "WEB APPLICATIONS.",
];

export function HeroSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const loopTlRef = useRef<gsap.core.Timeline | null>(null);
  const [timeString, setTimeString] = useState<string>("");

  /* Live IST Studio Clock */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /* Intro Reveal Animation */
      if (!prefersReduced) {
        const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        introTl
          .fromTo(
            ".hero-hud-bar",
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.6 }
          )
          .fromTo(
            ".hero-eyebrow",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.3"
          )
          .fromTo(
            ".hero-headline-row",
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
            "-=0.35"
          )
          .fromTo(
            ".hero-sub",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.35"
          )
          .fromTo(
            ".hero-metrics-pill",
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
            "-=0.3"
          )
          .fromTo(
            ".hero-ctas",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.3"
          )
          .fromTo(
            ".hero-scroll",
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            "-=0.2"
          );
      }

      /* Dynamic Services Vertical Roller */
      if (prefersReduced) {
        if (wordRefs.current[0]) {
          gsap.set(wordRefs.current[0], { yPercent: 0, opacity: 1, visibility: "visible" });
        }
        return;
      }

      // Initialize all service words: 0 visible, 1..n hidden below
      wordRefs.current.forEach((el, index) => {
        if (!el) return;
        if (index === 0) {
          gsap.set(el, { yPercent: 0, opacity: 1, visibility: "visible" });
        } else {
          gsap.set(el, { yPercent: 100, opacity: 0, visibility: "hidden" });
        }
      });

      // Seamless infinite looping timeline
      const loopTl = gsap.timeline({ repeat: -1 });
      loopTlRef.current = loopTl;

      const displayDuration = 2.4; // Time to hold
      const transitionDuration = 0.65; // Slide speed

      services.forEach((_, i) => {
        const nextIndex = (i + 1) % services.length;
        const currentWord = wordRefs.current[i];
        const nextWord = wordRefs.current[nextIndex];

        if (!currentWord || !nextWord) return;

        loopTl.to({}, { duration: displayDuration });

        loopTl.call(() => {
          gsap.set(nextWord, { yPercent: 100, opacity: 0, visibility: "visible" });
        });

        loopTl
          .to(
            currentWord,
            {
              yPercent: -100,
              opacity: 0,
              duration: transitionDuration,
              ease: "power2.inOut",
            },
            `slide-${i}`
          )
          .to(
            nextWord,
            {
              yPercent: 0,
              opacity: 1,
              duration: transitionDuration,
              ease: "power2.inOut",
            },
            `slide-${i}`
          );

        loopTl.call(() => {
          gsap.set(currentWord, { visibility: "hidden" });
        });
      });

      /* Handle Visibility Change to prevent GSAP desync */
      const handleVisibilityChange = () => {
        if (document.hidden) {
          loopTl.pause();
        } else {
          loopTl.resume();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        loopTl.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Hero Section"
      className="relative min-h-screen flex flex-col items-center justify-between pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 md:pb-16 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden bg-[#F5F5F2]"
    >
      {/* Architectural Corner Crosshair Accents */}
      <div className="absolute top-24 left-6 hidden xl:block text-[#DDDDDA] font-mono text-xs select-none" aria-hidden="true">
        + 001 // HERO
      </div>
      <div className="absolute top-24 right-6 hidden xl:block text-[#DDDDDA] font-mono text-xs select-none" aria-hidden="true">
        GRID // 1440PX +
      </div>

      {/* TOP STUDIO HUD STATUS BAR */}
      <div className="hero-hud-bar w-full max-w-[1440px] flex items-center justify-between py-2 border-b border-[#DDDDDA]/60 mb-6 text-[11px] sm:text-xs font-mono text-[#777777] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-[#FF7139] animate-pulse" />
          <span>INDEPENDENT DIGITAL STUDIO</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>ARCH: NEXT.JS 16 // GSAP</span>
          <span>{timeString || "DELHI, INDIA"}</span>
        </div>
        <div className="flex items-center gap-2 text-[#111111] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
          <span>STUDIO OPERATIONAL</span>
        </div>
      </div>

      {/* MAIN CENTERED HERO CONTENT */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center my-auto px-2">
        {/* Eyebrow Label */}
        <div className="hero-eyebrow mb-6 sm:mb-8">
          <span
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#DDDDDA] bg-white/70 backdrop-blur-xs text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Sparkles className="w-3 h-3 text-[#FF7139]" />
            <span>Digital Design & Creative Engineering</span>
          </span>
        </div>

        {/* 3-LINE CENTERED OVERSIZED HEADLINE */}
        <div
          className="w-full text-center tracking-tight leading-[1] select-none text-[clamp(2rem,7vw,7rem)] font-normal uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {/* LINE 1 */}
          <div className="hero-headline-row overflow-hidden pb-1">
            <h1 className="text-[#111111] tracking-normal whitespace-nowrap leading-[1]">
              WE BUILD
            </h1>
          </div>

          {/* LINE 2 — DYNAMIC ROTATING SERVICE (ORANGE) */}
          <div className="hero-headline-row relative h-[1.25em] overflow-hidden my-1 sm:my-2 flex items-center justify-center">
            {services.map((service, index) => (
              <span
                key={service}
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="absolute inset-0 flex items-center justify-center text-[#FF7139] tracking-normal whitespace-nowrap leading-[1] will-change-transform drop-shadow-[0_4px_24px_rgba(255,113,57,0.18)]"
                aria-hidden={index !== 0}
              >
                {service}
              </span>
            ))}
          </div>

          {/* LINE 3 */}
          <div className="hero-headline-row overflow-hidden pt-1">
            <h2 className="text-[#111111] tracking-normal whitespace-nowrap leading-[1]">
              THAT MOVE PEOPLE.
            </h2>
          </div>
        </div>

        {/* SUPPORTING MANIFESTO SUBTITLE */}
        <p
          className="hero-sub mt-8 sm:mt-10 max-w-2xl text-center text-sm sm:text-base md:text-lg text-[#777777] font-normal leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          From bold concept architectures to high-converting commercial platforms. We partner with ambitious brands to build unmistakable, performance-driven web products.
        </p>

        {/* KINETIC METRIC PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          <div className="hero-metrics-pill px-3 py-1 rounded-full border border-[#DDDDDA] bg-white/80 text-[11px] font-mono uppercase text-[#111111] flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#FF7139]" />
            <span>0% Generic Templates</span>
          </div>
          <div className="hero-metrics-pill px-3 py-1 rounded-full border border-[#DDDDDA] bg-white/80 text-[11px] font-mono uppercase text-[#111111] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4CE36]" />
            <span>Sub-Second Page Loads</span>
          </div>
          <div className="hero-metrics-pill px-3 py-1 rounded-full border border-[#DDDDDA] bg-white/80 text-[11px] font-mono uppercase text-[#111111] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span>100% Bespoke Code</span>
          </div>
        </div>

        {/* CALL TO ACTION BUTTONS WITH MAGNETIC HOVER */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto">
          <MagneticButton strength={0.25} className="w-full sm:w-auto">
            <Link
              href="/contact"
              data-cursor="START"
              className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-full bg-[#111111] text-[#FFFFFF] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FF7139] hover:shadow-[0_8px_28px_rgba(255,113,57,0.32)] focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Start a Project</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.25} className="w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.push("/work")}
              data-cursor="WORK"
              className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#111111] border border-[#DDDDDA] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Explore Selected Work</span>
              <ArrowDown
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="hero-scroll w-full flex flex-col items-center justify-center pt-8 sm:pt-10">
        <button
          type="button"
          onClick={() => {
            const nextSec = document.getElementById("manifesto-section");
            if (nextSec) {
              nextSec.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="group inline-flex flex-col items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#777777] hover:text-[#111111] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF7139] rounded-xs"
          aria-label="Scroll down to studio manifesto"
        >
          <div className="w-5 h-9 rounded-full border border-[#DDDDDA] flex items-start justify-center p-1 group-hover:border-[#111111] transition-colors">
            <span className="w-1 h-2 rounded-full bg-[#FF7139] animate-bounce" />
          </div>
          <span>SCROLL TO EXPLORE</span>
        </button>
      </div>
    </section>
  );
}
