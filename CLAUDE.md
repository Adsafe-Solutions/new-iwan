# Iwan — project guide

Marketing site for **Iwan** (`iwan.community`), a Muslim community organisation.
Not a relief charity: copy should speak to members about belonging and
programmes, not to donors about beneficiaries.

## Stack

Vite 5 + React 18, **plain JS/JSX — no TypeScript**. `react-router-dom` v6,
**Tailwind CSS 3.4** for all styling, GSAP for scroll animation. No component
library, no test runner.

```
npm run dev      # vite dev server, port 5173
npm run build    # production build — use this as the check, there are no tests
npm run format   # prettier --write .
```

Prettier 3.9.6 is pinned; run `npx prettier --write src` after editing and
`npm run build` before calling anything done.

## Layout

**There are no component stylesheets.** Every component is styled with Tailwind
utility classes in its own JSX; `src/index.css` is the only `.css` file in the
project and holds nothing but the three `@tailwind` directives, the `body`/`html`
base rules, `.reveal`, and the reduced-motion block.

```
src/
  App.jsx              routes + the Shell that owns header/scroll state
  index.css            @tailwind directives + base — must load first
  components/<Name>/<Name>.jsx
  pages/<Name>/<Name>.jsx
  config/              brand.js · sections.js · navPages.js · events.js
  hooks/useGsap.js     scroll animations
  lib/cx.js            className joiner
  lib/type.js          shared heading + highlight class sets (KICKER, MARK_*)
  themes.js focusAreas.js advisors.js
tailwind.config.js     EVERY colour in the project (see Colour below)
```

A class set used more than once inside a file is hoisted to a `const` at the top
of that file (`NAV_ITEM`, `CARD`, `PILL_Y`, …) rather than repeated inline.

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
  `<a>`, otherwise `<button type={type}>`. `className` is appended last so a
  caller can resize or recolour it. Border **colour** lives on each variant, not
  in the shared base — see the Tailwind ordering gotcha below.
- **`Modal`** — generic dialog shell: backdrop, panel, close button, Escape,
  body scroll lock, initial focus. Wrap feature content in it. It takes
  `panelClassName` and `closeClassName` so a feature can restyle the shell —
  `EventModal` passes `closeClassName` because its header is dark.

## Colour — all of it lives in `tailwind.config.js`

**No hex code may appear anywhere in `src/`.** The config is the single source:

- `palette` — fixed colours, including the four programme colours
  (`women` `#ee5f9e`, `kids` `#3694db`, `men` `#234967`, `youth` `#3994b3`,
  available as `bg-women`, `text-youth`, … and currently defined but unused).
- `themes` — the four brand themes. A plugin at the bottom of the config emits
  `:root` and `:root[data-theme="…"]` blocks holding the RGB channels
  (`--c-blue`, `--c-yellow`, …). Themeable Tailwind colours are declared as
  `rgb(var(--c-blue) / <alpha-value>)`, so `bg-primary`, `text-accent/60` and
  friends recolour with the switcher and still take opacity modifiers.
- Gradients, shadows, keyframes and drop-shadows are named entries in the config
  too (`bg-hero-scrim`, `shadow-card`, `animate-ecardIn`), because each of them
  would otherwise smuggle a literal colour into a component.

Use `primary` / `accent` for anything that should follow the theme; the literal
names (`ink`, `mist`, `chip-*`, `theme-<id>-primary`) are for the things that
must not.

JS that needs a real colour string reads it back out of the variables — see
`cssColor()` in `useGsap.js`. `themes.js` lists the switcher entries and
references `bg-theme-<id>-primary/accent` utilities, since a theme can only be
previewed with literal colour. **Adding a theme means editing both files.**

## Gotchas that have already bitten

- **`.reveal` only works on markup present at mount.** `useGsap` scans the DOM
  once, so anything rendered later (a filtered list, a modal) stays at
  `opacity: 0` forever. Give dynamic content its own keyframe animation instead
  — `animate-ecardIn` on the cards in `Events.jsx` is the pattern.
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
- **The mobile tray is a sibling inside the `<header>`.** Its `z-index: 99`
  will swallow the logo and the burger unless they out-stack it. The drawer
  breakpoint is the `nav` screen (**1000px**), not 780 — the nav runs out of
  room just under 1000. Custom screens: `nav` 1000 · `wide` 1240 · `phone` 780 ·
  `xs` 560, used almost entirely as `max-*` variants.
- **`html { scroll-behavior: smooth }` is global**, so any hand-animated
  `scrollTo` must disable it for the duration (see `glideTo` in `Events.jsx`).
- Global `@media (prefers-reduced-motion)` kills all animation. Never put the
  hidden state (`opacity: 0`) in a base rule — put it only in keyframes, or the
  content is stranded invisible.
- **Tailwind emits utilities in _its_ order, not the order you write them.**
  Two classes setting the same property fight by position in the generated
  stylesheet, so passing `text-primary-800` to a `<Button>` whose variant sets
  `text-white` silently loses. Either give the base rule no opinion on that
  property (what `Button` does with `border-color`) or mark the override `!`
  (what `Header` does for the overlaid CTA).
- **`bg-none` is not `background: none`** — it only clears `background-image`,
  so a form control keeps its UA background. Use `bg-transparent`.
- **Tailwind scans these files as plain text**, so a class assembled by string
  interpolation is never generated. Write the whole class out — see `CARD_DELAYS`
  in `Events.jsx` and `COPY` in `Hero.jsx`.
- Anything reading the header's height at runtime must query the `header`
  element, not a class (`glideTo` in `Events.jsx`).

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
