import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Websites", href: "/services#websites" },
  { label: "E-commerce", href: "/services#ecommerce" },
  { label: "Landing Pages", href: "/services#landing" },
  { label: "UI/UX Design", href: "/services#uiux" },
  { label: "Maintenance", href: "/services#maintenance" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{
        background: "#090909",
        borderColor: "rgba(244,241,234,0.08)",
      }}
    >
      {/* CTA Band */}
      <div
        className="border-b px-6 md:px-10 lg:px-16 py-16 md:py-24"
        style={{ borderColor: "rgba(244,241,234,0.08)" }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
            >
              Have a project in mind?
            </p>
            <h2
              className="text-4xl md:text-6xl font-bold leading-none tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
            >
              LET&apos;S BUILD IT
            </h2>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-3 px-8 py-5 text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              background: "#D7FF00",
              color: "#090909",
              fontWeight: 600,
            }}
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div
              className="text-xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F4F1EA" }}
            >
              BUILDXUNIQUE
              <span style={{ color: "#D7FF00", fontSize: "0.6em" }}>®</span>
            </div>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: "#858585" }}
            >
              WE BUILD DIGITAL EXPERIENCES THAT MOVE BUSINESSES FORWARD.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
            >
              Pages
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-[#D7FF00]"
                    style={{ color: "#858585" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
            >
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-300 hover:text-[#D7FF00]"
                    style={{ color: "#858585" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(244,241,234,0.08)" }}
        >
          <p
            className="text-xs"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
          >
            © {year} BUILDXUNIQUE. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs tracking-widest uppercase hover:text-[#D7FF00] transition-colors"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#858585" }}
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
