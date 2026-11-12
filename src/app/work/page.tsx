"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const categories = ["ALL", "E-COMMERCE", "WEBSITES", "LANDING PAGES", "UI/UX"];

const projects = [
  {
    id: "nova",
    number: "01",
    title: "NOVA",
    category: "E-COMMERCE",
    categoryLabel: "High-End Contemporary Apparel Storefront",
    description:
      "A modern digital storefront engineered for effortless product discovery, sub-second page transitions, and an optimized mobile checkout funnel.",
    scope: ["Custom Architecture", "Shopify Headless", "Design System"],
    accent: "#FF7139",
    bgPattern: "from-[#FF7139]/10 via-[#F5F5F2] to-white",
    concept: true,
  },
  {
    id: "forma",
    number: "02",
    title: "FORMA",
    category: "WEBSITES",
    categoryLabel: "Spatial Design & Interior Architecture Studio",
    description:
      "An editorial digital monograph showcasing spatial craftsmanship through strong imagery, horizontal scroll choreographies, and refined typographic rhythm.",
    scope: ["Editorial UI", "Creative Development", "Interactive Gallery"],
    accent: "#111111",
    bgPattern: "from-[#111111]/5 via-[#F5F5F2] to-white",
    concept: true,
  },
  {
    id: "vanta",
    number: "03",
    title: "VANTA",
    category: "LANDING PAGES",
    categoryLabel: "Developer-First Cloud Deployment Platform",
    description:
      "A high-conversion marketing destination that demystifies distributed cloud infrastructure with interactive CLI sandboxes and dark-mode aesthetics.",
    scope: ["Landing Page", "SaaS Conversion", "Motion Design"],
    accent: "#FF7139",
    bgPattern: "from-[#FF7139]/10 via-[#F5F5F2] to-white",
    concept: true,
  },
  {
    id: "pulse",
    number: "04",
    title: "PULSE",
    category: "WEBSITES",
    categoryLabel: "Health & Performance Wellness Platform",
    description:
      "A calming, user-first web app for modern preventative health. Built with rigorous accessibility conformance and transparent, trust-building visual cues.",
    scope: ["UI/UX Design", "Web App Architecture", "Branding"],
    accent: "#F4CE36",
    bgPattern: "from-[#F4CE36]/15 via-[#F5F5F2] to-white",
    concept: true,
  },
  {
    id: "atlas",
    number: "05",
    title: "ATLAS",
    category: "UI/UX",
    categoryLabel: "Bespoke Travel & Expedition Agency",
    description:
      "An immersive digital portal designed to inspire exploration through full-bleed imagery, smooth page transitions, and booking-optimized user journeys.",
    scope: ["Brand Identity", "Figma Design System", "Creative Dev"],
    accent: "#111111",
    bgPattern: "from-[#111111]/5 via-[#F5F5F2] to-white",
    concept: true,
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".work-hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".work-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );

      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { dependencies: [activeCategory], scope: gridRef }
  );

  return (
    <div className="pt-28 pb-24 md:pb-36 bg-[#F5F5F2] min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <div className="max-w-[1440px] mx-auto border-b border-[#DDDDDA] pb-12 sm:pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[#777777]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Selected Portfolio
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
          </div>

          <h1
            className="work-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#111111] leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SELECTED WORK. <br />
            <span className="text-[#FF7139]">DISTINCTIVE EXPERIENCES.</span>
          </h1>

          <p
            className="work-hero-sub text-base sm:text-lg md:text-xl text-[#777777] max-w-2xl leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            A curated showcase of concept studies and bespoke digital experiences
            crafted to elevate brand perception and drive measurable commercial results.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#111111] text-white shadow-xs"
                      : "bg-white border border-[#DDDDDA] text-[#777777] hover:border-[#111111] hover:text-[#111111]"
                  )}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={gridRef} className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="max-w-[1440px] mx-auto space-y-12 sm:space-y-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="work-card group rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white overflow-hidden transition-all duration-300 hover:border-[#111111] hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual Canvas Column */}
                <div
                  className={cn(
                    "lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] p-8 flex flex-col justify-between overflow-hidden bg-gradient-to-br border-b lg:border-b-0 lg:border-r border-[#DDDDDA]",
                    project.bgPattern
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/90 border border-[#DDDDDA] text-[#777777]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Concept Project
                    </span>
                    <span className="text-xs font-mono tracking-widest text-[#111111]">
                      {project.number} / 05
                    </span>
                  </div>

                  <div className="my-auto py-8 flex items-center justify-center">
                    <span
                      className="text-8xl sm:text-9xl md:text-[11rem] font-bold select-none leading-none opacity-20 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: project.accent,
                      }}
                    >
                      {project.number}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.scope.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-sm text-[10px] uppercase font-mono tracking-wider bg-white/80 border border-[#DDDDDA] text-[#777777]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details Column */}
                <div className="lg:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139] block mb-2">
                      {project.category}
                    </span>

                    <h2
                      className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#111111] leading-[0.98] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h2>

                    <p
                      className="text-xs font-semibold uppercase tracking-wider text-[#777777] mb-6"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {project.categoryLabel}
                    </p>

                    <p
                      className="text-base text-[#777777] leading-relaxed max-w-xl"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#DDDDDA] flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#111111] hover:text-[#FF7139] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span>Commission Similar Work</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </Link>

                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777]">
                      STUDIO SPEC 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto p-8 sm:p-12 md:p-16 rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              HAVE A PROJECT IN MIND?
            </h2>
            <p className="text-sm text-[#777777]" style={{ fontFamily: "var(--font-body)" }}>
              Let&apos;s build a digital experience that moves your business forward.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
