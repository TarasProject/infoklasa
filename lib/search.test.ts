import { describe, expect, test } from "vitest";
import { filterEntries, splitMatch } from "./search";

// Spec: docs/spec/home-page.md · HP-5
const entries = [
  { id: "sort", title: "Сортування бульбашкою", sectionName: "Алгоритми" },
  { id: "bin", title: "Бінарний пошук", sectionName: "Алгоритми" },
  { id: "rec", title: "Рекурсія", sectionName: "Програмування" },
  { id: "rec-tasks", title: "Рекурсія в Python: задачі", sectionName: "Програмування" },
  { id: "osi", title: "Модель OSI", sectionName: "Мережі" },
  { id: "tcp", title: "TCP і UDP: у чому різниця", sectionName: "Мережі" },
  { id: "sql", title: "SQL JOIN на прикладах", sectionName: "Бази даних" },
  { id: "hash", title: "Хеш-функція", sectionName: "Кібербезпека" },
];
const ids = (list: { id: string }[]) => list.map((e) => e.id);

describe("filterEntries", () => {
  test("an empty query returns the first six entries", () => {
    expect(ids(filterEntries(entries, ""))).toEqual(["sort", "bin", "rec", "rec-tasks", "osi", "tcp"]);
  });

  test("a query made only of spaces counts as empty", () => {
    expect(filterEntries(entries, "   ")).toHaveLength(6);
  });

  test("matches a part of the title", () => {
    expect(ids(filterEntries(entries, "рек"))).toEqual(["rec", "rec-tasks"]);
  });

  test("ignores letter case", () => {
    expect(ids(filterEntries(entries, "РЕК"))).toEqual(["rec", "rec-tasks"]);
  });

  test("matches the section name even when the title lacks the word", () => {
    expect(ids(filterEntries(entries, "мереж"))).toEqual(["osi", "tcp"]);
  });

  test("trims spaces around the query", () => {
    expect(ids(filterEntries(entries, "  sql "))).toEqual(["sql"]);
  });

  test("returns an empty list when nothing matches", () => {
    expect(filterEntries(entries, "zzz")).toEqual([]);
  });

  test("does not cut the results of a real query to six", () => {
    const many = Array.from({ length: 9 }, (_, n) => ({ id: `t${n}`, title: `Тема ${n}`, sectionName: "Алгоритми" }));
    expect(filterEntries(many, "тема")).toHaveLength(9);
  });
});

describe("splitMatch", () => {
  test("splits the title around the match and keeps the original letter case", () => {
    expect(splitMatch("Рекурсія в Python", "PYT")).toEqual({ before: "Рекурсія в ", match: "Pyt", after: "hon" });
  });

  test("returns null when the title does not contain the query", () => {
    expect(splitMatch("Модель OSI", "мереж")).toBeNull();
  });

  test("returns null for an empty query", () => {
    expect(splitMatch("Модель OSI", "  ")).toBeNull();
  });
});
