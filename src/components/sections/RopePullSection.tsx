"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { CharacterSVG } from "@/components/ui/CharacterSVG";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "WEBSITES & WEB EXPERIENCES",
    description:
      "Your website is often the first impression of your business. We create custom digital experiences that combine thoughtful design, intuitive functionality and performance.",
    labels: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
  },
  {
    number: "02",
    title: "E-COMMERCE DEVELOPMENT",
    description:
      "Turn your products into powerful online shopping experiences with intuitive storefronts, seamless customer journeys and scalable development.",
    labels: ["ONLINE STORES", "PRODUCT EXPERIENCE", "CONVERSION"],
  },
  {
    number: "03",
    title: "LANDING PAGES",
    description:
      "Make every click count with focused landing pages designed to communicate clearly, engage visitors and encourage action.",
    labels: ["CAMPAIGNS", "PERFORMANCE", "CONVERSION"],
  },
  {
    number: "04",
    title: "UI/UX DESIGN & REDESIGN",
    description:
      "Make digital experiences easier to understand, more enjoyable to use and visually distinctive through thoughtful user interface and experience design.",
    labels: ["USER EXPERIENCE", "INTERFACE", "STRATEGY"],
  },
  {
    number: "05",
    title: "MAINTENANCE & OPTIMIZATION",
    description:
      "We keep your digital presence reliable, responsive and ready to grow through continuous improvements, performance optimization and ongoing support.",
    labels: ["PERFORMANCE", "SUPPORT", "OPTIMIZATION"],
  },
];

