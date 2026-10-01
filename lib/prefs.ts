export const themes = ["auto", "light", "dark"] as const;
export type Theme = (typeof themes)[number];

export function nextTheme(theme: Theme): Theme {
  return themes[(themes.indexOf(theme) + 1) % themes.length]!;
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
