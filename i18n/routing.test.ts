import { expect, test } from "vitest";
import { routing } from "./routing";

// Spec: docs/spec/home-page.md · HP-1 ("saved choice"). Review 01, finding 3:
// without maxAge the language cookie disappears when the browser closes.
test("the chosen language is remembered for a year", () => {
  expect(routing.localeCookie).toMatchObject({ name: "NEXT_LOCALE", maxAge: 60 * 60 * 24 * 365 });
});
