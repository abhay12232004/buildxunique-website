"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Mail, Clock, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const serviceOptions = [
  "Custom Website / Web Experience",
  "Headless E-Commerce Store",
  "High-Converting Landing Page",
  "UI/UX Design & Redesign",
  "Maintenance & Retainer Support",
  "Full Stack Custom Solution",
];

const budgetOptions = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000+",
  "Flexible / Not Decided",
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    details: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".contact-hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        ".contact-hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.service) {
      setStatus("error");
      setFeedbackMessage("Please complete all required fields (*).");
      return;
    }

    setStatus("loading");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMessage("Thank you! Your project enquiry has been received. We will respond within 24 hours.");
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          budget: "",
          details: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setFeedbackMessage(data.error || "Unable to send your message right now. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("A network error occurred. Please check your connection and retry.");
    }
  };

  return (
    <div ref={containerRef} className="pt-28 pb-24 md:pb-36 bg-[#F5F5F2] min-h-screen">
      {/* Hero Header */}
      <section className="px-6 md:px-10 lg:px-16 mb-16 md:mb-24">
        <div className="max-w-[1440px] mx-auto border-b border-[#DDDDDA] pb-12 sm:pb-16">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs uppercase tracking-[0.16em] font-semibold text-[#777777]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Start a Conversation
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
          </div>

          <h1
            className="contact-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-[#111111] leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LET&apos;S DISCUSS YOUR <br />
            <span className="text-[#FF7139]">NEXT MOVE</span>.
          </h1>

          <p
            className="contact-hero-sub text-base sm:text-lg md:text-xl text-[#777777] max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Have a project in mind, an existing site requiring optimization, or want to
            explore a custom sprint? Reach out and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info Sidebar */}
      <section className="px-6 md:px-10 lg:px-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white p-8 sm:p-12 shadow-sm">
              <h2
                className="text-2xl font-bold uppercase tracking-tight text-[#111111] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                PROJECT ENQUIRY
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="page-name"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Your Name <span className="text-[#FF7139]">*</span>
                    </label>
                    <input
                      id="page-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="page-email"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Email Address <span className="text-[#FF7139]">*</span>
                    </label>
                    <input
                      id="page-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="page-company"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Company / Organization
                    </label>
                    <input
                      id="page-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Studio"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="page-service"
                      className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Required Service <span className="text-[#FF7139]">*</span>
                    </label>
                    <select
                      id="page-service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <option value="" disabled>Select a capability...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="page-budget"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Expected Investment Scope
                  </label>
                  <select
                    id="page-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <option value="">Select an investment tier...</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="page-details"
                    className="block text-xs uppercase tracking-wider font-semibold text-[#111111]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Project Details & Objectives
                  </label>
                  <textarea
                    id="page-details"
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, current challenges, target launch date, and desired outcome..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDDDA] bg-[#F5F5F2] text-sm text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#FF7139] focus:bg-white transition-all resize-y"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                {status === "error" && (
                  <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 flex items-start gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-[#111111] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FF7139] hover:shadow-md disabled:opacity-50 cursor-pointer"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Project Enquiry</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl md:rounded-3xl border border-[#DDDDDA] bg-white p-8 sm:p-10 shadow-sm space-y-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF7139] block mb-2">
                  STUDIO CONTACT
                </span>
                <h3
                  className="text-2xl font-bold uppercase tracking-tight text-[#111111]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  HOW WE COLLABORATE
                </h3>
              </div>

              <div className="space-y-6 text-xs text-[#777777]">
                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#FF7139] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#111111] uppercase tracking-wider mb-0.5">DIRECT EMAIL</p>
                    <p className="text-sm text-[#111111]">hello@buildxunique.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#FF7139] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#111111] uppercase tracking-wider mb-0.5">AVAILABILITY</p>
                    <p className="text-sm text-[#111111]">Monday – Friday • 9:00 AM – 7:00 PM IST</p>
                    <p className="text-[11px] text-[#777777] mt-0.5">Global clients across Americas, Europe & Asia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-[#FF7139] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#111111] uppercase tracking-wider mb-0.5">CONFIDENTIALITY</p>
                    <p className="text-sm text-[#111111]">Mutual NDA available upon request before technical scoping</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#DDDDDA]">
                <p className="text-xs text-[#777777] leading-relaxed">
                  Looking for pre-packaged scopes? Check out our{" "}
                  <a href="/pricing" className="text-[#111111] font-semibold underline hover:text-[#FF7139]">
                    Pricing & Investment Packages
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
