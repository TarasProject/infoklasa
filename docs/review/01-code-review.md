# Рев'ю коду №1 — maker ≠ checker

- **Хто писав код (maker):** Claude Code, основна сесія.
- **Хто рецензував (checker):** окремий субагент `project-factory:code-reviewer` (плагін Project Factory) — нова сесія без контексту автора; отримав лише репозиторій, специфікацію `docs/spec/home-page.md` і `AGENTS.md`; файли змінювати не мав права.
- **Що рецензувалось:** коміти `c1b3ada..10e047f`.
- **Результат:** 4 знахідки середньої важкості, 13 низької; `pnpm check` зелений (55 тестів). Зелені тести не впіймали жодної з цих знахідок.
- **Що з ними зроблено:** таблиця «Рішення» внизу.

Нижче — звіт рецензента без змін (переклад українською).

---

I found 4 medium-severity and 13 low-severity problems. The most important are that on phones the accessibility panel probably renders mostly off-screen, and that Ukrainian, the default language, gets no dyslexia font. I didn't change any files, and `pnpm check` passes.

Review scope: commits `c1b3ada..10e047f`. Two things are marked unverified because they need a real browser and I didn't start a dev server.

## Findings, most severe first

**1. Medium (unverified: needs a browser on a phone-width screen)**: the accessibility panel probably sits off-screen on phones.
- Where: `components/Header.tsx:100` and `app/globals.css:55` / `:176` / `:188`.
- What's wrong: `<A11yPanel>` is rendered inside `<header className="top">`, and `.top` has `backdrop-filter:blur(10px)`. A `backdrop-filter` makes the header the containing block for `position:fixed` children, so `.x-pop` is placed relative to the header, not the window. The design reference (`docs/design/common.js:242`) adds the panel to `<body>`.
- Failure: at ≤640px the rule `top:auto; bottom:12px` puts the panel's bottom 12px above the header's bottom. The panel (~330px tall) then grows upward above the top of the screen, while focus moves to a switch you can't see. Its `z-index:60` also only counts inside the header's z-index 30, so it may end up under the cookie notice (z-index 50).
- Fix: render the panel outside `.top`, for example as a sibling in the layout or through `createPortal(…, document.body)`.

**2. Medium**: the dyslexia font does nothing for Cyrillic text, so the default `uk` locale doesn't get it.
- Where: `app/[locale]/layout.tsx:16`.
- What's wrong: Lexend is loaded with `subsets: ["latin", "latin-ext"]`, and Lexend has no Cyrillic glyphs.
- Failure: on `/uk`, turning on «Шрифт для дислексії» (HP-7) switches Ukrainian text from Onest to the system font (`system-ui`, e.g. Segoe UI) rather than to a dyslexia-friendly font.
- Fix: choose a font with Cyrillic support, or record the limitation in the spec.

**3. Medium**: the saved language choice only lasts until the browser is closed (HP-1 says "збережений вибір").
- Where: `i18n/routing.ts:5`.
- What's wrong: `defineRouting({ locales, defaultLocale })` doesn't configure `localeCookie`. In next-intl 4.14.8 the default cookie has no `maxAge`, which makes it a session cookie.
- Failure: pick PL, close the browser, open `/` → you're sent to the browser language or `/uk`, not `/pl`.
- Fix: add `localeCookie: { maxAge: 60*60*24*365 }` to `defineRouting`.

**4. Medium**: focus isn't returned when the accessibility panel closes.
- Where: `components/A11yPanel.tsx:28` and `components/Header.tsx:26`.
- Failure: Esc, the close button or an outside click hides the panel while it holds focus, so focus drops to `<body>` and keyboard users lose their place (WCAG 2.4.3).
- Fix: keep a ref to the header button and focus it in `closeA11y`.

**5. Low-medium**: Ctrl+K doesn't work with the Ukrainian keyboard layout active.
- Where: `components/SearchPalette.tsx:42`.
- What's wrong: the check is `event.key.toLowerCase() === "k"`, and `event.key` follows the active layout.
- Failure: with the UA layout on, Ctrl+K reports `key === "л"`, so the shortcut from HP-5 does nothing for the main audience.
- Fix: also accept `event.code === "KeyK"`.

**6. Low-medium (unverified)**: Polish section tiles may cause sideways scrolling.
- Where: `app/globals.css:134` / `:141`.
- Failure: in `pl`, "Cyberbezpieczeństwo" is about 163px wide, but each phone column only has about 129px. The grid gets wider than the content area (HP-12).
- Fix: use `repeat(2,minmax(0,1fr))`, plus `overflow-wrap:anywhere` on `.tile .n`.

