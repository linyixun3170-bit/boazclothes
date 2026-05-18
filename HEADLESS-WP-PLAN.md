# 🔌 BOAZ 网站 — Headless WordPress 接入预案

> **当前状态**: 预留接口，未接入  
> **建议接入时机**: 网站上线后 3-6 个月，需要运营同事自主发博客/改产品描述时  
> **核心原则**: WordPress 只存内容，前端保持 Next.js 不变

---

## 一、架构设计（不改变现有前端）

```
┌─────────────────────────────────────────────────────────┐
│                     用户浏览器                            │
│                         │                               │
│    ┌────────────────────┘                               │
│    ▼                                                    │
│  ┌─────────────────────┐                                │
│  │   Next.js 前端       │ ◀── 现有的 boaz-apparel 项目    │
│  │   (Vercel 部署)      │     所有页面/组件/动画 保持不变   │
│  └──────────┬──────────┘                                │
│             │                                           │
│             │ API 请求                                  │
│             ▼                                           │
│  ┌─────────────────────┐                                │
│  │   WordPress REST API │ ◀── 只负责提供内容数据          │
│  │   cms.yourdomain.com │                                │
│  └──────────┬──────────┘                                │
│             │                                           │
│             │ MySQL                                      │
│             ▼                                           │
│  ┌─────────────────────┐                                │
│  │   WordPress 后台     │ ◀── 运营同事操作界面            │
│  │   写文章/传图片/     │     像用传统 WP 一样简单         │
│  │   改产品描述         │                                │
│  └─────────────────────┘                                │
└─────────────────────────────────────────────────────────┘
```

### 为什么这样设计？

| 维度 | 方案对比 | 结果 |
|---|---|---|
| **性能** | Next.js 静态生成 vs WP PHP 渲染 | 快 3-5 倍 |
| **SEO** | 完整 HTML 输出 vs 插件依赖 | 更稳定 |
| **安全** | WP 只暴露 API，不暴露前台 | 攻击面极小 |
| **视觉** | 保留所有 Framer Motion/GSAP 动画 | 不打折 |
| **运营** | 同事用熟悉的 WP 后台写内容 | 零学习成本 |

---

## 二、已预留的接口位置

### 当前代码中的预留（lib/images.ts 底部）

```typescript
// lib/images.ts
// 底部已有预留注释：

// 🔄 后期接入 CMS 的迁移适配器（预留接口）
// 当接入 WordPress / Strapi / Sanity 时：
// 只需要在这里加一个 async 函数，页面组件无需改动
//
// export async function getProductImagesFromCMS() {
//   const res = await fetch('https://your-wp-site.com/wp-json/wp/v2/media');
//   const media = await res.json();
//   return media.map(m => ({ src: m.source_url, alt: m.alt_text }));
// }
```

### 预留接口清单

| 数据类型 | 当前方式 | 预留接入点 | 影响范围 |
|---|---|---|---|
| **产品图片** | `lib/images.ts` 硬编码 | `getProductImagesFromWP()` | Products.tsx, wholesale/page.tsx |
| **产品描述** | 组件内写死 | `getProductDataFromWP()` | Products.tsx, wholesale/page.tsx |
| **博客文章** | 无 | `getPostsFromWP()` | 新增 blog 页面 |
| **FAQ 内容** | FAQ.tsx 内写死 | `getFAQFromWP()` | FAQ.tsx |
| **客户评价** | Testimonials.tsx 内写死 | `getTestimonialsFromWP()` | Testimonials.tsx |
| **页面文案** | 各组件内写死 | `getPageContentFromWP()` | 视需求 |

---

## 三、接入步骤（分阶段）

### Phase 1: 准备 WordPress 环境（运维操作）

```bash
# 1. 购买/准备 WordPress 主机
# 推荐: Cloudways / Kinsta / 阿里云 ECS 自建
# 建议子域名: cms.boaz.apparel

# 2. 安装 WordPress（标准安装）

# 3. 安装必要插件
# - ACF (Advanced Custom Fields) — 自定义字段
# - ACF to REST API — 暴露字段到 API
# - WP REST API Cache — API 缓存加速
# - JWT Authentication — API 认证（可选）

# 4. 配置 CORS（允许前端域名访问）
# 在 wp-config.php 中添加：
define('WP_REST_CORS_ALLOW_ORIGIN', 'https://boaz.apparel');
```

### Phase 2: 创建内容结构（运营操作）

#### A. 产品数据（Custom Post Type）

