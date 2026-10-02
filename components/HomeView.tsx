import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { bannerTopicId, newMaterials, popularSearchIds, searchIndex, sections, type Level } from "@/content/home";
import { Link } from "@/i18n/navigation";
import { localeLabels, type Locale } from "@/lib/locales";
import { localize } from "@/lib/localize";
import Icon from "./Icon";
import SearchTrigger from "./SearchTrigger";
import SortViz from "./SortViz";

const levelBars: Record<Level, number> = { basic: 1, medium: 2, advanced: 3 };

/** Each section has its own colour token, e.g. --c-alg. */
const sectionColor = (id: string) => ({ "--c": `var(--c-${id})` }) as CSSProperties;

const sectionHref = (id: string) => (id === "gloss" ? "/glossary" : id === "matura" ? "/matura" : `/catalog/${id}`);

/** Everything between the header and the footer of the home page. Spec: docs/spec/home-page.md. */
export default function HomeView() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const chips = popularSearchIds.flatMap((id) => {
    const item = searchIndex.find((entry) => entry.id === id);
    return item ? [{ id, text: localize(item.title, locale).text }] : [];
  });

  return (
    <>
      <div className="ann" role="region" aria-label={t("announcement.label")}>
        <div className="wrap">
          <span className="tag">{t("announcement.important")}</span>
          <p>{t("announcement.text")}</p>
          <Link href="/news" className="hide-m">
            {t("announcement.more")}
          </Link>
        </div>
      </div>

      <section className="hero">
        <div className="wrap">
          <h1>{t("hero.title")}</h1>
          <p className="sub">{t("hero.sub")}</p>
          <SearchTrigger className="search">
            <Icon name="search" />
            <span className="ph">{t("search.placeholder")}</span>
            <kbd className="kbd hide-m">Ctrl K</kbd>
            <span className="go">{t("search.button")}</span>
          </SearchTrigger>
          <div className="chips" role="group" aria-labelledby="chips-label">
            <span id="chips-label">{t("search.popularChips")}</span>
            {chips.map((chip) => (
              <SearchTrigger key={chip.id} seed={chip.text}>
                {chip.text}
              </SearchTrigger>
            ))}
          </div>
        </div>
      </section>

      <main id="main" className="wrap">
        <section className="guest" aria-labelledby="h-guest">
          <div>
            <h2 id="h-guest">{t("guest.title")}</h2>
            <p>{t("guest.text")}</p>
          </div>
          <Link href="/login" className="btn primary">
            {t("guest.cta")}
          </Link>
        </section>

        <section className="banner" aria-labelledby="h-banner">
          <div className="txt">
            <span className="k">{`// ${t("banner.kicker")}`}</span>
            <h2 id="h-banner">{t("banner.title")}</h2>
            <p>{t("banner.text")}</p>
            <Link href={`/topic/${bannerTopicId}`} className="btn primary">
              {t("banner.cta")}
            </Link>
          </div>
          <div className="viz">
            <SortViz />
          </div>
        </section>

        <section aria-labelledby="h-sections">
          <div className="sh">
            <h2 id="h-sections">{t("sections.title")}</h2>
            <Link href="/catalog">{t("sections.all")}</Link>
          </div>
          <ul className="tiles" role="list" aria-labelledby="h-sections">
            {sections.map((section) => (
              <li key={section.id}>
                <Link href={sectionHref(section.id)} className="tile" style={sectionColor(section.id)}>
                  <span className="sq">
                    <Icon name={section.id} />
                  </span>
                  <span className="n">{t(`sections.${section.id}`)}</span>
                  <span className="c">
                    {section.id === "gloss"
                      ? t("sections.glossaryCount", { count: section.count })
                      : t("sections.topics", { count: section.count })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="h-new">
          <div className="sh">
            <h2 id="h-new">{t("materials.title")}</h2>
            <Link href="/catalog">{t("sections.all")}</Link>
          </div>
          <ul className="mats" role="list" aria-labelledby="h-new">
            {newMaterials.map((material) => {
              const title = localize(material.title, locale);
              return (
                <li key={material.id}>
                  <Link href={`/topic/${material.id}`} className="mat" style={sectionColor(material.section)}>
                    <span className="row">
                      <span className="dot" />
                      <span>{t(`sections.${material.section}`)}</span>
                      <span aria-hidden="true">·</span>
                      <span>{t("materials.grade", { n: material.grade })}</span>
                      <span className="type">{t(`types.${material.type}`)}</span>
                    </span>
                    <h3 lang={title.lang}>{title.text}</h3>
                    {title.missing && (
                      <span className="tr-missing">{t("materials.missing", { lang: localeLabels[title.lang] })}</span>
                    )}
                    <span className="foot">
                      <span className="lvl" data-l={levelBars[material.level]}>
                        <i aria-hidden="true">
                          <b />
                          <b />
                          <b />
                        </i>
                        <span>{t(`levels.${material.level}`)}</span>
                      </span>
                      <span>{t("materials.minutes", { n: material.minutes })}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
