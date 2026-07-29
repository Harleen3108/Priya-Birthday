import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Shanaya D.",
  description: "Digital Marketing & Content Creator Portfolio",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
