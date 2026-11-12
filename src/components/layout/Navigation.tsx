"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  /* Scroll position tracking */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change (React 19 render-phase pattern) */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  /* Close on Escape key */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#F5F5F2]/90 backdrop-blur-md border-b border-[#DDDDDA]/80 py-3 shadow-[0_4px_20px_rgba(17,17,17,0.04)]"
          : "bg-[#F5F5F2]/80 backdrop-blur-xs border-b border-[#DDDDDA]/40 py-4 md:py-5"
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between"
      >
        {/* Brand Wordmark & Availability Pill */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            data-cursor="HOME"
            className="group flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-4 rounded-xs"
            aria-label="Buildxunique — Back to homepage"
          >
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] transition-colors duration-200 group-hover:text-[#FF7139]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BUILDXUNIQUE
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FF7139] transition-transform duration-200 group-hover:scale-125"
              aria-hidden="true"
            />
          </Link>

          {/* Live Studio Availability Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#DDDDDA] bg-white/60 text-[10px] tracking-wider uppercase font-medium text-[#777777]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Available Q1/Q2</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full border border-[#DDDDDA]/70 bg-white/50 backdrop-blur-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="GO"
                className={cn(
                  "relative px-4 py-1.5 text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-200 rounded-full focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-2",
                  isActive
                    ? "text-[#111111] bg-[#F5F5F2] shadow-xs"
                    : "text-[#777777] hover:text-[#111111] hover:bg-[#F5F5F2]/60"
                )}
                style={{ fontFamily: "var(--font-body)" }}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF7139]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Button with Magnetic Pull */}
        <div className="hidden md:flex items-center">
          <MagneticButton strength={0.3}>
            <Link
              href="/contact"
              data-cursor="TALK"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FF7139] hover:shadow-[0_4px_16px_rgba(255,113,57,0.3)] focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Start a Project</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-[#111111] hover:text-[#FF7139] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-2 rounded-xs"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={cn(
          "md:hidden fixed inset-x-0 top-[65px] bg-[#F5F5F2] border-b border-[#DDDDDA] transition-all duration-300 ease-in-out px-6 py-8 shadow-lg overflow-hidden",
          isMenuOpen
            ? "max-h-[500px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible py-0"
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "text-lg tracking-wider uppercase font-semibold flex items-center justify-between py-2 border-b border-[#DDDDDA]/50 transition-colors",
                  isActive
                    ? "text-[#FF7139] border-[#FF7139]/40"
                    : "text-[#111111] hover:text-[#FF7139]"
                )}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="text-xs font-mono text-[#FF7139]">CURRENT</span>
                )}
              </Link>
            );
          })}
          <div className="pt-4">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#111111] text-[#FFFFFF] text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-[#FF7139]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
