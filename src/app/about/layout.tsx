import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Buildxunique is an independent digital design and development studio helping ambitious businesses build stronger online presence.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

