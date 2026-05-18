import type { Metadata } from "next";
import { DM_Sans, Prata } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";
import SchemaOrg, { organizationSchema } from "@/components/SchemaOrg";
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
  title: {
    default: "Boaz — Premium Wholesale T-Shirts & Custom Manufacturing from China",
    template: "%s | Boaz",
  },
  description:
    "Premium wholesale apparel from China. Factory-direct pricing on custom t-shirts, hoodies, and private label manufacturing. Based in Hangzhou with production in Zhejiang & Hebei. MOQ 50+ pieces.",
  keywords: [
    "wholesale t-shirts",
    "custom apparel manufacturer",
    "clothing factory China",
    "private label clothing",
    "blank t-shirts wholesale",
    "custom hoodies",
    "garment manufacturer China",
    "t-shirt printing wholesale",
    "apparel supplier",
    "clothing manufacturing",
  ],
  metadataBase: new URL("https://boazclothes.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BOAZ Apparel — Premium Wholesale & Custom Manufacturing",
    description:
      "Factory-direct pricing on premium blank apparel, custom manufacturing, and private label clothing. MOQ from 50 pieces.",
    url: "https://boazclothes.com",
    siteName: "BOAZ Apparel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BOAZ Apparel — Premium Wholesale Apparel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOAZ Apparel — Premium Wholesale & Custom Manufacturing",
    description:
      "Factory-direct pricing on premium blank apparel, custom manufacturing, and private label clothing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgData = organizationSchema();

  return (
    <html lang="en" className={`${dmSans.variable} ${prata.variable}`}>
      <head>
        {/* Organization Schema (homepage) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-dark font-sans antialiased">
        {/* Custom Cursor (desktop only) */}
        <CustomCursor />

        {/* Lenis Smooth Scroll */}
        <SmoothScroll />

        {/* Google Analytics */}
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />

        {/* Navigation */}
        <Nav />

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
