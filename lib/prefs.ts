export const themes = ["auto", "light", "dark"] as const;
export type Theme = (typeof themes)[number];

/**
 * The theme the button switches to: always the opposite of what is on screen now.
 * "auto" shows the system theme, so it lasts only until the first click.
 */
export function toggleTheme(theme: Theme, systemPrefersDark: boolean): "light" | "dark" {
  const shown = theme === "auto" ? (systemPrefersDark ? "dark" : "light") : theme;
  return shown === "dark" ? "light" : "dark";
}

export function parseTheme(raw: string | null): Theme {
  return (themes as readonly string[]).includes(raw ?? "") ? (raw as Theme) : "auto";
}

export const a11yModes = ["large", "contrast", "dyslexia", "spacing", "motion"] as const;
export type A11yMode = (typeof a11yModes)[number];

export function toggleA11y(active: A11yMode[], mode: A11yMode): A11yMode[] {
  return active.includes(mode) ? active.filter((m) => m !== mode) : [...active, mode];
}

/** Browser storage is untrusted input: anything that is not a list of known modes is dropped. */
export function parseA11y(raw: string | null): A11yMode[] {
  let stored: unknown;
  try {
    stored = JSON.parse(raw ?? "[]");
  } catch {
    return [];
  }
  if (!Array.isArray(stored)) return [];
  return a11yModes.filter((mode) => stored.includes(mode));
}
