"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { openCookieNotice } from "./browser-store";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer>
      <div className="wrap">
        <Link href="/about">{t("about")}</Link>
        <button type="button" onClick={openCookieNotice}>
          {t("privacy")}
        </button>
        <Link href="/feedback">{t("feedback")}</Link>
        <span className="made">{t("made")}</span>
      </div>
    </footer>
  );
}
