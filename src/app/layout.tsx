import type { Metadata } from "next";
import { DM_Sans, Prata } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const prata = Prata({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOAZ — Premium Wholesale Apparel & Custom Manufacturing",
  description:
    "Premium blank apparel for wholesale and custom printing. Quality tees, hoodies, tank tops, and long sleeves for your brand.",
  keywords: [
    "wholesale t-shirts",
    "custom apparel",
    "blank t-shirts",
    "clothing manufacturer",
    "bulk t-shirts",
    "private label clothing",
  ],
  openGraph: {
    title: "BOAZ — Premium Wholesale Apparel & Custom Manufacturing",
    description:
      "Premium blank apparel for wholesale and custom printing. Quality tees, hoodies, and more.",
    url: "https://boazclothes.com",
    siteName: "BOAZ",
    locale: "en_US",
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
      className={`${dmSans.variable} ${prata.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-dark font-sans antialiased">
        <CustomCursor />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
