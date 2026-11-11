"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Websites", "E-commerce", "Landing Pages", "UI/UX"];

const projects = [
  {
    id: "nova",
    number: "01",
    title: "NOVA",
    category: "E-commerce",
    categoryLabel: "E-commerce Website",
    description:
      "A modern digital storefront designed to make product discovery effortless. Clean layouts, intuitive navigation, and optimised for conversion with high average order value in mind.",
    scope: ["UI/UX Design", "Frontend Development", "E-Commerce"],
    color: "#D7FF00",
    bg: "#0d1a00",
    concept: true,
  },
  {
    id: "forma",
    number: "02",
    title: "FORMA",
    category: "Websites",
    categoryLabel: "Architecture & Interior Website",
    description:
      "A refined digital presence that showcases spaces through strong visuals and thoughtful storytelling. Designed to highlight craftsmanship and detail with immersive editorial layouts.",
    scope: ["Brand Identity", "Web Design", "Development"],
    color: "#F4F1EA",
    bg: "#1a1710",
    concept: true,
  },
  {
    id: "vanta",
    number: "03",
    title: "VANTA",
    category: "Landing Pages",
    categoryLabel: "SaaS / Technology Website",
    description:
      "A modern web experience that makes complex technology easier to understand. Feature-rich landing pages with interactive CLI sandboxes and a dark-mode conversion-focused aesthetic.",
    scope: ["Landing Page", "SaaS", "Animation"],
    color: "#FF4F9A",
    bg: "#1a0010",
    concept: true,
  },
  {
    id: "pulse",
    number: "04",
    title: "PULSE",
    category: "Websites",
    categoryLabel: "Health & Wellness Platform",
    description:
      "A calming, user-first platform for a health and wellness brand. Focus on accessibility, warmth, and trust-building design that communicates care and credibility.",
    scope: ["UI/UX Design", "Web App", "Branding"],
    color: "#D7FF00",
    bg: "#001a0d",
    concept: true,
  },
  {
    id: "atlas",
    number: "05",
    title: "ATLAS",
    category: "UI/UX",
    categoryLabel: "Travel & Experience Agency",
    description:
      "An immersive travel website designed to inspire adventure. Full-screen visuals, smooth transitions, and a booking-optimised user journey crafted for high engagement.",
    scope: ["Web Design", "Development", "CMS"],
    color: "#FF4F9A",
    bg: "#0d0a1a",
    concept: true,
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".work-hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      gsap.fromTo(
        ".work-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
      );
      gsap.fromTo(
        ".work-hero-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.4 }
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

      gsap.utils.toArray<HTMLElement>(".work-project").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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
    },
    { scope: gridRef }
  );

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden"
        style={{ background: "#090909", paddingTop: "72px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 70% 40%, rgba(215,255,0,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 w-full">
          <div className="work-hero-label opacity-0 mb-6">
            <span
              className="inline-block text-xs tracking-widest uppercase border px-3 py-1.5"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
                borderColor: "rgba(133,133,133,0.3)",
              }}
            >
              Portfolio & Case Studies
            </span>
          </div>

          <h1
            className="work-hero-title opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span style={{ color: "#F4F1EA" }}>SELECTED WORK.</span>
            <br />
            <span style={{ color: "#D7FF00" }}>DISTINCTIVE EXPERIENCES.</span>
          </h1>

          <p
            className="work-hero-sub opacity-0 text-base md:text-lg max-w-xl leading-relaxed mb-12"
            style={{ color: "#858585" }}
          >
            A curated showcase of concept studies and bespoke digital experiences
            crafted to elevate brand perception and drive measurable results.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2.5 text-xs tracking-widest uppercase border transition-all duration-300"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    borderColor: isActive
                      ? "#D7FF00"
                      : "rgba(244, 241, 234, 0.15)",
                    background: isActive ? "#D7FF00" : "transparent",
                    color: isActive ? "#090909" : "#858585",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        ref={gridRef}
        className="py-16 md:py-24"
        style={{ background: "#090909" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="space-y-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="work-project opacity-0 border group cursor-pointer overflow-hidden"
                style={{ borderColor: "rgba(244,241,234,0.08)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Visual */}
                  <div
                    className="lg:col-span-5 relative h-64 md:h-80 lg:h-auto overflow-hidden"
                    style={{ background: project.bg }}
                  >
                    {project.concept && (
                      <div
                        className="absolute top-4 left-4 z-10 px-2.5 py-1 text-xs tracking-widest uppercase"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          background: "rgba(9,9,9,0.8)",
                          color: "#858585",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        Concept
                      </div>
                    )}
                    <div
                      className="absolute inset-0 flex items-center justify-center text-[200px] font-bold leading-none select-none opacity-10 group-hover:scale-110 transition-transform duration-700"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: project.color,
                      }}
                    >
                      {project.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l"
                    style={{
                      background: "#0f0f0f",
                      borderColor: "rgba(244,241,234,0.08)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="text-xs tracking-widest uppercase"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "#858585",
                        }}
                      >
                        {project.categoryLabel}
                      </div>
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "#D7FF00",
                        }}
                      >
                        {project.number} / 05
                      </span>
                    </div>

                    <h2
                      className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#F4F1EA",
                      }}
                    >
                      {project.title}
                    </h2>

                    <p
                      className="text-base max-w-lg mb-8 leading-relaxed"
                      style={{ color: "#858585" }}
                    >
                      {project.description}
                    </p>

                    {/* Scope tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.scope.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs tracking-widest uppercase border"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: project.color,
                            borderColor:
                              project.color === "#D7FF00"
                                ? "rgba(215,255,0,0.3)"
                                : project.color === "#FF4F9A"
                                ? "rgba(255,79,154,0.3)"
                                : "rgba(244,241,234,0.2)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      <span
                        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase group-hover:text-[#D7FF00] transition-colors duration-300"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "#858585",
                        }}
                      >
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <h3
              className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              HAVE A PROJECT IN MIND?
            </h3>
            <p
              className="text-base mb-8 max-w-md mx-auto"
              style={{ color: "#858585" }}
            >
              Let&apos;s discuss your idea and bring it to life.
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
              Start a Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
