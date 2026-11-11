import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your project with Buildxunique. Tell us about your website, e-commerce, or digital experience requirements and receive a structured consultation roadmap.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-16" style={{ background: "#090909" }}>
      {/* Contact Hero Banner */}
      <section className="px-6 md:px-10 lg:px-16 mb-12">
        <div
          className="max-w-[1440px] mx-auto border-b pb-16 md:pb-20"
          style={{ borderColor: "rgba(244, 241, 234, 0.08)" }}
        >
          <span
            className="text-xs tracking-widest uppercase mb-4 inline-block"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              color: "#858585",
            }}
          >
            Direct Consultation
          </span>
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#F4F1EA",
            }}
          >
            EVERY GREAT PROJECT <br />
            <span style={{ color: "#D7FF00" }}>
              STARTS WITH A CONVERSATION.
            </span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "#858585" }}
          >
            Tell us about your product, your goals, or your timeline. We will
            review your specifications and get in touch within 24 to 48 hours.
          </p>
        </div>
      </section>

      {/* Embedded Contact Form Component */}
      <ContactSection />
    </div>
  );
}
