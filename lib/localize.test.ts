import { describe, expect, test } from "vitest";
import { localize } from "./localize";

// Spec: docs/spec/home-page.md · HP-4
describe("localize", () => {
  test("returns the text in the requested language when it exists", () => {
    const title = { uk: "Бінарний пошук", pl: "Wyszukiwanie binarne", en: "Binary search" };
    expect(localize(title, "pl")).toEqual({ text: "Wyszukiwanie binarne", lang: "pl", missing: false });
  });

  test("falls back to Ukrainian when the Polish title is missing", () => {
    const title = { uk: "SQL JOIN на прикладах", en: "SQL JOIN by example" };
    expect(localize(title, "pl")).toEqual({ text: "SQL JOIN на прикладах", lang: "uk", missing: true });
  });

  test("falls back to Ukrainian when the English title is missing", () => {
    const title = { uk: "Паролі та хешування", pl: "Hasła i haszowanie" };
    expect(localize(title, "en")).toEqual({ text: "Паролі та хешування", lang: "uk", missing: true });
  });

  test("falls back to English before Polish when Ukrainian is missing", () => {
    const title = { pl: "Sieci", en: "Networks" };
    expect(localize(title, "uk")).toEqual({ text: "Networks", lang: "en", missing: true });
  });

  test("treats an empty string as a missing translation", () => {
    expect(localize({ uk: "Рекурсія", pl: "" }, "pl")).toEqual({ text: "Рекурсія", lang: "uk", missing: true });
  });

  test("throws when no language has the text", () => {
    expect(() => localize({}, "uk")).toThrow(/no translation/i);
  });
});
