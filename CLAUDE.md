# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Project-specific rules live in [`AGENTS.md`](./AGENTS.md) — read it before touching any code.

## What this project is

**海涛旅行定制** (Haitao Travel Custom) — a Traditional Chinese marketing site for a China inbound travel agency. App-router Next.js site with client-side translation into 6 other languages, optimized for performance in mainland China (no Google Fonts, no Tailwind, BEM CSS, asset compression).

Routes (App Router, all under `app/`):

| Path | Source |
|---|---|
| `/` | `app/page.tsx` — hero, advantages, destination cards, testimonials, CTA |
| `/about` | `app/about/page.tsx` — copy + `WHY` / `SERVICES` / `FEATURES` arrays inlined in the file |
| `/contact` | `app/contact/page.tsx` — `<ContactView />` |
| `/chongqing`, `/sichuan`, `/zhangjiajie`, `/guizhou`, `/guangxi`, `/yunnan`, `/beijing`, `/xian` | each is a thin shell (~15 lines) that reads `DESTINATIONS[slug]` and renders `<DestinationView />` |

There are **no API routes, no DB, no auth, no tests**. It is a static-content site.

## Working principle: prefer existing dependencies

Before writing a custom implementation, check whether a battle-tested dependency already solves it:

- **For behavior / logic / utilities:** if `pnpm add <package>` would replace a meaningful chunk of hand-written code with a maintained module, do that instead. Don't reinvent common helpers (i18n engines, carousel/slider, modal/dialog, form validation, intersection observers, smooth-scroll, debounce/throttle, date formatting, etc.).
- **For styles / animations / UI primitives:** same rule — a small focused library beats hand-rolling CSS or vanilla JS. The BEM class-naming convention below applies to *class names*, not to whether you can adopt a small CSS / animation / layout primitive.
- **When in doubt, search first.** Check `node_modules` to see what's already installed, and the ecosystem to see what fits.
- **The canonical Next.js pattern always wins over ad-hoc workarounds.** See the "Translation engine" section below for a worked example.

Project-specific overrides (BEM class names, no Tailwind, no Google Fonts, pnpm-only) still hold — see Conventions and "Things to watch out for" below.

## Commands

```bash
pnpm install        # pnpm is required — see pnpm-workspace.yaml allowBuilds
pnpm dev            # next dev (localhost:3000)
pnpm build          # next build (verify before any commit touching app/ or components/)
pnpm start          # next start
pnpm lint           # eslint (eslint-config-next core-web-vitals + typescript)
```

There is no test command — the project ships no tests. Validate changes by running `pnpm build` (catches type errors) and `pnpm lint`.

## Common workflows

These come up often. Each is the shortest correct path.

### Add a new destination
1. Add an entry to `DESTINATIONS` in `app/destinations.ts` (follow the shape of `chongqing`)
2. `mkdir app/<slug>` and create `page.tsx` — copy any existing `<slug>/page.tsx` and change the slug + `metadata.title`
3. Add `{ href: "/<slug>", label: "..." }` to `TRAVEL_ITEMS` in `app/components/Navbar.tsx`
4. Add a `<li>` to the "快速鏈接" list in `app/components/Footer.tsx`
5. Add the slug to `translations.ts` for all 6 non-zh-TW languages (the home page in `app/page.tsx` also references the destination title — update the destination card there too)

### Add a new UI string
1. Write the **`zh-TW` string directly in the page/component** (this is the source of truth)
2. Add a translation key to `translations.ts` for each of `zh-CN`, `en`, `th`, `vi`, `ms`, `id` (use the `zh-TW` text as the lookup key, see how `app/page.tsx` strings are keyed)

### Add a new language
1. Add an entry to `LANGS` in `app/components/langs.ts` (with `flag` or `glyph`)
2. Add the code to `LANG_NAMES` in `app/components/translate-client.ts`
3. Add a flag SVG to `public/images/` (named `<code>.svg`) if using a flag
4. Bulk-add translations to `translations.ts` — expect a large diff

### Add a section to a destination page
The destinations are data-driven. Don't add JSX to `app/<slug>/page.tsx` — add a new field to the `Spot` type in `app/components/DestinationView.tsx` (exported as `export type`, see Notes) and render it in `<DestinationView />`.

