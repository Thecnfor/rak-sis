# 海涛旅行定制官网

`rak-sis` 是海涛旅行定制的多语言官网项目，用于承接海外用户流量、展示目的地内容，并引导用户通过 WhatsApp 或表单完成咨询。

当前技术栈：

- Next.js 16 App Router
- React 19
- TypeScript 5
- next-intl 4
- 原生 BEM 风格 CSS
- pnpm 10
- Node 22+

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发环境

```bash
pnpm dev
```

启动后访问：

```text
http://localhost:3000
```

### 3. 常用检查命令

```bash
pnpm lint
pnpm build
```

说明：

- 本项目必须使用 `pnpm`
- Node 版本要求为 `22` 及以上
- `pnpm build` 同时承担生产构建和类型检查职责

## 项目定位

这是一个以静态生成内容为主的营销站点，核心职责包括：

- 展示首页品牌信息与核心卖点
- 展示各目的地详情页
- 提供多语言访问能力
- 承接联系咨询与广告投放流量

当前站点支持 7 个语言版本：

- `zh-TW`
- `zh-CN`
- `en`
- `th`
- `vi`
- `ms`
- `id`

其中 `messages/zh-TW.json` 是文案主版本。

## 路由说明

所有页面都带语言前缀，例如：

- `/zh-TW/about`
- `/en/contact`
- `/en/chongqing`

主要页面如下：

| 路由 | 文件 |
| --- | --- |
| `/[locale]` | `app/[locale]/page.tsx` |
| `/[locale]/about` | `app/[locale]/about/page.tsx` |
| `/[locale]/contact` | `app/[locale]/contact/page.tsx` |
| `/[locale]/contact/success` | `app/[locale]/contact/success/page.tsx` |
| `/[locale]/[slug]` | `app/[locale]/[slug]/page.tsx` |
| `/sitemap.xml` | `app/sitemap.ts` |
| `/robots.txt` | `app/robots.ts` |

## 目录结构

```text
.
├── app/
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── destinations.ts
│       ├── about/
│       ├── contact/
│       ├── [slug]/
│       └── components/
│           ├── analytics/         广告归因与事件回传
│           ├── i18n/              语言切换相关组件
│           ├── ui/                通用交互与展示辅助组件
│           ├── ContactView.tsx
│           ├── Cta.tsx
│           ├── DestinationView.tsx
│           ├── Footer.tsx
│           └── Navbar.tsx
├── i18n/                          语言路由、导航与 locale 配置
├── messages/                      多语言文案
├── public/images/                 运行时静态图片资源
├── proxy.ts                       Next 16 多语言代理入口
├── next.config.ts                 Next 配置与安全头
├── .env.example                   环境变量示例
└── README.md
```

## 组件目录约定

`app/[locale]/components` 当前按职责拆为 4 类：

### 1. 页面级共享组件

直接服务于页面结构与内容展示：

- `Navbar.tsx`
- `Footer.tsx`
- `ContactView.tsx`
- `DestinationView.tsx`
- `Cta.tsx`

### 2. `analytics/`

用于广告归因、事件追踪和埋点逻辑：

- `MetaPixelProvider.tsx`
- `MetaPixelRouteTracker.tsx`
- `MetaPixelNoscript.tsx`
- `TrackedWhatsAppLink.tsx`
- `LeadPageTracker.tsx`
- `meta-pixel-client.ts`

### 3. `i18n/`

用于语言切换与语言标识：

- `LangSwitcher.tsx`
- `MobileLangSwitcher.tsx`
- `LangFlag.tsx`

### 4. `ui/`

用于通用界面行为：

- `ScrollReveal.tsx`
- `BodyHomeClassSync.tsx`

这样整理后，页面组件、语言组件、动效组件、埋点组件的边界更清楚，后续继续扩展时不会全部堆在一个目录里。

## 多语言机制

多语言能力基于 `next-intl` 实现：

1. `proxy.ts` 负责语言前缀路由
2. `i18n/request.ts` 按请求加载对应语言包
3. `app/[locale]/layout.tsx` 在布局层注入 `NextIntlClientProvider`
4. 页面结构数据放在 `destinations.ts`
5. 页面文案放在 `messages/*.json`

约定如下：

- 与语言无关的结构数据放 `destinations.ts`
- 与语言有关的文本内容放 `messages/*.json`
- 新增语言时，要同步更新 `i18n/routing.ts`、`i18n/locales.ts` 与对应语言包

## Facebook / Meta Pixel 事件回传

当前站点已经接入浏览器端 Meta Pixel，并为后续接入 CAPI 预留了结构。

当前已覆盖事件：

- `PageView`：所有页面浏览
- `ViewContent`：目的地详情页浏览
- `Contact`：点击 WhatsApp 联系
- `WhatsAppClick`：WhatsApp 入口细分分析
- `Lead`：联系表单提交成功后触发

实现位置：

- `app/[locale]/components/analytics/`

说明：

- 如果没有配置 `NEXT_PUBLIC_META_PIXEL_ID`，埋点层会自动静默停用
- 不会影响页面正常访问和提交流程

## 环境变量

请参考 `.env.example`。

当前实际使用的环境变量主要有：

| 变量名 | 作用 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 站点正式域名，用于 metadata、sitemap、robots 和表单成功回跳链接 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID，用于 Facebook 广告事件回传 |

## 交付与部署

常见部署方式：

- Vercel
- 自托管 Node 服务
- Docker / standalone 输出

标准上线前检查：

```bash
pnpm lint
NEXT_PUBLIC_SITE_URL=https://haitao-travel.example.com pnpm build
```

如果需要同时验证 Meta Pixel，可额外带上：

```bash
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

## 业务联系方式

- 电话：`193 8679 6662`
- WhatsApp：`85284392791`
- 邮箱：`tofofo@pixelinbox.com`
- Facebook：`https://www.facebook.com/profile.php?id=61550484293539`
- 地址：中国张家界市永定区逸城公园

## 版权说明

本项目为私有商业项目，版权归海涛旅行定制所有。
