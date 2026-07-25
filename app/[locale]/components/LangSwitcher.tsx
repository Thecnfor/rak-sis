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
    // Pass the locale-stripped pathname with an explicit `locale` option so
    // next-intl's router doesn't double-prefix with the current locale.
    // (`router.replace("/zh-TW/about")` would be treated as a relative
    // path and get prefixed with the current locale → "/zh-CN/zh-TW/about".)
    router.replace(pathname === "/" ? "/" : pathname, {
      locale: newLocale,
    });
  };

  // Close dropdown when clicking outside the wrapper.
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