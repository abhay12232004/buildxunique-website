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

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const totalScrollDistance =
          (services.length + 1) * window.innerHeight * 0.9;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScrollDistance}`,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            const serviceProgress = progress / (services.length / (services.length + 1));
            const idx = Math.min(
              Math.floor(serviceProgress * services.length),
              services.length - 1
            );

            setActiveIndex(idx);
            setShowWelcome(progress > 0.85);

            /* Rope deform */
            if (ropeRef.current) {
              const tension = Math.sin(progress * Math.PI * 3) * 25;
              ropeRef.current.setAttribute(
                "d",
                `M0,30 Q240,${30 - tension} 480,30 Q720,${30 + tension} 960,30`
              );
            }

            /* Character lean */
            if (characterRef.current) {
              gsap.set(characterRef.current, {
                rotation: -8 * Math.min(progress * 1.5, 1),
                transformOrigin: "bottom center",
              });
            }
          },
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <div
        ref={pinRef}
        className="hidden md:block relative w-full overflow-hidden"
        style={{ height: "100vh", background: "#090909" }}
      >
        {/* Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 10% 50%, rgba(215,255,0,0.03) 0%, transparent 60%)",
          }}
        />

        {/* Top label */}
        <div className="absolute top-8 left-6 md:left-16 z-20">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
          >
            Our Services — Pull to discover
          </span>
        </div>

        {/* Progress indicator */}
        <div className="absolute top-8 right-6 md:right-16 z-20 flex items-center gap-2">
          {services.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: i === activeIndex ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === activeIndex ? "#D7FF00" : "rgba(133,133,133,0.3)",
              }}
            />
          ))}
        </div>

        {/* Rope SVG */}
        <div aria-hidden="true" className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-10">
          <svg
            viewBox="0 0 960 60"
            preserveAspectRatio="none"
            className="w-full"
            style={{ height: "60px" }}
          >
            <path
              ref={ropeRef}
              d="M0,30 Q240,15 480,30 Q720,45 960,30"
              stroke="#D7FF00"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M0,30 Q240,15 480,30 Q720,45 960,30"
              stroke="#D7FF00"
              strokeWidth="1"
              fill="none"
              strokeDasharray="6 10"
              opacity="0.25"
            />
          </svg>
        </div>

        {/* Main layout */}
        <div className="relative z-20 h-full grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Character — left column */}
          <div className="hidden md:flex md:col-span-2 items-end justify-center pb-8 pl-8 md:pl-16">
            <div ref={characterRef} className="relative">
              <CharacterSVG className="w-56 lg:w-72 drop-shadow-2xl" />
            </div>
          </div>

          {/* Service content — right column */}
          <div className="col-span-1 md:col-span-3 flex flex-col justify-center px-6 md:pr-16 md:pl-12 pt-20 md:pt-0">
            {!showWelcome ? (
              <div key={activeIndex}>
                {/* Service number */}
                <div
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
                >
                  Service {services[activeIndex].number} / 05
                </div>

                {/* Service number large */}
                <div
                  className="text-8xl md:text-[160px] font-bold leading-none mb-6 opacity-10"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D7FF00" }}
                >
                  {services[activeIndex].number}
                </div>

                {/* Title */}
                <h2
                  className="text-3xl md:text-4xl xl:text-5xl font-bold mb-6 leading-tight tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
                >
                  {services[activeIndex].title}
                </h2>

                {/* Description */}
                <p
                  className="text-base md:text-lg max-w-lg mb-8 leading-relaxed"
                  style={{ color: "#858585" }}
                >
                  {services[activeIndex].description}
                </p>

                {/* Labels */}
                <div className="flex flex-wrap gap-2">
                  {services[activeIndex].labels.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 text-xs tracking-widest uppercase border"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#D7FF00",
                        borderColor: "rgba(215,255,0,0.3)",
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              /* Welcome board reveal */
              <div className="text-center md:text-left">
                <div
                  className="inline-block border-2 p-8 md:p-12 mb-8"
                  style={{
                    borderColor: "#D7FF00",
                    background: "rgba(215,255,0,0.04)",
                  }}
                >
                  <p
                    className="text-xs tracking-widest uppercase mb-4"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
                  >
                    Welcome to
                  </p>
                  <h2
                    className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D7FF00" }}
                  >
                    BUILDXUNIQUE
                  </h2>
                  <p
                    className="text-lg md:text-xl mb-8"
                    style={{ color: "#F4F1EA" }}
                  >
                    YOUR NEXT BIG IDEA STARTS HERE.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      background: "#D7FF00",
                      color: "#090909",
                    }}
                  >
                    Let&apos;s Build Something
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile fallback — static service list */}
      <div className="md:hidden bg-[#090909] border-t border-white/5">
        {services.map((service, i) => (
          <div
            key={i}
            className="px-6 py-12 border-b"
            style={{ borderColor: "rgba(244,241,234,0.08)" }}
          >
            <div
              className="text-xs tracking-widest uppercase mb-3"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
            >
              {service.number} / 05
            </div>
            <h3
              className="text-2xl font-bold mb-4 tracking-tight"
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
                  className="px-2.5 py-1 text-xs tracking-widest uppercase border"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#D7FF00",
                    borderColor: "rgba(215,255,0,0.3)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
        {/* Mobile welcome */}
        <div className="px-6 py-16 text-center">
          <h2
            className="text-3xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#D7FF00" }}
          >
            WELCOME TO BUILDXUNIQUE
          </h2>
          <p className="mb-8" style={{ color: "#F4F1EA" }}>
            YOUR NEXT BIG IDEA STARTS HERE.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-4 text-sm tracking-widest uppercase"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              background: "#D7FF00",
              color: "#090909",
              fontWeight: 600,
            }}
          >
            Let&apos;s Build Something
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
