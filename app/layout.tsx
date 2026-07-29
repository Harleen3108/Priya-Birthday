import type { Metadata } from "next";
import { Baloo_2, Caveat, Poppins } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Birthday! 🎂",
  description: "A special birthday surprise — tap to open your gift!",
  openGraph: {
    title: "Happy Birthday! 🎂",
    description: "A special birthday surprise — tap to open your gift!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${caveat.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full font-body">{children}</body>
    </html>
  );
}
