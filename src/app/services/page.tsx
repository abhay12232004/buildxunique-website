import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Buildxunique's core digital services: custom website development, e-commerce storefronts, high-converting landing pages, UI/UX design, and ongoing performance optimization.",
};

const serviceDetails = [
  {
    id: "websites",
    number: "01",
    title: "WEBSITES & WEB EXPERIENCES",
    tagline: "Custom digital platforms engineered for lasting authority and speed.",
    problem:
      "Generic templates fail to reflect your unique value proposition, load slowly, and fail to turn visitors into qualified leads.",
    includes:
      "Complete custom architecture, responsive layouts, motion choreography with GSAP, headless CMS configuration, and Core Web Vitals optimization.",
    deliverables: [
      "Custom responsive design (Desktop, Tablet, Mobile)",
      "Next.js & TypeScript performant codebase",
      "Interactive micro-animations & scroll interactions",
      "Comprehensive Technical SEO & OpenGraph setup",
      "Cross-browser testing & accessibility conformance",
    ],
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-COMMERCE DEVELOPMENT",
    tagline: "Frictionless storefronts engineered for high average order values.",
    problem:
      "Clunky checkout funnels, slow product discovery, and generic layouts create cart abandonment and suppress conversion rates.",
    includes:
      "Modern headless or integrated storefronts, optimized product showcase pages, lightning-quick cart interactions, and secure payment processing.",
    deliverables: [
      "Intuitive product filtering & category navigation",
      "Optimized mobile-first checkout flows",
      "Payment gateway integration (Stripe, Razorpay, etc.)",
      "Inventory sync & order webhook automation",
      "Speed-optimized image CDN delivery",
    ],
  },
  {
    id: "landing",
    number: "03",
    title: "LANDING PAGES",
    tagline: "High-velocity campaign pages built to maximize paid traffic ROI.",
    problem:
      "Ad traffic wasted on bloated multi-purpose pages with confusing choices and weak conversion hierarchy.",
    includes:
      "Surgically focused single-page destinations with compelling typographic hierarchy, trust-building testimonials/proof points, and conversion anchors.",
    deliverables: [
      "Conversion-centered page structure",
      "Clear visual storytelling & benefit breakdowns",
      "A/B test ready modular component blocks",
      "Sub-second load times for paid campaign traffic",
      "Analytics tracking & conversion pixel integration",
    ],
  },
  {
    id: "uiux",
    number: "04",
    title: "UI/UX DESIGN & REDESIGN",
    tagline: "Distinctive interfaces that turn complex workflows into natural user journeys.",
    problem:
      "Confusing user journeys, outdated visual styles, and disjointed interfaces that frustrate customers and erode brand trust.",
    includes:
      "End-to-end design sprints, wireframing, interactive prototypes in Figma, bespoke design systems, and rigorous design tokens for developer handoff.",
    deliverables: [
      "User journey mapping & information architecture",
      "Figma high-fidelity prototypes & responsive components",
      "Comprehensive design token documentation",
      "Custom typography & color palette system",
      "Micro-interaction specifications & motion guides",
    ],
  },
  {
    id: "maintenance",
    number: "05",
    title: "MAINTENANCE & OPTIMIZATION",
    tagline: "Continuous engineering support to keep your digital asset fast, secure, and fresh.",
    problem:
      "Websites degrade over time without proactive security updates, performance monitoring, and iterative enhancements.",
    includes:
      "Dedicated retainer support covering technical audits, uptime monitoring, dependency updates, new feature builds, and ongoing speed optimization.",
    deliverables: [
      "Monthly performance & Core Web Vitals audit",
      "Dependency security patches & Next.js upgrades",
      "Dedicated monthly hours for design & dev requests",
      "Uptime monitoring & rapid issue resolution",
      "Content updates & ongoing SEO refinement",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 md:pb-36" style={{ background: "#090909" }}>
      {/* Services Hero */}
      <section className="px-6 md:px-10 lg:px-16 mb-20 md:mb-32">
        <div className="max-w-[1440px] mx-auto border-b pb-16 md:pb-24" style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}>
          <span
            className="text-xs tracking-widest uppercase mb-4 inline-block"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#858585",
            }}
          >
            Capabilities & Solutions
          </span>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F4F1EA",
            }}
          >
            THE RIGHT DIGITAL SOLUTIONS <br />
            <span style={{ color: "#D7FF00" }}>FOR YOUR NEXT MOVE.</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "#858585" }}
          >
            From your first website to your next digital transformation, we help
            turn ambitious ideas into effective, scalable online experiences.
          </p>
        </div>
      </section>

      {/* Services Breakdown List */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto space-y-24 md:space-y-36">
          {serviceDetails.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pb-20 border-b"
              style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}
            >
              {/* Left Column: Number and Title */}
              <div className="lg:col-span-5">
                <span
                  className="text-xs tracking-widest uppercase block mb-3"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#D7FF00",
                  }}
                >
                  SERVICE {service.number}
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#F4F1EA",
                  }}
                >
                  {service.title}
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed mb-8"
                  style={{ color: "#858585" }}
                >
                  {service.tagline}
                </p>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    background: "#D7FF00",
                    color: "#090909",
                  }}
                >
                  Discuss This Service
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>

              {/* Right Column: Problem, Inclusions, and Deliverables */}
              <div className="lg:col-span-7 space-y-8">
                <div
                  className="p-6 md:p-8 border"
                  style={{
                    background: "#0d0d0d",
                    borderColor: "rgba(244, 241, 234, 0.08)",
                  }}
                >
                  <h3
                    className="text-xs tracking-widest uppercase mb-3"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#FF4F9A",
                    }}
                  >
                    The Challenge Addressed
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: "#858585" }}>
                    {service.problem}
                  </p>
                </div>

                <div
                  className="p-6 md:p-8 border"
                  style={{
                    background: "#0d0d0d",
                    borderColor: "rgba(244, 241, 234, 0.08)",
                  }}
                >
                  <h3
                    className="text-xs tracking-widest uppercase mb-3"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#F4F1EA",
                    }}
                  >
                    What&apos;s Included
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "#858585" }}>
                    {service.includes}
                  </p>

                  <h4
                    className="text-xs tracking-widest uppercase mb-4"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#D7FF00",
                    }}
                  >
                    Key Deliverables
                  </h4>
                  <ul className="space-y-3">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#858585]">
                        <CheckCircle2 className="w-4 h-4 text-[#D7FF00] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
