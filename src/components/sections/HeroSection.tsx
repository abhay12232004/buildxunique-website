"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
            ".hero-eyebrow",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6 }
          )
          .fromTo(
            ".hero-headline-row",
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 },
            "-=0.3"
          )
          .fromTo(
            ".hero-sub",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.35"
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
        // Fallback: simply show first word statically
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

      const displayDuration = 2.4; // Time to hold and read
      const transitionDuration = 0.65; // Slide speed

      services.forEach((_, i) => {
        const nextIndex = (i + 1) % services.length;
        const currentWord = wordRefs.current[i];
        const nextWord = wordRefs.current[nextIndex];

        if (!currentWord || !nextWord) return;

        // Hold current word
        loopTl.to({}, { duration: displayDuration });

        // Step label for synchronizing exit & entrance
        const stepLabel = `step-${i}`;

        // Current word exits upward
        loopTl.to(
          currentWord,
          {
            yPercent: -100,
            opacity: 0,
            duration: transitionDuration,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(currentWord, { visibility: "hidden" });
            },
          },
          stepLabel
        );

        // Next word enters from below
        loopTl.set(nextWord, { yPercent: 100, opacity: 0, visibility: "visible" }, stepLabel);
        loopTl.to(
          nextWord,
          {
            yPercent: 0,
            opacity: 1,
            duration: transitionDuration,
            ease: "power3.inOut",
          },
          stepLabel
        );
      });

      // Pause when page is not visible
      const handleVisibilityChange = () => {
        if (!loopTlRef.current) return;
        if (document.hidden) {
          loopTlRef.current.pause();
        } else {
          loopTlRef.current.resume();
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
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#F5F5F2] pt-32 sm:pt-36 md:pt-44 pb-20 sm:pb-24 px-6 md:px-10 lg:px-16"
    >
      {/* Warm Ambient Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 32%, rgba(255, 113, 57, 0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle Architectural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div className="hero-eyebrow mb-6 sm:mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#DDDDDA] bg-white/70 backdrop-blur-xs text-[11px] sm:text-xs tracking-[0.16em] uppercase font-semibold text-[#777777]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" aria-hidden="true" />
            Independent Design & Development Studio
          </span>
        </div>

        {/* Grand Centered Headline (DOVV Studio Composition) */}
        <h1
          className="w-full flex flex-col items-center justify-center font-bold tracking-tight select-none leading-[0.92] text-[3.25rem] sm:text-[4.75rem] md:text-[6.5rem] lg:text-[7.75rem] xl:text-[8.5rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {/* Line 1: Fixed */}
          <span className="hero-headline-row block text-[#111111] uppercase tracking-[-0.01em]">
            WE BUILD
          </span>

          {/* Line 2: Dynamic Rotating Service in Orange */}
          <span className="hero-headline-row relative block w-full h-[1.05em] overflow-hidden">
            {services.map((service, index) => (
              <span
                key={service}
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                className="absolute inset-0 flex items-center justify-center text-[#FF7139] uppercase tracking-[-0.01em] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-display)",
                  visibility: index === 0 ? "visible" : "hidden",
                }}
              >
                {service}
              </span>
            ))}
          </span>

          {/* Line 3: Fixed */}
          <span className="hero-headline-row block text-[#111111] uppercase tracking-[-0.01em]">
            THAT MOVE PEOPLE.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p
          className="hero-sub text-center mx-auto mt-8 sm:mt-10 md:mt-12 max-w-2xl text-base sm:text-lg md:text-xl text-[#777777] font-normal leading-relaxed px-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          We design and develop digital experiences that help ambitious brands stand
          out, connect and grow.
        </p>

        {/* Interactive CTA Buttons */}
        <div className="hero-ctas mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* PRIMARY CTA: START A PROJECT */}
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-9 sm:py-4.5 rounded-full bg-[#111111] text-[#FFFFFF] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FF7139] hover:shadow-[0_8px_24px_rgba(255,113,57,0.25)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>START A PROJECT</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </Link>

          {/* SECONDARY CTA: EXPLORE OUR WORK */}
          <button
            type="button"
            onClick={() => {
              const target =
                document.getElementById("work") ||
                document.getElementById("portfolio") ||
                document.querySelector("section:nth-of-type(2)");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/work");
              }
            }}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-9 sm:py-4.5 rounded-full border border-[#DDDDDA] bg-transparent text-[#111111] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:border-[#111111] hover:bg-white hover:shadow-xs hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-3 cursor-pointer"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowDown
              className="w-4 h-4 text-[#777777] transition-all duration-200 group-hover:translate-y-1 group-hover:text-[#111111]"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="hero-scroll mt-16 sm:mt-20 md:mt-24 flex flex-col items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span
            className="text-[11px] uppercase tracking-[0.2em] text-[#777777] font-semibold"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Scroll to pull
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-[#FF7139] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
