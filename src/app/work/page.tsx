"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  "All",
  "Websites",
  "E-commerce",
  "Landing Pages",
  "UI/UX",
];

const projectsData = [
  {
    id: "nova",
    number: "01",
    title: "NOVA",
    category: "E-commerce",
    tagline: "High-end contemporary apparel storefront with bespoke filtering.",
    description:
      "A modern digital storefront designed to make product discovery effortless with rapid instant-search and seamless visual hierarchy.",
    color: "#D7FF00",
    bg: "#0d1a00",
    scope: ["E-commerce", "Custom Shopify / Next.js", "Design System"],
  },
  {
    id: "forma",
    number: "02",
    title: "FORMA",
    category: "Websites",
    tagline: "Architectural monograph and project portfolio for modern spatial design.",
    description:
      "A refined digital presence that showcases spaces through strong visuals and thoughtful storytelling with immersive horizontal scroll sections.",
    color: "#F4F1EA",
    bg: "#1a1710",
    scope: ["Web Experience", "Editorial UI", "GSAP Interactions"],
  },
  {
    id: "vanta",
    number: "03",
    title: "VANTA",
    category: "Landing Pages",
    tagline: "Developer-first cloud infrastructure deployment platform.",
    description:
      "A modern web experience that makes complex technology easier to understand through interactive CLI sandboxes and dark-mode aesthetic.",
    color: "#FF4F9A",
    bg: "#1a0010",
    scope: ["Landing Page", "SaaS Conversion", "Motion Design"],
  },
  {
    id: "aura",
    number: "04",
    title: "AURA STUDIO",
    category: "UI/UX",
    tagline: "Comprehensive design system and interface library for fintech app.",
    description:
      "Transforming fragmented multi-platform financial dashboard interfaces into an accessible, compliant, and beautifully unified web app.",
    color: "#D7FF00",
    bg: "#0a131a",
    scope: ["UI/UX Design", "Design Tokens", "Accessibility"],
  },
  {
    id: "vertex",
    number: "05",
    title: "VERTEX HQ",
    category: "Websites",
    tagline: "Venture studio corporate website with dynamic insights portal.",
    description:
      "An authoritative agency and investment platform built with custom typographic scales, dynamic portfolio indexing, and high-speed page loads.",
    color: "#F4F1EA",
    bg: "#141414",
    scope: ["Corporate Website", "Headless CMS", "Performance SEO"],
  },
];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 pb-24 md:pb-36" style={{ background: "#090909" }}>
      {/* Work Hero */}
      <section className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <div
          className="max-w-[1440px] mx-auto border-b pb-16 md:pb-20"
          style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}
        >
          <span
            className="text-xs tracking-widest uppercase mb-4 inline-block"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#858585",
            }}
          >
            Portfolio & Case Studies
          </span>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F4F1EA",
            }}
          >
            SELECTED WORK. <br />
            <span style={{ color: "#D7FF00" }}>DISTINCTIVE EXPERIENCES.</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "#858585" }}
          >
            A curated showcase of concept studies and bespoke digital experiences
            crafted to elevate brand perception and drive engagement.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 mt-12">
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

      {/* Projects Grid */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group border relative overflow-hidden transition-all duration-500 hover:border-[#D7FF00]/40"
              style={{
                background: "#0c0c0c",
                borderColor: "rgba(244, 241, 234, 0.08)",
              }}
            >
              {/* Project Preview Canvas */}
              <div
                className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden"
                style={{ background: project.bg }}
              >
                {/* Concept watermark badge */}
                <span
                  className="absolute top-4 left-4 text-xs tracking-widest uppercase px-2.5 py-1"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    background: "rgba(9, 9, 9, 0.85)",
                    color: "#858585",
                    border: "1px solid rgba(244, 241, 234, 0.1)",
                  }}
                >
                  Concept Project
                </span>

                <span
                  className="text-8xl sm:text-9xl font-bold select-none opacity-10 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: project.color,
                  }}
                >
                  {project.number}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80" />
              </div>

              {/* Project Details */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#858585",
                    }}
                  >
                    {project.category}
                  </span>
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
                  className="text-3xl font-bold tracking-tight mb-3"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#F4F1EA",
                  }}
                >
                  {project.title}
                </h2>

                <p
                  className="text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: "#858585" }}
                >
                  {project.description}
                </p>

                {/* Scope tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}>
                  {project.scope.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] tracking-widest uppercase border"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#858585",
                        borderColor: "rgba(244, 241, 234, 0.08)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div
          className="max-w-[1440px] mx-auto mt-20 p-12 border text-center"
          style={{
            borderColor: "rgba(244, 241, 234, 0.08)",
            background: "#0c0c0c",
          }}
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#858585",
            }}
          >
            More Case Studies in Development
          </p>
          <h3
            className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F4F1EA",
            }}
          >
            Ready to build your next flagship digital experience?
          </h3>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              background: "#D7FF00",
              color: "#090909",
            }}
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
