import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/lib/locales";
import uk from "@/messages/uk.json";
import pl from "@/messages/pl.json";
import en from "@/messages/en.json";
import HomeView from "./HomeView";

const messages = { uk, pl, en };

function renderHome(locale: Locale) {
  render(
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <HomeView />
    </NextIntlClientProvider>,
  );
}

afterEach(cleanup);

// Spec: docs/spec/home-page.md · HP-1
describe("home page heading", () => {
  test.each([
    ["uk", "Інформатика, яку зручно вчити"],
    ["pl", "Informatyka, której wygodnie się uczyć"],
    ["en", "Computer science that’s easy to learn"],
  ] as const)("%s", (locale, heading) => {
    renderHome(locale);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(heading);
  });
});

// Spec: docs/spec/home-page.md · HP-9
describe("home page blocks", () => {
  test("shows 8 section tiles and 6 new materials", () => {
    renderHome("uk");
    expect(within(screen.getByRole("list", { name: "Розділи" })).getAllByRole("listitem")).toHaveLength(8);
    expect(within(screen.getByRole("list", { name: "Нові матеріали" })).getAllByRole("listitem")).toHaveLength(6);
  });

  test("shows the announcement, four search shortcuts and the banner", () => {
    renderHome("uk");
    expect(screen.getByRole("region", { name: "Оголошення" }).textContent).toContain("олімпіади");
    expect(within(screen.getByRole("group", { name: "Часто шукають:" })).getAllByRole("button")).toHaveLength(4);
    expect(screen.getByRole("heading", { level: 2, name: "Сортування наживо: подивись на кожен крок" })).toBeTruthy();
  });

  test("topic counts use the plural form of the language", () => {
    renderHome("pl");
    const tiles = screen.getByRole("list", { name: "Działy" });
    expect(tiles.textContent).toContain("24 tematy");
    expect(tiles.textContent).toContain("15 tematów");
  });
});

// Spec: docs/spec/home-page.md · HP-4
describe("material without a translation", () => {
  test("Polish page shows the Ukrainian title with a badge", () => {
    renderHome("pl");
    const title = screen.getByRole("heading", { level: 3, name: "SQL JOIN на прикладах" });
    expect(title.getAttribute("lang")).toBe("uk");
    expect(title.closest("li")?.textContent).toContain("Brak tłumaczenia · pokazano UK");
  });

  test("Ukrainian page shows no badge at all", () => {
    renderHome("uk");
    expect(screen.queryByText(/Переклад відсутній/)).toBeNull();
  });
});
