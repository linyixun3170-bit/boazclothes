import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://boazclothes.com/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://boazclothes.com/wholesale/", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://boazclothes.com/custom/", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://boazclothes.com/why-boaz/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://boazclothes.com/contact/", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
