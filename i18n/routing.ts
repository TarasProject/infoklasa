import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/locales";

// Every page lives under /uk, /pl or /en.
export const routing = defineRouting({
  locales,
  defaultLocale,
  // Without maxAge the cookie is forgotten when the browser closes.
  localeCookie: { name: "NEXT_LOCALE", maxAge: 60 * 60 * 24 * 365 },
});
