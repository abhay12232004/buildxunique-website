"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "01",
    name: "DISCOVER",
    description:
      "We immerse ourselves in your brand DNA, business model, audience pain points, and strategic commercial goals.",
  },
  {
    step: "02",
    name: "STRATEGIZE",
    description:
      "We map the site architecture, user journeys, interaction blueprints, copy hierarchy, and milestone timeline.",
  },
  {
    step: "03",
    name: "DESIGN",
    description:
      "We produce high-fidelity editorial layouts, design tokens, responsive states, and signature micro-interactions.",
  },
  {
    step: "04",
    name: "DEVELOP",
    description:
      "We build in modern Next.js and TypeScript, weaving fluid GSAP animations with accessible, performant code.",
  },
  {
    step: "05",
    name: "LAUNCH",
    description:
      "Rigorous cross-device QA, Core Web Vitals optimization, domain configuration, and launch support.",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".process-step",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
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
      className="relative py-24 md:py-36 border-t overflow-hidden"
      style={{
        background: "#090909",
        borderColor: "rgba(244, 241, 234, 0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Heading */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span
              className="text-xs tracking-widest uppercase mb-4 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              Our Process
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              FROM FIRST IDEA <br />
              <span style={{ color: "#D7FF00" }}>TO FINAL LAUNCH.</span>
            </h2>
          </div>
          <p
            className="text-sm md:text-base max-w-sm leading-relaxed"
            style={{ color: "#858585" }}
          >
            A clear process. Thoughtful execution. Zero unnecessary complexity.
            Here is how your vision becomes reality.
          </p>
        </div>

        {/* Timeline Container: Desktop Horizontal Grid / Mobile Vertical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Subtle connecting line behind steps on desktop */}
          <div
            className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] pointer-events-none z-0"
            style={{ background: "rgba(244, 241, 234, 0.1)" }}
          />

          {steps.map((item) => (
            <div
              key={item.step}
              className="process-step opacity-0 relative z-10 flex flex-col border p-6 md:p-6"
              style={{
                background: "#0d0d0d",
                borderColor: "rgba(244, 241, 234, 0.08)",
              }}
            >
              {/* Step indicator node */}
              <div className="flex items-center justify-between mb-8">
                <span
                  className="w-10 h-10 border flex items-center justify-center font-bold text-xs"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    borderColor: "#D7FF00",
                    color: "#D7FF00",
                    background: "rgba(215, 255, 0, 0.05)",
                  }}
                >
                  {item.step}
                </span>
                <span
                  className="text-[10px] tracking-widest uppercase"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#858585",
                  }}
                >
                  PHASE
                </span>
              </div>

              <h3
                className="text-xl font-bold tracking-tight mb-3"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#F4F1EA",
                }}
              >
                {item.name}
              </h3>

              <p
                className="text-xs md:text-sm leading-relaxed"
                style={{ color: "#858585" }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
