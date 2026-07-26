"use client";

import { useLayoutEffect } from "react";
import MetaPixelNoscript from "./MetaPixelNoscript";

type Props = {
  pixelId?: string;
};

type MetaPixelStub = NonNullable<Window["fbq"]> & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => number;
};

export default function MetaPixelProvider({ pixelId }: Props) {
  useLayoutEffect(() => {
    if (typeof window === "undefined" || !pixelId) {
      return;
    }

    if (!window.fbq) {
      const fbq = (function (...args: unknown[]) {
        if (fbq.callMethod) {
          fbq.callMethod(...args);
          return;
        }

        fbq.queue?.push(args);
      }) as MetaPixelStub;

      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.push = (...args: unknown[]) => fbq.queue?.push(args) ?? 0;
      window.fbq = fbq;
      window._fbq = fbq;
    }

    const existingScript = document.getElementById("meta-pixel-base");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "meta-pixel-base";
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }

    window.fbq("init", pixelId);
  }, [pixelId]);

  // 没有配置 Pixel ID 时，直接静默跳过埋点初始化。
  if (!pixelId) {
    return null;
  }

  return (
    <>
      <MetaPixelNoscript pixelId={pixelId} />
    </>
  );
}
