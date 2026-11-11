import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A selection of digital experiences designed to make an impact. Explore our portfolio of concept projects and client work.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
