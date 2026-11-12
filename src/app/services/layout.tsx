import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "From websites to e-commerce, landing pages to UI/UX design — explore the full range of digital services offered by Buildxunique.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

