import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
        {/* Toggle `body.home-solid-nav` for the locale root only. Segment-
            count check works for /zh-TW, /zh-TW/, /en, /en/ (1 segment → set),
            and rejects /zh-TW/about, /en/chongqing (2 segments → unset). */}
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