import type { Localized } from "@/lib/localize";

// Sample data for the home page. Until the admin panel and the database exist
// (docs/backlog.md), this file is the only place where content is edited.

export const sectionIds = ["alg", "prog", "net", "db", "hw", "sec", "matura", "gloss"] as const;
export type SectionId = (typeof sectionIds)[number];

export const sections: { id: SectionId; count: number }[] = [
  { id: "alg", count: 24 },
  { id: "prog", count: 38 },
  { id: "net", count: 15 },
  { id: "db", count: 12 },
  { id: "hw", count: 21 },
  { id: "sec", count: 9 },
  { id: "matura", count: 32 },
  { id: "gloss", count: 214 },
];

export type ItemType = "material" | "test" | "exercise" | "task" | "term" | "topic";
export type Level = "basic" | "medium" | "advanced";

export type Material = {
  id: string;
  section: SectionId;
  grade: number;
  type: ItemType;
  level: Level;
  minutes: number;
  /** A title may be missing in some languages — the card then shows a fallback (lib/localize.ts). */
  title: Localized;
};

export const newMaterials: Material[] = [
  {
    id: "binary-search",
    section: "alg",
    grade: 2,
    type: "material",
    level: "medium",
    minutes: 12,
    title: { uk: "Бінарний пошук", pl: "Wyszukiwanie binarne", en: "Binary search" },
  },
  {
    id: "sql-join",
    section: "db",
    grade: 3,
    type: "exercise",
    level: "medium",
    minutes: 20,
    title: { uk: "SQL JOIN на прикладах", en: "SQL JOIN by example" },
  },
  {
    id: "tcp-udp",
    section: "net",
    grade: 1,
    type: "test",
    level: "basic",
    minutes: 8,
    title: { uk: "TCP і UDP: у чому різниця", pl: "TCP i UDP: czym się różnią", en: "TCP vs UDP" },
  },
  {
    id: "recursion-tasks",
    section: "prog",
    grade: 3,
    type: "task",
    level: "advanced",
    minutes: 35,
    title: {
      uk: "Рекурсія в Python: задачі",
      pl: "Rekurencja w Pythonie: zadania",
      en: "Recursion in Python: problems",
    },
  },
  {
    id: "passwords-hashing",
    section: "sec",
    grade: 1,
    type: "material",
    level: "basic",
    minutes: 10,
    title: { uk: "Паролі та хешування", pl: "Hasła i haszowanie" },
  },
  {
    id: "matura-recursion",
    section: "matura",
    grade: 4,
    type: "test",
    level: "advanced",
    minutes: 45,
    title: {
      uk: "Матура: задачі на рекурсію",
      pl: "Matura: zadania z rekurencji",
      en: "Matura: recursion problems",
    },
  },
];

export type SearchItem = { id: string; type: ItemType; section: SectionId; title: Localized };

const material = (id: string): SearchItem => {
  const found = newMaterials.find((m) => m.id === id);
  if (!found) throw new Error(`Unknown material: ${id}`);
  return { id: found.id, type: found.type, section: found.section, title: found.title };
};

/** What the quick search looks through. The first six entries are shown as "popular". */
export const searchIndex: SearchItem[] = [
  {
    id: "bubble-sort",
    type: "topic",
    section: "alg",
    title: { uk: "Сортування бульбашкою", pl: "Sortowanie bąbelkowe", en: "Bubble sort" },
  },
  material("binary-search"),
  { id: "algorithm", type: "term", section: "alg", title: { uk: "Алгоритм", pl: "Algorytm", en: "Algorithm" } },
  {
    id: "python-loops",
    type: "topic",
    section: "prog",
    title: { uk: "Цикли в Python", pl: "Pętle w Pythonie", en: "Loops in Python" },
  },
  material("recursion-tasks"),
  { id: "recursion", type: "term", section: "prog", title: { uk: "Рекурсія", pl: "Rekurencja", en: "Recursion" } },
  { id: "osi-model", type: "topic", section: "net", title: { uk: "Модель OSI", pl: "Model OSI", en: "OSI model" } },
  material("tcp-udp"),
  { id: "ip-address", type: "term", section: "net", title: { uk: "IP-адреса", pl: "Adres IP", en: "IP address" } },
  material("sql-join"),
  {
    id: "db-normalisation",
    type: "topic",
    section: "db",
    title: { uk: "Нормалізація баз даних", pl: "Normalizacja baz danych", en: "Database normalisation" },
  },
  {
    id: "primary-key",
    type: "term",
    section: "db",
    title: { uk: "Первинний ключ", pl: "Klucz główny", en: "Primary key" },
  },
  {
    id: "binary-system",
    type: "topic",
    section: "hw",
    title: { uk: "Двійкова система числення", pl: "System dwójkowy", en: "Binary number system" },
  },
  material("passwords-hashing"),
  {
    id: "hash-function",
    type: "term",
    section: "sec",
    title: { uk: "Хеш-функція", pl: "Funkcja skrótu", en: "Hash function" },
  },
  material("matura-recursion"),
];

/** Shortcuts under the hero search field. */
export const popularSearchIds = ["recursion", "binary-system", "python-loops", "osi-model"];

/** Where the banner button leads. */
export const bannerTopicId = "bubble-sort";