```php
// 在 WordPress 后台或主题的 functions.php 中注册

function register_product_post_type() {
    register_post_type('product', [
        'labels' => [
            'name' => 'Products',
            'singular_name' => 'Product'
        ],
        'public' => true,
        'show_in_rest' => true,  // ← 关键：暴露到 REST API
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
    ]);
}
add_action('init', 'register_product_post_type');
```

#### B. 用 ACF 添加产品字段

在 WordPress 后台创建字段组（Field Group）：
- **Post Type**: Product
- **字段**:
  - `product_specs` (Text) — 规格参数
  - `product_price` (Text) — 起订价
  - `product_moq` (Number) — MOQ
  - `product_fabric` (Text) — 面料
  - `product_weight` (Text) — 克重

#### C. 博客文章（标准 Post）

直接使用 WordPress 默认的 Posts，无需额外配置。

### Phase 3: 前端接入代码（Linda 开发）

#### 步骤 1: 创建 WordPress API 客户端

```typescript
// lib/wordpress.ts

const WP_API_URL = 'https://cms.boaz.apparel/wp-json/wp/v2';

// 获取产品列表
export async function getProducts() {
  const res = await fetch(`${WP_API_URL}/product?_embed`);
  if (!res.ok) throw new Error('Failed to fetch products');
  
  const products = await res.json();
  
  return products.map((product: any) => ({
    id: product.id,
    name: product.title.rendered,
    description: product.content.rendered,
    specs: product.acf?.product_specs || '',
    price: product.acf?.product_price || '',
    moq: product.acf?.product_moq || 50,
    fabric: product.acf?.product_fabric || '',
    weight: product.acf?.product_weight || '',
    image: product._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    alt: product._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
  }));
}

// 获取博客文章列表
export async function getPosts() {
  const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=10`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  
  const posts = await res.json();
  
  return posts.map((post: any) => ({
    id: post.id,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    slug: post.slug,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    alt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
  }));
}

// 获取单篇文章
export async function getPostBySlug(slug: string) {
  const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch post');
  
  const posts = await res.json();
  if (posts.length === 0) return null;
  
  const post = posts[0];
  return {
    id: post.id,
    title: post.title.rendered,
    content: post.content.rendered,
    date: post.date,
    slug: post.slug,
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    alt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
  };
}

// 获取媒体库图片
export async function getMedia() {
  const res = await fetch(`${WP_API_URL}/media?per_page=100`);
  if (!res.ok) throw new Error('Failed to fetch media');
  
  const media = await res.json();
  
  return media.map((m: any) => ({
    id: m.id,
    src: m.source_url,
    alt: m.alt_text || '',
    title: m.title.rendered,
  }));
}
```

#### 步骤 2: 创建动态产品页面

```typescript
// app/wholesale/page.tsx（接入后版本）

import { getProducts } from '@/lib/wordpress';

