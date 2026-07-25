# 海涛旅行定制 — China Inbound Travel Marketing Site

A static, server-rendered marketing site for **海涛旅行定制** (Haitao Travel Custom), a China inbound travel agency. Ships in Traditional Chinese (`zh-TW`) as the source language and renders server-side in 6 additional locales via [`next-intl`](https://next-intl.dev).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · ESLint 9 · next-intl 4 · hand-written BEM CSS · pnpm 10 · Node ≥ 22

---

## Quick start

```bash
pnpm install      # install dependencies
pnpm dev          # start dev server on http://localhost:3000
```

> **pnpm is required.** `pnpm-workspace.yaml` enables native builds for `sharp` and `unrs-resolver`; `npm install` will fail.
> **Node 22+** is required by Next 16. The repo pins this via `.nvmrc`.

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm build` | Production build (type-checks too) — run before any commit that touches `app/` or `i18n/` |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (extends `eslint-config-next/core-web-vitals` + `typescript`) |

There are **no tests**. Validate changes with `pnpm build` + `pnpm lint`.

## Routes

All routes are prefixed with a locale (`/zh-TW/about`, `/en/chongqing`, etc.). The root `/` 307-redirects to `/zh-TW/`.

| Path | Source |
|---|---|
| `/[locale]` | `app/[locale]/page.tsx` — Home (hero, advantages, destinations, testimonials, CTA) |
| `/[locale]/about` | `app/[locale]/about/page.tsx` |
| `/[locale]/contact` | `app/[locale]/contact/page.tsx` |
| `/[locale]/{chongqing,sichuan,zhangjiajie,guizhou,guangxi,yunnan,beijing,xian}` | Destination pages, metadata-only + translations from `messages/<locale>.json` |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` |
| `/[locale]/opengraph-image` | `app/[locale]/opengraph-image.tsx` (1200×630 PNG generated at build) |
| `/[locale]/error`, `/[locale]/loading`, `/[locale]/not-found` | App Router UX conventions |

## Architecture

```
.
├── proxy.ts                          Locale-aware routing (root-level, Next 16)
├── i18n/                             next-intl config
│   ├── routing.ts                    defineRouting({...})
│   ├── request.ts                    getRequestConfig (per-request locale)
│   ├── navigation.ts                 createNavigation(routing) → Link/useRouter/usePathname
│   └── locales.ts                    LANGS list + labelFor
├── messages/                         Translation catalogs (7 files, nested namespaces)
│   └── zh-TW.json, zh-CN.json, en.json, th.json, vi.json, ms.json, id.json
├── app/
│   ├── sitemap.ts, robots.ts         SEO
│   ├── icon.jpg                      Favicon (Next.js `app/icon.jpg` convention)
│   ├── [locale]/
│   │   ├── layout.tsx                Root locale layout + generateStaticParams
│   │   ├── destinations.ts           Metadata-only (slug, ctaBg, spots[{rank, image}])
│   │   ├── page.tsx                  Home
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── {8 destinations}/page.tsx
│   │   ├── error.tsx, loading.tsx, not-found.tsx
│   │   ├── opengraph-image.tsx       Dynamic OG image
│   │   └── components/               9 components, locale-aware
│   ├── globals.css                   All styles (~35KB, hand-written BEM)
│   └── icon.jpg
├── public/                           Compressed assets (logo.jpg, images/)
├── next.config.ts                    next-intl plugin + security headers
├── tsconfig.json, eslint.config.mjs, postcss.config.mjs
├── .editorconfig, .nvmrc, .env.example
└── .github/workflows/ci.yml          Build + lint on push/PR
```

## Translation system

The site ships in Traditional Chinese (`zh-TW`) as the source. Translations live in `messages/<locale>.json` under nested namespaces:

```
Metadata              { title, description }
Navbar                { brand, main.{home,about,contact}, travel.{8 slugs}, travelLabel, aria.menu }
Footer                { brand, tagline, quickLinks, quickItems.{8 keys}, contactHeading,
                       phone, whatsapp, email, address, followUs, copyright }
Home                  { hero.{...}, advantages.items[3], destinationCards[4], testimonials[4],
                       ctaHeading, ctaBody[4], ctaPhone, ... }
About                 { why[6], services[4], features[4], aboutBody[2], ... }
Contact               { cards.{5}.{label,hint}, form.{7 fields}, formHeading, formSubject }
DestinationView       { overviewHeading, topSpotsHeading, rankLabel="TOP {rank}", ctaTitle, ctaBody[4] }
Destinations          { chongqing.{title,overview,spots.1-5.{title,subtitle,description,notes[3],closing}}, /* ×8 */ }
Cta                   { defaultLabel, defaultPhone }
Locales               { zh-TW, zh-CN, en, th, vi, ms, id → native names }
```

Server Components use `getTranslations("Section")` + dotted paths (`t("hero.title")`). Client Components use `useTranslations("Section")`. ICU MessageFormat placeholders work out of the box (e.g. `t("rankLabel", { rank: 5 })`).

## Performance decisions (load-bearing)

These are deliberate and preserved across edits:

- **System font stack only** — `fonts.googleapis.com` frequently times out in mainland China. See `:root` font-family in `globals.css`.
- **No Tailwind, BEM-only CSS** — `postcss.config.mjs` is intentionally empty; `@tailwindcss/postcss` is a leftover from `create-next-next`.
- **FontAwesome 6.5.1 from cdnjs** with `<link rel="preconnect">` (no `media="print" onload=` — doesn't work in React JSX).
- **`<img>` over `next/image`** by project choice. Below-fold images use `loading="lazy" decoding="async"`.
- **Hero image preloaded** via `<link rel="preload" as="image">` in the root locale layout.
- **`output: "standalone"`** in `next.config.ts` — smaller Docker images for self-hosted deploy.

## Security

`next.config.ts` sets these headers on every response:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains` (only meaningful over HTTPS)

`poweredByHeader: false` removes the `X-Powered-By: Next.js` header.

## CI

`.github/workflows/ci.yml` runs `pnpm install → pnpm lint → pnpm build` on every push to `main` and every PR. Build artifacts (`.next/`) are uploaded for inspection.

## Deployment

Any Next.js 16-compatible host works:

- **Vercel** — push to a Vercel-connected repo, set `NEXT_PUBLIC_SITE_URL` env var, done.
- **Self-hosted Node** — `pnpm build && pnpm start` (standard Next.js server, no special handling).
- **Docker / standalone** — if you containerize later, add `output: "standalone"` to `next.config.ts`, then `node .next/standalone/server.js` (with `public/` and `.next/static/` copied alongside).

Set `NEXT_PUBLIC_SITE_URL` to your production hostname (used by sitemap, robots, OG metadata).

## Contact (business)

- Phone: **193 8679 6662**
- WhatsApp: **+852 84392791**
- Email: **418144878@qq.com**
- Address: 中國張家界市永定區逸城公園

## License

Private / proprietary. © 2026 海涛旅行定制.