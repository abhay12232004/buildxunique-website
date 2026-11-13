"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, CheckCircle2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "websites",
    number: "01",
    title: "WEBSITES & WEB EXPERIENCES",
    tagline: "Your digital flagship headquarters.",
    description:
      "Your website is the single most authoritative touchpoint for your brand. We build custom digital experiences that marry bespoke editorial aesthetics with performant modern engineering. From corporate platforms to creative portfolios, we build to move your business forward.",
    features: [
      "Custom layout architecture & design systems",
      "Headless CMS integration (Sanity / Strapi)",
      "Core Web Vitals sub-second optimization",
      "Analytics & conversion tracking instrumentation",
    ],
    deliverables: [
      "Custom responsive design (Desktop, Tablet, Mobile)",
      "Next.js 16 & TypeScript performant codebase",
      "GSAP scroll-choreographed micro-interactions",
      "Technical SEO & OpenGraph metadata setup",
      "Cross-browser testing & accessibility conformance",
    ],
    labels: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
    accent: "#FF7139",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-COMMERCE DEVELOPMENT",
    tagline: "Turn browsers into high-value buyers.",
    description:
      "Transform your catalog into a frictionless digital storefront with rapid instant-filtering, intuitive checkout funnels, and scalable backend architecture. We build online stores that elevate brand prestige and drive revenue.",
    features: [
      "Custom Shopify & Next.js storefronts",
      "Razorpay / Stripe multi-gateway integration",
      "Real-time inventory sync & webhook automation",
      "Conversion rate optimization & checkout tuning",
    ],
    deliverables: [
      "Instant product discovery & filtering filters",
      "Mobile-first streamlined checkout flows",
      "Secure webhook verification pipelines",
      "CDN speed-optimized image asset pipelines",
    ],
    labels: ["ONLINE STORES", "HIGH CONVERSION", "INTEGRATIONS"],
    accent: "#111111",
  },
  {
    id: "landing",
    number: "03",
    title: "LANDING PAGES",
    tagline: "Make every ad dollar and click count.",
    description:
      "Surgically focused single-page destinations designed to communicate clearly, capture qualified leads, and maximize return on paid ad spend. Every headline, visual anchor, and CTA is placed with clear conversion intent.",
    features: [
      "Conversion-centered narrative structure",
      "A/B test ready modular component blocks",
      "Direct CRM & webhook lead routing",
      "Sub-second load times for mobile ad traffic",
    ],
    deliverables: [
      "Single-page conversion blueprint",
      "High-impact typographic scale & benefit breakdown",
      "Analytics & tracking pixel integration",
      "Spam-protected contact & enquiry forms",
    ],
    labels: ["CAMPAIGNS", "PAID TRAFFIC", "LEAD GEN"],
    accent: "#FF7139",
  },
  {
    id: "uiux",
    number: "04",
    title: "UI/UX DESIGN & REDESIGN",
    tagline: "Interfaces that turn complexity into natural journeys.",
    description:
      "Make complex digital workflows easier to navigate, more enjoyable to use, and visually distinctive. We transform outdated or fragmented legacy web apps into unified, memorable experiences through rigorous design systems.",
    features: [
      "User research & information architecture",
      "Figma interactive prototypes & component libraries",
      "Design tokens for frictionless developer handoff",
      "Usability testing & accessibility audits",
    ],
    deliverables: [
      "Complete Figma design system library",
      "Clickable responsive prototypes",
      "Micro-interaction & motion specification guides",
      "Comprehensive typography & token documentation",
    ],
    labels: ["USER EXPERIENCE", "DESIGN SYSTEMS", "PROTOTYPING"],
    accent: "#F4CE36",
  },
  {
    id: "maintenance",
    number: "05",
    title: "MAINTENANCE & OPTIMIZATION",
    tagline: "Continuous care so your asset never slows down.",
    description:
      "We keep your digital presence fast, secure, and ready to scale through proactive performance audits, security patching, and ongoing engineering improvements. Think of us as your dedicated digital maintenance crew.",
    features: [
      "Next.js framework & dependency security patches",
      "Ongoing Core Web Vitals speed monitoring",
      "Dedicated monthly hours for design & dev requests",
      "Content updates & ongoing technical SEO audits",
    ],
    deliverables: [
      "Monthly speed & security health audit",
      "Continuous uptime monitoring & rapid fix SLA",
      "Feature iteration & component additions",
      "Priority technical emergency support",
    ],
    labels: ["PERFORMANCE", "RETAINER", "SECURITY"],
    accent: "#111111",
  },
];

