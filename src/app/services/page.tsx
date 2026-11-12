"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "websites",
    number: "01",
    title: "WEBSITES & WEB EXPERIENCES",
    tagline: "Your digital front door.",
    description:
      "Your website is often the first impression of your business. We create custom digital experiences that combine thoughtful design, intuitive functionality and peak performance. Whether it's a corporate site, a portfolio, or a complex web application — we build it to move your business forward.",
    features: [
      "Custom design & development",
      "CMS integration",
      "Performance optimization",
      "Analytics & tracking setup",
    ],
    labels: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
    color: "#D7FF00",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-COMMERCE DEVELOPMENT",
    tagline: "Turn browsers into buyers.",
    description:
      "Turn your products into powerful online shopping experiences with intuitive storefronts, seamless customer journeys and scalable development. We build stores that look stunning, convert visitors, and grow with your business.",
    features: [
      "Shopify & custom stores",
      "Payment gateway integration",
      "Inventory management",
      "Conversion optimization",
    ],
    labels: ["ONLINE STORES", "PRODUCT EXPERIENCE", "CONVERSION"],
    color: "#FF4F9A",
  },
  {
    id: "landing",
    number: "03",
    title: "LANDING PAGES",
    tagline: "Make every click count.",
    description:
      "Make every click count with focused landing pages designed to communicate clearly, engage visitors and encourage action. Perfect for product launches, marketing campaigns, and lead generation.",
    features: [
      "Campaign-focused design",
      "A/B testing ready",
      "Lead capture forms",
      "Speed optimized",
    ],
    labels: ["CAMPAIGNS", "PERFORMANCE", "CONVERSION"],
    color: "#D7FF00",
  },
  {
    id: "uiux",
    number: "04",
    title: "UI/UX DESIGN & REDESIGN",
    tagline: "Design that feels right.",
    description:
      "Make digital experiences easier to understand, more enjoyable to use and visually distinctive through thoughtful user interface and experience design. We transform complex workflows into intuitive journeys.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Design systems",
      "Usability testing",
    ],
    labels: ["USER EXPERIENCE", "INTERFACE", "STRATEGY"],
    color: "#FF4F9A",
  },
  {
    id: "maintenance",
    number: "05",
    title: "MAINTENANCE & OPTIMIZATION",
    tagline: "Keep it running. Keep it growing.",
    description:
      "We keep your digital presence reliable, responsive and ready to grow through continuous improvements, performance optimization and ongoing support. Think of us as your digital maintenance crew.",
    features: [
      "Bug fixes & updates",
      "Performance monitoring",
      "Security patches",
      "Content updates",
    ],
    labels: ["PERFORMANCE", "SUPPORT", "OPTIMIZATION"],
    color: "#D7FF00",
  },
];

const process_steps = [
  {
    step: "01",
    title: "Discovery",
    description: "We learn about your business, your goals, and your audience.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "We define the scope, timeline, and approach that fits your needs.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "We create wireframes and visual designs that bring your vision to life.",
  },
  {
    step: "04",
    title: "Development",
    description:
      "We build your project with clean code, modern frameworks, and best practices.",
  },
  {
    step: "05",
    title: "Launch & Support",
    description:
      "We deploy, test, and provide ongoing support to ensure success.",
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
      if (prefersReduced) {
        gsap.set(
          [
            ".services-hero-label",
            ".services-hero-title",
            ".services-hero-sub",
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      gsap.fromTo(
        ".services-hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      gsap.fromTo(
        ".services-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
      );
      gsap.fromTo(
        ".services-hero-sub",
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
      if (prefersReduced) {
        gsap.set([".service-card", ".process-step"], { opacity: 1, y: 0, x: 0 });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
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

      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.08,
          }
        );
      });
    },
    { scope: servicesRef }
  );

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden"
        style={{ background: "#090909", paddingTop: "72px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 30% 60%, rgba(215,255,0,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 w-full">
          <div className="services-hero-label opacity-0 mb-6">
            <span
              className="inline-block text-xs tracking-widest uppercase border px-3 py-1.5"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
                borderColor: "rgba(133,133,133,0.3)",
              }}
            >
              What We Do
            </span>
          </div>

          <h1
            className="services-hero-title opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span style={{ color: "#F4F1EA" }}>SERVICES BUILT</span>
            <br />
            <span style={{ color: "#D7FF00" }}>FOR GROWTH.</span>
          </h1>

          <p
            className="services-hero-sub opacity-0 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: "#858585" }}
          >
            From strategy to launch, we offer end-to-end digital services that
            help ambitious businesses stand out and scale online.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <ArrowDown className="w-5 h-5 text-[#D7FF00] animate-bounce" />
            <span
              className="text-xs tracking-widest uppercase"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              Explore our services
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        ref={servicesRef}
        className="py-24 md:py-32"
        style={{ background: "#090909" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="space-y-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="service-card opacity-0 border group"
                style={{ borderColor: "rgba(244,241,234,0.08)" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Number */}
                  <div
                    className="lg:col-span-2 p-8 flex items-start border-b lg:border-b-0 lg:border-r"
                    style={{ borderColor: "rgba(244,241,234,0.08)" }}
                  >
                    <span
                      className="text-7xl md:text-8xl font-bold leading-none opacity-20"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: service.color,
                      }}
                    >
                      {service.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-10 p-8 md:p-12">
                    <div
                      className="text-xs tracking-widest uppercase mb-3"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#858585",
                      }}
                    >
                      {service.tagline}
                    </div>

                    <h2
                      className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#F4F1EA",
                      }}
                    >
                      {service.title}
                    </h2>

                    <p
                      className="text-base max-w-2xl mb-8 leading-relaxed"
                      style={{ color: "#858585" }}
                    >
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: service.color }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: "#F4F1EA" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Labels */}
                    <div className="flex flex-wrap gap-2">
                      {service.labels.map((label) => (
                        <span
                          key={label}
                          className="px-3 py-1 text-xs tracking-widest uppercase border"
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            color: service.color,
                            borderColor:
                              service.color === "#D7FF00"
                                ? "rgba(215,255,0,0.3)"
                                : "rgba(255,79,154,0.3)",
                          }}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Process */}
          <div className="mt-32">
            <div className="mb-16">
              <div
                className="text-xs tracking-widest uppercase mb-4"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#858585",
                }}
              >
                How We Work
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#F4F1EA",
                }}
              >
                OUR PROCESS
              </h2>
            </div>

            <div className="space-y-0">
              {process_steps.map((step) => (
                <div
                  key={step.step}
                  className="process-step opacity-0 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-8 border-b"
                  style={{ borderColor: "rgba(244,241,234,0.08)" }}
                >
                  <span
                    className="text-4xl font-bold opacity-20"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#D7FF00",
                    }}
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2 tracking-tight"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#F4F1EA",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm max-w-md" style={{ color: "#858585" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
              READY TO START?
            </h3>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "#858585" }}>
              Tell us about your project and we&apos;ll get back to you within
              24 hours.
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

