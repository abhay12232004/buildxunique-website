export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  indicativePrice: number; // in INR
  currency: string;
  depositPercentage: number;
  timeline: string;
  popular?: boolean;
  features: string[];
  deliverables: string[];
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "launchpad",
    name: "Launchpad",
    tagline: "Essential digital presence for ambitious startups and focused campaigns.",
    indicativePrice: 25000,
    currency: "INR",
    depositPercentage: 50,
    timeline: "1–2 Weeks",
    features: [
      "High-converting single-page or 3-page site",
      "Next.js 16 & TypeScript architecture",
      "Custom responsive design (Mobile, Tablet, Desktop)",
      "Core Web Vitals performance tuning",
      "Basic GSAP entrance animations",
      "Interactive enquiry form with validation",
      "Technical SEO & OpenGraph setup",
    ],
    deliverables: [
      "Production-ready Next.js codebase",
      "DNS & Vercel deployment setup",
      "Figma design tokens & components",
      "14 days post-launch support",
    ],
  },
  {
    id: "flagship",
    name: "Studio Flagship",
    tagline: "Comprehensive bespoke digital experience for brands ready to lead.",
    indicativePrice: 55000,
    currency: "INR",
    depositPercentage: 50,
    timeline: "3–4 Weeks",
    popular: true,
    features: [
      "Up to 8 bespoke editorial pages",
      "Full GSAP ScrollTrigger motion choreography",
      "Interactive 3D / canvas / micro-interactions",
      "Headless CMS integration (Sanity or Strapi)",
      "Dynamic blog, insights, or case studies",
      "Advanced technical SEO & sitemap automation",
      "Sub-second page transitions & caching",
    ],
    deliverables: [
      "Custom responsive digital headquarters",
      "Figma design system & prototypes",
      "CMS editorial training & handover doc",
      "30 days post-launch warranty",
    ],
  },
  {
    id: "commerce",
    name: "Enterprise Commerce",
    tagline: "Scalable storefronts and custom web applications for high-volume transactions.",
    indicativePrice: 95000,
    currency: "INR",
    depositPercentage: 50,
    timeline: "4–6 Weeks",
    features: [
      "Custom headless Shopify or bespoke Next.js store",
      "Frictionless instant product filtering & cart flows",
      "Razorpay / Stripe multi-gateway payment integration",
      "Customer account portals & order webhooks",
      "Custom inventory sync & third-party API hooks",
      "Comprehensive analytics & conversion pixel setup",
      "Dedicated staging environment & load testing",
    ],
    deliverables: [
      "Full-stack scalable e-commerce platform",
      "Automated order notification pipelines",
      "Complete design tokens & API documentation",
      "60 days dedicated maintenance support",
    ],
  },
];

export function getPackageById(id: string): PricingPackage | undefined {
  return PRICING_PACKAGES.find((pkg) => pkg.id.toLowerCase() === id.toLowerCase());
}
