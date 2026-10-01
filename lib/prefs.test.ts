import { describe, expect, test } from "vitest";
import { nextTheme, parseA11y, parseTheme, toggleA11y } from "./prefs";

// Spec: docs/spec/home-page.md · HP-6
describe("theme", () => {
  test("cycles auto → light → dark → auto", () => {
    expect(nextTheme("auto")).toBe("light");
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("auto");
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
