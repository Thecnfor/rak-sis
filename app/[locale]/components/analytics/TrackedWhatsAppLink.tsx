"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { trackWhatsAppClick } from "./meta-pixel-client";

type Props = {
  children: ReactNode;
  ctaLocation: "navbar" | "footer" | "contact_card";
  className?: string;
  title?: string;
  rel?: string;
  target?: "_blank" | "_self";
};

export default function TrackedWhatsAppLink({
  children,
  ctaLocation,
  className,
  title,
  rel,
  target = "_blank",
}: Props) {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();

  return (
    <a
      href="https://wa.me/85284392791"
      target={target}
      rel={rel}
      title={title}
      className={className}
      // 保留原有跳转行为，同时在点击时补发 WhatsApp 联系事件。
      onClick={() => trackWhatsAppClick(pathname, ctaLocation, locale)}
    >
      {children}
    </a>
  );
}
