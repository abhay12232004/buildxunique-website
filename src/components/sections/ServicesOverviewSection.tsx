"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Globe, ShoppingBag, LayoutTemplate, Palette, Cpu } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    number: "01",
    title: "Websites & Web Experiences",
    description:
      "Custom digital experiences combining thoughtful architecture, bespoke aesthetics, and high-performance engineering tailored to your brand.",
    icon: Globe,
    href: "/services#websites",
    tag: "Next.js / Creative Dev",
  },
  {
    number: "02",
    title: "E-Commerce Development",
    description:
      "Converting visitor curiosity into recurring revenue through frictionless storefronts, high-converting product pages, and scalable backend integrations.",
    icon: ShoppingBag,
    href: "/services#ecommerce",
    tag: "High Conversion / Stores",
  },
  {
    number: "03",
    title: "Landing Pages",
    description:
      "Campaign-focused destinations engineered for maximum clarity and immediate conversion. Every pixel, heading, and CTA works with surgical purpose.",
    icon: LayoutTemplate,
    href: "/services#landing",
    tag: "Performance / Growth",
  },
  {
    number: "04",
    title: "UI/UX Design & Redesign",
    description:
      "Transforming complex workflows into intuitive, memorable interfaces. Modern design systems and micro-interactions that elevate your brand perception.",
    icon: Palette,
    href: "/services#uiux",
    tag: "Design Systems / UX",
  },
  {
    number: "05",
    title: "Maintenance & Optimization",
    description:
      "Continuous speed tuning, security hardening, SEO enhancements, and technical support to ensure your digital asset never slows down.",
    icon: Cpu,
    href: "/services#maintenance",
    tag: "Support / Continuous QA",
  },
];

export function ServicesOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
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
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span
              className="text-xs tracking-widest uppercase mb-4 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              Services Overview
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              WHAT WE BRING <br />
              <span style={{ color: "#D7FF00" }}>TO THE TABLE.</span>
            </h2>
          </div>
          <p
            className="text-sm md:text-base max-w-sm leading-relaxed"
            style={{ color: "#858585" }}
          >
            Everything your business needs to establish, scale, and dominate its
            online category with uncompromising digital polish.
          </p>
        </div>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                className={`service-card opacity-0 group relative p-8 md:p-10 border transition-all duration-500 hover:border-[#D7FF00]/50 flex flex-col justify-between ${
                  index === 0 ? "lg:col-span-2" : ""
                }`}
                style={{
                  background: "#0d0d0d",
                  borderColor: "rgba(244, 241, 234, 0.08)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-xs tracking-widest uppercase"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#858585",
                      }}
                    >
                      {service.number}
                    </span>
                    <span
                      className="text-xs tracking-widest uppercase px-2.5 py-1 border"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#D7FF00",
                        borderColor: "rgba(215, 255, 0, 0.2)",
                      }}
                    >
                      {service.tag}
                    </span>
                  </div>

                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-none border flex items-center justify-center transition-colors duration-300 group-hover:border-[#D7FF00] group-hover:bg-[#D7FF00]/10"
                      style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                    >
                      <Icon className="w-5 h-5 text-[#F4F1EA] group-hover:text-[#D7FF00] transition-colors" />
                    </div>
                    <h3
                      className="text-2xl font-bold tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#F4F1EA",
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p
                    className="text-sm md:text-base leading-relaxed mb-8"
                    style={{ color: "#858585" }}
                  >
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: "rgba(244, 241, 234, 0.06)" }}>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-300 hover:text-[#D7FF00]"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#F4F1EA",
                    }}
                  >
                    Learn More
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
