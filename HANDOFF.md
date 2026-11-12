# BUILDXUNIQUE — HANDOFF DOCUMENTATION
**Date:** November 12, 2026

## 1. Project Overview
Buildxunique is an independent digital design and frontend engineering studio web product built with Next.js 16 (App Router), React 19, TypeScript, GSAP, and Tailwind CSS.

## 2. Design Tokens
- **Canvas:** `#F5F5F2` (Warm White) with tactile film grain overlay
- **Cards/Surfaces:** `#FFFFFF` (Pure White) with `#DDDDDA` hairline borders
- **Primary Text:** `#111111` (Near Black)
- **Primary Accent:** `#FF7139` (Signal Orange)
- **Secondary Accent:** `#F4CE36` (Warm Yellow)
- **Muted Text:** `#777777` (Muted Grey)
- **Display Font:** Anton
- **Body & UI Font:** Space Grotesk

## 3. Key Components & Architecture
- `src/components/ui/CustomCursor.tsx`: Smooth desktop custom cursor reacting to `data-cursor` attributes.
- `src/components/ui/MagneticButton.tsx`: GSAP physics magnetic button wrapper.
- `src/components/ui/NoiseOverlay.tsx`: Inline SVG noise filter texture.
- `src/components/sections/HeroSection.tsx`: Live IST clock, rotating Anton service text, kinetic metric pills.
- `src/components/sections/HumanVisualSection.tsx`: Kinetic 3D spatial monolith with mouse-tracking tilt and scroll-scrub text reveal.
- `src/components/sections/PortfolioSection.tsx`: Grid & List view modes, device previews, category filters.
- `src/components/sections/ServicesOverviewSection.tsx`: Interactive expandable editorial accordion.
- `src/components/sections/WhySection.tsx`: Side-by-side comparison matrix.
- `src/components/sections/ProcessSection.tsx`: 4-step milestone pipeline.
- `src/components/sections/AboutSection.tsx`: Studio manifesto and tech capabilities.
- `src/components/sections/FaqSection.tsx`: Category-filtered accessible accordion.
- `src/components/sections/ContactSection.tsx`: Interactive budget & service chips, validation, honeypot protection.
- `src/components/layout/Footer.tsx`: Massive Anton sign-off, live world clock, magnetic top trigger.
- `src/app/pricing/page.tsx`: 3 tiered packages with 50% deposit toggle.
- `src/app/checkout/page.tsx`: Razorpay payment integration with automatic demo mode fallback.

## 4. Verification Commands
- `npm run lint` — 0 errors, 0 warnings.
- `npm run build` — 100% successful production build (18 routes).
- Dev server running on `http://localhost:3000`.
