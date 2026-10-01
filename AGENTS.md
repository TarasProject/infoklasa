<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules — infoklasa (computer science teacher's site)

Product context lives in `docs/` (`product-brief.md`, `requirements-*.md`, `design-brief.md`).
The spec for the current work is in `docs/spec/`; out-of-scope ideas go to `docs/backlog.md`, not into code.

## Commands (pnpm only — never npm or yarn)

- `pnpm dev` — dev server (http://localhost:3000). Never start a second one.
- `pnpm check` — typecheck + lint + tests. Run it before saying a task is done and quote the output.
- `pnpm agent:log` — summary of `.agent-log/actions.jsonl`: what you actually did this session.

## Definition of done

- A requirement exists in `docs/spec/` BEFORE the code that implements it; change the spec first when reality differs.
- `pnpm check` is green; new logic has a test next to the code (`*.test.ts` / `*.test.tsx`), written first and seen red.
- Evidence, not claims: report the command you ran and its exit code / test count.

## Languages (uk · pl · en)

- No user-visible string in a component: every text comes from `messages/{uk,pl,en}.json` via next-intl.
- A new key goes into all three files in the same commit — `messages/messages.test.ts` fails otherwise.
- Teaching content may lack a translation; show it in a fallback language with the "translation missing" badge (`lib/localize.ts`), never an empty card.
- Ukrainian is the default locale. English code, comments and commit messages.

## Design

- The visual source of truth is `docs/design/a-zoshyt.html`. Colours, radii and fonts are CSS variables in `app/globals.css` — use the tokens, never hard-code a colour in a component.
- Light and dark themes and the accessibility modes must keep working for every new block.

## Next.js 16 rules that differ from what you may remember

- `params`, `searchParams`, `cookies()`, `headers()` are async — always `await` them.
- Request interception is `proxy.ts` (exports `proxy`), not `middleware.ts`.
- Server Components by default; `'use client'` only for hooks, browser APIs, event handlers.

## Conventions the linter does not enforce

- Pure logic lives in `lib/` (no React or Next imports) with a Vitest test beside it; components stay thin.
- Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`), one logical change per commit.

## Boundaries

- Ask before: adding a dependency, editing `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.claude/settings.json` or CI.
- Never: touch `.env*` (a hook blocks it anyway), delete tests or disable lint rules to get green, `git push --force`, `rm -rf`.
- Do not edit the managed Next.js block above — `next dev` re-adds it.
