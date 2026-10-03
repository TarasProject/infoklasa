import { describe, expect, test } from "vitest";
import { parseA11y, parseTheme, toggleA11y, toggleTheme } from "./prefs";

// Spec: docs/spec/home-page.md · HP-6
describe("theme", () => {
  test("auto on a light system: the first click turns the page dark", () => {
    expect(toggleTheme("auto", false)).toBe("dark");
  });

  test("auto on a dark system: the first click turns the page light", () => {
    expect(toggleTheme("auto", true)).toBe("light");
  });

  test("after the first click it alternates light ↔ dark whatever the system says", () => {
    for (const systemDark of [false, true]) {
      expect(toggleTheme("dark", systemDark)).toBe("light");
      expect(toggleTheme("light", systemDark)).toBe("dark");
    }
  });

  test("reads a stored value", () => {
    expect(parseTheme("dark")).toBe("dark");
  });

  test("falls back to auto for an unknown or absent value", () => {
    expect(parseTheme("blue")).toBe("auto");
    expect(parseTheme(null)).toBe("auto");
  });
});

// Spec: docs/spec/home-page.md · HP-7
describe("accessibility modes", () => {
  test("toggling a mode twice switches it off again", () => {
    const on = toggleA11y([], "large");
    expect(on).toEqual(["large"]);
    expect(toggleA11y(on, "large")).toEqual([]);
  });

  test("keeps the other modes when one is toggled", () => {
    expect(toggleA11y(["large", "motion"], "large")).toEqual(["motion"]);
  });

  test("reads a stored list", () => {
    expect(parseA11y('["contrast","motion"]')).toEqual(["contrast", "motion"]);
  });

  test("ignores broken storage content", () => {
    expect(parseA11y("{oops")).toEqual([]);
    expect(parseA11y(null)).toEqual([]);
    expect(parseA11y('"large"')).toEqual([]);
  });

  test("drops unknown modes and duplicates", () => {
    expect(parseA11y('["large","rainbow","large",7]')).toEqual(["large"]);
  });
});
