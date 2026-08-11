# Iwan — project guide

Marketing site for **Iwan** (`iwan.community`), a Muslim community organisation.
Not a relief charity: copy should speak to members about belonging and
programmes, not to donors about beneficiaries.

## Stack

Vite 5 + React 18, **plain JS/JSX — no TypeScript**. `react-router-dom` v6,
GSAP for scroll animation. No CSS framework, no component library, no test
runner.

```
npm run dev      # vite dev server, port 5173
npm run build    # production build — use this as the check, there are no tests
npm run format   # prettier --write .
```

Prettier 3.9.6 is pinned; run `npx prettier --write src` after editing and
`npm run build` before calling anything done.

## Layout

Every component lives in **its own folder with its own CSS**, imported by the
component itself. Same for pages. There is no global stylesheet for components —
only `src/index.css` (design tokens, resets, `.container`, `.mark`, `.kicker`,
`.reveal`).

```
src/
  App.jsx              routes + the Shell that owns header/scroll state
  index.css            tokens & base — must load first (see main.jsx comment)
  components/<Name>/<Name>.jsx + <Name>.css
  pages/<Name>/<Name>.jsx + <Name>.css
  config/              brand.js · sections.js · navPages.js · events.js
  hooks/useGsap.js     scroll animations
  themes.js focusAreas.js advisors.js
```

Components: Brand, Button, Charity, Difference, EventModal, Events, Footer,
Header, Hero, Modal, News, ScrollToTop, TakeAction, ThemeSwitcher, Topbar,
Typewriter.

## Config — change content here, not in components

| file                 | holds                                                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config/brand.js`    | name, fullName, logos, tagline, email. Everything naming the org reads from this.                                                                                            |
| `config/sections.js` | boolean feature switches. `topbar: false` currently hides the "Emergency Monitor" strip.                                                                                     |
| `config/navPages.js` | nav entries + their routes + stub-page copy. `group: PROGRAMMES` folds an entry into the Programmes dropdown. Header and App both read this so links and routes can't drift. |
| `config/events.js`   | events for the homepage Events section.                                                                                                                                      |

Routes: `/` and `/zakat` are real pages; everything in `navPages.js`
(`/iwan-youth`, `/iwan-kids`, `/iwan-women`, `/iwan-men`, `/blogs`, `/events`,
`/podcast`) renders the shared `Placeholder` stub.

## Shared components

- **`Button`** — the only button. `variant`: `blue` (default) · `red` · `yellow`
  · `ghost` · `outline`. Element follows the props: `to` → `<Link>`, `href` →
  `<a>`, otherwise `<button type={type}>`. `.btn` styles live in `Button.css`,
  not `index.css`.
- **`Modal`** — generic dialog shell: backdrop, panel, close button, Escape,
  body scroll lock, initial focus. Wrap feature content in it and style that
  content from the feature's own CSS (see `EventModal`, which restyles
  `.modal__close` because its header is dark).

## Theming

`index.css` defines tokens on `:root`, with `[data-theme="ocean|emerald|violet|crimson"]`
overrides; `ThemeSwitcher` toggles them and `themes.js` mirrors the swatches —
**keep those two in sync**. The hero reads `--hero-bg` / `--hero-accent`, which
point at `--blue-800` / `--yellow`, so it recolours with the theme.

## Gotchas that have already bitten

- **`.reveal` only works on markup present at mount.** `useGsap` scans the DOM
  once, so anything rendered later (a filtered list, a modal) stays at
  `opacity: 0` forever. Give dynamic content its own CSS animation instead —
  `.ecard` in `Events.css` is the pattern.
- **Never `new Date("2026-08-21")`.** It parses as UTC and lands a day early
  west of Greenwich. Event dates are `YYYY-MM-DD` strings parsed field-by-field
  (`parse()` in `Events.jsx` / `EventModal.jsx`).
- **StrictMode double-invokes effects and refs survive it**, so a
  "skip the first render" ref guard fires on mount anyway. Use an explicit
  intent flag set by the interaction (see `wantScroll` in `Events.jsx`).
- **Header on `/` is `fixed`, not sticky**, for the whole route — it overlays
  the hero at scroll 0 and goes solid past 10px. It must never re-enter flow
  mid-scroll or the page jolts. `--topbar-h` collapses to `0px` when the topbar
  flag is off, and the hero's top padding is measured from it.
- **The mobile tray is a sibling inside `.header`.** Its `z-index: 99` will
  swallow the logo and the burger unless they out-stack it. Drawer breakpoint is
  **1000px**, not 780px — the nav runs out of room just under 1000.
- **`html { scroll-behavior: smooth }` is global**, so any hand-animated
  `scrollTo` must disable it for the duration (see `glideTo` in `Events.jsx`).
- Global `@media (prefers-reduced-motion)` kills all animation. Never put the
  hidden state (`opacity: 0`) in a base rule — put it only in keyframes, or the
  content is stranded invisible.
- `index.css` must load before component CSS or `.container { padding: 0 24px }`
  loses to same-specificity component padding. `main.jsx` imports it first.

## Verifying UI work

There are no tests. The reliable loop is: `npm run dev`, then drive Chrome with
Playwright from the scratchpad — read back computed styles and geometry rather
than eyeballing screenshots, and take screenshots to confirm. Past regressions
found this way: a logo rendering at 0px wide, a nav wrapping to two lines, a
close button losing its position, an unintended scroll-to-section on page load.

## Known loose ends

- `public/brand-logo-light.webp` **does not exist**. `Brand.jsx` falls back to
  the dark logo with a white CSS filter, so the header 404s once per load on
  `/`. Drop the file in and it is picked up with no code change.
- `public/` still holds dead Rising Beyond Borders assets (`rbb-mark.svg`, the
  two `Rising Beyond Borders Logo-*.svg`).
- The hero still uses three stock Webflow photos with generic charity copy. An
  earlier attempt to switch it to the four Iwan programmes (Men, Women, Youth,
  Kids) with local images was rolled back and `src/assests/` no longer exists.
- Register buttons and the newsletter form are visual only — nothing submits.
- `Upcoming events carousel design/` at the repo root is a reference design
  export, untracked, ships nothing. Safe to delete or gitignore.
- Nav links for About Us children (Our Story, Leadership, …) all point at `/`.
