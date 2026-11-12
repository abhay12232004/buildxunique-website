import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://buildxunique.com"),
  title: {
    default: "BUILDXUNIQUE — Digital Design & Development Agency",
    template: "%s | BUILDXUNIQUE",
  },
  description:
    "Buildxunique is a premium digital design and development agency. We create websites, e-commerce stores, landing pages and digital experiences for ambitious businesses.",
  keywords: [
    "web design",
    "web development",
    "digital agency",
    "Next.js",
    "UI/UX design",
    "e-commerce",
    "landing page",
    "Buildxunique",
  ],
  authors: [{ name: "Buildxunique" }],
  creator: "Buildxunique",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://buildxunique.com",
    siteName: "BUILDXUNIQUE",
    title: "BUILDXUNIQUE — Digital Design & Development Agency",
    description:
      "We don't just build websites. We build digital experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BUILDXUNIQUE — Digital Design & Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUILDXUNIQUE — Digital Design & Development Agency",
    description: "We don't just build websites. We build digital experiences.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased" style={{ background: "#090909", color: "#F4F1EA" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D7FF00] focus:text-[#090909] focus:font-semibold focus:text-xs focus:uppercase focus:tracking-wider focus:outline-none"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
