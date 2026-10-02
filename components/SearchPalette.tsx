"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { searchIndex } from "@/content/home";
import { useRouter } from "@/i18n/navigation";
import type { Locale } from "@/lib/locales";
import { localize } from "@/lib/localize";
import { filterEntries, splitMatch } from "@/lib/search";
import { onOpenSearch } from "./browser-store";
import Icon from "./Icon";

const isTyping = (element: Element | null) =>
  element instanceof HTMLElement && (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName));

/** Quick search over content/home.ts. Opens with the header button, the hero field, Ctrl+K or "/". */
export default function SearchPalette() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const show = useCallback((seed = "") => {
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    setQuery(seed);
    setSelected(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocusTo.current?.focus();
  }, []);

  useEffect(() => onOpenSearch(show), [show]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else show();
      } else if (event.key === "/" && !open && !isTyping(document.activeElement)) {
        event.preventDefault();
        show();
      } else if (event.key === "Escape" && open) {
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, show, close]);

  if (!open) return null;

  const entries = searchIndex.map((item) => ({
    ...item,
    title: localize(item.title, locale).text,
    sectionName: t(`sections.${item.section}`),
  }));
  const results = filterEntries(entries, query);
  const current = Math.min(selected, Math.max(results.length - 1, 0));

  const choose = (index: number) => {
    const item = results[index];
    if (!item) return;
    setOpen(false);
    router.push(`/topic/${item.id}`);
  };

  const onInputKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected(Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected(Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(current);
    } else if (event.key === "Tab") {
      // The input is the only focusable element of the dialog: keep the focus inside.
      event.preventDefault();
    }
  };

  return (
    <div
      className="x-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="x-pal" role="dialog" aria-modal="true" aria-label={t("nav.search")}>
        <div className="x-pal-in">
          <Icon name="search" />
          <input
            autoFocus
            type="search"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-autocomplete="list"
            aria-activedescendant={results.length ? `search-option-${current}` : undefined}
            aria-label={t("nav.search")}
            autoComplete="off"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={onInputKey}
          />
          <kbd className="kbd">Esc</kbd>
        </div>
        <div className="x-pal-cap">{query.trim() ? t("search.results") : t("search.popular")}</div>
        {results.length === 0 ? (
          <p className="x-pal-empty" role="status">
            {t("search.empty")}
          </p>
        ) : (
          <ul id="search-results" role="listbox" aria-label={t("search.results")}>
            {results.map((item, index) => {
              const parts = splitMatch(item.title, query);
              return (
                <li
                  key={item.id}
                  id={`search-option-${index}`}
                  role="option"
                  aria-selected={index === current}
                  ref={index === current ? (element) => element?.scrollIntoView({ block: "nearest" }) : undefined}
                  onMouseMove={() => setSelected(index)}
                  onClick={() => choose(index)}
                >
                  <span className="dot" style={{ background: `var(--c-${item.section})` }} />
                  <span className="ttl">
                    {parts ? (
                      <>
                        {parts.before}
                        <mark>{parts.match}</mark>
                        {parts.after}
                      </>
                    ) : (
                      item.title
                    )}
                  </span>
                  <span className="ty">
                    {t(`types.${item.type}`)} · {item.sectionName}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        <div className="x-pal-foot">{t("search.hint")}</div>
      </div>
    </div>
  );
}
