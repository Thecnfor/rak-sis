# Repository Guidelines

## Project Overview

`rak-sis` is the multilingual marketing site for 海涛旅行定制 (Haitao Travel Custom), a China inbound-travel agency. It is a statically generated Next.js 16 App Router application with seven locales: `zh-TW`, `zh-CN`, `en`, `th`, `vi`, `ms`, and `id`. Traditional Chinese (`messages/zh-TW.json`) is the content source of truth.

The application has no API routes, database, authentication, server actions, shared client store, or internal service layer. Runtime content comes from TypeScript metadata, locale JSON, and assets under `public/`; the contact form posts directly to FormSubmit.

## Architecture & Data Flow

1. `proxy.ts` applies next-intl locale routing. URLs always carry a locale prefix; locale detection falls back to `zh-TW`.
2. `i18n/request.ts` validates the requested locale and dynamically loads `messages/<locale>.json`.
3. `app/[locale]/layout.tsx` enumerates static locale params, rejects unsupported locales, calls `setRequestLocale`, and provides messages through `NextIntlClientProvider`.
4. Route pages are thin Server Components. Destination pages select structural data from `app/[locale]/destinations.ts` and pass it to `DestinationView`, which joins it with translated copy from `messages/*.json`.
5. Client behavior is isolated to small components such as `Navbar`, language switchers, `ContactView`, `ScrollReveal`, and the route error boundary. State stays local; effects clean up listeners and observers.
6. `app/sitemap.ts`, `app/robots.ts`, and `app/[locale]/opengraph-image.tsx` generate metadata assets at build time.

Important boundaries and synchronization rules:

- Keep locale-independent destination structure in `destinations.ts`; keep all prose in `messages/*.json`.
- Use the locale-aware exports from `i18n/navigation.ts` instead of raw Next navigation APIs. `notFound` in the locale layout is a deliberate exception.
- When adding a destination, update `DESTINATIONS`, `Navbar.tsx`'s `TRAVEL_SLUGS`, `app/sitemap.ts`'s `DESTINATION_SLUGS`, the route shell, and matching keys in all seven catalogs.
- When adding a locale, update `i18n/routing.ts`, `i18n/locales.ts`, its message catalog, and its flag/glyph asset.
- The `body.home-solid-nav` behavior exists in both `layout.tsx` and `Navbar.tsx`; preserve both paths when changing navigation styling.

## Key Directories

| Path | Purpose |
| --- | --- |
| `app/` | App Router root, global CSS, sitemap, robots, and icon. |
| `app/[locale]/` | All user-facing routes, locale layout, loading/not-found/error boundaries, and destination metadata. |
| `app/[locale]/components/` | Shared Server Components and focused client interaction islands. |
| `i18n/` | Locale routing, request-time message loading, navigation wrappers, and language display metadata. |
| `messages/` | One schema-aligned JSON catalog per locale; `zh-TW.json` is canonical. |
| `public/images/` | Runtime assets grouped by purpose: destinations, locales, branding, heroes, people, and contact media. |
| `.github/workflows/` | CI definition; currently lint and production build only. |

There is intentionally no `src/`, API, database, scripts, migrations, or test directory.

## Development Commands

Use Node 22 and pnpm 10 or newer.

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies and allowed native builds. |
| `pnpm install --frozen-lockfile` | Reproduce the CI installation. |
| `pnpm dev` | Run the development server at `http://localhost:3000`. |
| `pnpm lint` | Run ESLint 9 with Next core-web-vitals and TypeScript rules. |
| `pnpm build` | Type-check and create the production/standalone build. |
| `pnpm start` | Run the production server from the Next build. |

No `test`, `typecheck`, `format`, or `lint:fix` script is configured. Do not invent script names; use the commands above.

## Code Conventions & Common Patterns

