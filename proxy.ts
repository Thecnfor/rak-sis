import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. This file is the
// single entry point that decides which locale a request belongs to.
//
// Behavior:
//   /            → 307 redirect to /<defaultLocale>/
//   /about       → 307 redirect to /<defaultLocale>/about
//   /zh-TW/about → serve as-is
//   /en/about    → serve as-is
//   /fr/about    → 404 (unsupported locale)
//
// Locale detection order (handled by createMiddleware):
//   1. NEXT_LOCALE cookie (set by next-intl Link/navigation on switch)
//   2. Accept-Language header
//   3. defaultLocale (zh-TW)
export default createMiddleware(routing);

export const config = {
  // Match everything except Next.js internals and static files.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};