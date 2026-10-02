import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/locales";

// Every address that has no page yet (catalogue, glossary, login, a topic…) lands here
// instead of a 404. Spec: docs/spec/home-page.md · HP-11.
export default async function SoonPage({ params }: PageProps<"/[locale]/[...rest]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("soon");

  return (
    <main id="main" className="wrap soon">
      <span className="mark">{"// TODO"}</span>
      <h1>{t("title")}</h1>
      <p>{t("text")}</p>
      <Link href="/" className="btn primary">
        {t("home")}
      </Link>
    </main>
  );
}
