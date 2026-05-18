# 🎨 BOAZ 3D Product Customizer — Design Document

> **Owner**: Boaz Founder  
> **Target**: Linda (Developer)  
> **Purpose**: Interactive 3D product visualization for B2B customers to preview custom prints/embroidery on garments before ordering.

---

## 一、模块定位

| 属性 | 说明 |
|---|---|
| **模块名称** | Product Customizer / "See It Before You Order" |
| **页面位置** | 独立页面 `/customize` + 首页 `FeaturedProduct` 区块入口 |
| **目标客户** | B2B buyers (品牌主、亚马逊卖家、门店) — 想预览logo/图案上衣服的效果 |
| **核心功能** | 上传图案 → 选择衣服款式 → 放置图案位置 → 3D预览效果 → 导出预览图/直接询盘 |
| **技术栈** | Three.js + React Three Fiber + `@react-three/drei` |

---

## 二、页面结构 (`/customize`)

```
┌─────────────────────────────────────────────────────────────┐
│  Navbar                                                      │
├────────────────────────────┬────────────────────────────────┤
│                            │                                │
│   🎨 Control Panel          │    🧥 3D Preview Canvas       │
│   (左侧)                    │    (右侧 3D场景)               │
│                            │                                │
│  ── Step 1 ──              │                                │
│  [上传图案按钮]             │      ┌──────────────┐          │
│  支持 PNG/JPG/SVG           │      │              │          │
│  自动去背景(可选)           │      │   [3D T恤]   │          │
│                            │      │   + 你的图案  │          │
│  ── Step 2 ──              │      │   可旋转查看  │          │
│  [选择款式]                 │      │              │          │
│  ○ T-Shirt (Regular)        │      └──────────────┘          │
│  ○ T-Shirt (Oversized)     │                                │
│  ○ Hoodie                   │    [↺ 旋转] [↔ 翻转] [⤢ 缩放]   │
│  ○ Crewneck                 │                                │
│                            │                                │
│  ── Step 3 ──              │                                │
│  [选择颜色]                 │                                │
│  ● White  ● Black  ● Gray  │                                │
│  ● Navy   ● Beige  ● ...   │                                │
│                            │                                │
│  ── Step 4 ──              │                                │
│  [放置位置]                 │                                │
│  ○ 左胸 (Left Chest)        │                                │
│  ○ 正中 (Center Chest)      │                                │
│  ○ 全幅 (Full Front)        │                                │
│  ○ 后背 (Full Back)         │                                │
│                            │                                │
│  ── Step 5 ──              │                                │
│  [图案调整]                 │                                │
│  Size: [━━━●━━━]           │                                │
│  Rotate: [━━●━━━]           │                                │
│  Opacity: [━━━●━━]          │                                │
│                            │                                │
│  ┌─────────────────────┐   │                                │
│  │ 📤 Export Preview   │   │                                │
│  │ 📋 Request Quote    │   │                                │
│  └─────────────────────┘   │                                │
│                            │                                │
├────────────────────────────┴────────────────────────────────┤
│  How It Works (3-step)  +  FAQ                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 三、左侧控制面板 — 分步设计

### Step 1: Upload Your Design (上传设计)

```
┌────────────────────────┐
│  🖼️ Upload Your Design  │
│                        │
│  ┌──────────────────┐  │
│  │                  │  │
│  │   [Drop Zone]    │  │
│  │   or Click to    │  │
│  │   Upload         │  │
│  │                  │  │
│  └──────────────────┘  │
│                        │
│  ✅ PNG, JPG, SVG      │
│  ✅ Max 10MB           │
│  ✅ Transparent BG     │
│     supported          │
│                        │
│  [Remove Background]   │  ← 可选，调用remove.bg API
│  Toggle: [●──]         │
└────────────────────────┘
```

**功能说明**:
- 拖拽上传或点击选择文件
- 实时预览上传的图案缩略图
- 可选"自动去背景"（调用 remove.bg API，需要API key）
- 显示图案尺寸(px)和建议打印尺寸(cm)

---

### Step 2: Select Garment (选择款式)

```
┌────────────────────────┐
│  👕 Select Garment       │
│                        │
│  ┌────┐ ┌────┐ ┌────┐  │
│  │ 🧥 │ │ 👕 │ │ 🧥 │  │
│  │Hood│ │Reg │ │Overs│  │
│  │ie  │ │ular│ │ized │  │
│  └────┘ └────┘ └────┘  │
│                        │
│  [更多款式 ▼]           │
│                        │
│  ── 当前选择 ──          │
│  Classic Heavyweight Tee│
│  240gsm / Regular Fit   │
│  From ¥6.00 / MOQ 50    │
└────────────────────────┘
```

**功能说明**:
- 缩略图网格选择款式
- 选中后高亮边框
- 下方显示选中款式的简要信息
- 展开"更多款式"显示全部8款

---

### Step 3: Choose Color (选择颜色)

```
┌────────────────────────┐
│  🎨 Choose Color         │
│                        │
│  ● ○ ○ ○ ○ ○ ○ ○ ○ ○  │  ← 颜色圆点网格
│  ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  │
│                        │
│  当前: Vintage White    │
│  Hex: #FAF9F6          │
│                        │
│  [Custom Color Picker]  │
└────────────────────────┘
```

**功能说明**:
- 12个预设颜色（匹配实际库存色）
- 悬停显示颜色名称
- 可选自定义颜色（潘通色号输入，用于大货）

---

### Step 4: Placement (放置位置)

```
┌────────────────────────┐
│  📍 Placement            │
│                        │
│      ┌─────┐           │
│      │     │           │
│      │ [🎯]│ ← Center  │
│      │     │           │
│      └─────┘           │
│                        │
│  ○ Left Chest          │
│  ● Center Chest        │
│  ○ Full Front          │
│  ○ Full Back           │
│  ○ Left Sleeve         │
│  ○ Right Sleeve        │
│                        │
│  [Custom Position]     │
└────────────────────────┘
```

**功能说明**:
- 衣服轮廓图+点击位置可视化
- 预设6个位置一键切换
- "Custom Position"允许自由拖拽图案
- 显示安全打印区域（虚线框）

---

### Step 5: Adjust Design (调整设计)

```
┌────────────────────────┐
│  ⚙️ Adjust Design       │
│                        │
│  Size                    │
│  ━━━●━━━━ 150%         │
│                        │
│  Rotation                │
│  ━━●━━━━━ 15°          │
│                        │
│  Opacity                 │
│  ━━━━━●━━ 85%          │
│                        │
│  [↺ Reset] [🗑️ Remove]  │
└────────────────────────┘
```

---

## 四、右侧 3D 预览区

### 3D Scene 规格

```typescript
// 场景配置
const sceneConfig = {
  camera: {
    position: [0, 0, 3.5],    // 相机位置
    fov: 45,                   // 视角
    zoom: 1,
  },
  lighting: {
    ambient: { intensity: 0.6, color: "#ffffff" },
    directional: { 
      position: [5, 5, 5], 
      intensity: 1.2,
      castShadow: true 
    },
    fill: { position: [-3, 2, 2], intensity: 0.4 },  // 补光
  },
  controls: {
    autoRotate: true,          // 自动缓慢旋转
    autoRotateSpeed: 1.0,
    enableZoom: true,
    enablePan: false,          // 禁止平移，只允许旋转
    minDistance: 2,
    maxDistance: 6,
  },
  background: "#FAF9F6",     // 匹配网站cream色
};
```

### 交互手势

| 操作 | 效果 |
|---|---|
| **拖拽** | 旋转3D模型（360°查看） |
| **滚轮** | 缩放 |
| **双击** | 重置视角 |
| **悬停** | 显示当前位置名称（如"Center Chest"） |

### 导出功能

```
┌────────────────────────┐
│  📤 Export Preview      │
│                        │
│  [Download as PNG]      │ ← 当前视角截图，1080x1080
│  [Download as JPG]     │ ← 白底产品图，适合发客户
│  [Share Link]           │ ← 生成预览链接
│                        │
│  📋 Request Quote       │
│  [Add to Inquiry]       │ ← 跳转询盘页，自动带上
│                          款式+颜色+位置+图案信息
└────────────────────────┘
```

---

## 五、3D模型技术方案

### 方案A: 程序生成T恤（推荐，无需外部模型文件）

用 Three.js 基础几何体组合生成T恤形状：
- 躯干: `BoxGeometry` + `SubdivisionModifier` 圆滑处理
- 袖子: `CylinderGeometry` + 旋转
- 领口: `TorusGeometry`

**优点**: 纯代码，无外部依赖，文件体积小  
**缺点**: 效果不够逼真，细节有限

### 方案B: GLTF/GLB 模型加载（推荐，效果更好）

使用预制的3D服装模型文件：
- 格式: `.glb` (GLTF二进制格式)
- 模型要求:
  - UV展开完好（纹理贴图用）
  - 多材质支持（身体一个材质，领口罗纹一个材质）
  - 约5,000-10,000面（性能平衡）
  - 包含变形目标(Morph Targets)用于不同版型

**优点**: 逼真，支持布料模拟  
**缺点**: 需要3D建模师制作模型文件

### 方案C: 混合方案（最终采用）

```
├── 3D Model (GLB)         ← 预制的逼真T恤模型
│   └── 材质: fabricMaterial  ← 可切换颜色
│
├── Decal System (贴花系统)  ← 用户图案作为贴花
│   └── 位置: 根据placement动态计算贴花平面
│
└── 切换逻辑:
    款式A → 加载 model-a.glb
    款式B → 加载 model-b.glb
    颜色  → 修改 material.color
    图案  → 动态创建Decal mesh