- TypeScript is strict. Use typed props, named shared domain types, `as const` for literal membership, `PascalCase` components/types, `UPPER_SNAKE_CASE` shared constants, and `camelCase` locals.
- Use `@/` for imports across root-level areas and relative imports within a route subtree.
- Server Components are the default. Add `"use client"` only for hooks, browser APIs, event handlers, or client error recovery.
- Next 16 route params are promises in this codebase: type and `await` them. Locale pages call `setRequestLocale(locale)` before translation/rendering work.
- Server Components use `await getTranslations(...)`; Client Components use `useTranslations(...)`. Add strings to `zh-TW` first, then mirror the same key schema to all catalogs. Use ICU values and `t.raw(...)` for structured arrays rather than hardcoded localized text.
- Async code uses direct `async`/`await`. There are no retry or promise-wrapper abstractions.
- Dependency flow is explicit through typed props. Do not introduce a DI container or global state for route-local data.
- Error handling is framework-led: invalid locales use `notFound()`, while `error.tsx` logs only the safe digest and exposes `reset()`. Do not leak full production errors.
- CSS is handwritten BEM-style CSS in `app/globals.css`, with 2-space indentation, LF endings, and UTF-8. Tailwind is intentionally not active; `postcss.config.mjs` must remain empty unless the styling architecture is deliberately changed.
- Preserve the system font stack; do not add Google Fonts. Existing `<img>` usage is intentional. Below-fold images use `loading="lazy"` and `decoding="async"`; the hero is preloaded by the locale layout.
- Effects must remove event listeners, observers, and other browser resources during cleanup. Client state is component-local; refs hold DOM nodes.

## Important Files

| File | Role |
| --- | --- |
| `app/[locale]/layout.tsx` | Locale validation, static params, metadata, i18n provider, and global resource loading. |
| `app/[locale]/destinations.ts` | Typed, locale-independent destination and spot metadata. |
| `app/[locale]/components/DestinationView.tsx` | Shared destination renderer that combines metadata and translations. |
| `app/[locale]/components/Navbar.tsx` | Main client state/effect pattern and destination navigation list. |
| `i18n/routing.ts` | Supported locales, default locale, and required prefix policy. |
| `i18n/request.ts` | Per-request locale validation and message loading. |
| `i18n/navigation.ts` | Locale-aware links, router, pathname, and redirect facade. |
| `messages/zh-TW.json` | Canonical translation schema and source copy. |
| `proxy.ts` | Next 16 locale proxy; this replaces the older `middleware.ts` convention. |
| `next.config.ts` | next-intl plugin, standalone output, strict mode, and global security headers. |
| `package.json` | Authoritative scripts, versions, and Node/pnpm engine requirements. |
| `eslint.config.mjs` | Flat lint config; intentionally disables `react-hooks/set-state-in-effect` for the Navbar pathname synchronization pattern. |
| `.github/workflows/ci.yml` | Frozen install, lint, build, and `.next` artifact upload. |

## Runtime/Tooling Preferences

- Required runtime: Node `22` (`.nvmrc`, `engines.node >=22`). Required package manager: pnpm `>=10`.
- `pnpm-lock.yaml` is authoritative. Do not use npm or update the stray `package-lock.json`; pnpm's native-build allowlist is required by the framework toolchain.
- Framework versions are Next.js `16.2.10`, React `19.2.4`, next-intl `4.13.4`, and TypeScript 5. This Next.js version has breaking API and file-convention changes. **Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code and heed deprecation notices.** In particular, locale middleware belongs in root `proxy.ts`, not `middleware.ts`.
- `tsconfig.json` maps `@/*` to the repository root and uses bundler resolution, isolated modules, and no emit.
- No formatter is configured. Follow `.editorconfig`; do not apply unrelated reformatting.
- `NEXT_PUBLIC_SITE_URL` controls canonical metadata, robots, sitemap URLs, and the localized FormSubmit success redirect. `NEXT_PUBLIC_META_PIXEL_ID` enables browser-side Meta Pixel tracking. Both are documented in `.env.example`.
- Production output uses `output: "standalone"`. Preserve the response security headers in `next.config.ts`.
- `next-env.d.ts` and `.next/` are generated; never edit them.

## Testing & QA

There is currently no unit, integration, or end-to-end test framework, no test files, and no coverage configuration or threshold. The enforced QA gate is CI parity:

```bash
pnpm install --frozen-lockfile
pnpm lint
NEXT_PUBLIC_SITE_URL=https://haitao-travel.example.com pnpm build
```

`pnpm build` is the repository's type-check step. For UI changes, also run `pnpm dev` and manually exercise the affected locale route, navigation state, responsive layout, and form/animation behavior as applicable. If introducing tests, add the framework, scripts, file conventions, and coverage policy explicitly rather than assuming Jest, Vitest, Playwright, or Cypress is present.
