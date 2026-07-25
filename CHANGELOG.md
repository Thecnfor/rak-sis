# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/).

## [1.0.0] — 2026-07-26

### Added
- **next-intl integration** (v4.13.4) — full App Router i18n with locale-prefixed routing (`/zh-TW/about`, `/en/chongqing`, etc.). Server-rendered HTML per locale, no client-side swap.
- **7 locale message catalogs** — `messages/<locale>.json` with nested namespaces: `Metadata`, `Navbar`, `Footer`, `Home`, `About`, `Contact`, `DestinationView`, `Destinations`, `Cta`, `Locales`.
- **`proxy.ts`** (Next 16 root-level middleware) — handles locale detection, redirect from `/` to `/zh-TW/`, 307 redirects for unprefixed URLs.
- **`i18n/navigation.ts`** — `createNavigation(routing)` for locale-aware `Link` / `useRouter` / `usePathname`.
- **App Router UX conventions** — `error.tsx`, `loading.tsx`, `not-found.tsx` for the `[locale]` segment.
- **SEO** — `app/sitemap.ts` (91 entries × 7 locales), `app/robots.ts`, dynamic `opengraph-image.tsx` (1200×630 PNG).
- **CI** — `.github/workflows/ci.yml` runs `pnpm install → lint → build` on every push/PR to `main`.
- **Security headers** in `next.config.ts` — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`. `poweredByHeader: false`.
- **`output: "standalone"`** for self-contained deployable builds.
- **Project meta** — `.editorconfig`, `.nvmrc` (Node 22), `.env.example` (`NEXT_PUBLIC_SITE_URL`).

### Changed
- **Migration from custom DOM-walking translation engine** (`translate-client.ts` + `translations.ts` + `TranslateInit.tsx` + `langs.ts`) → removed entirely. Old approach shipped 399KB of all-locale translations to every visitor; now only the active locale's JSON is server-rendered.
- **`destinations.ts`** — slimmed from full Spot content (~610 lines) to metadata-only (`slug`, `ctaBg`, `spots[{rank, image}]`). All text content now lives in `messages/<locale>.json` under `Destinations.<slug>`.
- **`eslint.config.mjs`** — `react-hooks/set-state-in-effect: off` (preserved from original config) for `useEffect(() => setOpen(false), [pathname])` in `Navbar`.
- **`next.config.ts`** — wrapped with `createNextIntlPlugin('./i18n/request.ts')`. Adds security headers, `output: "standalone"`, `poweredByHeader: false`, `reactStrictMode: true`.

### Removed
- `app/layout.tsx` — replaced by `app/[locale]/layout.tsx`
- `app/page.tsx`, `app/{about,contact}/page.tsx`, all 8 `app/<slug>/page.tsx` — moved under `app/[locale]/`
- `app/destinations.ts` — moved under `app/[locale]/` and slimmed
- All 9 components under `app/components/` — moved under `app/[locale]/components/`
- `app/components/translate-client.ts`, `translations.ts`, `TranslateInit.tsx`, `langs.ts` — engine obsolete

### Performance
- Translation JS shipped to client: **0KB** (was 399KB)
- Per-locale JSON loaded server-side: zh-CN 78KB, zh-TW 80KB, en 88KB, ms 91KB, id 91KB, vi 100KB, th 149KB
- next-intl client runtime: ~10KB
- All 91 routes SSG (`●`), no dynamic rendering