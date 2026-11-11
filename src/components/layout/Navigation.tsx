"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
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
      setIsScrolled(window.scrollY > 24);
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
          ? "bg-[#F5F5F2]/90 backdrop-blur-md border-b border-[#DDDDDA]/80 py-3 shadow-[0_2px_12px_rgba(17,17,17,0.03)]"
          : "bg-[#F5F5F2]/80 backdrop-blur-xs border-b border-[#DDDDDA]/50 py-4 md:py-5"
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between"
      >
        {/* Brand Wordmark */}
        <Link
          href="/"
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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-xs tracking-[0.14em] uppercase font-semibold transition-colors duration-200 group focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-4 rounded-xs",
                  isActive
                    ? "text-[#111111]"
                    : "text-[#777777] hover:text-[#111111]"
                )}
                style={{ fontFamily: "var(--font-body)" }}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.label}</span>
                {/* Active & Hover Underline Indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-[#FF7139] transition-all duration-300 ease-out",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:bg-[#FF7139] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-[#FF7139] focus-visible:outline-offset-3"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Start a Project</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
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
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-[#DDDDDA] bg-[#F5F5F2]/98 backdrop-blur-md",
          isMenuOpen ? "max-h-[380px] opacity-100 py-6" : "max-h-0 opacity-0 py-0 border-transparent pointer-events-none"
        )}
      >
        <div className="px-6 flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "py-2 text-sm font-semibold tracking-wider uppercase border-b border-[#DDDDDA]/50 transition-colors flex items-center justify-between",
                  isActive ? "text-[#FF7139]" : "text-[#111111] hover:text-[#FF7139]"
                )}
                style={{ fontFamily: "var(--font-body)" }}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7139]" />
                )}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase hover:bg-[#FF7139] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
