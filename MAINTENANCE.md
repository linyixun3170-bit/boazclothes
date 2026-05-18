# 🛠️ BOAZ 网站维护指南

> 本文档是你后续维护、调整、扩展这个网站的唯一入口。收藏它。

---

## 📁 核心文件速查表

| 你要做什么 | 修改哪个文件 | 难度 |
|---|---|---|
| **换图片** | `lib/images.ts` | ⭐ 极简 |
| **改文案/标题** | 对应页面的 `page.tsx` | ⭐ 简单 |
| **加产品** | `lib/images.ts` + `app/wholesale/page.tsx` | ⭐⭐ 中等 |
| **改颜色/字体** | `tailwind.config.ts` + `app/globals.css` | ⭐⭐ 中等 |
| **接 WordPress** | `lib/images.ts` 底部预留接口 | ⭐⭐⭐ 需开发 |
| **改 GA4 追踪 ID** | `components/Analytics.tsx` | ⭐ 极简 |
| **改邮箱/电话** | 全局搜索 `hello@boaz.apparel` 和 `your-number` | ⭐ 极简 |
| **加新页面** | `app/[page-name]/page.tsx` | ⭐⭐⭐ 需开发 |

---

## 🖼️ 图片替换指南（最重要！）

### 现状
所有图片集中管理在 **`lib/images.ts`**。你**不需要**逐个打开页面文件去改图片。

### 替换步骤
```typescript
// 1. 打开 lib/images.ts
// 2. 找到你要替换的图片对象
// 3. 把 src 改成你的新图片 URL

export const productImages = {
  heavyweightTee: {
    // ❌ 旧的
    src: "https://images.unsplash.com/photo-xxx?w=600&q=80",
    // ✅ 新的 — 可以是任何 URL
    src: "https://your-cdn.com/products/heavyweight-tee.jpg",
    alt: "你的图片描述（SEO 很重要）",
  }
};
```

### 图片托管方案对比

| 方案 | 成本 | 维护难度 | 推荐度 |
|---|---|---|---|
| **Vercel Blob** | $0-10/月 | 极低 | ⭐⭐⭐⭐⭐ |
| **Cloudinary** | 免费额度够用 | 低 | ⭐⭐⭐⭐ |
| **AWS S3 + CloudFront** | $5-20/月 | 中等 | ⭐⭐⭐ |
| **WordPress 媒体库** | 已付费用 | 低（后期） | ⭐⭐⭐⭐（Phase 3） |
| **直接放 public/ 文件夹** | $0 | 需重新部署 | ⭐⭐ |

### 推荐的图片规范（品牌一致性）
- **产品图**：白底或浅灰底，正面/背面/细节三张一组
- **工厂图**：自然光，少人，突出设备和整洁度
- **UGC**：真实场景，不摆拍，保持质感
- **统一比例**：产品 3:4，工厂 4:3 或 16:9，UGC 1:1

---

## 📝 内容更新指南

### 改首页标题
```typescript
// components/Hero.tsx
<h1>
  Your Production Line,
  <br />
  <span className="italic">Without the Headaches</span>
</h1>
```

### 改统计数据
```typescript
// components/Stats.tsx
const stats = [
  { number: "50", label: "MOQ", suffix: "+", desc: "Start small, scale fast" },
  // 改这里的 number / label / desc
];
```

### 改客户评价
```typescript
// components/Testimonials.tsx
const testimonials = [
  {
    quote: "你的客户评价",
    author: "客户名字",
    role: "职位",
    location: "城市",
  },
];
```

---

## 🚀 部署指南

### 方案 A：Vercel（推荐，5分钟上线）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录（第一次需要）
vercel login

# 3. 在项目根目录执行
vercel --prod

# 4. 绑定自定义域名
# 在 Vercel Dashboard → Project Settings → Domains 添加你的域名
# 然后去域名 DNS 添加 CNAME 记录指向 cname.vercel-dns.com
```

### 方案 B：自有服务器

```bash
# 1. 构建
npm run build

# 2. 启动
npm start

# 3. 用 PM2 守护进程
npm i -g pm2
pm2 start npm --name "boaz" -- start
```

### 环境变量配置

创建 `.env.local` 文件：
```env
# GA4 追踪 ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# 联系邮箱
NEXT_PUBLIC_CONTACT_EMAIL=hello@boaz.apparel

# WhatsApp 号码（带国家代码，无+号）
NEXT_PUBLIC_WHATSAPP_NUMBER=86138xxxxxxxx