**7. Low**: the cookie settings don't show the saved answer when reopened.
- Where: `components/CookieNotice.tsx:15`.
- Failure: accept all, reopen via «Приватність і cookies», open Settings: statistics shows unchecked; Save quietly changes the answer to `"necessary"`.
- Fix: start the checkbox from `answer === "all"`.

**8. Low**: fallback-language titles in the search palette have no `lang` attribute (WCAG 3.1.2). `components/SearchPalette.tsx:61`, `:148`.

**9. Low**: when nothing matches, `aria-controls="search-results"` points to a missing element, `aria-expanded` stays `"true"`, and the `role="status"` message is mounted already filled in (often not announced). `components/SearchPalette.tsx:104-105`, `:121-124`.

**10. Low**: the palette's focus trap only works while the input has focus; the input has `outline:0`, so no visible focus indicator. `components/SearchPalette.tsx:84-87`, `globals.css:194`.

**11. Low**: ArrowDown with no results sets the selection to -1 (latent). `components/SearchPalette.tsx:77`.

**12. Low**: the banner animation restarts on every theme click; in still mode it does not repaint when the OS theme changes. `components/SortViz.tsx:86`.

**13. Low**: colours hard-coded in a component (`"rgba(255,255,255,.28)"`, `"rgba(255,255,255,.55)"`), which AGENTS.md forbids. `components/SortViz.tsx:51`, `:56`.

**14. Low**: `localize` throws when a title has no language at all, so one content mistake takes down the page. `lib/localize.ts:24`.

**15. Low**: the in-memory store leaks between tests (tests depend on their order) and misses `localStorage.clear()` from another tab (`event.key === null`). `components/browser-store.ts:9`, `:14`.

**16. Low**: the language-switch test checks hrefs built by the mocked `Link`; missing tests for Esc returning focus, focus in the accessibility panel, `SortViz` still mode, Header reading a saved `"dark"`. `components/interactive.test.tsx:157-166`.

**17. Low**: every unknown address returns a 200 "in development" page (soft 404): `/uk/asdf` → 200. `app/[locale]/[...rest]/page.tsx:7`.

## Areas checked and clean
- Security: the inline script and `Icon.tsx` inject only constants.
- Hydration: no mismatches from the `useSyncExternalStore` setup.
- Logic and plurals: `lib/*` match HP-3..HP-8; uk/pl/en plural rules match the HP-3 table.
- Translations: identical key sets, no definite errors.
- Next.js 16 rules: `proxy.ts`, `i18n/*`, async `params` follow AGENTS.md.

## `pnpm check` (exit 0) — 7 files, 55 tests passed

---

## Рішення (заповнено після рев'ю)

| # | Знахідка | Рішення | Де видно |
|---|---|---|---|
| 1 | Панель доступності за межами екрана на телефоні | виправлено: панель рендериться в `<body>` через портал | коміт `fix:` після цього рев'ю |
| 2 | Lexend без кирилиці | **не виправлено** — потрібен вибір шрифту людиною; записано в `docs/backlog.md` | `docs/backlog.md` |
| 3 | Мова забувається після закриття браузера | виправлено: cookie на рік; тест спочатку червоний | `i18n/routing.test.ts` |
| 4 | Фокус губиться після закриття панелі | виправлено; тест спочатку червоний | `components/interactive.test.tsx` |
| 5 | Ctrl+K не працює з українською розкладкою | виправлено (`event.code`); тест спочатку червоний | `components/interactive.test.tsx` |
| 6 | Польська плитка ширша за екран | виправлено (`minmax(0,1fr)`, перенос слова) | `app/globals.css` |
| 7 | Налаштування cookies не показують збережений вибір | виправлено; тест спочатку червоний | `components/interactive.test.tsx` |
| 8 | Немає `lang` у назвах пошуку | виправлено | `components/SearchPalette.tsx` |
| 11 | Вибір −1 у порожньому списку | виправлено | `components/SearchPalette.tsx` |
| 13 | Кольори в компоненті | виправлено: токени `--viz-bar`, `--viz-label` | `app/globals.css` |
| 15 | Пам'ять сховища між тестами / `clear()` в іншій вкладці | виправлено | `components/browser-store.ts` |
| 9, 10, 12, 14, 16, 17 | дрібні a11y-деталі пошуку, анімація при зміні теми, падіння на порожній назві, тести з моком, «м'який 404» | **відкладено** — записано в `docs/backlog.md` | `docs/backlog.md` |