## Architecture

### Stack
- **Next.js 16.2.10** (App Router only — no `pages/` directory) + **React 19.2.4** + **TypeScript 5** (strict)
- **ESLint 9** flat config (`eslint.config.mjs`) extending `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- **CSS:** hand-written BEM in `app/globals.css` (~35KB). `@tailwindcss/postcss` is in `devDependencies` but **`postcss.config.mjs` is intentionally empty** — Tailwind is not used. Do not add Tailwind utility classes.
- **Icons:** FontAwesome 6.5.1 loaded from `cdnjs.cloudflare.com` via `<link rel="stylesheet">` in `app/layout.tsx` (with `<link rel="preconnect">`)
- **Fonts:** system stack only (see `:root` in `app/globals.css`). See "Things to watch out for" #1 for why Google Fonts is rejected.

### Data layer
- **All destination content** (title, overview, ordered `Spot[]` with rank/title/subtitle/description/notes/closing/image, ctaBg) lives in **`app/destinations.ts`**. Each destination page is a shell that destructures one entry.
- **`Spot` type lives in `app/components/DestinationView.tsx`, not in `destinations.ts`** — it's re-exported via `export type Spot = {...}` and imported by `destinations.ts` with `import type`. The `type`-only import is what makes the circular reference work without bundling issues. Do not "fix" the circular import by moving the type — it will silently break the build.
- Photos referenced from data live in `public/images/` (already compressed).

### Translation engine (custom, client-side — see comparison below)
Not `next-intl`, not route-based. The system walks the rendered DOM and replaces text in selected tags against a hand-written dictionary:

- `app/components/langs.ts` — language list (`LANGS`, `DEFAULT_LANG = "zh-TW"`, `labelFor(code)`); `繁體中文` uses a `「繁」` glyph instead of a flag, by deliberate design
- `app/components/translations.ts` — large hardcoded `TRANSLATIONS` dict (zh-CN, en, th, vi, ms, id). Adding a string requires adding an entry here **per language**
- `app/components/translate-client.ts` — engine: `initTranslate()`, browser-lang auto-detect (first load only), `localStorage` persistence, restores original zh-TW text on switch back, "翻譯中..." state, scoped to a tag-selector list (`h1..h6, p, a, li, span, label, button, .btn, .testimonial-author, .spot-rank, .spot-subtitle, .footer-brand-title, td, th, dt, dd`)
- `app/components/TranslateInit.tsx` — `"use client"` component in the root layout that re-runs `initTranslate()` on every `usePathname()` change so SPA navigations get re-translated
- `app/components/LangSwitcher.tsx` (desktop) + `MobileLangSwitcher.tsx` — both render the same DOM structure (`#langSwitcher`, `#langBtn`, `#currentLang`, `#langDropdown`, `.lang-btn`) so the engine can target them by class/id from one place

### Layout & chrome
- `app/layout.tsx` — root layout. Notable decisions:
  - `<html lang="zh-TW" data-scroll-behavior="smooth">`
  - Preloads `/images/main-pic.jpg` (LCP) and FontAwesome CSS
  - `<Script id="body-home-class" strategy="beforeInteractive">` toggles `body.home-solid-nav` **on the home route only**. Destination pages must NOT have this class, otherwise `body:not(.home-solid-nav)` rules never match
  - `<TranslateInit />` mounted at the end of `<body>`
- `app/components/Navbar.tsx` — `"use client"`. Also toggles `home-solid-nav` on `usePathname()` change so SPA navigation stays consistent. Has dropdown, hamburger, scroll detection, and closes itself on route change. The `useEffect(() => setOpen(false), [pathname])` pattern looks like a "set state in effect" violation but is allowed because `eslint.config.mjs` explicitly turns off `react-hooks/set-state-in-effect` (sync local UI state to external route changes is the documented use case).
- `app/components/Footer.tsx`, `app/components/Cta.tsx` (background-image CTA reused on `/about` and home), `app/components/ScrollReveal.tsx` (IntersectionObserver wrapper honouring `prefers-reduced-motion`), `app/components/LangFlag.tsx` (renders flag image or glyph).

