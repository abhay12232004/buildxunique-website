"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const serviceOptions = [
  "Website Development",
  "E-commerce",
  "Landing Page",
  "UI/UX & Redesign",
  "Maintenance & Optimization",
  "Other",
];

const budgetOptions = [
  "Under ₹10,000",
  "₹10,000–₹25,000",
  "₹25,000–₹50,000",
  "₹50,000+",
  "Not decided",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    details: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setStatus("success");
      setFeedbackMessage(data.message);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        details: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setFeedbackMessage(msg);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 border-t"
      style={{
        background: "#090909",
        borderColor: "rgba(244, 241, 234, 0.08)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Headline and Context */}
          <div className="lg:col-span-5">
            <span
              className="text-xs tracking-widest uppercase mb-4 inline-block"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
              }}
            >
              Start a Project
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#F4F1EA",
              }}
            >
              LET&apos;S BUILD <br />
              SOMETHING <br />
              <span style={{ color: "#D7FF00" }}>THAT MATTERS.</span>
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "#858585" }}
            >
              Have an idea, a business or a website that needs a better
              direction? Let&apos;s talk.
            </p>

            <div
              className="p-6 border"
              style={{
                borderColor: "rgba(244, 241, 234, 0.08)",
                background: "#0c0c0c",
              }}
            >
              <h4
                className="text-sm font-semibold tracking-wider uppercase mb-2"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: "#D7FF00",
                }}
              >
                What happens next?
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: "#858585" }}>
                1. We review your requirements within 24-48 business hours.
                <br />
                2. We schedule an introductory strategy conversation.
                <br />
                3. We provide a structured roadmap and scope estimate.
              </p>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-12 border relative"
              style={{
                background: "#0d0d0d",
                borderColor: "rgba(244, 241, 234, 0.08)",
              }}
            >
              {/* Spam Honeypot (Hidden) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#858585",
                    }}
                  >
                    Full Name <span style={{ color: "#D7FF00" }}>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Carter"
                    className="w-full bg-[#141414] border px-4 py-3 text-sm text-[#F4F1EA] placeholder-[#555] focus:outline-none focus:border-[#D7FF00] transition-colors"
                    style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#858585",
                    }}
                  >
                    Email Address <span style={{ color: "#D7FF00" }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full bg-[#141414] border px-4 py-3 text-sm text-[#F4F1EA] placeholder-[#555] focus:outline-none focus:border-[#D7FF00] transition-colors"
                    style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                  />
                </div>
              </div>

              {/* Company / Brand */}
              <div className="mb-6">
                <label
                  htmlFor="company"
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#858585",
                  }}
                >
                  Company / Brand
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Acme Studio"
                  className="w-full bg-[#141414] border px-4 py-3 text-sm text-[#F4F1EA] placeholder-[#555] focus:outline-none focus:border-[#D7FF00] transition-colors"
                  style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Required Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#858585",
                    }}
                  >
                    Required Service <span style={{ color: "#D7FF00" }}>*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border px-4 py-3 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#D7FF00] transition-colors"
                    style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#090909]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimated Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs tracking-widest uppercase mb-2"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "#858585",
                    }}
                  >
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-[#141414] border px-4 py-3 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#D7FF00] transition-colors"
                    style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                  >
                    <option value="">Select budget range...</option>
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#090909]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div className="mb-8">
                <label
                  htmlFor="details"
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#858585",
                  }}
                >
                  Project Details <span style={{ color: "#D7FF00" }}>*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell us about your brand, current challenges, and project objectives..."
                  className="w-full bg-[#141414] border px-4 py-3 text-sm text-[#F4F1EA] placeholder-[#555] focus:outline-none focus:border-[#D7FF00] transition-colors"
                  style={{ borderColor: "rgba(244, 241, 234, 0.12)" }}
                />
              </div>

              {/* Feedback Alert */}
              {status === "error" && (
                <div
                  className="mb-6 p-4 border flex items-center gap-3 text-xs"
                  style={{
                    borderColor: "rgba(255, 79, 154, 0.4)",
                    background: "rgba(255, 79, 154, 0.08)",
                    color: "#FF4F9A",
                  }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div
                  className="mb-6 p-4 border flex items-center gap-3 text-xs"
                  style={{
                    borderColor: "rgba(215, 255, 0, 0.4)",
                    background: "rgba(215, 255, 0, 0.08)",
                    color: "#D7FF00",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full group flex items-center justify-center gap-3 py-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300 disabled:opacity-50"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  background: "#D7FF00",
                  color: "#090909",
                }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Enquiry...
                  </>
                ) : (
                  <>
                    Submit Project Enquiry
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
