import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import BodyHomeClassSync from "./components/BodyHomeClassSync";
import {
  getLocaleStaticParams,
  resolveLocale,
} from "./locale-bootstrap";
import "../globals.css";

export function generateStaticParams() {
  return getLocaleStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://haitao-travel.example.com",
    ),
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: t("title"),
      locale: "zh_TW",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: "/",
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await resolveLocale(params);
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        {/* Preload the hero background image so LCP starts downloading
            with the HTML, before CSS even parses. */}
        <link
          rel="preload"
          as="image"
          href="/images/heroes/main-pic.jpg"
          fetchPriority="high"
        />
        {/* FontAwesome CDN — synchronous load with preconnect to make
            the TLS handshake cheap. The media="print" onload= trick
            doesn't work in JSX (treated as string, not event handler). */}
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* NOTE: Google Fonts is intentionally NOT loaded here.
            fonts.googleapis.com frequently times out in mainland China
            and other restricted networks, blocking first paint. The site
            uses a system font stack — see :root font-family in globals.css. */}
      </head>
      <body suppressHydrationWarning>
        {/* 在 layout 层首屏同步 body.home-solid-nav；Navbar 继续负责后续
            SPA 导航过程中的状态保持。 */}
        <BodyHomeClassSync />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
