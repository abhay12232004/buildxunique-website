import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code, Eye, Layers, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Buildxunique — an independent digital design and web development agency creating purposeful websites and interactive digital experiences for ambitious brands.",
};

const pillars = [
  {
    icon: Eye,
    title: "Design Philosophy",
    text: "We reject the formulaic sameness of generic templates. Our designs are custom-tailored to articulate each brand's unique ethos through deliberate typography, spatial balance, and emotive visual hierarchy.",
  },
  {
    icon: Code,
    title: "Development Approach",
    text: "We build on modern standards with Next.js, React, and TypeScript. Code is clean, modular, and optimized for sub-second page loads, rock-solid accessibility, and effortless maintainability.",
  },
  {
    icon: ShieldCheck,
    title: "Commitment to Quality",
    text: "Every interaction, animation curve, and responsive breakpoint is rigorously tested. We deliver digital assets that perform flawlessly across diverse viewports, networks, and assistive technologies.",
  },
  {
    icon: Layers,
    title: "Client Collaboration",
    text: "We believe in direct communication and complete transparency. No layers of account handlers — you collaborate directly with the designers and engineers shaping your digital presence.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 md:pb-36" style={{ background: "#090909" }}>
      {/* About Hero */}
      <section className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div
          className="max-w-[1440px] mx-auto border-b pb-16 md:pb-24"
          style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}
        >
          <span
            className="text-xs tracking-widest uppercase mb-4 inline-block"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#858585",
            }}
          >
            Studio Profile
          </span>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F4F1EA",
            }}
          >
            CREATIVE THINKING. <br />
            <span style={{ color: "#D7FF00" }}>PURPOSEFUL BUILDING.</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "#858585" }}
          >
            Buildxunique is an independent digital design and web development
            agency focused on turning bold brand ideas into memorable digital
            experiences.
          </p>
        </div>
      </section>

      {/* Agency Narrative */}
      <section className="px-6 md:px-10 lg:px-16 mb-24 md:mb-36">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span
              className="text-xs tracking-widest uppercase mb-4 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#D7FF00",
              }}
            >
              Who We Are
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              We don&apos;t just build websites. We build digital experiences.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base md:text-lg leading-relaxed text-[#858585]">
            <p>
              Founded on the belief that modern business websites should be as
              compelling as they are functional, Buildxunique bridges creative
              art direction with senior-level software engineering.
            </p>
            <p>
              In a digital landscape filled with interchangeable themes, we help
              forward-thinking startups, growing brands, and established companies
              create digital platforms that command attention, build credibility,
              and convert interest into lasting business value.
            </p>
            <p>
              From custom interactive 3D/2D animation choreographies to
              enterprise-grade e-commerce architectures, we treat every project as
              a signature craft.
            </p>
          </div>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="px-6 md:px-10 lg:px-16 mb-24 md:mb-36">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <span
              className="text-xs tracking-widest uppercase mb-3 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              Our Foundation
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              How We Work & What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 md:p-10 border relative"
                  style={{
                    background: "#0c0c0c",
                    borderColor: "rgba(244, 241, 234, 0.08)",
                  }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 border flex items-center justify-center"
                      style={{
                        borderColor: "rgba(215, 255, 0, 0.3)",
                        background: "rgba(215, 255, 0, 0.05)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-[#D7FF00]" />
                    </div>
                    <h3
                      className="text-2xl font-bold tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#F4F1EA",
                      }}
                    >
                      {pillar.title}
                    </h3>
                  </div>

                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: "#858585" }}
                  >
                    {pillar.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-6 md:px-10 lg:px-16">
        <div
          className="max-w-[1440px] mx-auto p-12 md:p-16 border flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            borderColor: "rgba(244, 241, 234, 0.08)",
            background: "#0c0c0c",
          }}
        >
          <div>
            <span
              className="text-xs tracking-widest uppercase mb-2 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#D7FF00",
              }}
            >
              Ready to collaborate?
            </span>
            <h3
              className="text-3xl md:text-4xl font-bold tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              Let&apos;s talk about your next project.
            </h3>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-5 text-xs tracking-widest uppercase font-semibold transition-all duration-300"
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
