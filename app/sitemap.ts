import type { MetadataRoute } from "next";
import { DESTINATION_SLUGS } from "@/app/[locale]/destinations";
import { routing } from "@/i18n/routing";

// Dynamic sitemap: enumerates every (locale, route) pair so search engines
// can discover all 91 generated pages. The base URL should match your
// production hostname — set NEXT_PUBLIC_SITE_URL in your deploy env or
// fall back to a sensible default.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haitao-travel.example.com";

const STATIC_ROUTES = ["", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${route}`]),
          ),
        },
      });
    }

    for (const slug of DESTINATION_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}/${slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
