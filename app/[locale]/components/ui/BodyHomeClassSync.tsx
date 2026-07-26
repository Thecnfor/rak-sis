"use client";

import { useLayoutEffect } from "react";

export default function BodyHomeClassSync() {
  useLayoutEffect(() => {
    // 在布局层首屏同步 body 类，避免内联 script 带来的客户端警告。
    const segs = window.location.pathname.split("/").filter(Boolean);
    document.body.classList.toggle("home-solid-nav", segs.length === 1);
  }, []);

  return null;
}
