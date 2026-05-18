/**
 * 📦 产品目录管理中心
 * 
 * 后续增加/修改产品，只改这一个文件！
 * 新增产品步骤：
 *   1. 把图片放到 public/images/products/<产品名>/
 *   2. 在这个文件里添加一条产品数据
 *   3. 页面自动更新 ✅
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: "T-Shirts" | "Hoodies" | "Long Sleeves" | "Kids" | "Tank Tops";
  weight: string;
  fabric: string;
  fit: string;
  moq: number;
  priceFOB: string; // USD FOB Guangzhou
  colors: { name: string; hex: string; image?: string }[];
  images: { main: string; gallery: string[] };
  tags: string[];
  sizes: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

const imgBase = "/images/products";

export const products: Product[] = [
  {
    id: "280g-heavy-tee",
    name: "280gsm Heavyweight T-Shirt",
    slug: "280g-heavyweight-t-shirt",
    tagline: "Premium weight, 23 colors — the ultimate blank canvas",
    category: "T-Shirts",
    weight: "280gsm",
    fabric: "100% Combed Cotton",
    fit: "Regular / Relaxed",
    moq: 50,
    priceFOB: "From $4.50/unit (FOB)",
    colors: [
      { name: "White", hex: "#ffffff", image: `${imgBase}/280g-heavy-tee/sku-12-椰果白.jpg` },
      { name: "Black", hex: "#111111", image: `${imgBase}/280g-heavy-tee/sku-11-复古黑.jpg` },
      { name: "Navy", hex: "#1a2744", image: `${imgBase}/280g-heavy-tee/sku-5-宝蓝色.jpg` },
      { name: "Dark Gray", hex: "#555555", image: `${imgBase}/280g-heavy-tee/sku-6-深灰色.jpg` },
      { name: "Charcoal", hex: "#36454f", image: `${imgBase}/280g-heavy-tee/sku-7-灰黑色.jpg` },
      { name: "Khaki", hex: "#c3b091", image: `${imgBase}/280g-heavy-tee/sku-1-浅咖色.jpg` },
      { name: "Cream", hex: "#f5f0e8", image: `${imgBase}/280g-heavy-tee/sku-13-米驼色.jpg` },
      { name: "Wine Red", hex: "#722f37", image: `${imgBase}/280g-heavy-tee/sku-10-酒红色.jpg` },
      { name: "Army Green", hex: "#4b5320", image: `${imgBase}/280g-heavy-tee/sku-21-森林绿.jpg` },
      { name: "Royal Blue", hex: "#4169e1", image: `${imgBase}/280g-heavy-tee/sku-5-宝蓝色.jpg` },
    ],
    images: {
      main: `${imgBase}/280g-heavy-tee/280g-model.jpg`,
      gallery: [
        `${imgBase}/280g-heavy-tee/280g-front.jpg`,
        `${imgBase}/280g-heavy-tee/280g-angle.jpg`,
        `${imgBase}/280g-heavy-tee/280g-model.jpg`,
        `${imgBase}/280g-heavy-tee/280g-folded.jpg`,
      ],
    },
    tags: ["Best Seller", "23 Colors", "Screen Print Ready"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "360g-crewneck",
    name: "360gsm Washed Crewneck Sweatshirt",
    slug: "360g-washed-crewneck",
    tagline: "Heavyweight washed cotton — vintage feel, built to last",
    category: "Hoodies",
    weight: "360gsm",
    fabric: "100% Heavyweight Cotton (washed)",
    fit: "Oversized / Relaxed",
    moq: 50,
    priceFOB: "From $10.00/unit (FOB)",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Gray", hex: "#808080" },
      { name: "Dark Gray", hex: "#555555" },
      { name: "Coffee", hex: "#6f4e37" },
      { name: "Army Green", hex: "#4b5320" },
    ],
    images: {
      main: `${imgBase}/360g-crewneck/360g-front.jpg`,
      gallery: [
        `${imgBase}/360g-crewneck/360g-front.jpg`,
        `${imgBase}/360g-crewneck/360g-angle.jpg`,
        `${imgBase}/360g-crewneck/360g-model.jpg`,
        `${imgBase}/360g-crewneck/360g-back.jpg`,
      ],
    },
    tags: ["Heavyweight", "Washed Finish", "Winter"],
    sizes: ["M", "L", "XL", "2XL", "3XL"],
    isNew: true,
  },
  {
    id: "180g-classic-tee",
    name: "180gsm Classic Crewneck T-Shirt",
    slug: "180g-classic-crewneck",
    tagline: "Lightweight everyday essential — 10 colors in stock",
    category: "T-Shirts",
    weight: "180gsm",
    fabric: "100% Combed Ring-Spun Cotton",
    fit: "Regular",
    moq: 50,
    priceFOB: "From $1.20/unit (FOB)",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
      { name: "Navy", hex: "#1a2744" },
      { name: "Dark Gray", hex: "#555555" },
      { name: "Royal Blue", hex: "#4169e1" },
      { name: "Red", hex: "#cc0000" },
      { name: "Army Green", hex: "#4b5320" },
    ],
    images: {
      main: `${imgBase}/180g-tee/180g-tee-front.jpg`,
      gallery: [
        `${imgBase}/180g-tee/180g-tee-front.jpg`,
        `${imgBase}/180g-tee/180g-tee-angle.jpg`,
        `${imgBase}/180g-tee/180g-tee-folded.jpg`,
        `${imgBase}/180g-tee/180g-tee-detail.jpg`,
      ],
    },
    tags: ["Best Seller", "10 Colors", "DTG Ready"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    isFeatured: true,
  },
  {
    id: "260g-american-tee",
    name: "260gsm American Streetwear T-Shirt",
    slug: "260g-american-streetwear",
    tagline: "Oversized drop shoulder — streetwear fit, premium feel",
    category: "T-Shirts",
    weight: "260gsm",
    fabric: "100% Combed Cotton",
    fit: "Oversized / Drop Shoulder",
    moq: 50,
    priceFOB: "From $3.80/unit (FOB)",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
      { name: "Carbon Gray", hex: "#808080" },
      { name: "Navy", hex: "#1a2744" },
      { name: "Brick Red", hex: "#cb4154" },
      { name: "Khaki", hex: "#c3b091" },
      { name: "Sage Green", hex: "#88b04b" },
      { name: "Cream", hex: "#f5f0e8" },
    ],
    images: {
      main: `${imgBase}/260g-heavy-tee/260g-front.jpg`,
      gallery: [
        `${imgBase}/260g-heavy-tee/260g-front.jpg`,
        `${imgBase}/260g-heavy-tee/260g-model.jpg`,
        `${imgBase}/260g-heavy-tee/260g-angle.jpg`,
      ],
    },
    tags: ["Oversized", "Drop Shoulder", "Streetwear"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    isNew: true,
  },
  {
    id: "220g-heavy-tee",
    name: "220gsm Relaxed Fit T-Shirt",
    slug: "220g-relaxed-fit",
    tagline: "Mid-weight comfort — relaxed silhouette, 18 colors",
    category: "T-Shirts",
    weight: "220gsm",
    fabric: "100% Cotton",
    fit: "Relaxed / Drop Shoulder",
    moq: 50,
    priceFOB: "From $2.80/unit (FOB)",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
      { name: "Light Gray", hex: "#d3d3d3" },
      { name: "Dark Gray", hex: "#555555" },
      { name: "Blue", hex: "#4169e1" },
    ],
    images: {
      main: `${imgBase}/220g-heavy-tee/220g-front.jpg`,
      gallery: [
        `${imgBase}/220g-heavy-tee/220g-front.jpg`,
        `${imgBase}/220g-heavy-tee/220g-model.jpg`,
        `${imgBase}/220g-heavy-tee/220g-angle.jpg`,
      ],
    },
    tags: ["Mid-Weight", "18 Colors", "Relaxed Fit"],
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "kids-210g-tee",
    name: "210gsm Kids Drop Shoulder T-Shirt",
    slug: "210g-kids-tee",
    tagline: "Made for little ones — soft cotton, fun colors",
    category: "Kids",
    weight: "210gsm",
    fabric: "100% Cotton",
    fit: "Regular / Drop Shoulder",
    moq: 50,
    priceFOB: "From $1.00/unit (FOB)",
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#111111" },
      { name: "Pink", hex: "#ffc0cb" },
      { name: "Blue", hex: "#4169e1" },
      { name: "Green", hex: "#228b22" },
    ],
    images: {
      main: `${imgBase}/210g-kids-tee/kids-front.jpg`,
      gallery: [
        `${imgBase}/210g-kids-tee/kids-front.jpg`,
        `${imgBase}/210g-kids-tee/kids-model.jpg`,
        `${imgBase}/210g-kids-tee/kids-angle.jpg`,
      ],
    },
    tags: ["Kids", "30 Colors", "Soft Cotton"],
    sizes: ["2T", "3T", "4T", "5-6Y", "7-8Y", "10-12Y"],
    isNew: true,
  },
  {
    id: "230g-washed-tee",
    name: "230gsm Washed Vintage T-Shirt",
    slug: "230g-washed-vintage",
    tagline: "Pre-washed vintage look — soft from the first wear",
    category: "T-Shirts",
    weight: "230gsm",
    fabric: "100% Cotton (washed)",
    fit: "Cropped / Relaxed",
    moq: 50,
    priceFOB: "From $3.50/unit (FOB)",
    colors: [
      { name: "Light Gray", hex: "#d3d3d3" },
      { name: "Brown", hex: "#8b4513" },
      { name: "Pink", hex: "#ffc0cb" },
      { name: "Green", hex: "#228b22" },
    ],
    images: {
      main: `${imgBase}/230g-washed-tee/washed-tee-model.jpg`,
      gallery: [
        `${imgBase}/230g-washed-tee/washed-tee-model.jpg`,
        `${imgBase}/230g-washed-tee/washed-tee-angle.jpg`,
        `${imgBase}/230g-washed-tee/washed-tee-front.jpg`,
      ],
    },
    tags: ["Washed", "Vintage", "Cropped"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "colorblock-longsleeve",
    name: "Color-Block Raglan Long Sleeve",
    slug: "colorblock-raglan-longsleeve",
    tagline: "Bold contrast sleeves — streetwear staple",
    category: "Long Sleeves",
    weight: "220gsm",
    fabric: "100% Cotton",
    fit: "Regular / Relaxed",
    moq: 50,
    priceFOB: "From $5.00/unit (FOB)",
    colors: [
      { name: "Black/White", hex: "#111111" },
      { name: "Black/Gray", hex: "#333333" },
      { name: "Brown/Khaki", hex: "#8b4513" },
    ],
    images: {
      main: `${imgBase}/colorblock-longsleeve/cb-front.jpg`,
      gallery: [
        `${imgBase}/colorblock-longsleeve/cb-front.jpg`,
        `${imgBase}/colorblock-longsleeve/cb-model.jpg`,
        `${imgBase}/colorblock-longsleeve/cb-angle.jpg`,
      ],
    },
    tags: ["Color-Block", "Raglan", "Streetwear"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    isNew: true,
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter(p => p.category === category);
}

// 对主页：返回一个主打产品 + 其他精选
export function getHeroProduct(): Product {
  return products.find(p => p.isBestSeller) || products[0];
}
