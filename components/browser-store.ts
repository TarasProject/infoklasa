import { useSyncExternalStore } from "react";

// The visitor's choices (theme, accessibility modes, cookie answer) live in the browser's
// localStorage. Components read them through `useStored`, so all of them update together.

const PREFIX = "infoklasa.";
const listeners = new Set<() => void>();
// Keeps the choice for this visit even when the browser blocks localStorage.
const memory = new Map<string, string>();

function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    // Another tab changed a value (key null = it cleared everything): forget our copy and read again.
    if (event.key === null) memory.clear();
    else if (event.key.startsWith(PREFIX)) memory.delete(event.key.slice(PREFIX.length));
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function read(key: string): string | null {
  const kept = memory.get(key);
  if (kept !== undefined) return kept;
  try {
    return window.localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: string) {
  memory.set(key, value);
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    /* storage blocked: the choice still works until the tab is closed */
  }
  listeners.forEach((listener) => listener());
}

/** Drops the copies kept for this visit, so the next read goes to localStorage again. */
export function forgetStored() {
  memory.clear();
}

/** Raw stored value, or null on the server and when nothing is stored yet. */
export function useStored(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
}

const never = () => () => {};

/** False on the server and during the first browser render, true afterwards. */
export function useInBrowser(): boolean {
  return useSyncExternalStore(
    never,
    () => true,
    () => false,
  );
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// `matchMedia` is missing in very old browsers and in the test environment: treat that as "motion allowed".
function subscribeMotion(listener: () => void) {
  const query = window.matchMedia?.(REDUCED_MOTION);
  query?.addEventListener("change", listener);
  return () => query?.removeEventListener("change", listener);
}

/** True when the operating system asks for less motion. */
export function useSystemReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia?.(REDUCED_MOTION).matches ?? false,
    () => false,
  );
}

// Messages between components that do not know each other (hero button → search palette).
const SEARCH_EVENT = "infoklasa:search";
const COOKIE_EVENT = "infoklasa:cookie";

export function openSearch(seed = "") {
  window.dispatchEvent(new CustomEvent<string>(SEARCH_EVENT, { detail: seed }));
}

export function onOpenSearch(handler: (seed: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail);
  window.addEventListener(SEARCH_EVENT, listener);
  return () => window.removeEventListener(SEARCH_EVENT, listener);
}

export function openCookieNotice() {
  window.dispatchEvent(new Event(COOKIE_EVENT));
}

export function onOpenCookieNotice(handler: () => void) {
  window.addEventListener(COOKIE_EVENT, handler);
  return () => window.removeEventListener(COOKIE_EVENT, handler);
}
