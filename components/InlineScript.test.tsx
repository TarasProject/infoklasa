import { afterEach, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import InlineScript from "./InlineScript";

afterEach(cleanup);

// Spec: docs/spec/home-page.md · HP-6 (no <script> error in development, saved theme applied before paint).
test("in the browser React renders the script as inert text, so it does not warn", () => {
  const { container } = render(<InlineScript html="window.ran = true" />);
  expect(container.querySelector("script")?.getAttribute("type")).toBe("text/plain");
});

test("the server HTML still carries an executable script", () => {
  // jsdom defines `window`; hide it to render the way the server does.
  const saved = globalThis.window;
  // @ts-expect-error -- simulating the server, where `window` does not exist
  delete globalThis.window;
  try {
    expect(renderToString(<InlineScript html="1" />)).toContain('type="text/javascript"');
  } finally {
    globalThis.window = saved;
  }
});
