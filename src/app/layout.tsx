import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full antialiased" style={{ background: "#090909", color: "#F4F1EA" }}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
