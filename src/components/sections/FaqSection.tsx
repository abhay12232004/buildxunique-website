"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    num: "01",
    question: "What types of websites do you build?",
    answer:
      "We design and develop business websites, landing pages, e-commerce stores and custom digital experiences.",
  },
  {
    num: "02",
    question: "How does the project process work?",
    answer:
      "We begin by understanding your requirements, define the project direction, create the design, develop the website and test it before launch.",
  },
  {
    num: "03",
    question: "Will my website work on mobile devices?",
    answer:
      "Yes. We design and develop responsive websites that adapt to desktop, tablet and mobile screens.",
  },
  {
    num: "04",
    question: "Can you redesign my existing website?",
    answer:
      "Yes. We can help improve your existing website through better design, user experience and performance optimization.",
  },
  {
    num: "05",
    question: "Do you provide website maintenance?",
    answer:
      "Yes. Maintenance and ongoing support can be discussed according to your project requirements.",
  },
  {
    num: "06",
    question: "How can I start a project?",
    answer:
      "Use our project enquiry form and share your requirements. We will review the details and discuss the next steps.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="relative py-24 md:py-36 border-t"
      style={{
        background: "#090909",
        borderColor: "rgba(244, 241, 234, 0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Header Column */}
          <div className="lg:col-span-5">
            <span
              className="text-xs tracking-widest uppercase mb-4 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              Frequently Asked Questions
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              GOOD QUESTIONS. <br />
              <span style={{ color: "#D7FF00" }}>CLEAR ANSWERS.</span>
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{ color: "#858585" }}
            >
              Everything you need to know about partnering with Buildxunique for
              your next digital venture.
            </p>
          </div>

          {/* Accordion List */}
          <div className="lg:col-span-7 divide-y" style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.num}
                  className="py-6 transition-colors duration-200"
                  style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}
                >
                  <button
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex items-start justify-between gap-4 py-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7FF00]"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <span
                        className="text-xs tracking-widest pt-1"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: isOpen ? "#D7FF00" : "#858585",
                        }}
                      >
                        {faq.num}
                      </span>
                      <h3
                        className="text-lg md:text-xl font-bold tracking-tight group-hover:text-[#D7FF00] transition-colors"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: isOpen ? "#D7FF00" : "#F4F1EA",
                        }}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className="w-8 h-8 rounded-none border flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{
                        borderColor: isOpen
                          ? "#D7FF00"
                          : "rgba(244, 241, 234, 0.15)",
                        color: isOpen ? "#090909" : "#F4F1EA",
                        background: isOpen ? "#D7FF00" : "transparent",
                      }}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-4 pb-2 pl-8 md:pl-12 pr-6">
                      <p
                        className="text-sm md:text-base leading-relaxed"
                        style={{ color: "#858585" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
