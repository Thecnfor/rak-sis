import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

type ParamsWithLocale = Promise<{ locale: string }>;

export function getLocaleStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function resolveLocale<T extends { locale: string }>(
  params: Promise<T>,
): Promise<Omit<T, "locale"> & { locale: Locale }> {
  const resolved = await params;

  if (!hasLocale(routing.locales, resolved.locale)) {
    notFound();
  }

  setRequestLocale(resolved.locale);

  return resolved as Omit<T, "locale"> & { locale: Locale };
}

export async function bootstrapLocale(params: ParamsWithLocale): Promise<Locale> {
  const { locale } = await resolveLocale(params);
  return locale;
}
