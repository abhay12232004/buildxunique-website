"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "nova",
    number: "01",
    title: "NOVA",
    category: "E-commerce Website",
    description:
      "A modern digital storefront designed to make product discovery effortless.",
    color: "#D7FF00",
    bg: "#0d1a00",
    concept: true,
  },
  {
    id: "forma",
    number: "02",
    title: "FORMA",
    category: "Architecture & Interior Website",
    description:
      "A refined digital presence that showcases spaces through strong visuals and thoughtful storytelling.",
    color: "#F4F1EA",
    bg: "#1a1710",
    concept: true,
  },
  {
    id: "vanta",
    number: "03",
    title: "VANTA",
    category: "SaaS / Technology Website",
    description:
      "A modern web experience that makes complex technology easier to understand.",
    color: "#FF4F9A",
    bg: "#1a0010",
    concept: true,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(cardRef.current, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.15,
        }
      );
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden border cursor-pointer opacity-0"
      style={{ borderColor: "rgba(244,241,234,0.08)" }}
    >
      {/* Project visual */}
      <div
        className="relative h-72 md:h-80 overflow-hidden transition-transform duration-700 group-hover:scale-105"
        style={{ background: project.bg }}
      >
        {/* Concept badge */}
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

        {/* Large project number */}
        <div
          className="absolute inset-0 flex items-center justify-center text-[180px] font-bold leading-none select-none opacity-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: project.color }}
        >
          {project.number}
        </div>

        {/* Project title overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(9,9,9,0.9), transparent)" }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: project.color }}
          >
            View Project ↗
          </span>
        </div>
      </div>

      {/* Project info */}
      <div
        className="p-6 border-t"
        style={{ background: "#0f0f0f", borderColor: "rgba(244,241,234,0.08)" }}
      >
        <div
          className="text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
        >
          {project.category}
        </div>
        <h3
          className="text-2xl font-bold mb-3 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#858585" }}>
          {project.description}
        </p>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(".portfolio-heading", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        ".portfolio-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-heading",
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ background: "#090909" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div
              className="text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
            >
              Selected Work
            </div>
            <h2
              className="portfolio-heading opacity-0 text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
            >
              GOOD WORK
              <br />
              <span style={{ color: "#D7FF00" }}>SPEAKS LOUDER.</span>
            </h2>
          </div>
          <p className="text-base max-w-xs" style={{ color: "#858585" }}>
            A selection of digital experiences designed to make an impact.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Coming soon */}
        <div
          className="mt-12 py-8 border text-center"
          style={{ borderColor: "rgba(244,241,234,0.08)" }}
        >
          <span
            className="text-sm tracking-widest uppercase"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
          >
            More Projects Coming Soon
          </span>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm tracking-widest uppercase border-b pb-1 transition-all duration-300 hover:gap-4"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#F4F1EA",
              borderColor: "#F4F1EA",
            }}
          >
            Have a Project in Mind? Let&apos;s Talk
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
