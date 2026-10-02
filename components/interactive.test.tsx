import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import uk from "@/messages/uk.json";
import { forgetStored, openCookieNotice } from "./browser-store";
import CookieNotice from "./CookieNotice";
import Header from "./Header";
import SearchPalette from "./SearchPalette";
import SearchTrigger from "./SearchTrigger";

const push = vi.fn();

// The real helpers need a running Next.js router; here only the calls matter.
vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, locale, ...rest }: { href: string; children: React.ReactNode; locale?: string }) => (
    <a href={locale ? `/${locale}${href}` : href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ push }),
}));

function renderUk(ui: React.ReactNode) {
  render(
    <NextIntlClientProvider locale="uk" messages={uk}>
      {ui}
    </NextIntlClientProvider>,
  );
}

const press = (key: string, init: KeyboardEventInit = {}) =>
  act(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true, ...init }));
  });

beforeEach(() => {
  localStorage.clear();
  forgetStored();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.className = "";
  push.mockClear();
  // jsdom does not implement scrolling.
  Element.prototype.scrollIntoView = () => {};
});
afterEach(cleanup);

// Spec: docs/spec/home-page.md · HP-5
describe("search palette", () => {
  test("Ctrl+K opens it with six popular entries, Esc closes it", () => {
    renderUk(<SearchPalette />);
    expect(screen.queryByRole("dialog")).toBeNull();

    press("k", { ctrlKey: true });
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getAllByRole("option")).toHaveLength(6);
    expect(screen.getByText("Популярне")).toBeTruthy();

    press("Escape");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  // Review 01, finding 5: with the Ukrainian layout on, Ctrl+K arrives as key "л".
  test("Ctrl+K works with the Ukrainian keyboard layout", () => {
    renderUk(<SearchPalette />);
    press("л", { ctrlKey: true, code: "KeyK" });
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  test('"/" opens it, but not while the visitor is typing in a field', () => {
    renderUk(
      <>
        <input aria-label="other field" />
        <SearchPalette />
      </>,
    );
    screen.getByLabelText("other field").focus();
    press("/");
    expect(screen.queryByRole("dialog")).toBeNull();

    (document.activeElement as HTMLElement).blur();
    press("/");
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  test("typing filters the list and highlights the match", () => {
    renderUk(<SearchPalette />);
    press("k", { ctrlKey: true });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "РЕК" } });

    const options = screen.getAllByRole("option");
    expect(options.map((o) => o.querySelector(".ttl")?.textContent)).toEqual(["Рекурсія в Python: задачі", "Рекурсія", "Матура: задачі на рекурсію"]);
    expect(options[0]?.querySelector("mark")?.textContent).toBe("Рек");
  });

  test("a query with no match shows the empty message", () => {
    renderUk(<SearchPalette />);
    press("k", { ctrlKey: true });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "zzz" } });
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    expect(screen.getByRole("status").textContent).toContain("Нічого не знайдено");
  });

  test("arrows move the selection and Enter opens the chosen topic", () => {
    renderUk(<SearchPalette />);
    press("k", { ctrlKey: true });
    const input = screen.getByRole("combobox");

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(screen.getAllByRole("option")[1]?.getAttribute("aria-selected")).toBe("true");

    fireEvent.keyDown(input, { key: "Enter" });
    expect(push).toHaveBeenCalledWith("/topic/binary-search");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test("a shortcut button opens the palette with its text as the query", () => {
    renderUk(
      <>
        <SearchTrigger seed="Модель OSI">Модель OSI</SearchTrigger>
        <SearchPalette />
      </>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Модель OSI" }));
    expect((screen.getByRole("combobox") as HTMLInputElement).value).toBe("Модель OSI");
    expect(screen.getAllByRole("option")).toHaveLength(1);
  });
});

// Spec: docs/spec/home-page.md · HP-6, HP-7
describe("header controls", () => {
  test("the theme button cycles auto → light → dark → auto and saves the choice", () => {
    renderUk(<Header />);
    const root = document.documentElement;
    const button = () => screen.getByRole("button", { name: /^Тема:/ });
    expect(button().getAttribute("aria-label")).toBe("Тема: Авто");

    fireEvent.click(button());
    expect(root.getAttribute("data-theme")).toBe("light");
    fireEvent.click(button());
    expect(root.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("infoklasa.theme")).toBe("dark");
    fireEvent.click(button());
    expect(root.hasAttribute("data-theme")).toBe(false);
  });

  test("an accessibility switch adds its class to <html>, reset removes all", () => {
    renderUk(<Header />);
    const root = document.documentElement;
    fireEvent.click(screen.getByRole("button", { name: "Налаштування доступності" }));

    fireEvent.click(screen.getByRole("switch", { name: "Більший шрифт" }));
    fireEvent.click(screen.getByRole("switch", { name: "Вимкнути анімації" }));
    expect(root.classList.contains("a11y-large")).toBe(true);
    expect(root.classList.contains("a11y-motion")).toBe(true);
    expect(localStorage.getItem("infoklasa.a11y")).toBe('["large","motion"]');

    fireEvent.click(screen.getByRole("switch", { name: "Більший шрифт" }));
    expect(root.classList.contains("a11y-large")).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: "Скинути все" }));
    expect(root.classList.contains("a11y-motion")).toBe(false);
  });

  // Review 01, finding 4: keyboard users must not lose their place.
  test("closing the accessibility panel with Esc returns focus to its button", () => {
    renderUk(<Header />);
    const toggle = screen.getByRole("button", { name: "Налаштування доступності" });
    fireEvent.click(toggle);
    expect(document.activeElement?.getAttribute("role")).toBe("switch");

    press("Escape");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(toggle);
  });

  test("the language switch links to the same page in every language", () => {
    renderUk(<Header />);
    const links = screen.getByRole("navigation", { name: "Мова" }).querySelectorAll("a");
    expect(Array.from(links).map((a) => [a.textContent, a.getAttribute("href")])).toEqual([
      ["UA", "/uk/"],
      ["PL", "/pl/"],
      ["EN", "/en/"],
    ]);
    expect(links[0]?.getAttribute("aria-current")).toBe("true");
  });
});

// Spec: docs/spec/home-page.md · HP-10. Review 01, finding 7.
describe("cookie notice", () => {
  test("reopened settings show the saved answer, so Save does not change it", () => {
    localStorage.setItem("infoklasa.cookie", "all");
    renderUk(<CookieNotice />);
    expect(screen.queryByRole("button", { name: "Прийняти" })).toBeNull();

    act(() => openCookieNotice());
    fireEvent.click(screen.getByRole("button", { name: "Налаштувати" }));
    expect((screen.getByRole("checkbox", { name: "Анонімна статистика відвідувань" }) as HTMLInputElement).checked).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Зберегти вибір" }));
    expect(localStorage.getItem("infoklasa.cookie")).toBe("all");
  });
});
