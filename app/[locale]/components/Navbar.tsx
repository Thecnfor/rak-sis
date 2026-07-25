"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LangSwitcher from "./LangSwitcher";
import MobileLangSwitcher from "./MobileLangSwitcher";

const TRAVEL_SLUGS = [
  "chongqing",
  "sichuan",
  "zhangjiajie",
  "guizhou",
  "guangxi",
  "yunnan",
  "beijing",
  "xian",
] as const;

export default function Navbar() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // `usePathname` from next-intl/navigation already strips the locale
  // prefix — pathname is "/about" not "/zh-TW/about".
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const dropdownRef = useRef<HTMLLIElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const MAIN_ITEMS = [
    { href: "/", label: t("首頁") },
    { href: "/about", label: t("關於我們") },
    { href: "/contact", label: t("聯系我們") },
  ];

  const TRAVEL_ITEMS = TRAVEL_SLUGS.map((slug) => ({
    href: `/${slug}`,
    // Each translation key matches the existing zh-TW label in Navbar's old TRAVEL_ITEMS.
    label: t(
      {
        chongqing: "重庆旅遊",
        sichuan: "四川旅遊",
        zhangjiajie: "張家界旅遊",
        guizhou: "貴州旅遊",
        guangxi: "廣西旅遊",
        yunnan: "云南旅游",
        beijing: "北京旅遊",
        xian: "西安旅遊",
      }[slug],
    ),
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep <body class="home-solid-nav"> in sync with the current route.
  // The initial value is set by an inline script in the locale layout, but
  // client-side navigation between pages does not re-run that script.
  // Destination pages must NOT have this class, otherwise the
  // body:not(.home-solid-nav) rules (e.g. active-link color) never match.
  useEffect(() => {
    document.body.classList.toggle("home-solid-nav", isHome);
  }, [isHome]);

  const isTravelActive = TRAVEL_ITEMS.some(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(item.href + "/"),
  );

  // close menus when route changes
  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // close mobile menu and dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        navLinksRef.current &&
        !navLinksRef.current.contains(target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(target)
      ) {
        setOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
      <div className="nav-container">
        <Link className="logo" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={t("海涛旅行定制")} className="logo-img" />
          <span className="logo-name">{t("海涛旅行定制")}</span>
        </Link>
        <ul className={`nav-links${open ? " open" : ""}`} id="navLinks" ref={navLinksRef}>
          {MAIN_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link href={item.href} className={active ? "active" : ""}>
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li
            className={`nav-dropdown${dropdownOpen ? " open" : ""}`}
            ref={dropdownRef}
          >
            <button
              type="button"
              className={`nav-dropdown-toggle${isTravelActive ? " active" : ""}`}
              onClick={() => setDropdownOpen((v) => !v)}
            >
              {t("旅游地点")} <i className="fas fa-chevron-down" />
            </button>
            <ul className="nav-dropdown-menu">
              {TRAVEL_ITEMS.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={active ? "active" : ""}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
        <div className="nav-right">
          <LangSwitcher />
          <div className="social-icons-nav">
            <a href="https://wa.me/85284392791" target="_blank" title="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
            <a href="mailto:418144878@qq.com" title="Email">
              <i className="fas fa-envelope" />
            </a>
          </div>
          <MobileLangSwitcher />
          <button
            type="button"
            className="hamburger"
            id="hamburger"
            ref={hamburgerRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={t("切換選單")}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}