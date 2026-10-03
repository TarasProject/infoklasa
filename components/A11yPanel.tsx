"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { a11yModes, parseA11y, toggleA11y } from "@/lib/prefs";
import { useInBrowser, useStored, writeStored } from "./browser-store";
import Icon from "./Icon";

export const A11Y_PANEL_ID = "a11y-panel";

/** Five accessibility switches. Each one adds a class such as `a11y-large` to <html>; the styles are in globals.css. */
export default function A11yPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations();
  const inBrowser = useInBrowser();
  const stored = useStored("a11y");
  const active = parseA11y(stored);
  const panelRef = useRef<HTMLDivElement>(null);

  // Before paint, for the same reason as the theme in Header.tsx (Strict Mode remount wipes <html> classes).
  useLayoutEffect(() => {
    const on = parseA11y(stored);
    for (const mode of a11yModes) document.documentElement.classList.toggle(`a11y-${mode}`, on.includes(mode));
  }, [stored]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("[role=switch]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Element;
      // The header button toggles the panel itself.
      if (!panelRef.current?.contains(target) && !target.closest(`[aria-controls=${A11Y_PANEL_ID}]`)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, onClose]);

  if (!inBrowser) return null;

  // Rendered into <body>: inside the header (which has backdrop-filter) `position:fixed`
  // would be measured from the header and the panel would leave the screen on phones.
  return createPortal(
    <div className="x-pop" id={A11Y_PANEL_ID} ref={panelRef} role="dialog" aria-labelledby="a11y-title" hidden={!open}>
      <div className="x-pop-head">
        <h2 id="a11y-title">{t("a11y.title")}</h2>
        <button className="x-icon-btn" type="button" aria-label={t("common.close")} onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      {a11yModes.map((mode) => (
        <button
          key={mode}
          className="x-switch"
          type="button"
          role="switch"
          aria-checked={active.includes(mode)}
          onClick={() => writeStored("a11y", JSON.stringify(toggleA11y(active, mode)))}
        >
          <span>{t(`a11y.${mode}`)}</span>
          <i aria-hidden="true" />
        </button>
      ))}
      <button className="btn ghost" type="button" onClick={() => writeStored("a11y", "[]")}>
        {t("a11y.reset")}
      </button>
    </div>,
    document.body,
  );
}
