import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const securityHeaders = [
  // Prevent MIME-type sniffing (XSS mitigation).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block clickjacking by disallowing iframe embedding.
  { key: "X-Frame-Options", value: "DENY" },
  // Strict referrer policy — only send full URL to same origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict powerful browser features we don't use.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS — force HTTPS for 1 year. Only meaningful when served over HTTPS.
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework version in the response header.
  poweredByHeader: false,

  // Strict security headers on every response.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // React strict mode catches unsafe lifecycle / effect patterns.
  reactStrictMode: true,

  // Quiet down noisy dev logs that aren't actionable.
  logging: {
    fetches: { fullUrl: false },
  },
};

export default withNextIntl(nextConfig);