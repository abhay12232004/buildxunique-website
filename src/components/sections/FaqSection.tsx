"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const categories = ["ALL", "PROCESS", "PRICING & TIMELINE", "TECH & CODE"];

const faqs = [
  {
    id: "services-included",
    category: "PROCESS",
    question: "What exact services does Buildxunique deliver?",
    answer:
      "We design and build bespoke web flagships, e-commerce storefronts, high-converting landing pages, interactive SaaS frontends, and custom UI/UX design systems. We handle everything from Figma design to production Next.js 16 deployment.",
  },
  {
    id: "timeline-scope",
    category: "PRICING & TIMELINE",
    question: "What is your typical project turnaround timeline?",
    answer:
      "A high-impact landing page typically delivers in 1 to 2 weeks. A bespoke brand website or e-commerce flagship averages 3 to 6 weeks. Complex web applications take 6 to 12 weeks. We lock down explicit delivery schedules prior to project kickoff.",
  },
  {
    id: "pricing-structure",
    category: "PRICING & TIMELINE",
    question: "How does your pricing and deposit structure work?",
    answer:
      "We operate on transparent, fixed-scope milestones. We collect a 50% deposit to secure your production slot, with the remaining 50% invoiced upon successful production handover. Alternatively, clients who choose to pay 100% upfront receive an automatic 10% cash discount.",
  },
  {
    id: "tech-stack",
    category: "TECH & CODE",
    question: "Why do you use Next.js instead of WordPress or Webflow?",
    answer:
      "Next.js 16 offers unmatched performance, sub-second page loads, ironclad security, and total creative freedom. Unlike WordPress or Webflow, there are zero subscription lock-ins, zero sluggish plugin conflicts, and complete ownership of your intellectual property and source code.",
  },
  {
    id: "revision-policy",
    category: "PROCESS",
    question: "How do revisions and feedback cycles work?",
    answer:
      "Every project package includes 2 to 3 structured revision rounds per phase. We present our design and development milestones via asynchronous Loom video walkthroughs and dedicated Figma links, ensuring feedback is rapid, crystal-clear, and actionable.",
  },
  {
    id: "post-launch-maintenance",
    category: "TECH & CODE",
    question: "What happens after launch? Do you provide maintenance?",
    answer:
      "Every project includes a 30-day post-launch warranty covering any bugs, technical questions, or minor adjustments. We also offer dedicated monthly retainer care packages for teams requiring continuous feature iterations and ongoing performance tuning.",
  },
  {
    id: "how-to-start",
    category: "PROCESS",
    question: "How do we get started on a project together?",
    answer:
      "Submit an enquiry through our contact form or book your package directly on our Pricing page. We will review your project brief, schedule a 20-minute discovery call, and provide an official project kickoff plan within 24 hours.",
  },
];

export function FaqSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("ALL");
  const [openIds, setOpenIds] = useState<string[]>(["services-included"]);

  const filteredFaqs =
    activeTab === "ALL" ? faqs : faqs.filter((f) => f.category === activeTab);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { dependencies: [activeTab], scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Frequently Asked Questions"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* SECTION HEADER HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-[#DDDDDA] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              <span>008 // FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#111111] uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              QUESTIONS.
            </h2>
          </div>

          <p
            className="max-w-md text-sm sm:text-base text-[#777777] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Clear answers regarding our turnaround timelines, development stack, deposit milestones, and post-launch guarantees.
          </p>
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

        {/* ACCORDION ITEMS */}
        <div className="border-t border-[#DDDDDA] divide-y divide-[#DDDDDA] max-w-4xl">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={cn(
                  "faq-item transition-all duration-200",
                  isOpen ? "bg-white/70 px-4 sm:px-6 py-6 sm:py-8 rounded-xl my-2 border border-[#DDDDDA]" : "py-6 px-2 sm:px-4"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left group focus-visible:outline-2 focus-visible:outline-[#FF7139] rounded-xs"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-tight group-hover:text-[#FF7139] transition-colors pr-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {faq.question}
                  </span>
                  <div className="p-2 rounded-full border border-[#DDDDDA] bg-white group-hover:border-[#111111] transition-colors shrink-0">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 text-[#111111]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-[#111111]" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 mt-4 border-t border-[#DDDDDA]/50 animate-fadeIn">
                    <p
                      className="text-sm sm:text-base text-[#777777] leading-relaxed"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {faq.answer}
                    </p>
                    <span className="inline-block mt-4 text-[10px] font-mono text-[#FF7139] uppercase">
                      CATEGORY // {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM STILL HAVE QUESTIONS PROMPT */}
        <div className="mt-16 pt-8 border-t border-[#DDDDDA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs sm:text-sm text-[#777777] font-mono">
            HAVE A QUESTION NOT LISTED HERE?
          </span>
          <MagneticButton strength={0.25}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#FF7139] transition-colors"
            >
              <span>Ask Our Studio Leads</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
