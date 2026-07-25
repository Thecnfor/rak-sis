import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  // The locale is read inside the default export below; generateMetadata
  // only needs title/description which are locale-agnostic.
  await params;
  return {
    title: "海涛旅行定制",
    description:
      "海涛旅行定制，品質無憂，純玩無購物。提供中國著名景點的旅遊服務和攻略，包括重庆、張家界、雲南、四川、廣西等多個目的地。",
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
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Required for static rendering — tells next-intl which locale to use
  // when next-intl APIs are called from descendants.
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        {/* Preload the hero background image so LCP starts downloading
            with the HTML, before CSS even parses. */}
        <link
          rel="preload"
          as="image"
          href="/images/main-pic.jpg"
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
        {/* Toggle `body.home-solid-nav` for the locale root only. The class
            is required by CSS rules like body:not(.home-solid-nav) .nav-link.active,
            which must NOT match on destination pages. Segment-count check
            works for /zh-TW, /zh-TW/, /en, /en/, and rejects /zh-TW/about. */}
        <Script id="body-home-class" strategy="beforeInteractive">
          {`(function(){
            var segs = location.pathname.split('/').filter(Boolean);
            document.body.classList.toggle('home-solid-nav', segs.length === 1);
          })();`}
        </Script>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}