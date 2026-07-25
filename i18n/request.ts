import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,

    // The legacy translations.ts dictionary had gaps — some zh-TW keys
    // don't have entries for every locale. When next-intl hits a missing
    // key, fall back to the source text instead of throwing. This
    // preserves the old engine's "missing → use zh-TW" semantics.
    getMessageFallback: ({ key, namespace }) => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      console.warn(
        `[next-intl] Missing translation for "${fullKey}" in locale "${locale}". Falling back to source.`,
      );
      return key;
    },
  };
});