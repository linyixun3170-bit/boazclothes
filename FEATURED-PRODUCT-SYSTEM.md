# 🎯 BOAZ 主打产品替换系统

> **目的**: 保留一个可随时替换的主打产品展示位，新增产品独立页面，不影响整体店铺。

---

## 方案设计

### 1. 主打产品区块（Featured Product）

位置：首页显著位置（Hero下方或Stats下方）

特点：
- 独立配置，与产品列表分离
- 可随时替换主打产品，不影响其他产品页
- 大图 + 详细参数 + 定制选项预览

### 2. 产品列表页（Wholesale）

- 固定展示6-8个核心产品（不频繁变动）
- 新增产品走独立页面，不加入列表

### 3. 新增产品页面

新增产品时：
1. 创建 `app/products/[slug]/page.tsx`（独立页面）
2. 可选：更新首页 Featured 区块指向新产品
3. **不修改** wholesale 列表页
4. **不修改** 其他页面结构

---

## 代码架构

### lib/featured-product.ts（主打产品配置）

```typescript
// 这个文件只控制首页主打产品展示
// 换主打产品时，只改这一个文件

export const featuredProduct = {
  id: "heavyweight-tee",
  name: "Classic Heavyweight Tee",
  tagline: "240gsm of pure cotton comfort",
  description: "Our best-selling blank. Combed cotton, pre-shrunk, side-seamed construction.",
  price: "From ¥6.00",
  moq: 50,
  specs: {
    weight: "240gsm",
    fabric: "100% Combed Cotton",
    fit: "Regular / Oversized",
    colors: "12 stock colors",
    sizes: "XS - 3XL",
  },
  images: {
    hero: "/images/products/featured-hero.jpg",
    detail1: "/images/products/featured-detail1.jpg",
    detail2: "/images/products/featured-detail2.jpg",
  },
  tags: ["Best Seller", "DTG Ready", "Screen Print Friendly"],
  cta: {
    primary: "Request Quote",
    secondary: "View Spec Sheet",
  },
};
```

### app/page.tsx（首页引用）

```tsx
import { featuredProduct } from "@/lib/featured-product";
import FeaturedProduct from "@/components/FeaturedProduct";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <FeaturedProduct product={featuredProduct} /> {/* ← 主打产品 */}
      <ProductsGrid /> {/* ← 固定6个核心产品 */}
      <About />
      <FactoryTour />
      <Testimonials />
      <CTASection />
    </main>
  );
}
```

### 新增产品页面（独立，不干扰现有结构）

```tsx
// app/products/[slug]/page.tsx
// 新增产品时创建此页面，不影响任何现有页面

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  return (
    <main>
      <ProductHero product={product} />
      <ProductSpecs product={product} />
      <ProductGallery product={product} />
      <RelatedProducts />
      <CTASection />
    </main>
  );
}
```

---

## 替换主打产品的操作（未来你或 Linda 执行）

### 场景：主打产品从 "Heavyweight Tee" 换成 "Vintage Washed Hoodie"

**步骤**：
1. 替换主打产品图片（保留文件名或更新路径）
2. 修改 `lib/featured-product.ts`：
   ```typescript
   export const featuredProduct = {
     id: "vintage-hoodie",        // ← 改
     name: "Vintage Washed Hoodie", // ← 改
     tagline: "400gsm French Terry, garment-dyed", // ← 改
     // ...其他字段
   };
   ```
3. 重新部署

**影响范围**：仅首页主打区块，其他页面完全不受影响。

---

## 文件清单（待创建）

| 文件 | 用途 | 状态 |
|---|---|---|
| `lib/featured-product.ts` | 主打产品配置中心 | ⏳ 待创建 |
| `components/FeaturedProduct.tsx` | 主打产品展示组件 | ⏳ 待创建 |
| `app/products/[slug]/page.tsx` | 独立产品页模板 | ⏳ 待创建 |
| `lib/products.ts` | 所有产品数据中心 | ⏳ 待创建 |

---

## 图片处理方案（等你发图）

### 你发图后我会：

1. **筛选**：选出最适合店铺风格（极简/中性/高品质感）的图片
2. **分类**：
   - 主打产品图（1-2张，用于 Featured 区块）
   - 产品白底图/模特图（用于 Wholesale 列表）
   - 细节图（用于产品详情页）
3. **优化**：
   - 统一比例（建议 3:4 竖图或 1:1 方图）
   - 统一色调（偏暖中性，匹配 cream/charcoal 配色）
   - 压缩到 Web 适用尺寸
4. **存放**：
   ```
   public/images/products/
   ├── featured/           ← 主打产品图
   ├── wholesale/          ← 列表页用图
   └── details/          ← 详情页用图
   ```

---

## 后续新增产品流程

```
你有新产品 → 发图+信息给我
           → 我创建独立产品页（app/products/new-slug/page.tsx）
           → 可选：更新主打产品（改 lib/featured-product.ts）
           → 重新部署
           → 现有页面结构完全不变
```

---

*主打产品替换系统预案完成，等待产品图片。*

**版本**: v1.0  
**创建**: 2026-05-18  
