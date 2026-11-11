"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, Flame } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const philosophies = [
  {
    icon: Compass,
    title: "Direction Before Decoration",
    text: "Visual aesthetics mean nothing without purposeful narrative, clear user paths, and business alignment.",
  },
  {
    icon: ShieldCheck,
    title: "Craftsmanship & Code Quality",
    text: "We write clean, semantic, modern TypeScript with zero bloat. Every line is built for maintainability.",
  },
  {
    icon: Flame,
    title: "Uncompromising Polish",
    text: "From easing curves in GSAP to typography kerning, small details separate good sites from unforgettable ones.",
  },
];

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-text-line",
        { opacity: 0, y: 25 },
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Brand manifesto */}
          <div className="lg:col-span-7">
            <span
              className="about-text-line opacity-0 text-xs tracking-widest uppercase mb-4 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              About Buildxunique
            </span>

            <h2
              className="about-text-line opacity-0 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-8"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              SMALL DETAILS. <br />
              BIG IDEAS. <br />
              <span style={{ color: "#D7FF00" }}>BETTER DIGITAL EXPERIENCES.</span>
            </h2>

            <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#858585]">
              <p className="about-text-line opacity-0">
                <strong className="text-[#F4F1EA]">Buildxunique</strong> is a
                digital design and development agency focused on creating
                thoughtful, distinctive and functional websites for ambitious
                businesses.
              </p>
              <p className="about-text-line opacity-0">
                We believe a great website should do more than look good. It
                should communicate clearly, create trust and help businesses move
                forward in an increasingly crowded market.
              </p>
              <p className="about-text-line opacity-0">
                From the first idea to the final interaction, we focus on
                building digital experiences with deliberate purpose and modern
                engineering.
              </p>
            </div>

            <div className="about-text-line opacity-0 mt-10">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-xs tracking-widest uppercase pb-1 border-b hover:text-[#D7FF00] hover:border-[#D7FF00] transition-colors"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#F4F1EA",
                  borderColor: "rgba(244, 241, 234, 0.3)",
                }}
              >
                Read Our Full Story
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Working Philosophy Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="text-xs tracking-widest uppercase mb-4"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              Working Philosophy
            </div>

            {philosophies.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 md:p-8 border relative"
                  style={{
                    background: "#0c0c0c",
                    borderColor: "rgba(244, 241, 234, 0.08)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-10 h-10 border flex items-center justify-center"
                      style={{
                        borderColor: "rgba(215, 255, 0, 0.3)",
                        background: "rgba(215, 255, 0, 0.05)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-[#D7FF00]" />
                    </div>
                    <h3
                      className="text-xl font-bold tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#F4F1EA",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#858585" }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