```

---

## 六、贴花( Decal )实现

用户图案不是直接贴在衣服纹理上，而是作为3D贴花放置在衣服表面：

```typescript
// 贴花创建逻辑
function createDecal(
  patternImage: string,      // 用户上传的图案
  position: Vector3,         // 放置位置（如胸前中心）
  rotation: Euler,           // 旋转角度
  scale: number,             // 缩放比例
  garmentMesh: Mesh,         // 衣服3D模型
) {
  // 1. 加载图案为纹理
  const texture = new TextureLoader().load(patternImage);
  texture.needsUpdate = true;

  // 2. 创建贴花材质
  const decalMaterial = new MeshStandardMaterial({
    map: texture,
    transparent: true,
    opacity: 0.85,
    roughness: 0.4,
    metalness: 0.0,
    polygonOffset: true,
    polygonOffsetFactor: -4,  // 确保贴花在衣服表面之上
  });

  // 3. 计算贴花几何体
  const decalGeometry = new DecalGeometry(
    garmentMesh,    // 目标mesh
    position,       // 位置
    rotation,       // 旋转
    new Vector3(scale, scale, scale)  // 缩放
  );

  // 4. 创建贴花mesh
  const decal = new Mesh(decalGeometry, decalMaterial);
  scene.add(decal);

  return decal;
}
```

### 6个预设位置对应的坐标

| 位置 | 3D坐标 (x, y, z) | 法向量 (朝向) |
|---|---|---|
| Left Chest | (-0.25, 0.35, 0.25) | (0, 0, 1) |
| Center Chest | (0, 0.35, 0.28) | (0, 0, 1) |
| Full Front | (0, 0.1, 0.28) | (0, 0, 1) |
| Full Back | (0, 0.1, -0.28) | (0, 0, -1) |
| Left Sleeve | (-0.55, 0.2, 0.05) | (-0.3, 0, 0.7) |
| Right Sleeve | (0.55, 0.2, 0.05) | (0.3, 0, 0.7) |

> **注意**: 实际坐标需要根据3D模型的尺寸微调。Linda拿到模型后测量实际尺寸再精调。

---

## 七、页面底部: How It Works

### 三步流程

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│         How Customization Works                      │
│                                                      │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│   │   1️⃣     │ →  │   2️⃣     │ →  │   3️⃣     │     │
│   │ Upload   │    │ Preview  │    │ Order    │     │
│   │ Design   │    │ in 3D    │    │ with     │     │
│   │          │    │          │    │ Confidence│    │
│   │ 上传你的  │    │ 3D实时   │    │ 一键询盘  │     │
│   │ logo/图案│    │ 预览效果 │    │ 带预览图  │     │
│   └──────────┘    └──────────┘    └──────────┘     │
│                                                      │
│   "See exactly how your brand looks on our blanks    │
│    before committing to 3,000 units."               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 八、文案内容（全部写好，Linda直接复制）

### 页面标题
```
主标题: Design It. See It. Order It.
副标题: Upload your logo, preview on real garments in 3D, 
        and request a quote — all in under 2 minutes.
