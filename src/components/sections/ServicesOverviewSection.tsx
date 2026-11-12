"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus, Check, Layers, Globe, ShoppingBag, Smartphone, Monitor } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "websites",
    number: "01",
    icon: Globe,
    title: "BESPOKE WEBSITES",
    category: "Brand & Flagship Platforms",
    description:
      "Custom-coded, high-performance web flagships that establish uncompromising brand authority. Designed from scratch in Figma and built natively on Next.js 16 with fluid GSAP motion.",
    timeline: "3–6 Weeks",
    deliverables: [
      "Custom responsive design & design tokens",
      "Next.js App Router architecture",
      "Choreographed GSAP micro-interactions",
      "Sub-second page speeds & SEO optimization",
      "Sanity / Strapi CMS integration (optional)",
    ],
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "GSAP"],
    planId: "launchpad",
  },
  {
    id: "ecommerce",
    number: "02",
    icon: ShoppingBag,
    title: "E-COMMERCE STORES",
    category: "High-Yield Commerce Architecture",
    description:
      "Modern digital storefronts engineered for fast checkout funnels and effortless catalog exploration. Headless Shopify and custom store architectures optimized for maximum conversion.",
    timeline: "4–8 Weeks",
    deliverables: [
      "Headless Shopify / custom cart architecture",
      "Instant faceted search & filter states",
      "One-click mobile checkout optimization",
      "Product detail pages with interactive previews",
      "Payment gateway integration (Stripe / Razorpay)",
    ],
    techStack: ["Shopify Headless", "Next.js", "Razorpay / Stripe", "Redis"],
    planId: "enterprise",
  },
  {
    id: "landing-pages",
    number: "03",
    icon: Smartphone,
    title: "LANDING PAGES",
    category: "High-Conversion Campaign Destinations",
    description:
      "Laser-focused single-purpose landing experiences built to convert traffic into qualified leads or paying customers. A/B test ready, ultra-fast, and obsessively refined.",
    timeline: "1–2 Weeks",
    deliverables: [
      "Compelling narrative copy hierarchy",
      "Frictionless lead capture & form validation",
      "Fast CDN deployment (Vercel / Cloudflare)",
      "Analytics & conversion tracking (PostHog, GA4)",
      "100/100 Google Lighthouse performance score",
    ],
    techStack: ["Next.js", "Tailwind CSS", "GSAP", "PostHog"],
    planId: "launchpad",
  },
  {
    id: "uiux-design",
    number: "04",
    icon: Layers,
    title: "UI/UX & DESIGN SYSTEMS",
    category: "Systematic Product Architecture",
    description:
      "Comprehensive design systems, component libraries, and interactive prototypes that bridge the gap between design vision and engineering velocity.",
    timeline: "3–5 Weeks",
    deliverables: [
      "Figma component library with auto-layout",
      "Standardized typography, spacing & color tokens",
      "Interactive clickable prototypes",
      "Developer handoff documentation & specs",
      "Accessibility & WCAG AA contrast compliance",
    ],
    techStack: ["Figma", "Design Tokens", "Storybook", "WCAG 2.1"],
    planId: "flagship",
  },
  {
    id: "web-applications",
    number: "05",
    icon: Monitor,
    title: "WEB APPLICATIONS & SAAS",
    category: "Complex Frontend Engineering",
    description:
      "Client portals, interactive dashboards, and SaaS marketing engines designed to make complex data workflows feel intuitive, responsive, and beautiful.",
    timeline: "6–12 Weeks",
    deliverables: [
      "Modular dashboard layout & state management",
      "Real-time interactive data visualizations",
      "Role-based authentication & session controls",
      "API orchestration & optimistic UI mutations",
      "Comprehensive TypeScript end-to-end typing",
    ],
    techStack: ["React 19", "Next.js App Router", "Tailwind CSS", "Zustand"],
    planId: "enterprise",
  },
];

export function ServicesOverviewSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string>("websites");

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Core Studio Capabilities & Services"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* SECTION HEADER HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 sm:mb-16 border-b border-[#DDDDDA] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              <span>004 // CORE DISCIPLINES</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#111111] uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SERVICES.
            </h2>
          </div>

          <p
            className="max-w-md text-sm sm:text-base text-[#777777] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We don’t offer twenty different half-hearted services. We specialize strictly in end-to-end digital craft: design, front-end architecture, and commercial execution.
          </p>
        </div>

        {/* INTERACTIVE EDITORIAL ACCORDION LIST */}
        <div className="border-t border-[#DDDDDA] divide-y divide-[#DDDDDA]">
          {services.map((service) => {
            const isExpanded = expandedId === service.id;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className={cn(
                  "service-row transition-all duration-300",
                  isExpanded ? "bg-white/80 rounded-2xl p-6 sm:p-8 my-4 shadow-[0_8px_30px_rgba(17,17,17,0.04)] border border-[#DDDDDA]" : "py-6 sm:py-8 px-4"
                )}
              >
                {/* Clickable Header Row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? "" : service.id)}
                  className="w-full flex items-center justify-between text-left group focus-visible:outline-2 focus-visible:outline-[#FF7139] rounded-xs"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-6 sm:gap-8">
                    <span
                      className="text-2xl sm:text-3xl font-bold text-[#FF7139] w-8"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#F5F5F2] group-hover:bg-[#FF7139] group-hover:text-white transition-colors duration-200 hidden sm:flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#111111] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#111111] uppercase tracking-tight group-hover:text-[#FF7139] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-xs font-mono text-[#777777] uppercase tracking-wider mt-0.5">
                        {service.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden sm:inline-block text-xs font-mono text-[#777777] border border-[#DDDDDA] px-3 py-1 rounded-full">
                      EST: {service.timeline}
                    </span>
                    <div className="p-2 rounded-full border border-[#DDDDDA] bg-white group-hover:border-[#111111] transition-colors">
                      {isExpanded ? (
                        <Minus className="w-4 h-4 text-[#111111]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#111111]" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Detailed Content Drawer */}
                {isExpanded && (
                  <div className="pt-8 mt-6 border-t border-[#DDDDDA]/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
                    {/* Left: Overview & Timeline */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <p
                        className="text-sm sm:text-base text-[#777777] leading-relaxed mb-6"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-[#F5F5F2] text-[10px] font-mono uppercase text-[#111111] border border-[#DDDDDA]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <MagneticButton strength={0.3}>
                          <Link
                            href={`/checkout?plan=${service.planId}`}
                            data-cursor="BOOK"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
                          >
                            <span>Book This Service</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </MagneticButton>

                        <Link
                          href="/pricing"
                          className="text-xs font-mono text-[#777777] hover:text-[#111111] transition-colors uppercase tracking-wider"
                        >
                          View Pricing Tier →
                        </Link>
                      </div>
                    </div>

                    {/* Right: Deliverables Checklist */}
                    <div className="lg:col-span-7 bg-[#F5F5F2] p-6 rounded-xl border border-[#DDDDDA]">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF7139] font-bold block mb-4">
                        KEY DELIVERABLES & INCLUSIONS
                      </span>
                      <ul className="space-y-3">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-xs sm:text-sm text-[#111111]"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            <span className="w-4 h-4 rounded-full bg-white border border-[#DDDDDA] flex items-center justify-center shrink-0 mt-0.5 text-[#FF7139]">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
