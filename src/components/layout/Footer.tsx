"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowUp, Activity } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Selected Work", href: "/work" },
  { label: "Pricing & Checkout", href: "/pricing" },
  { label: "Studio About", href: "/about" },
  { label: "Start a Project", href: "/contact" },
];

const externalLinks = [
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "X / Twitter", href: "https://twitter.com", external: true },
  { label: "LinkedIn", href: "https://linkedin.com", external: true },
  { label: "Dribbble", href: "https://dribbble.com", external: true },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Site Footer"
      className="relative bg-[#111111] text-[#FFFFFF] pt-20 sm:pt-28 md:pt-36 pb-12 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden border-t border-[#1A1A1A]"
    >
      {/* Background Architectural Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[#1A1A1A]/40 text-[clamp(8rem,22vw,22rem)] font-normal uppercase tracking-tighter whitespace-nowrap z-0"
        style={{ fontFamily: "var(--font-display)" }}
        aria-hidden="true"
      >
        BUILDXUNIQUE
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* TOP CALLOUT & BIG STATEMENT */}
        <div className="pb-16 sm:pb-24 border-b border-[#262626]">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono tracking-[0.2em] text-[#FF7139] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FF7139]" />
            <span>COMMISSION THE STUDIO</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <h2
              className="text-[clamp(2.8rem,8.5vw,7.5rem)] font-normal uppercase leading-[0.92] tracking-tight text-white max-w-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              LET&apos;S BUILD SOMETHING{" "}
              <span className="text-[#FF7139]">THAT MATTERS.</span>
            </h2>

            <div className="shrink-0">
              <MagneticButton strength={0.35}>
                <Link
                  href="/contact"
                  data-cursor="HELLO"
                  className="group inline-flex items-center gap-3 px-8 sm:px-10 py-5 rounded-full bg-[#FF7139] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-[#111111] hover:shadow-[0_8px_32px_rgba(255,113,57,0.4)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span>Say Hello & Kickoff</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* MIDDLE GRID: NAVIGATION + STUDIO INTEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-16 border-b border-[#262626] text-xs font-mono">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <span
              className="text-2xl font-bold tracking-tight text-white block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BUILDXUNIQUE®
            </span>
            <p className="text-[#777777] text-xs leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-body)" }}>
              Independent digital design and creative frontend engineering studio. Crafting bespoke web flagships that establish commercial authority.
            </p>
            <div className="flex items-center gap-2 text-[#777777] pt-2">
              <Activity className="w-3.5 h-3.5 text-[#FF7139]" />
              <span>TIME IN STUDIO: {timeString || "DELHI, INDIA"}</span>
            </div>
          </div>

          {/* Sitemaps */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#777777] block mb-2">
              STUDIO NAVIGATION
            </span>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#CCCCCC] hover:text-[#FF7139] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / External */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#777777] block mb-2">
              CONNECT & NETWORK
            </span>
            <ul className="space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#CCCCCC] hover:text-[#FF7139] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#777777]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM METADATA BAR + BACK TO TOP */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#777777]">
          <div>
            © {currentYear} BUILDXUNIQUE STUDIO. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <span>NEXT.JS 16 // GSAP // REACT 19</span>

            {/* Back to top magnetic trigger */}
            <MagneticButton strength={0.3}>
              <button
                type="button"
                onClick={scrollToTop}
                data-cursor="TOP"
                className="inline-flex items-center gap-1.5 p-2 rounded-full border border-[#262626] text-[#CCCCCC] hover:text-[#FF7139] hover:border-[#FF7139] transition-colors"
                aria-label="Back to top of page"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider pr-1">TOP</span>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
