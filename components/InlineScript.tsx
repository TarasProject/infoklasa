"use client";

// Must be a Client Component: a Server Component is not rendered again in the browser,
// so the `typeof window` switch below would never pick "text/plain".

/**
 * A script that runs once, while the browser parses the server HTML — before the first paint.
 *
 * On the client React would render it as `text/plain`: a script inserted by React never runs anyway,
 * and React 19 warns in development when it renders an executable <script>. suppressHydrationWarning
 * covers the `type` difference. Recipe: node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
