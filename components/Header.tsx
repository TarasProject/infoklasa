"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, locales } from "@/lib/locales";
import { parseTheme, toggleTheme } from "@/lib/prefs";
import A11yPanel, { A11Y_PANEL_ID } from "./A11yPanel";
import { openSearch, useStored, useSystemDark, writeStored } from "./browser-store";
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
  const systemDark = useSystemDark();
  const [a11yOpen, setA11yOpen] = useState(false);
  const a11yButton = useRef<HTMLButtonElement>(null);
  const closeA11y = useCallback(() => {
    setA11yOpen(false);
    // If the focus was inside the panel, give it back to the button that opened it.
    if (document.getElementById(A11Y_PANEL_ID)?.contains(document.activeElement)) a11yButton.current?.focus();
  }, []);

  // "auto" = no attribute, the system setting decides (see the tokens in globals.css).
  // Layout effect = before paint. In development React's Strict Mode remounts <html> and wipes
  // the attribute the inline script set; this puts it back before the visitor sees anything.
  useLayoutEffect(() => {
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
              onClick={() => writeStored("theme", toggleTheme(theme, systemDark))}
            >
              <Icon name="theme" />
            </button>
            <button
              ref={a11yButton}
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
