import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/locales";

// Every page lives under /uk, /pl or /en.
export const routing = defineRouting({ locales, defaultLocale });
