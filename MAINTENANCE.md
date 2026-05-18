# BOAZ Apparel — 维护指南

> 最后更新：2025-05-18

---

## 📋 目录
1. [快速开始](#1-快速开始)
2. [图片管理](#2-图片管理)
3. [内容更新](#3-内容更新)
4. [联系方式维护](#4-联系方式维护)
5. [SEO / GEO 管理](#5-seo--geo-管理)
6. [部署流程](#6-部署流程)
7. [代码结构指南](#7-代码结构指南)

---

## 1. 快速开始

```bash
# 本地开发
npm run dev        # → http://localhost:3000

# 生产构建
npm run build      # → 输出到 out/ 目录

# 本地预览生产版
npx serve out
```

### 技术栈
- **框架：** Next.js 16 (App Router) — 静态导出 (output: 'export')
- **样式：** Tailwind CSS v4
- **动效：** GSAP + Framer Motion + Lenis（平滑滚动）
- **3D：** Three.js (T恤预览器)
- **字体：** DM Sans (无衬线) + Prata (衬线)
- **设计系统：** CSS 自定义属性 + 中性色调

---

## 2. 图片管理 ⭐（最常操作）

### 2.1 所有图片集中在一处

**文件：** `src/lib/images.ts`

```typescript
// 示例：换产品图只改这个文件
export const productImages = {
  heavyweightTee: {
    src: "https://your-new-image-url.jpg", // ← 改这里
    alt: "SEO 友好的图片描述",               // ← 改这里
  },
};
```

### 2.2 替换步骤

1. 打开 `src/lib/images.ts`
2. 找到对应的图片字段（`productImages`, `factoryImages`, `heroImages` 等）
3. 替换 `src`（图片 URL）和 `alt`（SEO 描述）
4. 运行 `npm run build` 验证
5. 部署 → 全站自动生效

### 2.3 图片分类

| 分类 | 字段名 | 尺寸建议 |
|------|--------|----------|
| Hero 背景 | `heroImages` | 1920×1080+ |
| 产品图 | `productImages` | 800×1000+ (白底/极简模特) |
| 工厂实拍 | `factoryImages` | 1200×900+ |
| 客户头像 | `testimonialAvatars` | 100×100 |

### 2.4 图片风格要求
- **极简白底图** — 产品正面平铺或悬空
- **极简模特图** — 干净背景，中性色调
- **工厂图** — 高分辨率，自然光线，展示专业度
- **不要：** 花哨滤镜、杂色背景、多人混乱场景

### 2.5 未来升级路径

| 阶段 | 方案 | 操作者 |
|------|------|--------|
| 当前 | 改 `lib/images.ts` 里的 URL | 你/开发 |
| 1-3月后 | Cloudinary / Vercel Blob 图床 | 你/运营 |
| 3-6月后 | WordPress 媒体库自动拉取（模板已在底部） | 运营自主 |

---

## 3. 内容更新

### 3.1 文本内容

大部分文本直接写在组件里。需要修改的位置：

| 内容 | 文件路径 | 说明 |
|------|----------|------|
| 首页文案 | `src/app/page.tsx` | Hero / 产品 / CTA |
| 关于我们 | `src/components/About.tsx` | 品牌故事 + 认证 |
| 产品卡片数据 | `src/app/page.tsx` 中 `featuredProducts` 数组 | 首页展示的6个产品 |
| FAQ 内容 | `src/components/FAQ.tsx` | 默认问答 |
| 用户评价 | `src/components/Testimonials.tsx` | 客户 quote |
| 工厂介绍 | `src/components/FactoryTour.tsx` | 图片 + 描述 |
| Wholesale 页 | `src/app/wholesale/page.tsx` | 产品目录（从 WP API 获取） |
| Custom 页 | `src/app/custom/page.tsx` | 定制流程 |
| Why BOAZ | `src/app/why-boaz/page.tsx` | 品牌故事详情 |
| Contact 页 | `src/app/contact/page.tsx` | 询盘表单 |

### 3.2 统计数据

`Stats` 组件（`/stats` 和 `/why-boaz` 都有）：
- 首页 Stats → `src/components/Stats.tsx`
- Why BOAZ 页 → 直接写在 `src/app/why-boaz/page.tsx`

### 3.3 导航栏

`src/components/Nav.tsx` — `navLinks` 数组

### 3.4 页脚

`src/components/Footer.tsx` — 引用 `lib/images.ts` 中的 `contactInfo` 和 `socialLinks`

---

## 4. 联系方式维护

**唯一需要修改的位置：** `src/lib/images.ts` 底部的 `contactInfo` 和 `socialLinks`

```typescript
export const contactInfo = {
  email: "info@boazclothes.com",        // ← 改这里
  phone: "+86 123 4567 8900",           // ← 改这里
  whatsapp: "https://wa.me/your-number", // ← 改这里
  wechat: "Boaz_Apparel",               // ← 改这里
};

export const socialLinks = {
  instagram: { url: "#", label: "Instagram" },  // ← 改这里
  facebook: { url: "#", label: "Facebook" },     // ← 改这里
  tiktok: { url: "#", label: "TikTok" },         // ← 改这里
};
```

---

## 5. SEO / GEO 管理

### 5.1 全站 Meta

`src/app/layout.tsx` 中的 `metadata` 对象：
- `title`, `description`, `keywords`
- `openGraph` (社交媒体预览)
- `twitter` (Twitter Card)

### 5.2 Schema.org 结构化数据（GEO 核心）

| 位置 | Schema 类型 | 作用 |
|------|-------------|------|
| `layout.tsx` | Organization | 全站企业信息 |
| `FAQ.tsx` | FAQPage | ChatGPT/Perplexity 常引用的 Q&A |
| Why BOAZ 页 | FAQPage | 针对 B2B 决策问题的问答 |

**FAQ 内容同时也是 GEO 优化重点** — 这些问题覆盖了 B2B 客户的核心疑虑：
- MOQ 是多少？
- 样品怎么申请？
- 能不能定制标签？
- 用什么面料？
- 能不能国际运输？

### 5.3 Sitemap

`src/app/sitemap.ts` — 修改 URL 和优先级

### 5.4 Robots.txt

`public/robots.txt` — 控制搜索引擎抓取

### 5.5 关键词策略
```
Primary:    wholesale t-shirts, custom apparel manufacturer, private label clothing
Secondary:  clothing factory China, blank t-shirts wholesale, garment manufacturer
Long-tail:  t-shirt printing wholesale Guangzhou, custom hoodie manufacturer
GEO focus:  问答形式覆盖 MOQ/样品/定制/交期 等 B2B 决策关键词
```

---

## 6. 部署流程

### 6.1 GitHub Pages 自动部署

当前使用 GitHub Actions 自动构建并部署到 GitHub Pages：

```bash
# 1. 修改代码
# 2. 提交到 main 分支
git add .
git commit -m "描述修改内容"
git push origin main
# 3. GitHub Actions 自动构建 → 部署
```

### 6.2 手动部署

```bash
npm run build
# out/ 目录就是完整的静态网站
# 可直接上传到 Hostinger / Vercel / Netlify
```

### 6.3 Vercel 部署（推荐替代方案）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署（一键完成）
vercel --prod
```

---

## 7. 代码结构指南

```
boaz-frontend/
├── src/
│   ├── app/                      # Next.js App Router 页面
│   │   ├── layout.tsx           # 根布局（字体/导航/页脚/SEO）
│   │   ├── page.tsx             # 首页（全站核心）
│   │   ├── globals.css          # 全局样式
│   │   ├── not-found.tsx        # 404 页面
│   │   ├── sitemap.ts           # 站点地图
│   │   ├── wholesale/           # 产品目录
│   │   ├── custom/              # 定制服务
│   │   ├── why-boaz/            # 品牌故事
│   │   ├── contact/             # 询盘页面
│   │   └── journal/             # 博客
│   ├── components/              # 所有组件
│   │   ├── CustomCursor.tsx     # 自定义鼠标
│   │   ├── SmoothScroll.tsx     # Lenis 平滑滚动
│   │   ├── Nav.tsx              # 导航栏
│   │   ├── Footer.tsx           # 页脚
│   │   ├── HeroSection.tsx      # 首页 Hero
│   │   ├── Stats.tsx            # 统计数据
│   │   ├── About.tsx            # 关于我们
│   │   ├── Products.tsx         # 产品展示
│   │   ├── ProductCard.tsx      # 产品卡片
│   │   ├── FactoryTour.tsx      # 工厂实拍
│   │   ├── Testimonials.tsx     # 客户评价
│   │   ├── FAQ.tsx              # FAQ + GEO Schema
│   │   ├── CTASection.tsx       # 行动召唤
│   │   ├── TrustProgress.tsx    # 合作流程可视化
│   │   ├── SchemaOrg.tsx        # 结构化数据工厂
│   │   ├── HoneypotForm.tsx     # 防垃圾表单
│   │   ├── Analytics.tsx        # GA4 追踪
│   │   └── TShirt3DViewer.tsx   # 3D T恤预览
│   └── lib/
│       ├── images.ts            # ⭐ 图片集中管理
│       ├── products.ts          # 产品数据处理
│       └── woocommerce.ts       # WooCommerce API
├── public/
│   ├── robots.txt               # 搜索引擎爬虫规则
│   └── og-image.jpg             # 社交媒体预览图
├── next.config.ts               # Next.js 配置
├── tailwind.config.*            # Tailwind 配置
└── package.json                 # 依赖管理
```

---

## ⚡ 快速参考

| 操作 | 文件 | 一句话 |
|------|------|--------|
| 换图 | `src/lib/images.ts` | 改 URL |
| 改联系方式 | `src/lib/images.ts` 底部 | 改邮箱/微信等 |
| 改文案 | 对应组件的文件 | 文本在 JSX 里 |
| 改 SEO | `src/app/layout.tsx` | metadata 对象 |
| 改 FAQ | `src/components/FAQ.tsx` | 问答数组 |
| 改导航 | `src/components/Nav.tsx` | navLinks 数组 |
| 改部署 | `.github/workflows/*.yml` | CI 配置 |
| 本地开发 | `npm run dev` | 修改保存即热更新 |

---

## 🚀 下一步建议

1. 🔄 替换图片：把 `lib/images.ts` 里的 Unsplash 链接换成你的真实产品/工厂图
2. 📞 更新联系方式：`lib/images.ts` 底部 + WhatsApp 链接
3. 📊 配置 GA4：在 Vercel/GitHub 环境变量设置 `NEXT_PUBLIC_GA_ID`
4. 📧 接入邮件通知：用 Resend (https://resend.com) 或 Formspree 让表单提交发到你邮箱
5. 🌐 部署：`git push` → GitHub Actions 自动上线，或手动 `vercel --prod`
6. 📝 创建 Blog: `/journal` 页面已有框架，发 WP 文章自动同步
7. 📱 测试移动端：确保自定义光标在手机上隐藏
