"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, LayoutGrid, List, Terminal } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const categories = ["ALL", "E-COMMERCE", "ARCHITECTURE", "SAAS / TECH", "FINTECH"];

const projects = [
  {
    id: "nova",
    number: "01",
    title: "NOVA ATELIER",
    category: "E-COMMERCE",
    categoryLabel: "High-End Contemporary Apparel Storefront",
    description:
      "A modern digital storefront engineered for effortless product discovery, sub-second page transitions, and an optimized mobile checkout funnel.",
    scope: ["Custom Architecture", "Next.js 16", "Shopify Headless", "Design System"],
    accent: "#FF7139",
    status: "Exploratory Concept",
    previewType: "ecommerce",
  },
  {
    id: "forma",
    number: "02",
    title: "FORMA SPATIAL",
    category: "ARCHITECTURE",
    categoryLabel: "Spatial Design & Interior Architecture Studio",
    description:
      "An editorial digital monograph showcasing spatial craftsmanship through strong imagery, horizontal scroll choreographies, and refined typographic rhythm.",
    scope: ["Editorial UI", "GSAP ScrollTrigger", "Interactive Gallery"],
    accent: "#111111",
    status: "Studio Benchmark",
    previewType: "architecture",
  },
  {
    id: "vanta",
    number: "03",
    title: "VANTA CLOUD",
    category: "SAAS / TECH",
    categoryLabel: "Developer-First Cloud Deployment Platform",
    description:
      "A high-conversion marketing destination that demystifies distributed cloud infrastructure with interactive CLI sandboxes and dark-mode aesthetics.",
    scope: ["Landing Page", "SaaS Conversion", "Motion Design", "TypeScript"],
    accent: "#FF7139",
    status: "Interactive Prototype",
    previewType: "terminal",
  },
  {
    id: "aura",
    number: "04",
    title: "AURA WEALTH",
    category: "FINTECH",
    categoryLabel: "Digital Banking & Wealth Management Suite",
    description:
      "A humanized financial dashboard turning complex asset allocations into clear visual narratives with accessibility conformance and real-time responsiveness.",
    scope: ["UI/UX Design", "Design Tokens", "Design System", "Micro-Interactions"],
    accent: "#F4CE36",
    status: "Exploratory Concept",
    previewType: "fintech",
  },
];

