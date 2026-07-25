"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LANGS, type Locale } from "@/i18n/locales";
import LangFlag from "./LangFlag";

export default function MobileLangSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLocale: Locale) => {
    if (newLocale === locale) return;
    router.replace(`/${newLocale}${pathname === "/" ? "" : pathname}`);
  };

  return (
    <div className="lang-switcher lang-switcher-mobile" id="langSwitcherMobile">
      <button
        type="button"
        className="lang-btn"
        id="langBtnMobile"
        aria-label="Switch language"
      >
        <i className="fas fa-globe" />
      </button>
      <ul className="lang-dropdown" id="langDropdownMobile">
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