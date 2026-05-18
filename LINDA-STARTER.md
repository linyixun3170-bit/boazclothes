# 🚀 BOAZ 网站 — Linda 启动包（细化版）

> **适用对象**: Linda（OpenClaw AI）> **项目**: BOAZ Apparel 官网
> **框架**: Next.js 15 + React 19 + Tailwind CSS + Framer Motion

---

## 🎯 Linda 的核心职责

1. **接收内容**: 用户填写的 `CONTENT-BRIEF.md` + 图片包
2. **填充内容**: 替换占位符文案 + 图片 URL
3. **部署上线**: 推送到 Vercel，绑定域名
4. **后续维护**: 按需调整文案/图片/样式

---

## 📁 项目文件速查

### 改文案时查这里

| 页面 | 文件路径 | 改什么 |
|---|---|---|
| 首页 | `app/page.tsx` | 组件引用顺序（通常不动） |
| 首页标题 | `components/Hero.tsx` | h1 / p / CTA 按钮文字 |
| 数据统计 | `components/Stats.tsx` | 4个数字 + 标签 + 描述 |
| 工厂介绍 | `components/About.tsx` | 标题 + 正文 + 认证徽章 |
| 产品卡片 | `components/Products.tsx` | 6个产品数组 |
| 工厂图 | `components/FactoryTour.tsx` | 4张图引用 |
| 客户评价 | `components/Testimonials.tsx` | 3条评价数组 |
| CTA 区 | `components/CTASection.tsx` | 标题 + 按钮 + 副标题 |
| 页脚 | `components/Footer.tsx` | 链接 + 联系方式 |
| 导航 | `components/Navbar.tsx` | 菜单项 |

### 改图片时查这里

| 类型 | 文件路径 |
|---|---|
| **全站所有图片** | `lib/images.ts` ⭐ |
| 产品白底图 | `lib/images.ts` → `productImages` |
| 工厂实拍 | `lib/images.ts` → `factoryImages` |
| UGC/Instagram | `lib/images.ts` → `ugcImages` |
| Hero 背景 | `lib/images.ts` → `heroImages` |
| About 配图 | `lib/images.ts` → `aboutImages` |
| 批发产品图 | `lib/images.ts` → `wholesaleImages` |

### 改样式时查这里

| 元素 | 文件路径 |
|---|---|
| 颜色 | `tailwind.config.ts` → `colors` |
| 字体 | `tailwind.config.ts` → `fontFamily` + `globals.css` |
| 间距 | `tailwind.config.ts` → `spacing` |
| 动画缓动 | `tailwind.config.ts` → `transitionTimingFunction` |
| 全局样式 | `app/globals.css` |

---

## 🖼️ 图片替换操作指南

### 场景 1：用户提供了图片 URL（最简单）

```typescript
// 打开 lib/images.ts
// 直接替换 src 值

export const productImages = {
  heavyweightTee: {
    src: "https://user-cdn.com/heavyweight-tee.jpg",  // ← 新 URL
    alt: "用户提供的图片描述",
  },
};
```

### 场景 2：用户提供了本地图片文件

```bash
# 步骤 1：把图片放到 public/ 文件夹
mkdir -p public/images/products
mkdir -p public/images/factory
mkdir -p public/images/ugc

# 步骤 2：复制图片进去
cp user-photos/tee-1.jpg public/images/products/heavyweight-tee.jpg
cp user-photos/factory-1.jpg public/images/factory/inspection.jpg

# 步骤 3：在 lib/images.ts 中引用本地路径
export const productImages = {
  heavyweightTee: {
    src: "/images/products/heavyweight-tee.jpg",  // ← 本地路径
    alt: "Classic heavyweight cotton tee",
  },
};
```

### 场景 3：上传到 Cloudinary/Vercel Blob（推荐生产环境）

