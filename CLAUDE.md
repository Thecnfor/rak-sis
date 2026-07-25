# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Project-specific rules live in [`AGENTS.md`](./AGENTS.md) — read it before touching any code.

## What this project is

**海涛旅行定制** (Haitao Travel Custom) — a static, server-rendered marketing site for a China inbound travel agency. Next.js 16 App Router + next-intl. Source language is Traditional Chinese (`zh-TW`); translations ship in 6 more locales (zh-CN, en, th, vi, ms, id) under nested namespaces.

All user-facing routes live under `app/[locale]/`:

| Path | Source |
|---|---|
| `/<locale>` | `app/[locale]/page.tsx` — Home |
| `/<locale>/about` | `app/[locale]/about/page.tsx` |
| `/<locale>/contact` | `app/[locale]/contact/page.tsx` |
| `/<locale>/<slug>` (8 destinations) | `app/[locale]/<slug>/page.tsx` |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` |
| `/<locale>/opengraph-image` | `app/[locale]/opengraph-image.tsx` (1200×630 PNG) |

The root `/` 307-redirects to `/zh-TW/` via `proxy.ts` at project root (Next 16 renamed middleware → proxy).

There are **no API routes, no DB, no auth, no tests**.

## Working principle: prefer existing dependencies

Before writing a custom implementation, check whether a battle-tested dependency already solves it:

- **Behavior / logic / utilities:** if `pnpm add <package>` would replace ≥30 lines of hand-written code with a maintained module, do that instead.
- **Styles / animations / UI primitives:** same rule. The BEM class-naming convention applies to *class names*, not to whether you can adopt a small CSS / animation / layout primitive.
- **When in doubt, search first.** Check `node_modules` to see what's already installed.
- **The canonical Next.js pattern always wins over ad-hoc workarounds.** See the translation system below — we ship `next-intl` instead of a custom DOM-walking engine.

Project-specific overrides (BEM class names, no Tailwind, no Google Fonts, pnpm-only) still hold — see Conventions and "Things to watch out for".

## Commands

```bash
pnpm install        # pnpm only — see pnpm-workspace.yaml allowBuilds
pnpm dev            # next dev (localhost:3000)
pnpm build          # next build (type-checks too)
pnpm start          # next start
pnpm lint           # eslint (next/core-web-vitals + next/typescript)
```

No tests. Validate with `pnpm build` + `pnpm lint`.

## Common workflows

### Add a new destination
1. `mkdir app/[locale]/<slug>/` and create `page.tsx` that reads `DESTINATIONS.<slug>` and renders `<DestinationView data={DESTINATIONS.<slug>} />`.
2. Add the slug to `DESTINATIONS` in `app/[locale]/destinations.ts` (5 spots, each `{ rank, image }`).
3. Add the slug to `Navbar.tsx`'s `TRAVEL_SLUGS` array.
4. Add the slug + slug's display name to all 7 `messages/<locale>.json` under:
   - `Navbar.travel.<slug>` (label used in the nav dropdown)
   - `Footer.quickItems.<slug>` (footer link)
   - `Destinations.<slug>.title` (h1)
   - `Destinations.<slug>.overview` (paragraph)
   - `Destinations.<slug>.spots.<1..5>.{title,subtitle,description,notes[],closing}`

### Add a new UI string (chrome)
1. Write the **zh-TW** string in the page/component JSX.
2. Add the same string as a key in all 7 `messages/<locale>.json` files (or as a value under the appropriate namespace).
3. Wire it up via `t("Section.path.to.key")` in the component.

### Add a new language
1. Add to `routing.locales` in `i18n/routing.ts`.
2. Add to `LANGS` in `i18n/locales.ts` (with `flag` or `glyph`).
3. Add flag SVG to `public/images/<code>.svg` if using a flag.
4. Create `messages/<locale>.json` (clone an existing file and translate).

### Add a new section to a destination page
1. Add a new field to `SpotMeta` in `app/[locale]/destinations.ts`.
2. Render it in `DestinationView.tsx`.
3. Add the corresponding key to all 7 message files under `Destinations.<slug>.spots.<rank>.<field>`.

## Architecture

### Stack
- **Next.js 16.2.10** (App Router only — no `pages/`) + **React 19.2.4** + **TypeScript 5** strict
- **ESLint 9** flat config + `eslint-config-next/{core-web-vitals,typescript}`
- **next-intl 4.13.4** for i18n (locale-prefixed routing, server-side translation)
- **CSS:** hand-written BEM in `app/globals.css` (~35KB). `postcss.config.mjs` is intentionally empty.
- **Icons:** FontAwesome 6.5.1 from cdnjs with `<link rel="preconnect">` (sync, no JS trick)
- **Fonts:** system stack only (see `:root` in `globals.css`)
- **Output:** `output: "standalone"` in `next.config.ts`

### i18n config (`i18n/`)
- `routing.ts` — `defineRouting({ locales, defaultLocale: 'zh-TW', localePrefix: 'always' })`
- `request.ts` — `getRequestConfig` per-request
- `navigation.ts` — `createNavigation(routing)` → locale-aware `Link`, `useRouter`, `usePathname`, `redirect`
- `locales.ts` — `LANGS` + `labelFor(code)`

### Message catalogs (`messages/<locale>.json`)
Nested namespace structure (NOT flat zh-TW keys). Top-level keys: `Metadata`, `Navbar`, `Footer`, `Home`, `About`, `Contact`, `DestinationView`, `Destinations`, `Cta`, `Locales`. See "Common workflows" above for how to extend.

### Translation lookup pattern
- **Server components:** `const t = await getTranslations("Navbar"); t("brand")` returns the locale-specific string. For per-destination: `getTranslations(`Destinations.${slug}`)`.
- **Client components:** `const t = useTranslations("Navbar");` (same API).
- **ICU MessageFormat:** `t("rankLabel", { rank: 5 })` interpolates `{rank}` placeholders. Supported out of the box.
- **Arrays:** use `t.raw("path")` to get the raw array (e.g. `notes` on spots).

### Routing (`proxy.ts` at project root)
Next 16 renamed `middleware.ts` → `proxy.ts`. This file uses `createMiddleware(routing)` from `next-intl/middleware`. Unprefixed URLs (`/about`) automatically 307-redirect to `/zh-TW/about`.

### `home-solid-nav` body class
Toggled in two places, must stay in sync:
1. `app/[locale]/layout.tsx` — inline `beforeInteractive` script checks segment count on first paint.
2. `app/[locale]/components/Navbar.tsx` — `useEffect` keeps it in sync across SPA navigations.

The class is required for `body:not(.home-solid-nav) .nav-link.active` selectors — destination pages must NOT have it.

### Per-page patterns
- **Destination pages** — async server, `setRequestLocale(locale)`, renders `<Navbar /><DestinationView data={DESTINATIONS.<slug>} />`.
- **Home / About / Contact** — async server, render their own sections plus `<Navbar /><Footer />`.

## Performance conventions (preserve)

- Hero image preloaded via `<link rel="preload" as="image">` in locale layout
- Below-fold `<img>` tags use `loading="lazy" decoding="async"` + `eslint-disable-next-line @next/next/no-img-element` (project chose `<img>` over `next/image`)
- FontAwesome loaded synchronously from CDN with preconnect (no `media="print" onload=` — doesn't work in JSX)
- Body font is system stack — **never add a webfont**

## Conventions

- **BEM class names only.** No utility classes. New styles go in `app/globals.css`.
- **Traditional Chinese (`zh-TW`) is the source of truth.** Every UI string lives there first; other languages live in `messages/<locale>.json`. Do not hardcode zh-CN/English in pages.
- **Icons are FontAwesome** (`<i className="fas fa-..." />`). Don't introduce a different icon set.
- **`<img>` over `next/image`** by project choice. Preserve `loading="lazy" decoding="async"` and the eslint-disable comment pattern.
- **Each destination page is a shell + data lookup.** Do not duplicate content into the page file.

## Things to watch out for

1. **Don't add Google Fonts.** `fonts.googleapis.com` times out in mainland China and breaks first paint.
2. **Don't enable Tailwind.** `postcss.config.mjs` is empty by design.
3. **Don't drop `body.home-solid-nav` from destinations.** Without it the navbar active-link color rules don't apply. The class is toggled in two places (layout script + Navbar effect) — both must stay in sync.
4. **pnpm is the only supported package manager** — `pnpm-workspace.yaml` enables `sharp` and `unrs-resolver` native builds. `npm install` will fail.
5. **Next.js 16 has breaking changes** — always check `node_modules/next/dist/docs/` (sections: `01-getting-started`, `02-guides`, `03-api-reference`, `04-glossary.md`) before adding framework features. `AGENTS.md` reinforces this.
6. **Middleware file is `proxy.ts`, not `middleware.ts`** — Next 16 renamed it. Place at project root.
7. **`react-hooks/set-state-in-effect` is intentionally disabled** in `eslint.config.mjs`. The `useEffect(() => setOpen(false), [pathname])` pattern in `Navbar` is allowed; don't re-enable the rule.
8. **`output: "standalone"`** in `next.config.ts` produces a self-contained build. Don't remove it without updating deployment docs.

## CI / Deployment

- `.github/workflows/ci.yml` runs `pnpm install → pnpm lint → pnpm build` on every PR.
- `NEXT_PUBLIC_SITE_URL` env var sets the canonical site URL (used by sitemap, robots, OG metadata). Defaults to `https://haitao-travel.example.com` for local builds.
- For self-hosted deploy: `node .next/standalone/server.js` with `public/` and `.next/static/` alongside.