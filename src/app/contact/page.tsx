"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Clock, Loader2, AlertCircle } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.fromTo(
        ".contact-hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
      gsap.fromTo(
        ".contact-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
      );
      gsap.fromTo(
        ".contact-form-area",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
      );
      gsap.fromTo(
        ".contact-info",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
      );
    },
    { scope: heroRef }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          service: formState.service || "Other",
          budget: formState.budget || "Not decided",
          details: formState.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    background: "rgba(244,241,234,0.04)",
    border: "1px solid rgba(244,241,234,0.1)",
    color: "#F4F1EA",
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyles = {
    fontFamily: "'IBM Plex Mono', monospace",
    color: "#858585",
    fontSize: "0.6875rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
  };

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden"
        style={{ background: "#090909", paddingTop: "72px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 60% 50%, rgba(215,255,0,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-20 w-full">
          <div className="contact-hero-label opacity-0 mb-6">
            <span
              className="inline-block text-xs tracking-widest uppercase border px-3 py-1.5"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                color: "#858585",
                borderColor: "rgba(133,133,133,0.3)",
              }}
            >
              Contact Us
            </span>
          </div>
          <h1
            className="contact-hero-title opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span style={{ color: "#F4F1EA" }}>LET&apos;S BUILD</span>
            <br />
            <span style={{ color: "#D7FF00" }}>SOMETHING GREAT.</span>
          </h1>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-24" style={{ background: "#090909" }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="contact-form-area opacity-0 lg:col-span-8">
              {submitted ? (
                <div
                  className="border p-12 md:p-16 text-center"
                  style={{ borderColor: "rgba(215,255,0,0.3)" }}
                >
                  <div
                    className="text-6xl mb-6"
                    style={{ color: "#D7FF00" }}
                  >
                    ✓
                  </div>
                  <h2
                    className="text-3xl font-bold mb-4 tracking-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#F4F1EA",
                    }}
                  >
                    MESSAGE SENT!
                  </h2>
                  <p
                    className="text-base max-w-md mx-auto"
                    style={{ color: "#858585" }}
                  >
                    Thank you for reaching out. We&apos;ll review your
                    message and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMsg && (
                    <div
                      className="p-4 border flex items-center gap-3 text-xs"
                      style={{
                        borderColor: "rgba(255, 79, 154, 0.4)",
                        background: "rgba(255, 79, 154, 0.08)",
                        color: "#FF4F9A",
                      }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-3"
                        style={labelStyles}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-[#D7FF00]"
                        style={inputStyles}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-3"
                        style={labelStyles}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-[#D7FF00]"
                        style={inputStyles}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block mb-3"
                        style={labelStyles}
                      >
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="w-full px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-[#D7FF00]"
                        style={inputStyles}
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label
                        htmlFor="service"
                        className="block mb-3"
                        style={labelStyles}
                      >
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-[#D7FF00] appearance-none cursor-pointer"
                        style={inputStyles}
                      >
                        <option value="" style={{ background: "#090909" }}>
                          Select a service
                        </option>
                        <option
                          value="website"
                          style={{ background: "#090909" }}
                        >
                          Website &amp; Web Experience
                        </option>
                        <option
                          value="ecommerce"
                          style={{ background: "#090909" }}
                        >
                          E-Commerce Development
                        </option>
                        <option
                          value="landing"
                          style={{ background: "#090909" }}
                        >
                          Landing Page
                        </option>
                        <option
                          value="uiux"
                          style={{ background: "#090909" }}
                        >
                          UI/UX Design &amp; Redesign
                        </option>
                        <option
                          value="maintenance"
                          style={{ background: "#090909" }}
                        >
                          Maintenance &amp; Optimization
                        </option>
                        <option
                          value="other"
                          style={{ background: "#090909" }}
                        >
                          Other
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="block mb-3"
                      style={labelStyles}
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-[#D7FF00] appearance-none cursor-pointer"
                      style={inputStyles}
                    >
                      <option value="" style={{ background: "#090909" }}>
                        Select your budget
                      </option>
                      <option
                        value="5k-10k"
                        style={{ background: "#090909" }}
                      >
                        ₹5,000 – ₹10,000
                      </option>
                      <option
                        value="10k-25k"
                        style={{ background: "#090909" }}
                      >
                        ₹10,000 – ₹25,000
                      </option>
                      <option
                        value="25k-50k"
                        style={{ background: "#090909" }}
                      >
                        ₹25,000 – ₹50,000
                      </option>
                      <option
                        value="50k+"
                        style={{ background: "#090909" }}
                      >
                        ₹50,000+
                      </option>
                      <option
                        value="flexible"
                        style={{ background: "#090909" }}
                      >
                        Flexible / Not Sure
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-3"
                      style={labelStyles}
                    >
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Describe your project, goals, and any details that would help us understand your needs..."
                      rows={6}
                      className="w-full px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-[#D7FF00] resize-none"
                      style={inputStyles}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:gap-4 disabled:opacity-50"
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      background: "#D7FF00",
                      color: "#090909",
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="contact-info opacity-0 lg:col-span-4 space-y-10">
              <div>
                <div
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#858585",
                  }}
                >
                  Get In Touch
                </div>
                <h3
                  className="text-2xl font-bold mb-6 tracking-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#F4F1EA",
                  }}
                >
                  CONTACT INFO
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: "#D7FF00" }}
                  />
                  <div>
                    <div
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#858585",
                      }}
                    >
                      Email
                    </div>
                    <a
                      href="mailto:hello@buildxunique.com"
                      className="text-sm hover:text-[#D7FF00] transition-colors"
                      style={{ color: "#F4F1EA" }}
                    >
                      hello@buildxunique.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: "#D7FF00" }}
                  />
                  <div>
                    <div
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#858585",
                      }}
                    >
                      Location
                    </div>
                    <p className="text-sm" style={{ color: "#F4F1EA" }}>
                      India — Working Globally
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: "#D7FF00" }}
                  />
                  <div>
                    <div
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        color: "#858585",
                      }}
                    >
                      Response Time
                    </div>
                    <p className="text-sm" style={{ color: "#F4F1EA" }}>
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="border-t pt-8"
                style={{ borderColor: "rgba(244,241,234,0.08)" }}
              >
                <div
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "#858585",
                  }}
                >
                  What Happens Next?
                </div>
                <div className="space-y-4">
                  {[
                    {
                      step: "01",
                      text: "We review your message and project details.",
                    },
                    {
                      step: "02",
                      text: "We schedule a discovery call to understand your needs.",
                    },
                    {
                      step: "03",
                      text: "We send you a tailored proposal with a clear plan.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span
                        className="text-xs font-bold mt-0.5"
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "#D7FF00",
                        }}
                      >
                        {item.step}
                      </span>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#858585" }}
                      >
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
