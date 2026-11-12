import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Transparent, milestone-based investment tiers for custom website design, e-commerce storefronts, and performance engineering at Buildxunique.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
