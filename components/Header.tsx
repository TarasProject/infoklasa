"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, locales } from "@/lib/locales";
import { nextTheme, parseTheme } from "@/lib/prefs";
import A11yPanel, { A11Y_PANEL_ID } from "./A11yPanel";
import { openSearch, useStored, writeStored } from "./browser-store";
import Icon from "./Icon";

const navItems = [
  { href: "/", key: "home" },
  { href: "/catalog", key: "catalog" },
  { href: "/matura", key: "matura" },
  { href: "/glossary", key: "glossary" },
  { href: "/news", key: "news" },
] as const;

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const theme = parseTheme(useStored("theme"));
  const [a11yOpen, setA11yOpen] = useState(false);
  const closeA11y = useCallback(() => setA11yOpen(false), []);

  // "auto" = no attribute, the system setting decides (see the tokens in globals.css).
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  const links = navItems.map((item) => (
    <Link key={item.key} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
      {t(`nav.${item.key}`)}
    </Link>
  ));

  return (
    <header className="top">
      <div className="wrap">
        <div className="top-row">
          <Link className="logo" href="/">
            <b>i/</b>
            <span>infoklasa</span>
          </Link>
          <nav className="nav" aria-label={t("nav.main")}>
            {links}
          </nav>
          <div className="tools">
            <button className="ibtn" type="button" aria-label={t("nav.search")} onClick={() => openSearch()}>
              <Icon name="search" />
            </button>
            <nav className="langs" aria-label={t("nav.language")}>
              {locales.map((code) => (
                <Link
                  key={code}
                  href={pathname}
                  locale={code}
                  hrefLang={code}
                  aria-current={code === locale ? "true" : undefined}
                >
                  {localeLabels[code]}
                </Link>
              ))}
            </nav>
            <button
              className="ibtn"
              type="button"
              aria-label={`${t("theme.label")}: ${t(`theme.${theme}`)}`}
              title={`${t("theme.label")}: ${t(`theme.${theme}`)}`}
              onClick={() => writeStored("theme", nextTheme(theme))}
            >
              <Icon name="theme" />
            </button>
            <button
              className="ibtn"
              type="button"
              aria-label={t("a11y.open")}
              aria-expanded={a11yOpen}
              aria-controls={A11Y_PANEL_ID}
              onClick={() => setA11yOpen((open) => !open)}
            >
              <Icon name="a11y" />
            </button>
            <Link className="btn primary hide-m" href="/login">
              {t("nav.login")}
            </Link>
            <Link className="ibtn show-m" href="/login" aria-label={t("nav.login")}>
              <Icon name="user" />
            </Link>
          </div>
        </div>
        <nav className="mnav" aria-label={t("nav.main")}>
          {links}
        </nav>
      </div>
      <A11yPanel open={a11yOpen} onClose={closeA11y} />
    </header>
  );
}