```bash
# Cloudinary 上传后会得到 URL：
# https://res.cloudinary.com/your-account/image/upload/...

# Vercel Blob 上传：
# vercel blob put ./photo.jpg
# 会得到：https://your-project.public.blob.vercel-storage.com/photo.jpg

# 然后替换到 lib/images.ts
```

### 图片尺寸规范（保持品牌一致）

| 用途 | 比例 | 建议尺寸 | 格式 |
|---|---|---|---|
| 产品图 | 3:4 | 600x800 | JPG/WebP |
| 工厂图 | 4:3 | 800x600 | JPG/WebP |
| UGC/Instagram | 1:1 | 400x400 | JPG/WebP |
| Hero 背景 | 16:9 | 1920x1080 | JPG（压缩后 < 500KB） |

---

## ✏️ 文案替换操作指南

### 示例：改首页标题

```tsx
// 打开 components/Hero.tsx

// 找到这段：
<h1 className="text-display-xl font-serif text-charcoal max-w-5xl text-balance mb-8">
  Your Production Line,
  <br />
  <span className="italic">Without the Headaches</span>
</h1>

// 改成用户提供的版本：
<h1 className="text-display-xl font-serif text-charcoal max-w-5xl text-balance mb-8">
  用户的主标题,
  <br />
  <span className="italic">用户的副标题</span>
</h1>
```

### 示例：改产品列表

```tsx
// 打开 components/Products.tsx

const products = [
  {
    name: "用户的产品名",           // ← 改这里
    desc: "用户的规格",             // ← 改这里
    image: productImages.heavyweightTee,
    tag: "Best Seller",             // ← 可选改
  },
];
```

### 示例：改客户评价

```tsx
// 打开 components/Testimonials.tsx

const testimonials = [
  {
    quote: "用户提供的真实评价",      // ← 改这里
    author: "客户姓名",              // ← 改这里
    role: "职位",                    // ← 改这里
    location: "城市",              // ← 改这里
  },
];
```

---

## 🔧 常见修改场景

### 场景 A：加一个新页面

```bash
# 1. 创建文件夹和文件
mkdir app/new-page
touch app/new-page/page.tsx
```

```tsx
// 2. 写入基础结构（复制现有页面结构）
export default function NewPage() {
  return (
    <main>
      <section className="pt-32 section-padding bg-cream">
        <h1>新页面标题</h1>
      </section>
    </main>
  );
}
```

```tsx
// 3. 在 Navbar.tsx 中加导航链接
<Link href="/new-page" className="...">New Page</Link>
```

### 场景 B：改按钮颜色

```tsx
// 方法 1：改全局（影响所有按钮）
// tailwind.config.ts → colors → 修改 charcoal 或 cream

// 方法 2：改单个按钮（不推荐，破坏一致性）
<button className="bg-red-500" ...>  // 不推荐！
```

### 场景 C：添加/删除组件

```tsx
// 打开 app/page.tsx

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Products />
      <FactoryTour />
      <Testimonials />
      <CTASection />
      <FAQ />          {/* ← 加这一行 */}
      <Footer />
    </main>
  );
}
```

### 场景 D：改联系方式（全局搜索替换）

```bash
# 快速替换所有占位符
grep -r "hello@boaz.apparel" --include="*.tsx" --include="*.ts" .
grep -r "your-number" --include="*.tsx" --include="*.ts" .

# 或者用 VS Code 全局搜索替换
```

---

## 🚀 部署操作

### 首次部署

```bash
# 1. 确认代码无误
npm run build

# 2. 如果有错误，先修复
# 常见错误：图片域名未在 next.config.js 中配置

# 3. 部署到 Vercel
vercel --prod
```

### 后续更新（内容替换后）

```bash
# 1. 构建测试
npm run build

# 2. 提交更改（如果有 git）
git add .
git commit -m "update: 替换产品图和文案"

# 3. 重新部署
vercel --prod

# 或者如果连接了 GitHub，push 后 Vercel 会自动部署
```

### 绑定自定义域名