const process_steps = [
  {
    step: "01",
    title: "Discover",
    description: "We learn about your business, commercial goals, competitor landscape, and target audience.",
  },
  {
    step: "02",
    title: "Design",
    description: "We create interactive Figma prototypes, typographic systems, and high-fidelity layouts.",
  },
  {
    step: "03",
    title: "Develop",
    description: "We build your project using clean Next.js 16, TypeScript, and fluid GSAP motion curves.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "We conduct cross-device QA, verify Core Web Vitals, deploy, and provide continuous support.",
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".services-hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".services-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
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

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
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
    { scope: servicesRef }
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
              Capabilities & Solutions
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
          </div>

          <h1
            className="services-hero-title text-[clamp(2.25rem,7.5vw,6rem)] font-bold uppercase tracking-tight text-[#111111] leading-[0.98] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SERVICES BUILT <br />
            <span className="text-[#FF7139]">
              FOR COMMERCIAL
              <br className="sm:hidden" /> GROWTH
            </span>.
          </h1>

          <p
            className="services-hero-sub text-base sm:text-lg md:text-xl text-[#777777] max-w-2xl leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            From your first flagship website to comprehensive e-commerce systems,
            we turn ambitious ideas into effective, scalable digital experiences.
          </p>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#777777] font-semibold">
            <ArrowDown className="w-4 h-4 text-[#FF7139] animate-bounce" />
            <span>Explore our 5 core capabilities</span>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section ref={servicesRef} className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="max-w-[1440px] mx-auto space-y-12">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="service-card motion-card rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white p-8 sm:p-12 md:p-14 shadow-sm transition-all duration-300 hover:border-[#111111] hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left: Number and Title */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139] block mb-2">
                      SERVICE {service.number}
                    </span>
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111] leading-[1.0] mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.title}
                    </h2>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider text-[#777777]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {service.tagline}
                    </p>
                  </div>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {service.labels.map((lbl) => (
                      <span
                        key={lbl}
                        className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#F5F5F2] border border-[#DDDDDA] text-[#777777]"
                      >
                        {lbl}
                      </span>
                    ))}
                  </div>

                  <div>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <span>Discuss This Service</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Right: Description & Deliverables */}
                <div className="lg:col-span-7 space-y-8 lg:border-l lg:border-[#DDDDDA] lg:pl-10">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
                      OVERVIEW & VALUE
                    </span>
                    <p
                      className="text-base text-[#777777] leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Core Features */}
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block mb-3">
                      CORE ARCHITECTURE
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs font-medium text-[#111111]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Deliverables */}
                  <div className="p-6 rounded-2xl bg-[#F5F5F2] border border-[#DDDDDA]">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139] block mb-3">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-[#111111]">
                          <CheckCircle2 className="w-4 h-4 text-[#FF7139] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process 4-Step Summary */}
      <section className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="max-w-[1440px] mx-auto p-8 sm:p-12 md:p-16 rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white">
          <div className="border-b border-[#DDDDDA] pb-8 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139] block mb-2">
              HOW WE WORK
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#111111]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              OUR FOUR-STEP PROCESS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process_steps.map((st) => (
              <div key={st.step} className="p-6 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] space-y-2">
                <span className="text-2xl font-bold text-[#FF7139]" style={{ fontFamily: "var(--font-display)" }}>
                  {st.step}
                </span>
                <h3 className="text-lg font-bold uppercase text-[#111111]" style={{ fontFamily: "var(--font-display)" }}>
                  {st.title}
                </h3>
                <p className="text-xs text-[#777777] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser Link */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto p-8 sm:p-12 md:p-16 rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#111111] mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              WANT TO EXPLORE PROJECT PACKAGES?
            </h2>
            <p className="text-sm text-[#777777]" style={{ fontFamily: "var(--font-body)" }}>
              Review transparent investment scopes and package deliverables.
            </p>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2.5 px-8 py-4.5 rounded-full bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>View Packages & Pricing</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
