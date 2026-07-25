"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LANGS, labelFor, type Locale } from "@/i18n/locales";
import LangFlag from "./LangFlag";

export default function LangSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLocale: Locale) => {
    if (newLocale === locale) return;
    // pathname is already locale-stripped by next-intl/navigation
    // (e.g. "/about" not "/zh-TW/about"). Re-prefix with the new locale.
    router.replace(`/${newLocale}${pathname === "/" ? "" : pathname}`);
  };

  return (
    <div className="lang-switcher" id="langSwitcher">
      <button type="button" className="lang-btn" id="langBtn">
        <i className="fas fa-globe" />{" "}
        <span id="currentLang">{labelFor(locale)}</span>{" "}
        <i className="fas fa-chevron-down" />
      </button>
      <ul className="lang-dropdown" id="langDropdown">
        {LANGS.map((l) => (
          <li
            key={l.code}
            data-lang={l.code}
            className={l.code === locale ? "active" : ""}
          >
            <button
              type="button"
              className="lang-li-btn"
              onClick={() => switchTo(l.code)}
            >
              <LangFlag lang={l} />
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}