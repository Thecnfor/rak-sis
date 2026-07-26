import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import MetaPixelProvider from "./components/analytics/MetaPixelProvider";
import MetaPixelRouteTracker from "./components/analytics/MetaPixelRouteTracker";
import BodyHomeClassSync from "./components/ui/BodyHomeClassSync";
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
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        {/* 预加载首页主视觉背景图，让 LCP 资源尽早开始下载。 */}
        <link
          rel="preload"
          as="image"
          href="/images/heroes/main-pic.jpg"
          fetchPriority="high"
        />
        {/* FontAwesome 通过 CDN 直接加载，并提前建立连接。 */}
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* 这里刻意不接入 Google Fonts，避免在中国大陆等网络环境下
            因外部字体超时拖慢首屏；站点统一使用系统字体栈。 */}
      </head>
      <body suppressHydrationWarning>
        {/* 在 layout 层首屏同步 body.home-solid-nav；Navbar 继续负责后续
            SPA 导航过程中的状态保持。 */}
        <BodyHomeClassSync />
        <MetaPixelProvider pixelId={metaPixelId} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MetaPixelRouteTracker />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
