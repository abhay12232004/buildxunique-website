"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Zap, Sparkles, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    num: "01",
    title: "DESIGN WITH PURPOSE",
    desc: "Every design decision, micro-interaction, and layout structure should directly support user experience and quantifiable business objectives. No vanity fluff.",
    icon: Target,
  },
  {
    num: "02",
    title: "BUILT FOR PERFORMANCE",
    desc: "Lightning-fast page speeds, flawless responsive adaptability, clean semantic markup, and rock-solid architectural reliability from day one.",
    icon: Zap,
  },
  {
    num: "03",
    title: "MADE TO STAND OUT",
    desc: "We build tailored visual systems that distinguish you from sea-of-sameness templates. Your business deserves a digital signature that leaves an impression.",
    icon: Sparkles,
  },
  {
    num: "04",
    title: "PARTNERED THROUGH THE PROCESS",
    desc: "Transparent timelines, proactive communication, direct access to the creators, and continuous alignment from the initial brief through post-launch evolution.",
    icon: Handshake,
  },
];

export function WhySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".why-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
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
      className="relative py-24 md:py-36 border-t"
      style={{
        background: "#090909",
        borderColor: "rgba(244, 241, 234, 0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <span
            className="text-xs tracking-widest uppercase mb-4 inline-block"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#858585",
            }}
          >
            Why Buildxunique
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F4F1EA",
            }}
          >
            GOOD DESIGN IS <br />
            <span style={{ color: "#D7FF00" }}>ONLY THE BEGINNING.</span>
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "#858585" }}
          >
            We combine thoughtful design, purposeful development and obsessive
            attention to detail to create digital experiences that work as
            beautifully as they look.
          </p>
        </div>

        {/* 4 Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="why-card opacity-0 p-8 md:p-12 border relative transition-colors duration-300 hover:border-[#D7FF00]/40"
                style={{
                  background: "#0c0c0c",
                  borderColor: "rgba(244, 241, 234, 0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-sm font-semibold tracking-widest"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#D7FF00",
                    }}
                  >
                    {item.num}
                  </span>
                  <div
                    className="w-10 h-10 border flex items-center justify-center text-[#F4F1EA]"
                    style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                  >
                    <Icon className="w-5 h-5 text-[#858585]" />
                  </div>
                </div>

                <h3
                  className="text-2xl font-bold tracking-tight mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#F4F1EA",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: "#858585" }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