```

### Step 1 文案
```
标题: Upload Your Design
说明: Drop your logo, artwork, or pattern here. 
      We accept PNG, JPG, and SVG. Transparent backgrounds work best.
提示: Pro tip: Use high-resolution files (300 DPI+) for the crispest print result.
```

### Step 2 文案
```
标题: Pick Your Garment
说明: Select the base style that matches your brand aesthetic.
标签: Regular Fit / Oversized / Hoodie / Crewneck
```

### Step 3 文案
```
标题: Choose Your Color
说明: 12 stock colors ready to ship. Custom Pantone matching available for 1,000+ units.
```

### Step 4 文案
```
标题: Place It Perfectly
说明: Click a preset position or drag freely. 
      The dashed line shows the safe print area.
位置名称:
  - Left Chest: "Subtle branding, retail-ready"
  - Center Chest: "Classic logo placement"
  - Full Front: "Statement piece, maximum impact"
  - Full Back: "Event merch, team uniforms"
  - Left Sleeve: "Minimalist detail"
  - Right Sleeve: "Secondary logo or social handle"
```

### Step 5 文案
```
标题: Fine-Tune
说明: Adjust size, angle, and opacity until it looks exactly right.
```

### CTA 文案
```
主按钮: Add to Quote Request
次按钮: Download Preview
说明: Your preview image will be attached to the inquiry form automatically.
```

---

## 九、技术实现清单（给Linda）

### 需要安装的新依赖

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
# 可选: 去背景API
npm install remove.bg  # 或自建API
```