### Per-page patterns
- Destination pages: `import { DESTINATIONS } from "../destinations"` → pass `title/overview/spots/ctaBg` into `<DestinationView />` → `<Navbar />` then view, no `<Footer />` (it's inside `DestinationView`'s CTA section)
- Home / about / contact: each page renders its own sections directly plus `<Navbar />` + `<Footer />`

## Performance conventions (already in place — preserve them)

- Hero image preloaded via `<link rel="preload" as="image">` in root layout
- All below-fold `<img>` tags use `loading="lazy" decoding="async"` (and `eslint-disable-next-line @next/next/no-img-element` because Next wants `next/image`, but the team opted for plain `<img>` for control)
- FontAwesome loaded synchronously from CDN with preconnect — comment in `layout.tsx` explains why the `media="print" onload=` trick doesn't work in React JSX
- Body font is a system stack — never add a webfont

## Translation engine: current (custom) vs next-intl (canonical Next.js choice)

The Next.js 16 docs ([nextjs.org/docs/app/guides/internationalization](https://nextjs.org/docs/app/guides/internationalization)) do **not** ship built-in i18n in the App Router. They list **eight libraries** in their resources section and put **`next-intl` first** as the canonical choice. Below is an honest comparison between the current custom engine and `next-intl` (the two realistic options for this project).

| Dimension | Custom (current) | `next-intl` |
|---|---|---|
| **Initial render (per locale)** | zh-TW HTML, then JS swap → FOUC / CLS for non-zh-TW users | Server-rendered in the user's locale from byte 0 |
| **Bundle size** | All 7 languages ship to every visitor (~400KB `translations.ts`) | Only the active locale ships (tree-shaken) |
| **SEO** | Crawlers see zh-TW HTML only; no `hreflang` tags | Locale-prefixed URLs (`/en/about`) + `hreflang` + `alternates` |
| **URL structure** | Single URL (`/about`), language state in `localStorage` | Locale prefix required (`/en/about`, `/zh-TW/about`) — **breaks all existing share URLs and bookmarks** |
| **Static rendering** | Yes (all routes are static, all serve zh-TW) | Yes — `generateStaticParams` + `setRequestLocale` per locale |
| **Type safety** | `Record<string, string>` — no key checking | `useTranslations<T>` is type-safe by default |
| **Plurals / gender / selectors** | Manual | ICU MessageFormat built-in |
| **Date / number / currency formatting** | None | Built-in via `Intl.*` |
| **Server Components support** | No (engine is client-only) | Native — translations don't ship in JS at all if used in Server Components |
| **Adding a string** | Edit page + add 6 entries in `translations.ts` | Edit JSON dict (one file per locale) |
| **Switching cost from current state** | — | Medium-high (~2-3 days for a developer familiar with it) |

### What `next-intl` would require to switch

1. **URL structure decision** — either accept locale-prefixed URLs (`/en-US/about`) or accept a deeper rewrite; either way, set up 301 redirects from old URLs
2. Refactor `app/layout.tsx` → `app/[locale]/layout.tsx`, move all routes under `[locale]`
3. Set up `proxy.ts` (renamed from `middleware.ts` in Next 16) for locale detection
4. Replace `translations.ts` with per-locale JSON files in `messages/<locale>.json`
5. Replace hardcoded zh-TW in every page with `useTranslations()` (client) or `getTranslations()` (server) calls
6. Update `<Navbar>`, `<Footer>`, `<Cta>` to use translation hooks
7. Migrate `langs.ts` to next-intl's locale config format

### Recommendation

**Don't switch unless one of these is true:**

- **SEO is measurable and the zh-TW-only crawl is hurting** — Google will not index translated content; Baidu's behavior on translated pages is also weak
- **Bundle size is hurting mobile performance** — the 400KB `translations.ts` is the single biggest JS asset on the site
- **You need per-locale dates/numbers/currency** — e.g. pricing in CNY vs HKD vs USD with locale-correct formatting
- **You're adding more languages often** — the workflow is currently tedious

**When NOT to switch:**

- Single-URL shareability is a hard product requirement (deep links from WhatsApp, social, etc., are currently working and breaking them has real cost)
- The team has limited capacity for a rewrite
- `translations.ts` size hasn't been measured as a problem

**Middle-ground option to consider:** [paraglide-next](https://inlang.com/m/osslbuzt/paraglide-next-i18n) — also listed in the official Next.js docs, tree-shakeable like next-intl but supports a no-prefix URL pattern, so the URL structure could stay the same. Bundle size win without the SEO/URL migration cost.

## Conventions

- **BEM class names only.** No utility classes. New styles go in `app/globals.css`.
- **Traditional Chinese (`zh-TW`) is the source of truth.** Every UI string lives there first; other languages only exist in `translations.ts`. Do not hardcode zh-CN / English in pages.
- **Icons are FontAwesome** (`<i className="fas fa-..." />`). Don't introduce a different icon set.
- **`<img>` over `next/image`** by project choice. Preserve `loading="lazy" decoding="async"` and the eslint-disable comment pattern.
- **Each destination page is a shell + data lookup.** Do not duplicate content into the page file.
- **zh-TW first, then add translations** — write the zh-TW string directly in the JSX, then mirror it in `translations.ts` (see Common workflows).

## Things to watch out for

1. **Don't add Google Fonts.** `fonts.googleapis.com` times out in mainland China and breaks first paint.
2. **Don't enable Tailwind.** `postcss.config.mjs` is empty by design; `@tailwindcss/postcss` is a leftover from `create-next-app`.
3. **Don't drop `body.home-solid-nav` from destinations.** Without it the navbar active-link color rules don't apply. The class is toggled in two places: `app/layout.tsx` (inline `beforeInteractive` script for first paint) and `Navbar.tsx` (effect for SPA navigation). Both must stay in sync.
4. **pnpm is the only supported package manager** — `pnpm-workspace.yaml` enables `sharp` and `unrs-resolver` native builds. `npm install` may fail.
5. **Next.js 16 has breaking changes** from training-data defaults — always check `node_modules/next/dist/docs/` (sections: `01-getting-started`, `02-guides`, `03-api-reference`, `04-glossary.md`) before adding framework features. `AGENTS.md` reinforces this.
6. **The `Spot` type lives in `DestinationView.tsx` and is imported as `import type` in `destinations.ts`.** This circular reference is intentional and stable. Do not move the type to a shared file.
7. **`react-hooks/set-state-in-effect` is intentionally disabled** in `eslint.config.mjs`. `useEffect(() => setOpen(false), [pathname])` is the canonical pattern for syncing local UI state to route changes. Don't re-enable the rule.

## Repository layout (relevant only)

```
app/
  layout.tsx                  Root layout, font/icon strategy, body-class script
  page.tsx                    Home (hero / advantages / destinations / testimonials / CTA)
  globals.css                 All styles (~35KB, BEM)
  destinations.ts             Single source of truth for the 8 destination pages
  <slug>/page.tsx × 8         chongqing / sichuan / zhangjiajie / guizhou / guangxi / yunnan / beijing / xian
  about/page.tsx              About (inlines its own WHY/SERVICES/FEATURES arrays)
  contact/page.tsx            Contact shell → ContactView
  components/
    Navbar.tsx                "use client", path-aware body class + scroll state
    Footer.tsx                Static footer with hardcoded contact info
    Cta.tsx                   Reusable CTA section (background-image + phone)
    ScrollReveal.tsx          IntersectionObserver wrapper, honours reduced-motion
    DestinationView.tsx       Renders one destination; exports Spot type
    ContactView.tsx           Contact card grid
    TranslateInit.tsx         Re-inits translation engine on pathname change
    translate-client.ts       Engine: auto-detect, persistence, DOM swap, restore
    translations.ts           Hand-written dict, ~400KB (one entry per language per string)
    langs.ts                  LANGS list + DEFAULT_LANG + labelFor()
    LangSwitcher.tsx          Desktop dropdown
    MobileLangSwitcher.tsx    Mobile dropdown (same DOM contract as desktop)
    LangFlag.tsx              Renders flag image OR text glyph (for 繁體中文)
public/
  logo.jpg                    Site logo (replaced from logo.png for weight)
  icon.jpg                    Favicon (Next.js app/icon.jpg convention)
  images/                     Destination & content photos (compressed)
beijing/, guizhou/, xian/      Reference photo folders with Chinese filenames — not imported by code
```