export const locales = ["uk", "pl", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uk";

/** Short names shown to people: in the language switch and in the "translation missing" badge. */
export const localeLabels: Record<Locale, string> = { uk: "UA", pl: "PL", en: "EN" };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
