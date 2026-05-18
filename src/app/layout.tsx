import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Boaz — Premium Wholesale T-Shirts & Custom Manufacturing",
    template: "%s | Boaz",
  },
  description:
    "Premium wholesale apparel from China. Factory-direct pricing on custom t-shirts, hoodies, and private label manufacturing. Based in Hangzhou with production in Zhejiang & Hebei. MOQ 50+ pieces.",
  metadataBase: new URL("https://boazclothes.com"),
  keywords: [
    "wholesale t-shirts",
    "custom apparel manufacturer",
    "clothing factory China",
    "private label clothing",
    "blank t-shirts wholesale",
    "custom hoodies",
    "garment manufacturer China",
  ],
  openGraph: {
    title: "Boaz — Premium Wholesale & Custom Manufacturing",
    description:
      "Factory-direct pricing on premium blank apparel, custom manufacturing, and private label clothing.",
    url: "https://boazclothes.com",
    siteName: "Boaz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boaz — Premium Wholesale & Custom Manufacturing",
    description:
      "Factory-direct pricing on premium blank apparel, custom manufacturing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
