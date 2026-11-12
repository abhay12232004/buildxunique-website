"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* Adjust state during render when pathname changes */
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  /* Mobile menu animation */
  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;
      if (isMenuOpen) {
        gsap.set(mobileMenuRef.current, { display: "flex" });
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
        gsap.fromTo(
          ".mobile-nav-link",
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.07,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            if (mobileMenuRef.current)
              mobileMenuRef.current.style.display = "none";
          },
        });
      }
    },
    { dependencies: [isMenuOpen], scope: navRef }
  );

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-[#090909]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 h-[72px] flex items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-[#F4F1EA] font-bold tracking-tight hover:text-[#D7FF00] transition-colors duration-300"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem" }}
        >
          BUILDXUNIQUE
          <span className="text-[#D7FF00] text-xs align-super ml-0.5">®</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs tracking-widest uppercase transition-colors duration-300",
                pathname === link.href
                  ? "text-[#D7FF00]"
                  : "text-[#858585] hover:text-[#F4F1EA]"
              )}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-5 py-2.5 border border-[#D7FF00] text-[#D7FF00] text-xs tracking-widest uppercase hover:bg-[#D7FF00] hover:text-[#090909] transition-all duration-300"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Start a Project
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="md:hidden text-[#F4F1EA] hover:text-[#D7FF00] transition-colors p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7FF00]"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        ref={mobileMenuRef}
        aria-label="Mobile Navigation"
        style={{ display: "none" }}
        className="md:hidden flex-col bg-[#090909]/98 backdrop-blur-md border-b border-white/5 px-6 pb-8 pt-4"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "mobile-nav-link block py-4 text-sm border-b border-white/5 tracking-widest uppercase transition-colors",
              pathname === link.href
                ? "text-[#D7FF00]"
                : "text-[#858585] hover:text-[#F4F1EA]"
            )}
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mobile-nav-link mt-6 flex items-center gap-2 px-5 py-3 border border-[#D7FF00] text-[#D7FF00] text-xs tracking-widest uppercase hover:bg-[#D7FF00] hover:text-[#090909] transition-all w-fit"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Start a Project
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
}
