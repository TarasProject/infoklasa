"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { onOpenCookieNotice, useInBrowser, useStored, writeStored } from "./browser-store";

/** RODO/GDPR notice. Shown until the visitor answers; the footer link opens it again. */
export default function CookieNotice() {
  const t = useTranslations("cookie");
  const inBrowser = useInBrowser();
  const answer = useStored("cookie");
  const [reopened, setReopened] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [stats, setStats] = useState(false);

  useEffect(
    () =>
      onOpenCookieNotice(() => {
        setReopened(true);
      }),
    [],
  );

  // Rendered only in the browser: the server does not know whether the visitor has answered.
  if (!inBrowser || (answer !== null && !reopened)) return null;

  const save = (choice: "all" | "necessary") => {
    writeStored("cookie", choice);
    setReopened(false);
    setSettingsOpen(false);
  };

  return (
    <section className="x-cookie" aria-labelledby="cookie-text">
      <p id="cookie-text">
        {t("text")} <Link href="/privacy">{t("policy")}</Link>
      </p>
      {settingsOpen && (
        <div className="x-cookie-set">
          <label>
            <input type="checkbox" checked disabled /> <span>{t("essentialInfo")}</span>
          </label>
          <label>
            <input type="checkbox" checked={stats} onChange={(event) => setStats(event.target.checked)} />{" "}
            <span>{t("stats")}</span>
          </label>
        </div>
      )}
      <div className="x-cookie-actions">
        <button className="btn primary" type="button" onClick={() => save("all")}>
          {t("accept")}
        </button>
        <button className="btn" type="button" onClick={() => save("necessary")}>
          {t("necessary")}
        </button>
        {settingsOpen ? (
          <button className="btn ghost" type="button" onClick={() => save(stats ? "all" : "necessary")}>
            {t("save")}
          </button>
        ) : (
          <button
            className="btn ghost"
            type="button"
            onClick={() => {
              // Start from what the visitor chose last time, so "Save" keeps it unless they change it.
              setStats(answer === "all");
              setSettingsOpen(true);
            }}
          >
            {t("settings")}
          </button>
        )}
      </div>
    </section>
  );
}
