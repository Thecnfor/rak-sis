import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haitao-travel.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

// Use this elsewhere if you need the canonical site URL (e.g. for
// `alternates.canonical` in metadata).
export const SITE_URL_EXPORT = SITE_URL;
// Reference routing so tree-shaking doesn't drop it during build.
void routing;