### 需要创建的文件

| 文件 | 用途 |
|---|---|
| `app/customize/page.tsx` | 定制器主页面 |
| `components/Customizer/` | 定制器专用组件目录 |
| `components/Customizer/Scene.tsx` | Three.js 3D场景 |
| `components/Customizer/GarmentModel.tsx` | 衣服3D模型加载/切换 |
| `components/Customizer/DecalSystem.tsx` | 贴花系统 |
| `components/Customizer/ControlPanel.tsx` | 左侧控制面板 |
| `components/Customizer/UploadZone.tsx` | 图案上传区 |
| `components/Customizer/ColorPicker.tsx` | 颜色选择器 |
| `components/Customizer/PlacementSelector.tsx` | 位置选择器 |
| `components/Customizer/ExportActions.tsx` | 导出/询盘按钮组 |
| `components/Customizer/GarmentPresets.ts` | 衣服款式/颜色/坐标预设数据 |
| `hooks/useCustomizer.ts` | 定制器状态管理hook |
| `public/models/` | 3D模型文件存放目录 |
| `public/models/tshirt-regular.glb` | 常规T恤模型 |
| `public/models/tshirt-oversized.glb` | 大版型T恤模型 |
| `public/models/hoodie.glb` | 卫衣模型 |
| `public/models/crewneck.glb` | 圆领衫模型 |

### 3D模型文件需求（需要准备）

Boaz需要找3D建模师或使用现成资源制作4个 `.glb` 文件：

| 模型 | 要求 | 预算参考 |
|---|---|---|
| `tshirt-regular.glb` | 常规版型T恤，UV展开正确，约5000面 | ¥500-2000 |
| `tshirt-oversized.glb` | 落肩大版型，UV展开正确 | ¥500-2000 |
| `hoodie.glb` | 连帽卫衣，包含帽子/袋鼠口袋 | ¥1000-3000 |
| `crewneck.glb` | 圆领卫衣/长袖 | ¥500-2000 |

**替代方案**: 使用 Three.js 程序化生成简单T恤形状（先上线，后优化）。

### 状态管理

```typescript
// hooks/useCustomizer.ts
interface CustomizerState {
  uploadedImage: string | null;     // 用户上传的图案(base64)
  selectedGarment: string;          // "tshirt-regular" | "tshirt-oversized" | "hoodie" | "crewneck"
  selectedColor: string;            // Hex color
  placement: PlacementType;        // "left-chest" | "center-chest" | "full-front" | "full-back" | "left-sleeve" | "right-sleeve" | "custom"
  decalPosition: Vector3;          // 自定义位置坐标
  decalRotation: number;            // 旋转角度
  decalScale: number;               // 缩放比例
  decalOpacity: number;             // 不透明度
}
```

