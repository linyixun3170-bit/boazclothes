import type { Metadata } from "next";

export const siteUrl = "https://boazclothes.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Boaz",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Premium wholesale t-shirts, hoodies, and custom apparel manufacturing. Three generations of hands-on production in Zhejiang and Hebei, China.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CN",
      addressRegion: "Zhejiang",
      addressLocality: "Hangzhou",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      telephone: "+86-188-6879-8631",
      availableLanguage: ["English", "Chinese"],
    },
    sameAs: [],
  };
}

export default function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema()),
      }}
    />
  );
}