export default async function WholesalePage() {
  const products = await getProducts();
  
  return (
    <main>
      <section className="pt-32 section-padding bg-cream">
        <h1>Product Catalog</h1>
      </section>
      
      <section className="section-padding bg-cream">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
```

#### 步骤 3: 创建博客系统

```typescript
// app/blog/page.tsx — 博客列表页

import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <main className="pt-32 section-padding bg-cream">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display-xl font-serif text-charcoal mb-16">
          Journal
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[3/2] relative mb-4 image-hover">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-body-lg font-medium text-charcoal mb-2">
                  {post.title}
                </h2>
                <p className="text-body-sm text-muted"
                   dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
```

```typescript
// app/blog/[slug]/page.tsx — 单篇文章页

import { getPostBySlug } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="pt-32 section-padding bg-cream">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-display-lg font-serif text-charcoal mb-4">
            {post.title}
          </h1>
          <time className="text-caption text-muted">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>
        
        {post.image && (
          <div className="aspect-[16/9] relative mb-12 image-hover">
            <Image
              src={post.image}
              alt={post.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
```

#### 步骤 4: 导航加博客入口

```tsx
// components/Navbar.tsx

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/wholesale", label: "Products" },
  { href: "/why-boaz", label: "Why BOAZ" },
  { href: "/blog", label: "Journal" },    // ← 加这一行
  { href: "/contact", label: "Contact" },
];
```

---

## 四、渐进式接入策略（推荐）

不需要一次性全接，按需逐步替换：

```
Phase 0: 现在
    ↓ 网站上线，所有内容硬编码在代码中
    
Phase 1: 3个月后（开始发博客）
    ↓ 只接入 Blog（Posts）
    ↓ 产品页/首页保持不动
    
Phase 2: 6个月后（产品频繁更新）
    ↓ 接入 Products（Custom Post Type）
    ↓ 首页产品区开始从 WP 拉取
    
Phase 3: 12个月后（全面运营）
    ↓ 接入 FAQ / Testimonials
    ↓ 运营同事完全自主
```

---

## 五、运营同事的操作界面

### 发博客文章

```
WordPress 后台 → Posts → Add New
    ↓
写标题 → 写内容 → 设置特色图片 → Publish
    ↓
前端 /blog 自动显示（Next.js ISR 缓存自动刷新）
```

### 添加产品

```
WordPress 后台 → Products → Add New
    ↓
写产品名 → 填 ACF 字段（规格/价格/MOQ）→ 上传产品图 → Publish
    ↓
前端 /wholesale 自动显示
```

### 传图片

```
WordPress 后台 → Media → Add New
    ↓
拖拽上传 → 自动压缩 → 获得 CDN URL
    ↓
前端通过 API 引用（图片已优化）
```

---

## 六、性能优化（接入后必做）

### 1. API 缓存（关键！）

```typescript
// lib/wordpress.ts

// 使用 Next.js fetch 的缓存选项
export async function getProducts() {
  const res = await fetch(`${WP_API_URL}/product?_embed`, {
    next: { 
      revalidate: 3600,  // ← 1小时缓存，ISR
      tags: ['products']
    }
  });
  // ...
}
```

### 2. 图片优化

```typescript
// Next.js Image 组件会自动优化
<Image
  src={product.image}      // WordPress 原图 URL
  alt={product.alt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 25vw"
  // Next.js 会自动转 WebP + 响应式尺寸
/>
```

### 3. 静态生成 + 增量更新

```typescript
// app/blog/page.tsx

// 构建时生成静态页面
export const revalidate = 3600;  // 1小时后重新验证

// 或者手动刷新
// 在 WP 中安装插件，发布文章时触发 Next.js webhook
```

---

## 七、备份方案（如果 WP 挂了）

```typescript
// lib/wordpress.ts

export async function getProducts() {
  try {
    const res = await fetch(`${WP_API_URL}/product?_embed`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) throw new Error('WP API failed');
    
    return await res.json();
  } catch (error) {
    // WP 挂了？返回本地备用数据
    console.warn('WP API failed, using fallback data');
    return fallbackProducts;  // ← lib/images.ts 中的硬编码数据
  }
}
```

---

## 八、费用预估

| 项目 | 方案 | 月费 |
|---|---|---|
| **前端托管** | Vercel Hobby | $0（到 10万请求/月） |
| **WordPress 主机** | Cloudways DO 1GB | $14/月 |
| **域名** | 已有 | 续费费用 |
| **CDN** | Vercel Edge / Cloudflare | $0 |
| **总计** | | **$14/月（约 ¥100）** |

---

## 九、验收标准（接入后检查）

- [ ] WordPress 后台能正常发博客
- [ ] 前端 /blog 能看到新文章
- [ ] 产品数据从 WP 拉取，显示正常
- [ ] 图片加载速度 < 1秒
- [ ] Lighthouse Performance > 85（接 WP 后难免降一点）
- [ ] 构建时间没有明显增加（缓存生效）

---

## 十、预留接口汇总

### 当前已写好的代码位置

| 文件 | 预留内容 |
|---|---|
| `lib/images.ts` | 底部注释块：CMS 迁移适配器模板 |
| `app/page.tsx` | FAQ 组件已引入，可扩展 |
| `app/wholesale/page.tsx` | 产品数组结构兼容 API 数据 |
| `tailwind.config.ts` | 颜色/字体系统不变 |

### 需要新建的文件（接入时）

| 文件 | 作用 |
|---|---|
| `lib/wordpress.ts` | WP API 客户端 |
| `app/blog/page.tsx` | 博客列表 |
| `app/blog/[slug]/page.tsx` | 单篇文章 |
| `app/api/revalidate/route.ts` | 手动刷新缓存（可选） |

---

**结论**: 接入 WordPress 时，前端代码改动量 < 20%，所有动画/交互/SEO 优势完全保留。

_Linda 可以在任何时候执行这个预案，无需重写项目。_

---

**版本**: v1.0  
**预留日期**: 2026-05-18  
**预计执行**: 网站上线后 3-6 个月  

_Built for the future. — Kiki_
