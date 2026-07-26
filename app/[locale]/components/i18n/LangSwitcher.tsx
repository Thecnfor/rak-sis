"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LANGS, labelFor, type Locale } from "@/i18n/locales";
import LangFlag from "./LangFlag";

export default function LangSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const switchTo = (newLocale: Locale) => {
    setOpen(false);
    if (newLocale === locale) return;
    // 这里传入“去掉 locale 前缀”的 pathname，并显式指定 locale，
    // 避免 next-intl 在当前语言前缀外再拼一层，变成重复前缀路径。
    router.replace(pathname === "/" ? "/" : pathname, {
      locale: newLocale,
    });
  };

  // 点击组件外部区域时，自动关闭下拉菜单。
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="lang-switcher" id="langSwitcher" ref={wrapperRef}>
      <button
        type="button"
        className="lang-btn"
        id="langBtn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <i className="fas fa-globe" />{" "}
        <span id="currentLang">{labelFor(locale)}</span>{" "}
        <i className="fas fa-chevron-down" />
      </button>
      <ul
        className={`lang-dropdown${open ? " show" : ""}`}
        id="langDropdown"
        role="listbox"
      >
        {LANGS.map((l) => (
          <li
            key={l.code}
            data-lang={l.code}
            className={l.code === locale ? "active" : ""}
            role="option"
            aria-selected={l.code === locale}
            onClick={() => switchTo(l.code)}
          >
            <LangFlag lang={l} />
            {l.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