export function PortfolioSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects =
    activeTab === "ALL"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.utils.toArray<HTMLElement>(".portfolio-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
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
          }
        );
      });
    },
    { dependencies: [activeTab, viewMode], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Selected Work & Creative Portfolio"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* SECTION HEADER HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 sm:mb-16 border-b border-[#DDDDDA] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              <span>003 // ARCHIVE OF SELECTED BUILDS</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#111111] uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SELECTED WORK.
            </h2>
          </div>

          {/* VIEW SWITCHER & ALL WORK LINK */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-1 rounded-full border border-[#DDDDDA] bg-white text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors",
                  viewMode === "grid"
                    ? "bg-[#111111] text-white"
                    : "text-[#777777] hover:text-[#111111]"
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>GRID</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors",
                  viewMode === "list"
                    ? "bg-[#111111] text-white"
                    : "text-[#777777] hover:text-[#111111]"
                )}
                aria-label="List view"
              >
                <List className="w-3.5 h-3.5" />
                <span>INDEX</span>
              </button>
            </div>

            <MagneticButton strength={0.25}>
              <Link
                href="/work"
                data-cursor="ALL"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#DDDDDA] bg-white text-[#111111] text-xs font-semibold tracking-wider uppercase hover:border-[#111111] transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>Full Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF7139]" />
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border",
                  isActive
                    ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                    : "bg-white/80 text-[#777777] border-[#DDDDDA] hover:border-[#111111] hover:text-[#111111]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ========================================================
            VIEW MODE A: IMMERSIVE VISUAL CARD GRID
            ======================================================== */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                data-cursor="INSPECT"
                className="portfolio-card group relative rounded-2xl border border-[#DDDDDA] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#111111] hover:shadow-[0_16px_48px_rgba(17,17,17,0.08)]"
              >
                <div>
                  {/* Card Top Meta */}
                  <div className="flex items-center justify-between pb-6 border-b border-[#DDDDDA]/70">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-2xl font-bold text-[#FF7139]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.number}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777]">
                        {project.category}
                      </span>
                    </div>

                    {/* Honest Concept Label */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#DDDDDA] bg-[#F5F5F2] text-[10px] font-mono text-[#777777] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
                      <span>{project.status}</span>
                    </span>
                  </div>

                  {/* INTERACTIVE DEVICE FRAME PREVIEW CANVAS */}
                  <div className="relative my-6 aspect-16/10 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] overflow-hidden p-6 flex flex-col justify-between group-hover:border-[#111111]/30 transition-colors">
                    {/* Simulated Browser Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#DDDDDA]/60 text-[10px] font-mono text-[#777777]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#DDDDDA]" />
                        <span className="w-2 h-2 rounded-full bg-[#DDDDDA]" />
                        <span className="w-2 h-2 rounded-full bg-[#DDDDDA]" />
                      </div>
                      <span className="text-center font-mono text-[9px] uppercase tracking-wider text-[#111111]">
                        https://{project.id}.buildxunique.studio
                      </span>
                      <span className="text-[9px] text-[#FF7139]">LIVE DEMO</span>
                    </div>

                    {/* Preview Type Rendering */}
                    {project.previewType === "terminal" ? (
                      <div className="my-auto font-mono text-xs text-[#111111] bg-white p-4 rounded-lg border border-[#DDDDDA]/80 shadow-xs">
                        <div className="flex items-center gap-2 text-[#777777] text-[10px] mb-2 pb-1 border-b border-[#DDDDDA]/40">
                          <Terminal className="w-3 h-3 text-[#FF7139]" />
                          <span>vanta-cli // production build</span>
                        </div>
                        <p className="text-[#FF7139]">$ npx vanta deploy --production</p>
                        <p className="text-emerald-600 mt-1">✔ 18 edge locations warmed</p>
                        <p className="text-[#777777] mt-0.5">Latency: 14ms (P99) • SSL Active</p>
                      </div>
                    ) : project.previewType === "fintech" ? (
                      <div className="my-auto bg-white p-5 rounded-lg border border-[#DDDDDA]/80 shadow-xs flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#777777]">TOTAL PORTFOLIO NET YIELD</span>
                          <span className="text-emerald-600 font-bold">+24.8% APR</span>
                        </div>
                        <div className="h-10 w-full flex items-end gap-1.5">
                          <div className="w-1/6 h-4 bg-[#DDDDDA] rounded-xs" />
                          <div className="w-1/6 h-6 bg-[#DDDDDA] rounded-xs" />
                          <div className="w-1/6 h-5 bg-[#DDDDDA] rounded-xs" />
                          <div className="w-1/6 h-8 bg-[#F4CE36] rounded-xs" />
                          <div className="w-1/6 h-7 bg-[#FF7139]/50 rounded-xs" />
                          <div className="w-1/6 h-10 bg-[#FF7139] rounded-xs" />
                        </div>
                      </div>
                    ) : project.previewType === "architecture" ? (
                      <div className="my-auto bg-white p-6 rounded-lg border border-[#DDDDDA]/80 shadow-xs text-center flex flex-col items-center justify-center">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-[#777777] uppercase">
                          MONOGRAPH // SPATIAL ARCHITECTURE
                        </span>
                        <span className="text-2xl font-bold tracking-tight text-[#111111] mt-1" style={{ fontFamily: "var(--font-display)" }}>
                          RAW STONE & NATURAL LIGHT
                        </span>
                        <span className="text-[10px] font-mono text-[#FF7139] mt-2">
                          16 INSTALLATIONS ARCHIVED
                        </span>
                      </div>
                    ) : (
                      <div className="my-auto bg-white p-5 rounded-lg border border-[#DDDDDA]/80 shadow-xs flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#777777] uppercase">AUTUMN ATELIER // 2026</span>
                          <h4 className="text-lg font-bold text-[#111111]" style={{ fontFamily: "var(--font-display)" }}>
                            OVERSIZED WOOL OVERCOAT
                          </h4>
                          <span className="text-xs font-mono text-[#FF7139] font-bold">€ 420.00 — IN STOCK</span>
                        </div>
                        <div className="w-16 h-16 rounded-lg bg-[#F5F5F2] border border-[#DDDDDA] flex items-center justify-center text-xs font-mono text-[#777777]">
                          LOOK 01
                        </div>
                      </div>
                    )}

                    {/* Preview Bottom Tags */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#777777] pt-2">
                      <span>RESPONSIVE VIEWPORT</span>
                      <span>100% HAND-CODED</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <h3
                    className="text-3xl font-bold text-[#111111] uppercase tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#FF7139] uppercase tracking-wider mt-1 mb-3">
                    {project.categoryLabel}
                  </p>
                  <p
                    className="text-sm text-[#777777] leading-relaxed mb-6"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {project.description}
                  </p>

                  {/* Scope Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.scope.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-[#F5F5F2] text-[10px] font-mono uppercase text-[#111111] border border-[#DDDDDA]/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#DDDDDA]/70 flex items-center justify-between">
                  <Link
                    href={`/contact?project=${project.id}`}
                    data-cursor="COMMISSION"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111] group-hover:text-[#FF7139] transition-colors"
                  >
                    <span>Commission Similar Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href="/work"
                    className="text-xs font-mono text-[#777777] hover:text-[#111111] transition-colors"
                  >
                    VIEW SPECS →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            VIEW MODE B: EDITORIAL INDEX LIST VIEW
            ======================================================== */}
        {viewMode === "list" && (
          <div className="border-t border-[#DDDDDA] divide-y divide-[#DDDDDA]">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                data-cursor="EXPLORE"
                className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/60 px-4 sm:px-6 rounded-xl transition-all duration-200"
              >
                <div className="flex items-start md:items-center gap-6">
                  <span
                    className="text-3xl sm:text-4xl font-bold text-[#FF7139]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.number}
                  </span>
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-[#111111] uppercase tracking-tight group-hover:text-[#FF7139] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[#777777] uppercase tracking-wider mt-1">
                      {project.categoryLabel}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:gap-8">
                  <div className="hidden lg:flex items-center gap-2">
                    {project.scope.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-[#F5F5F2] text-[10px] font-mono uppercase text-[#777777]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-[#FF7139] uppercase border border-[#DDDDDA] bg-white px-2.5 py-1 rounded-full">
                    {project.status}
                  </span>

                  <MagneticButton strength={0.3}>
                    <Link
                      href={`/contact?project=${project.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#FF7139] transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