# 域名（用于 Schema.org 和 Sitemap）
NEXT_PUBLIC_SITE_URL=https://boaz.apparel
```

---

## 🔍 SEO 维护清单

### 已自动配置 ✅
- [x] Sitemap（`app/sitemap.ts`）
- [x] Robots.txt（`app/robots.ts`）
- [x] Schema.org JSON-LD（`components/SchemaOrg.tsx`）
- [x] Open Graph / Twitter Card（`app/layout.tsx` metadata`）
- [x] Canonical URL
- [x] 语义化 HTML 结构
- [x] 图片 Alt 文本

### 需要你手动配置 ⚠️
- [ ] Google Search Console 验证（替换 `verification.google` in layout.tsx）
- [ ] GA4 追踪 ID（`components/Analytics.tsx`）
- [ ] 真实 OG 图片（1200x630px，上传到域名根目录 `/og-image.jpg`）
- [ ] 替换所有 `your-number` 为真实 WhatsApp
- [ ] 替换所有 `hello@boaz.apparel` 为真实邮箱

### Phase 2 内容营销（建议 1-3 个月内启动）
- [ ] 创建 `app/blog/[slug]/page.tsx` 博客系统
- [ ] 写 5-10 篇行业内容（"How to choose t-shirt weight", "Guide to blanks", "MOQ explained"）
- [ ] 这些内容会被 ChatGPT / Perplexity 引用，带来 GEO 流量

---

## 🔌 WordPress 接入路线图

### 什么时候接入？
**建议**：网站上线运营 3-6 个月后，当你需要非技术同事发博客/改产品描述时。

### 架构（不改前端代码）
```
前端 (Next.js on Vercel) ←── API ──→ CMS (WordPress on 子域名)
         ↑                                    ↑
    你的域名.com                    cms.你的域名.com
```

### 接入步骤

```typescript
// 1. 安装 WordPress 在子域名
// 2. 安装插件：Advanced Custom Fields + WP REST API
// 3. 修改 lib/images.ts 底部预留接口

export async function getImagesFromWP() {
  const res = await fetch('https://cms.yourdomain.com/wp-json/wp/v2/media');
  const media = await res.json();
  return media.map(m => ({
    src: m.source_url,
    alt: m.alt_text
  }));
}

// 4. 在需要动态内容的页面中调用：
// const images = await getImagesFromWP();
```

### 好处
- 运营同事用熟悉的 WP 后台写内容
- 前端保持极速性能和 SEO
- 未来换 CMS（Strapi/Sanity）时前端不用动

---

## 🐛 常见问题

### Q: 图片加载慢怎么办？
A: 
1. 用 Cloudinary 或 Vercel Blob 托管
2. 开启 Next.js Image 优化（`next.config.js` 已配置）
3. 压缩图片到 WebP 格式（推荐 Squoosh.app）

### Q: 怎么加新页面？
A: 
```bash
# 创建文件夹和文件
mkdir app/new-page
touch app/new-page/page.tsx
```

### Q: 表单提交到哪里？
A: 当前是前端 demo。生产环境需要接入：
- **Resend**（推荐，免费额度够用，发邮件到你的邮箱）
- **Formspree**（简单，有免费版）
- **自建 API**（Next.js API Route + Nodemailer）

### Q: 怎么改字体？
A: 
1. 在 `app/globals.css` 顶部替换 Google Fonts URL
2. 在 `tailwind.config.ts` 中修改 `fontFamily`

### Q: 手机上看效果不对？
A: 
1. 检查 `md:` 和 `lg:` 断点类名
2. 用 Chrome DevTools → Device Mode 测试
3. 项目已用移动端优先策略，通常只需调大断点以上的样式

---

## 📞 紧急联系

如果修改后网站崩了：

```bash
# 回滚到上一个版本
git checkout .
# 或者重新部署上一个稳定版本
vercel --prod
```

---

## 🗓️ 维护日程建议

| 频率 | 任务 |
|---|---|
| **每周** | 检查 GA4 流量，看哪个页面跳出率高 |
| **每月** | 更新 1-2 张产品图，保持新鲜感 |
| **每季** | 更新客户评价，替换为最新案例 |
| **每半年** | 审查 SEO 排名，补充新关键词内容 |

---

**最后提醒：所有内容修改后，记得重新部署！**

```bash
vercel --prod
```

_Good luck with the launch. — Kiki_
