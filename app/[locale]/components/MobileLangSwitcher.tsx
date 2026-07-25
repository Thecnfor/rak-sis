"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LANGS, type Locale } from "@/i18n/locales";
import LangFlag from "./LangFlag";

export default function MobileLangSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const switchTo = (newLocale: Locale) => {
    setOpen(false);
    if (newLocale === locale) return;
    router.replace(`/${newLocale}${pathname === "/" ? "" : pathname}`);
  };

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
    <div
      className="lang-switcher lang-switcher-mobile"
      id="langSwitcherMobile"
      ref={wrapperRef}
    >
      <button
        type="button"
        className="lang-btn"
        id="langBtnMobile"
        aria-label="Switch language"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <i className="fas fa-globe" />
      </button>
      <ul
        className={`lang-dropdown${open ? " show" : ""}`}
        id="langDropdownMobile"
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