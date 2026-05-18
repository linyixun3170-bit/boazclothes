/**
 * 🖼️ 全站图片集中管理中心
 *
 * 后续换图片只改这一个文件！
 * Phase 1: 静态 URL（当前）
 * Phase 2: Cloudinary / Vercel Blob 图床
 * Phase 3: WordPress 媒体库自动拉取（见底部模板）
 */

// ─── Hero / 品牌形象 ───────────────────────────
export const heroImages = {
  heroBg: {
    src: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=1920&q=80",
    alt: "Garment factory production line — precision manufacturing",
  },
  heroOverlay: {
    src: "https://images.unsplash.com/photo-1603184900050-73a732fc47c5?w=1920&q=80",
    alt: "Premium blank t-shirt fabric close-up",
  },
};

// ─── 产品图 ───────────────────────────
export const productImages = {
  heavyweightTee: {
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    alt: "240gsm combed cotton heavyweight t-shirt front view",
  },
  hoodie: {
    src: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    alt: "Premium heavyweight hoodie front view",
  },
  tankTop: {
    src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    alt: "Ring-spun cotton tank top",
  },
  longSleeve: {
    src: "https://images.unsplash.com/photo-1593493277262-d3b4805e1bcb?w=800&q=80",
    alt: "Premium long sleeve t-shirt front view",
  },
  polo: {
    src: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    alt: "Classic pique polo shirt",
  },
  youth: {
    src: "https://images.unsplash.com/photo-1622675363311-1e6c5e4ac54d?w=800&q=80",
    alt: "Kids apparel collection — youth t-shirts",
  },
};

// ─── 工厂实拍图 ───────────────────────────
export const factoryImages = {
  facility: {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    alt: "Modern garment manufacturing facility — Guangzhou factory floor",
  },
  quality: {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    alt: "Quality control inspection process — fabric checking",
  },
  cutting: {
    src: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=800&q=80",
    alt: "Automated fabric cutting machine in operation",
  },
  sewing: {
    src: "https://images.unsplash.com/photo-1591129841193-b87320846256?w=800&q=80",
    alt: "Professional sewing workshop — skilled workers",
  },
};

// ─── 社交认同 / Testimonials ───────────────────────────
export const testimonialAvatars: Record<string, { src: string; alt: string }> = {
  client1: {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    alt: "Mark Chen — Founder of StreetWear Co.",
  },
  client2: {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    alt: "Sarah Kim — Creative Director at Urban Threads",
  },
  client3: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    alt: "James Park — Owner of Collective Goods",
  },
};

// ─── 品牌认证徽章 ───────────────────────────
export const badgeImages = {
  oeko: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Oeko-Tex_Standard_100_logo.svg/800px-Oeko-Tex_Standard_100_logo.svg.png",
    alt: "OEKO-TEX Standard 100 certified — safe textile production",
  },
  iso: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/ISO_9001_logo.svg/800px-ISO_9001_logo.svg.png",
    alt: "ISO 9001 certified quality management",
  },
};

// ─── Footer 社媒图标 ───────────────────────────
export const socialLinks = {
  instagram: { url: "#", label: "Instagram" },
  facebook: { url: "#", label: "Facebook" },
  tiktok: { url: "#", label: "TikTok" },
  whatsapp: { url: "https://wa.me/your-number", label: "WhatsApp" },
};

// ─── 联系方式（提供单点修改） ───────────────────────────
export const contactInfo = {
  email: "info@boazclothes.com",
  phone: "+86 123 4567 8900",
  whatsapp: "https://wa.me/your-number",
  wechat: "Boaz_Apparel",
  responseTime: "24 hours on business days",
  address: "Guangzhou, China — Production Facility",
};

// ─── Phase 3: WordPress 媒体库接入模板 ───────────────────────────
// 取消注释即可从 WP REST API 自动拉取图片
/*
import { WP_URL } from './woocommerce';

export async function getImagesFromWP(productSlug: string) {
  // 通过 WP 文章/产品媒体库获取
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/media?search=${productSlug}`, {
    headers: {
      Authorization: `Basic ${Buffer.from('username:password').toString('base64')}`,
    },
  });
  if (!res.ok) return null;
  const media = await res.json();
  return media.map((item: any) => ({
    src: item.source_url,
    alt: item.alt_text || item.title.rendered,
  }));
}
*/
