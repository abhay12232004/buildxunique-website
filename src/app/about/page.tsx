"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharacterSVG } from "@/components/ui/CharacterSVG";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: "01",
    title: "Quality Over Quantity",
    description:
      "We take on a limited number of projects at a time so we can give each one the attention it deserves.",
  },
  {
    number: "02",
    title: "Transparent Communication",
    description:
      "No jargon, no surprises. We keep you in the loop at every stage of the project.",
  },
  {
    number: "03",
    title: "Results-Driven Design",
    description:
      "Every design decision is backed by purpose — to help your business grow and your users succeed.",
  },
  {
    number: "04",
    title: "Long-Term Thinking",
    description:
      "We build solutions that scale. Your project isn't just a one-time delivery — it's a partnership.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".about-hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      gsap.fromTo(
        ".about-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
      );
      gsap.fromTo(
        ".about-hero-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.4 }
      );
      gsap.fromTo(
        ".about-character",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "power2.out" }
      );
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.utils.toArray<HTMLElement>(".value-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });
    },
    { scope: contentRef }
  );

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden"
        style={{ background: "#090909", paddingTop: "72px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(255,79,154,0.04) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 80%, rgba(215,255,0,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Content */}
            <div>
              <div className="about-hero-label opacity-0 mb-6">
                <span
                  className="inline-block text-xs tracking-widest uppercase border px-3 py-1.5"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#858585",
                    borderColor: "rgba(133,133,133,0.3)",
                  }}
                >
                  About Us
                </span>
              </div>

              <h1
                className="about-hero-title opacity-0 text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-8"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span style={{ color: "#F4F1EA" }}>WE BUILD</span>
                <br />
                <span style={{ color: "#D7FF00" }}>WHAT MATTERS.</span>
              </h1>

              <p
                className="about-hero-sub opacity-0 text-base md:text-lg max-w-lg leading-relaxed"
                style={{ color: "#858585" }}
              >
                Buildxunique is an independent digital design and development
                studio. We help ambitious businesses build a stronger, more
                impactful online presence through thoughtful design and
                modern technology.
              </p>
            </div>

            {/* Right — Character */}
            <div className="about-character opacity-0 flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 70% at 50% 60%, rgba(215,255,0,0.06) 0%, transparent 70%)",
                  }}
                />
                <CharacterSVG className="relative z-10 w-56 md:w-72 drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section
        ref={contentRef}
        className="py-24 md:py-32"
        style={{ background: "#090909" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            <div>
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#858585",
                }}
              >
                Our Story
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#F4F1EA",
                }}
              >
                BORN FROM A BELIEF THAT EVERY BUSINESS DESERVES A GREAT WEBSITE.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "#858585" }}
              >
                We started Buildxunique because we noticed a gap — too many
                talented businesses were held back by weak digital
                experiences. Generic templates, slow-loading pages, and
                designs that didn&apos;t reflect who they really are.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#858585" }}
              >
                We believe every brand deserves a unique digital presence
                that truly represents what they stand for. That&apos;s why
                we take the time to understand your business before writing
                a single line of code.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 py-12 border-y"
            style={{ borderColor: "rgba(244,241,234,0.08)" }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item opacity-0 text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#D7FF00",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#858585",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-32">
            <div className="mb-16">
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#858585",
                }}
              >
                What We Stand For
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#F4F1EA",
                }}
              >
                OUR VALUES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.number}
                  className="value-card opacity-0 border p-8 md:p-10 group hover:border-[#D7FF00]/30 transition-colors duration-500"
                  style={{ borderColor: "rgba(244,241,234,0.08)" }}
                >
                  <span
                    className="text-5xl font-bold opacity-15 mb-6 block"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#D7FF00",
                    }}
                  >
                    {value.number}
                  </span>
                  <h3
                    className="text-xl font-bold mb-4 tracking-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#F4F1EA",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#858585" }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-32">
            <div className="mb-12">
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#858585",
                }}
              >
                Tools We Use
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#F4F1EA",
                }}
              >
                OUR TECH STACK
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "Figma",
                "GSAP",
                "Shopify",
                "WordPress",
                "Vercel",
                "Firebase",
                "Supabase",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm border transition-colors duration-300 hover:border-[#D7FF00]/40 hover:text-[#D7FF00]"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#F4F1EA",
                    borderColor: "rgba(244,241,234,0.15)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              LET&apos;S WORK TOGETHER.
            </h3>
            <p
              className="text-base mb-8 max-w-md mx-auto"
              style={{ color: "#858585" }}
            >
              We&apos;re always looking for exciting projects and
              collaborations.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                background: "#D7FF00",
                color: "#090909",
              }}
            >
              Get In Touch
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
