import { describe, expect, test } from "vitest";
import { createTranslator } from "next-intl";
import uk from "./uk.json";
import pl from "./pl.json";
import en from "./en.json";

const all = { uk, pl, en };

function keys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];
  return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

// Spec: docs/spec/home-page.md · HP-2
describe("message files", () => {
  const reference = keys(uk).sort();

  test.each(["pl", "en"] as const)("%s has exactly the keys of uk", (locale) => {
    const own = keys(all[locale]).sort();
    const missing = reference.filter((k) => !own.includes(k));
    const extra = own.filter((k) => !reference.includes(k));
    expect({ locale, missing, extra }).toEqual({ locale, missing: [], extra: [] });
  });

  test.each(["uk", "pl", "en"] as const)("%s has no empty text", (locale) => {
    const empty = keys(all[locale]).filter((k) => {
      const text = k.split(".").reduce<unknown>((o, part) => (o as Record<string, unknown>)[part], all[locale]);
      return typeof text !== "string" || text.trim() === "";
    });
    expect(empty).toEqual([]);
  });
});

// Spec: docs/spec/home-page.md · HP-3
describe("topic count plural forms", () => {
  const cases = {
    uk: { 1: "1 тема", 21: "21 тема", 24: "24 теми", 12: "12 тем", 15: "15 тем" },
    pl: { 1: "1 temat", 21: "21 tematów", 24: "24 tematy", 12: "12 tematów", 15: "15 tematów" },
    en: { 1: "1 topic", 21: "21 topics", 24: "24 topics", 12: "12 topics", 15: "15 topics" },
  };

  test.each(["uk", "pl", "en"] as const)("%s", (locale) => {
    const t = createTranslator({ locale, messages: all[locale], namespace: "sections" });
    const actual = Object.fromEntries(Object.keys(cases[locale]).map((n) => [n, t("topics", { count: Number(n) })]));
    expect(actual).toEqual(cases[locale]);
  });
});
