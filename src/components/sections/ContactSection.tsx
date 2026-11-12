"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin, Clock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  "Bespoke Website",
  "E-Commerce Store",
  "Landing Page",
  "UI/UX Design System",
  "Web Application & SaaS",
];

const budgetOptions = [
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Custom Enterprise",
];

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    selectedService: "Bespoke Website",
    budget: "$5,000 – $10,000",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.selectedService,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to deliver message. Please try again.");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        selectedService: "Bespoke Website",
        budget: "$5,000 – $10,000",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please email us directly."
      );
    }
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".contact-form-container",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      aria-label="Contact Buildxunique Studio"
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#F5F5F2] border-t border-[#DDDDDA]/70"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* SECTION HEADER HUD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#DDDDDA] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
              <span>009 // COMMENCE DIALOGUE</span>
            </div>
            <h2
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#111111] uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              START A PROJECT.
            </h2>
          </div>

          <p
            className="max-w-md text-sm sm:text-base text-[#777777] leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Have an upcoming project or ambitious digital vision? Fill in the details below, and our studio leads will respond within 24 business hours.
          </p>
        </div>

        {/* 2-COLUMN SPREAD: STUDIO DETAILS + INTERACTIVE ENQUIRY FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT 5 COLS: STUDIO DETAILS & DIRECT CHANNELS */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="p-8 rounded-2xl border border-[#DDDDDA] bg-white space-y-6 shadow-xs">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#FF7139] font-bold block">
                DIRECT STUDIO COMMS
              </span>

              <div className="space-y-4 text-sm text-[#111111]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF7139] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-mono text-[#777777] block">DIRECT INQUIRIES</span>
                    <a
                      href="mailto:hello@buildxunique.com"
                      className="font-semibold hover:text-[#FF7139] transition-colors"
                    >
                      hello@buildxunique.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FF7139] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-mono text-[#777777] block">PRIMARY HEADQUARTERS</span>
                    <span className="font-semibold">New Delhi, India — Available Globally</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF7139] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-mono text-[#777777] block">RESPONSE PROMISE</span>
                    <span className="font-semibold">&lt; 24 Hours on Business Days</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#DDDDDA]/70 flex items-center justify-between text-xs font-mono text-[#777777]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ACCEPTING COMMISSIONS</span>
                </div>
                <span>Q1 / Q2 2026</span>
              </div>
            </div>

            {/* HONEST STUDIO NOTICE */}
            <div className="p-6 rounded-2xl border border-[#DDDDDA] bg-[#F5F5F2] text-xs text-[#777777] space-y-2 font-mono">
              <span className="text-[#111111] font-bold block uppercase tracking-wider">
                STUDIO PRODUCTION CAPACITY
              </span>
              <p>
                To safeguard obsessive craft, we cap concurrent client intake at 2 active builds per production cycle.
              </p>
            </div>
          </div>

          {/* RIGHT 7 COLS: INTERACTIVE FORM */}
          <div className="contact-form-container lg:col-span-7 rounded-2xl border border-[#DDDDDA] bg-white p-6 sm:p-10 shadow-xs">
            {status === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3
                  className="text-3xl font-bold text-[#111111] uppercase tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  MESSAGE DELIVERED.
                </h3>
                <p className="text-sm text-[#777777] max-w-md mx-auto">
                  Thank you for reaching out. We have logged your project inquiry and will be in touch with a preliminary kickoff proposal within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 px-6 py-2.5 rounded-full border border-[#DDDDDA] text-xs font-mono uppercase text-[#111111] hover:border-[#111111] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Service Selection Chips */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-3">
                    01 // SELECT SERVICE DISCIPLINE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((srv) => {
                      const isSelected = formData.selectedService === srv;
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setFormData({ ...formData, selectedService: srv })}
                          className={cn(
                            "px-3.5 py-2 rounded-full text-xs font-mono uppercase transition-all duration-150 border",
                            isSelected
                              ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                              : "bg-[#F5F5F2] text-[#777777] border-[#DDDDDA] hover:border-[#111111] hover:text-[#111111]"
                          )}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Selection Chips */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-3">
                    02 // ESTIMATED PROJECT BUDGET (USD)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((bgt) => {
                      const isSelected = formData.budget === bgt;
                      return (
                        <button
                          key={bgt}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: bgt })}
                          className={cn(
                            "px-3.5 py-2 rounded-full text-xs font-mono uppercase transition-all duration-150 border",
                            isSelected
                              ? "bg-[#FF7139] text-white border-[#FF7139] shadow-xs"
                              : "bg-[#F5F5F2] text-[#777777] border-[#DDDDDA] hover:border-[#111111] hover:text-[#111111]"
                          )}
                        >
                          {bgt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-2"
                    >
                      YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder-[#777777]/60 focus:outline-hidden focus:border-[#FF7139] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-2"
                    >
                      WORK EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder-[#777777]/60 focus:outline-hidden focus:border-[#FF7139] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Company / Brand Name */}
                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-mono uppercase tracking-wider text-[#777777] mb-2"
                  >
                    COMPANY OR BRAND NAME
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Labs or Personal Project"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder-[#777777]/60 focus:outline-hidden focus:border-[#FF7139] focus:bg-white transition-all"
                  />
                </div>

                {/* Project Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-[#777777]"
                    >
                      PROJECT BRIEF & GOALS *
                    </label>
                    <span className="text-[10px] font-mono text-[#777777]">
                      {formData.message.length} CHARS
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand, what you're building, target launch window, and any design references..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder-[#777777]/60 focus:outline-hidden focus:border-[#FF7139] focus:bg-white transition-all resize-y"
                  />
                </div>

                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <MagneticButton strength={0.3} className="w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      data-cursor="TRANSMIT"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#111111] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#FF7139] hover:shadow-[0_6px_24px_rgba(255,113,57,0.3)] transition-all duration-300 disabled:opacity-60"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Delivering Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Project Brief</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
