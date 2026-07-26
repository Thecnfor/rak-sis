"use client";

import { isDestinationSlug } from "../../destinations";
import { routing } from "@/i18n/routing";

declare global {
  interface Window {
    fbq?: (
      action: "init" | "track" | "trackCustom",
      eventName: string,
      payload?: MetaPixelPayload,
    ) => void;
    _fbq?: unknown;
  }
}

export type MetaPixelPayload = Record<
  string,
  string | number | boolean | null | undefined
>;

export type RouteContext = {
  locale: string;
  normalizedPath: string;
  pageType: "home" | "destination" | "contact" | "contact_success" | "about" | "page";
  contentName?: string;
};

type WhatsAppLocation = "navbar" | "footer" | "contact_card";

function hasMetaPixel() {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

function stripLocalePrefix(pathname: string) {
  const cleanPath = pathname.split("?")[0] || "/";
  const segments = cleanPath.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (
    first &&
    routing.locales.includes(first as (typeof routing.locales)[number])
  ) {
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }

  return cleanPath || "/";
}

export function getDocumentLocale() {
  if (typeof document === "undefined") {
    return routing.defaultLocale;
  }

  const lang = document.documentElement.lang;
  return routing.locales.includes(lang as (typeof routing.locales)[number])
    ? lang
    : routing.defaultLocale;
}

export function getRouteContext(pathname: string, locale = getDocumentLocale()): RouteContext {
  const normalizedPath = stripLocalePrefix(pathname);
  const segments = normalizedPath.split("/").filter(Boolean);

  if (normalizedPath === "/") {
    return { locale, normalizedPath, pageType: "home" };
  }

  if (normalizedPath === "/contact") {
    return { locale, normalizedPath, pageType: "contact" };
  }

  if (normalizedPath === "/contact/success") {
    return { locale, normalizedPath, pageType: "contact_success" };
  }

  if (normalizedPath === "/about") {
    return { locale, normalizedPath, pageType: "about" };
  }

  if (segments.length === 1) {
    const [slug] = segments;
    if (slug && isDestinationSlug(slug)) {
      return {
        locale,
        normalizedPath,
        pageType: "destination",
        contentName: slug,
      };
    }
  }

  return { locale, normalizedPath, pageType: "page" };
}

function track(action: "track" | "trackCustom", eventName: string, payload?: MetaPixelPayload) {
  if (!hasMetaPixel()) {
    return;
  }

  window.fbq?.(action, eventName, payload);
}

function buildBasePayload(context: RouteContext): MetaPixelPayload {
  return {
    event_source: "meta_pixel_browser",
    locale: context.locale,
    page_type: context.pageType,
  };
}

export function trackPageView() {
  track("track", "PageView");
}

export function trackCustomEvent(eventName: string, payload?: MetaPixelPayload) {
  track("trackCustom", eventName, payload);
}

export function trackRouteEvents(pathname: string, locale = getDocumentLocale()) {
  const context = getRouteContext(pathname, locale);
  const basePayload = buildBasePayload(context);

  // 所有页面都先发送标准 PageView，再根据页面类型追加更细的事件。
  trackPageView();

  if (context.pageType === "home") {
    trackCustomEvent("ViewHomePage", basePayload);
    return;
  }

  if (context.pageType === "contact") {
    trackCustomEvent("ViewContactPage", basePayload);
    return;
  }

  if (
    context.pageType === "destination" &&
    context.contentName &&
    isDestinationSlug(context.contentName)
  ) {
    track("track", "ViewContent", {
      ...basePayload,
      content_type: "destination",
      content_name: context.contentName,
      content_category: "travel_destination",
    });
  }
}

export function trackWhatsAppClick(
  pathname: string,
  ctaLocation: WhatsAppLocation,
  locale = getDocumentLocale(),
) {
  const context = getRouteContext(pathname, locale);
  const payload = {
    ...buildBasePayload(context),
    contact_method: "whatsapp",
    cta_location: ctaLocation,
  };

  track("track", "Contact", payload);
  trackCustomEvent("WhatsAppClick", payload);
}

export function trackLeadContactForm(locale = getDocumentLocale()) {
  track("track", "Lead", {
    event_source: "meta_pixel_browser",
    locale,
    page_type: "contact_success",
    lead_type: "contact_form",
  });
}