```bash
# 方法 1：Vercel CLI
vercel domains add yourdomain.com

# 方法 2：Vercel Dashboard
# 1. 打开 https://vercel.com/dashboard
# 2. 选择项目 → Settings → Domains
# 3. 添加域名
# 4. 按提示配置 DNS（添加 CNAME 记录指向 cname.vercel-dns.com）
```

---

## 🐛 常见报错及修复

### 报错 1：`Image hostname not configured`

```
Error: Invalid src prop on `next/image`, hostname "xxx.com" is not configured
```

**修复**：在 `next.config.js` 中添加域名
```js
// next.config.js
images: {
  domains: ['images.unsplash.com', 'your-new-cdn.com'],
}
```

### 报错 2：`Module not found`

```
Module not found: Can't resolve '@/components/XXX'
```

**修复**：检查 `tsconfig.json` 中的 paths 配置
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 报错 3：`Build failed`

```bash
# 先检查 TypeScript 类型
npx tsc --noEmit

# 检查 ESLint
npm run lint
```

### 报错 4：图片加载慢

**修复**：
1. 压缩图片（推荐 https://squoosh.app）
2. 使用 WebP 格式
3. 开启 Next.js 图片优化（已默认开启）
4. 使用 CDN（Cloudinary/Vercel Blob）

---

## 📊 性能检查清单（部署前必做）

```bash
# 1. 本地构建
npm run build

# 2. 启动生产模式检查
npm start
# 打开 http://localhost:3000

# 3. 检查控制台无报错

# 4. 检查移动端（Chrome DevTools → Toggle Device Toolbar）

# 5. 检查 Core Web Vitals
# Chrome DevTools → Lighthouse → Analyze
# 目标: Performance > 90, SEO > 90
```

---

## 🔄 与用户的协作流程

### 标准流程

```
用户提供内容（CONTENT-BRIEF.md + 图片包）
    ↓
Linda 更新 lib/images.ts（图片）
    ↓
Linda 更新各组件文案
    ↓
npm run build（本地验证）
    ↓
vercel --prod（部署上线）
    ↓
通知用户检查
    ↓
用户反馈调整 → 重复上述步骤
```

### 快速调整（单处文案修改）

```
用户说："首页标题改成 XXX"
    ↓
Linda 直接改 components/Hero.tsx
    ↓
vercel --prod
    ↓
完成
```

---

## 🎓 技术备忘（Linda 自用）

### Tailwind 常用类速查

| 效果 | 类名 |
|---|---|
| 居中容器 | `max-w-7xl mx-auto` |
| 全屏高度 | `h-screen` |
| 视差容器 | `overflow-hidden` |
| 图片悬停放大 | `group-hover:scale-105 transition-transform duration-700` |
| 文字渐变 | `bg-clip-text text-transparent bg-gradient-to-r` |
| 毛玻璃 | `backdrop-blur-xl bg-cream/70` |
| 胶囊按钮 | `rounded-full px-8 py-3.5` |

### Framer Motion 常用模式

```tsx
// 淡入 + 上移
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
>
```

### 颜色变量

```
cream:     #FAF9F6  ← 主背景
offwhite:  #F5F5F0  ← 次级背景
warmgray:  #E8E6E1  ← 边框/分割线
stone:     #D4D0C8  ← 占位符/装饰
charcoal:  #1A1A1A  ← 主文字/深色背景
ink:       #2D2D2D  ← 次级文字
subtle:    #9C9C9C  ← 辅助文字
```

---

## 📞 紧急联系

如果部署失败且无法修复：

```bash
# 1. 回滚到上一个稳定版本
git log --oneline
git checkout HEAD~1

# 2. 或者直接用 Vercel 的 Rollback
# Dashboard → Deployments → 选择上一个成功版本 → Promote
```

---

**版本**: v1.0  
**更新**: 随项目迭代同步更新  

_Go build. — Kiki_
