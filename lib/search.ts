export type SearchEntry = { title: string; sectionName: string };

const POPULAR_COUNT = 6;

const normalize = (text: string) => text.trim().toLowerCase();

/** Empty query → the first six entries ("popular"); otherwise every entry whose title or section name contains it. */
export function filterEntries<T extends SearchEntry>(entries: T[], query: string): T[] {
  const q = normalize(query);
  if (!q) return entries.slice(0, POPULAR_COUNT);
  return entries.filter((e) => e.title.toLowerCase().includes(q) || e.sectionName.toLowerCase().includes(q));
}

/** Cuts the title around the first match so the UI can highlight it. */
export function splitMatch(title: string, query: string): { before: string; match: string; after: string } | null {
  const q = normalize(query);
  if (!q) return null;
  const at = title.toLowerCase().indexOf(q);
  if (at === -1) return null;
  return { before: title.slice(0, at), match: title.slice(at, at + q.length), after: title.slice(at + q.length) };
}