export function RopePullSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGPathElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useGSAP(
    () => {
      if (prefersReduced.current) return;
      if (!sectionRef.current || !pinRef.current) return;

      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) return;

      const totalScrollDistance = (services.length + 1) * window.innerHeight * 0.85;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScrollDistance}`,
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const serviceProgress = progress / (services.length / (services.length + 1));
          const idx = Math.min(
            Math.floor(serviceProgress * services.length),
            services.length - 1
          );

          setActiveIndex(idx);
          setShowWelcome(progress > 0.85);

          /* Dynamic rope tension wave */
          if (ropeRef.current) {
            const tension = Math.sin(progress * Math.PI * 4) * 20;
            ropeRef.current.setAttribute(
              "d",
              `M0,30 Q240,${30 - tension} 480,30 Q720,${30 + tension} 960,30`
            );
          }

          /* Character leaning backward with tension */
          if (characterRef.current) {
            gsap.set(characterRef.current, {
              rotation: -7 * Math.min(progress * 1.5, 1),
              transformOrigin: "bottom center",
            });
          }
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      {/* DESKTOP PINNED EXPERIENCE */}
      <div
        ref={pinRef}
        className="hidden md:block relative w-full overflow-hidden"
        style={{ height: "100vh", background: "#090909" }}
      >
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(215,255,0,0.03) 0%, transparent 60%)",
          }}
        />

        {/* Section Header Bar */}
        <div className="absolute top-8 left-8 lg:left-16 right-8 lg:right-16 z-20 flex items-center justify-between">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
          >
            Interactive Services Experience — Scroll to Pull
          </span>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {services.map((_, i) => (
              <div
                key={i}
                className="transition-all duration-400"
                style={{
                  width: i === activeIndex ? "28px" : "6px",
                  height: "5px",
                  borderRadius: "2px",
                  background: i === activeIndex ? "#D7FF00" : "rgba(133,133,133,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Rope SVG — Horizontally Centered across hands */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-10">
          <svg
            viewBox="0 0 960 60"
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: "50px" }}
          >
            <path
              ref={ropeRef}
              d="M0,30 Q240,15 480,30 Q720,45 960,30"
              stroke="#D7FF00"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M0,30 Q240,15 480,30 Q720,45 960,30"
              stroke="#D7FF00"
              strokeWidth="1"
              fill="none"
              strokeDasharray="6 8"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Desktop Split Layout */}
        <div className="relative z-20 h-full max-w-[1440px] mx-auto px-8 lg:px-16 grid grid-cols-12 gap-8 items-center">
          {/* Left Column: Character (Vertically Centered with hands at rope height) */}
          <div className="col-span-5 flex items-center justify-center">
            <div ref={characterRef} className="relative flex flex-col items-center">
              <CharacterSVG className="w-56 lg:w-64 xl:w-72 drop-shadow-2xl" />
              {/* Ground Shadow */}
              <div
                className="w-48 h-3 rounded-full mt-1 opacity-40 blur-xs"
                style={{ background: "#000" }}
              />
            </div>
          </div>

          {/* Right Column: Service Display Card */}
          <div className="col-span-7 flex flex-col justify-center">
            {!showWelcome ? (
              <div
                key={activeIndex}
                className="relative border p-8 lg:p-12 transition-all duration-500 overflow-hidden"
                style={{
                  background: "#0c0c0c",
                  borderColor: "rgba(244, 241, 234, 0.1)",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
                }}
              >
                {/* Large watermark number in background */}
                <div
                  className="absolute -top-4 -right-2 text-8xl lg:text-9xl font-bold leading-none select-none opacity-5 pointer-events-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D7FF00" }}
                >
                  {services[activeIndex].number}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#858585",
                      }}
                    >
                      Service {services[activeIndex].number} / 05
                    </span>
                    <span
                      className="text-[11px] tracking-widest uppercase px-2.5 py-0.5 border"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#D7FF00",
                        borderColor: "rgba(215, 255, 0, 0.25)",
                      }}
                    >
                      Interactive Reveal
                    </span>
                  </div>

                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 tracking-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#F4F1EA",
                    }}
                  >
                    {services[activeIndex].title}
                  </h2>

                  <p
                    className="text-sm lg:text-base leading-relaxed mb-6"
                    style={{ color: "#858585" }}
                  >
                    {services[activeIndex].description}
                  </p>

                  <div
                    className="flex flex-wrap gap-2 pt-6 border-t"
                    style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}
                  >
                    {services[activeIndex].labels.map((label) => (
                      <span
                        key={label}
                        className="px-2.5 py-1 text-xs tracking-widest uppercase border"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "#D7FF00",
                          borderColor: "rgba(215, 255, 0, 0.2)",
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Welcome Board Reveal */
              <div
                className="relative border-2 p-8 lg:p-12 text-left"
                style={{
                  borderColor: "#D7FF00",
                  background: "rgba(215, 255, 0, 0.04)",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
                }}
              >
                <span
                  className="text-xs tracking-widest uppercase mb-3 block"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
                >
                  Final Service Pulled
                </span>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D7FF00" }}
                >
                  WELCOME TO BUILDXUNIQUE
                </h2>

                <p className="text-base lg:text-lg mb-8" style={{ color: "#F4F1EA" }}>
                  YOUR NEXT BIG IDEA STARTS HERE.
                </p>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    background: "#D7FF00",
                    color: "#090909",
                  }}
                >
                  Let&apos;s Build Something
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE EXPERIENCE — Vertical Non-Pinned Flow */}
      <div className="md:hidden bg-[#090909] px-6 py-20 border-t border-white/5 space-y-10">
        <div className="text-center mb-10">
          <span
            className="text-xs tracking-widest uppercase block mb-2"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
          >
            Core Offerings
          </span>
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
          >
            OUR SERVICES
          </h2>
        </div>

        {services.map((service) => (
          <div
            key={service.number}
            className="p-6 border relative"
            style={{
              background: "#0c0c0c",
              borderColor: "rgba(244, 241, 234, 0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
              >
                {service.number} / 05
              </span>
            </div>

            <h3
              className="text-xl font-bold mb-3 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
            >
              {service.title}
            </h3>

            <p className="text-sm mb-6 leading-relaxed" style={{ color: "#858585" }}>
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {service.labels.map((label) => (
                <span
                  key={label}
                  className="px-2 py-0.5 text-[11px] tracking-widest uppercase border"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#D7FF00",
                    borderColor: "rgba(215, 255, 0, 0.2)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Mobile Welcome Card */}
        <div
          className="p-8 border text-center"
          style={{
            borderColor: "#D7FF00",
            background: "rgba(215, 255, 0, 0.05)",
          }}
        >
          <h3
            className="text-2xl font-bold mb-2 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D7FF00" }}
          >
            WELCOME TO BUILDXUNIQUE
          </h3>
          <p className="text-sm mb-6" style={{ color: "#F4F1EA" }}>
            YOUR NEXT BIG IDEA STARTS HERE.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-widest uppercase font-semibold"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              background: "#D7FF00",
              color: "#090909",
            }}
          >
            Let&apos;s Build Something
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
