import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh-TW", "zh-CN", "en", "th", "vi", "ms", "id"] as const,
  defaultLocale: "zh-TW",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];