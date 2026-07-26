"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";
import { getDocumentLocale, trackRouteEvents } from "./meta-pixel-client";

export default function MetaPixelRouteTracker() {
  const pathname = usePathname() ?? "/";
  const lastTrackedPathRef = useRef<string>("");

  useEffect(() => {
    const locale = getDocumentLocale();
    const trackKey = `${locale}:${pathname}`;

    if (lastTrackedPathRef.current === trackKey) {
      return;
    }

    // App Router 下页面切换多为客户端导航，这里负责补齐每次切换的浏览事件。
    lastTrackedPathRef.current = trackKey;
    trackRouteEvents(pathname, locale);
  }, [pathname]);

  return null;
}
