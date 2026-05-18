/**
 * 🏗️ Schema.org JSON-LD 结构化数据
 * 用于 SEO / GEO — 让 Google、ChatGPT、Perplexity 看懂你的内容
 */
export default function SchemaOrg({
  type = "Organization",
  data = {},
}: {
  type?: string;
  data?: Record<string, unknown>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 常用 Schema 工厂函数 ───────────────────────────

/** 企业信息（首页用） */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BOAZ Apparel",
    url: "https://boazclothes.com",
    logo: "https://boazclothes.com/logo.png",
    description:
      "Premium wholesale apparel and custom manufacturing from Guangzhou, China. Quality tees, hoodies, and custom printing.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-123-4567-8900",
      contactType: "sales",
      email: "info@boazclothes.com",
      availableLanguage: ["English", "Chinese"],
    },
    sameAs: [
      "https://instagram.com/boazclothes",
      "https://facebook.com/boazclothes",
      "https://tiktok.com/@boazclothes",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressCountry: "CN",
    },
  };
}

/** FAQ Schema（GEO 重点 — ChatGPT / Perplexity 最爱索引） */
export function faqSchema(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    })),
  };
}

/** 产品 Schema */
export function productSchema(product: {
  name: string;
  description: string;
  sku?: string;
  image?: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.sku && { sku: product.sku }),
    ...(product.image && { image: product.image }),
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.priceCurrency || "USD",
        availability: product.availability || "https://schema.org/InStock",
      },
    }),
  };
}

/** 站点导航 Schema（BreadcrumbList） */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
