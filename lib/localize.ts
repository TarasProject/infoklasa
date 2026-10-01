import type { Locale } from "./locales";

/** Teaching content in the languages it has been written in so far. */
export type Localized = Partial<Record<Locale, string>>;

export type LocalizedText = {
  text: string;
  /** Language the text is actually in — goes to the `lang` attribute. */
  lang: Locale;
  /** True when `lang` is not the language the reader asked for. */
  missing: boolean;
};

const fallbackOrder: Locale[] = ["uk", "en", "pl"];

export function localize(text: Localized, locale: Locale): LocalizedText {
  const own = text[locale];
  if (own) return { text: own, lang: locale, missing: false };

  for (const lang of fallbackOrder) {
    const fallback = text[lang];
    if (fallback) return { text: fallback, lang, missing: true };
  }
  throw new Error("No translation in any language");
}
