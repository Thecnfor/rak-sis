"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DESTINATION_SLUGS, getDestinationHref } from "../destinations";
import TrackedWhatsAppLink from "./analytics/TrackedWhatsAppLink";
import LangSwitcher from "./i18n/LangSwitcher";
import MobileLangSwitcher from "./i18n/MobileLangSwitcher";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const dropdownRef = useRef<HTMLLIElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const MAIN_ITEMS = [
    { href: "/", label: t("main.home") },
    { href: "/about", label: t("main.about") },
    { href: "/contact", label: t("main.contact") },
  ];

  const TRAVEL_ITEMS = DESTINATION_SLUGS.map((slug) => ({
    href: getDestinationHref(slug),
    label: t(`travel.${slug}`),
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 让 <body class="home-solid-nav"> 始终与当前路由保持同步。
  useEffect(() => {
    document.body.classList.toggle("home-solid-nav", isHome);
  }, [isHome]);

  const isTravelActive = TRAVEL_ITEMS.some(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(item.href + "/"),
  );

  // 路由变化后自动收起菜单状态。
  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // 点击导航外部区域时，关闭移动菜单和下拉菜单。
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
    <nav
      className={`navbar${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}
      id="navbar"
    >
      <div className="nav-container">
        <Link className="logo" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/branding/logo.png"
            alt={t("brand")}
            className="logo-img"
          />
          <span className="logo-name">{t("brand")}</span>
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
              {t("travelLabel")} <i className="fas fa-chevron-down" />
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
            <TrackedWhatsAppLink
              ctaLocation="navbar"
              title="WhatsApp"
            >
              <i className="fab fa-whatsapp" />
            </TrackedWhatsAppLink>
            <a href="mailto:tofofo@pixelinbox.com" title="Email">
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
            aria-label={t("aria.menu")}
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
