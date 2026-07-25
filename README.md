# 海涛旅行定制 — China Inbound Travel Marketing Site

A static, App-Router Next.js site for [海涛旅行定制](https://example.com) (Haitao Travel Custom) — a China inbound travel agency. The site ships in Traditional Chinese (`zh-TW`) as the source language and provides client-side translation into 6 additional languages.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · ESLint 9 · hand-written BEM CSS · pnpm

---

## Quick start

```bash
pnpm install
pnpm dev              # → http://localhost:3000
```

> **pnpm is required.** `pnpm-workspace.yaml` enables native builds for `sharp` and `unrs-resolver`; `npm install` will fail.

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Start the dev server with hot reload |
| `pnpm build` | Production build (also runs type-checks). Run before any commit that touches `app/`. |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (extends `eslint-config-next/core-web-vitals` + `typescript`) |

There are **no tests**. Validate changes with `pnpm build` + `pnpm lint`.

## Routes

| Path | Purpose |
|---|---|
| `/` | Home — hero, advantages, destination cards, testimonials, CTA |
| `/about` | About — company copy + services + features |
| `/contact` | Contact — WhatsApp / WeChat / phone / email cards |
| `/chongqing` `/sichuan` `/zhangjiajie` `/guizhou` `/guangxi` `/yunnan` `/beijing` `/xian` | Destination pages, all driven by `app/destinations.ts` |

## Project layout

```
app/
  layout.tsx                Root layout (font/icon strategy, body-class script)
  page.tsx                  Home
  globals.css               All styles (~35KB, hand-written BEM)
  destinations.ts           Single source of truth for destination content
  <slug>/page.tsx × 8       Destination shells → <DestinationView />
  about/page.tsx            About
  contact/page.tsx          Contact shell → <ContactView />
  components/               Navbar, Footer, Cta, ScrollReveal, translation system, etc.
public/
  logo.jpg, icon.jpg, images/   Compressed assets
```

## Translation system

The site ships in Traditional Chinese (`zh-TW`) and translates client-side into `zh-CN`, `en`, `th`, `vi`, `ms`, `id`. Language preference is persisted to `localStorage`; on first visit the engine auto-detects the browser language. See `app/components/translate-client.ts`, `langs.ts`, `translations.ts`, and `TranslateInit.tsx`.

See `CLAUDE.md` for an architectural deep-dive, including a comparison of the current engine vs `next-intl` (the canonical Next.js App Router i18n library).

## Performance decisions

These are deliberate and load-bearing — see `CLAUDE.md` for the reasons:

- **System font stack only** — `fonts.googleapis.com` frequently times out in mainland China
- **No Tailwind, BEM CSS in `globals.css`** — `postcss.config.mjs` is intentionally empty
- **FontAwesome 6.5.1 from cdnjs** with `<link rel="preconnect">` (no `media="print" onload=` — doesn't work in JSX)
- **`<img>` over `next/image`** with `loading="lazy" decoding="async"` on below-fold images
- **Hero image preloaded** via `<link rel="preload" as="image">` in the root layout

## Contact (business)

- Phone: **193 8679 6662**
- WhatsApp: **+852 84392791**
- Email: **418144878@qq.com**
- Address: 中國張家界市永定區逸城公園

## Deployment

Any Next.js 16-compatible host works (Vercel, Cloudflare Pages with the Next adapter, self-hosted Node). The site is fully static — no serverless functions, no DB, no auth.

## License

Private / proprietary. © 2026 海涛旅行定制.