---

## 十、与询盘系统的衔接

用户在定制器点击 "Add to Quote Request" 后：

```
数据自动传递到 /contact 询盘表单:

{
  product: "Classic Heavyweight Tee",  // 选中款式
  color: "Vintage White",              // 选中颜色
  placement: "Center Chest",           // 位置
  designPreview: "[base64-image]",     // 预览图
  quantity: null,                      // 用户在询盘页补填
  message: "See attached preview for exact placement."  // 自动备注
}
```

---

## 十一、现货+定制双模式首页文案

在首页增加一个区块，说明BOAZ两种业务模式：

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│              Two Ways to Work With Us                        │
│                                                              │
│   ┌─────────────────────┐    ┌─────────────────────┐       │
│   │   📦 Stock Blanks    │    │   🎨 Custom Build   │       │
│   │                      │    │                      │       │
│   │  Ready to ship       │    │  Your design,        │       │
│   │  50+ MOQ             │    │  our production line │       │
│   │  5-day turnaround    │    │  3-day sample        │       │
│   │  From ¥6             │    │  From tech pack      │       │
│   │                      │    │  to finished goods   │       │
│   │  [Browse Stock →]    │    │  [Start Customizing→]│      │
│   └─────────────────────┘    └─────────────────────┘       │
│                                                              │
│   "Whether you need 200 blanks with your neck label,        │
│    or a fully custom garment from scratch — we do both."     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**文案**: "Stock or Custom — You Choose"
**副文案**: "Need blanks fast? We ship stock in 5 days. Want something unique? Design it in our 3D previewer and we'll build it from scratch."

---

## 十二、移动端适配

定制器在移动端（<768px）的适配方案：

```
┌────────────────────────┐
│  Navbar                │
├────────────────────────┤
│  📱 3D Preview        │
│  (简化版，可旋转)      │
│  ┌────────────────┐  │
│  │                │  │
│  │   [3D View]    │  │
│  │                │  │
│  └────────────────┘  │
│  [↺ Rotate] [📤 Save] │
├────────────────────────┤
│  Step 1/5: Upload ▼   │
├────────────────────────┤
│  [Control Panel       │
│   折叠面板，          │
│   点击展开]           │
├────────────────────────┤
│  Step 2/5: Garment ▼  │
├────────────────────────┤
│  ...                  │
└────────────────────────┘
```

移动端简化：
- 3D预览区缩小，隐藏缩放控制
- 控制面板改为手风琴折叠面板
- 步骤指示器（Step 1/5）帮助导航

---

## 十三、性能优化

| 优化项 | 方法 |
|---|---|
| 3D模型加载 | 使用 `useGLTF` 的 `preload` 预加载 |
| 纹理压缩 | 用户上传图自动压缩到1024x1024 |
| 贴花优化 | 限制贴花面数，使用 `Decal` 而非全模型投影 |
| 懒加载 | 3D场景在用户滚动到区域后再初始化 |
| 降级方案 | 不支持WebGL的浏览器显示2D预览 |

---

## 十四、交付检查清单

Linda开发完成后，按此验收：

- [ ] 4个3D模型文件能正常加载
- [ ] 用户能上传图片并显示在衣服上
- [ ] 6个预设位置能一键切换
- [ ] 颜色切换实时生效
- [ ] 款式切换实时生效
- [ ] 能360°旋转查看
- [ ] 能导出PNG预览图
- [ ] 能跳转到询盘页并带参数
- [ ] 移动端可用
- [ ] 不支持WebGL的浏览器有降级提示

---

## 十五、参考资料（给Linda）

### React Three Fiber 官方示例
- 贴花示例: https://docs.pmndrs.github.io/react-three-fiber/getting-started/examples
- Drei Decal: https://github.com/pmndrs/drei#decal

### 3D模型资源
- 免费T恤模型: https://sketchfab.com/search?q=t-shirt&type=models
- GLTF转换: https://github.com/KhronosGroup/glTF-Sample-Models

### 去背景API
- remove.bg API: https://www.remove.bg/api
- 自建方案: rembg (Python) + serverless function

---

*3D Product Customizer Design Document v1.0*  
*Created for Boaz / BoazClothes.com*  
*Target Developer: Linda*  

_"Let your customers see their brand on your blanks before they buy."_
