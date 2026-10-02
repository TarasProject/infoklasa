import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleLocale = createMiddleware(routing);

// Sends "/" and any address without a language to /uk, /pl or /en
// (saved choice → browser language → Ukrainian).
export function proxy(request: NextRequest) {
  return handleLocale(request);
}

export const config = {
  // Everything except API routes, Next.js internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
