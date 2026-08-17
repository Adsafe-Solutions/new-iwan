# Iwan — project guide

Marketing site for **Iwan** (`iwan.community`), a Muslim community
organisation founded in **Bangalore in 2020**, out of pandemic relief work
with Mercy Mission. It runs classes, workshops, mentoring and volunteering —
Taekwondo, gardening, first aid, Web 3.0, entrepreneurship.

**It is not a relief charity, and it is not Canadian.** Copy speaks to members
about belonging and programmes, never to donors about beneficiaries. The build
was inherited from a charity template, so anything that reads like a donor
appeal is almost certainly leftover and wrong — check it against the live site
(iwan.community) before keeping it.

## Stack

Vite 5 + React 18, **plain JS/JSX — no TypeScript**. `react-router-dom` v6,
**Tailwind CSS 3.4** for all styling, GSAP for scroll animation,
`@tabler/icons-react` for iconography. No component library, no test runner.

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

Components: About, AboutSplit, AboutStrip, Brand, Button, Contact,
Difference, EventModal, Events, Footer, Header, Hero, Icon, Instagram,
Journey, Modal, News, PageHero, Pillars, ScrollToTop, SplitFeature,
StepsFeature, TakeAction, Testimonials, ThemeSwitcher, Topbar, Typewriter,
WhatsAppFab, WipeBand.

Homepage order (`pages/Home/Home.jsx`): Hero → About → Pillars → TakeAction
→ Events → Testimonials → Instagram.

Two homepage heroes, chosen by `SECTIONS.homeHero`: **`Hero`** (v1) is the
photo slider with rising headline copy; **`HeroV2`** is the full-bleed arch
photograph with the brand mark cycling through the programme logos, reusing
the same `heroRise`/`heroSet` pair. v2 also hides the header until the page
is scrolled — that lives in `App.jsx`, since it owns the scroll position.

`WhatsAppFab` and `ThemeSwitcher` are rendered by `App.jsx`, so they sit on
every page — bottom-right and bottom-left respectively, deliberately opposite
corners so they never collide.

**`News`, `Difference` and `Contact` are deliberately not on the homepage.**
`News` was invented press copy about worldwide offices Iwan does not have;
`Difference` was a donor appeal ladder ("sponsor an orphan from $75 a
month"); `Contact` was the closing get-in-touch band. All three are still in
the tree and go back with one import each — but `News` only with real
content. `Difference` also owns the only remaining use of `focusAreas.js`
outside `/zakat`.

Two consequences of `Contact` being parked: it owned `id="contact"`, so the
header and hero CTAs point at `mailto:BRAND.email` instead — **there is no
in-page contact anchor, so do not reintroduce `href="#contact"`**. It was
also the only place `BRAND.socials` was rendered, so Iwan's four accounts
currently appear nowhere on the site.

## Config — change content here, not in components

| file                     | holds                                                                                                                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config/brand.js`        | name, fullName, logos, tagline, email. Everything naming the org reads from this.                                                                                                                                                                                                   |
| `config/sections.js`     | feature switches. `topbar: false` hides the "Emergency Monitor" strip; `programmeAbout: "v1" \| "v2"` picks the programme pages' about treatment; `homeHero: "v1" \| "v2"` picks the homepage hero — **App.jsx reads this too**, because v2 holds the header back until you scroll. |
| `config/navPages.js`     | nav entries + their routes + stub-page copy. `group: PROGRAMMES` folds an entry into the Programmes dropdown and adds `tone` + `tile` (colour + photo) for the programmes grid on the homepage. Header, App and TakeAction all read this, so links, routes and tiles can't drift.   |
| `config/events.js`       | events for the homepage Events section.                                                                                                                                                                                                                                             |
| `config/pillars.js`      | Believe · Act · Serve · Consult, each with its Arabic and the vision pillar it carries. Folds the brand deck's two four-part lists into one, so the page doesn't run the same beats twice.                                                                                          |
| `config/stats.js`        | the "Iwan by the numbers" counters.                                                                                                                                                                                                                                                 |
| `config/testimonials.js` | ⚠ **real quotes from real, named members.** Rewrite the marketing copy freely; never these.                                                                                                                                                                                         |

`/zakat` is a full donation funnel inherited from the charity template. It is
routed but linked from nowhere, and is slated for deletion — do not wire it
back into the nav.

Routes: `/` and `/zakat` are real pages. A `navPages.js` entry with a matching
key in `config/programmes.js` renders the shared `Programme` template — that is
all four programmes today; everything else (`/blogs`, `/events`, `/podcast`)
still renders the `Placeholder` stub. App picks between them, so adding a
programmes.js entry is the only step needed to promote a stub to a full page.

**`Programme` is one template for every programme**, coloured by the slug. Each
section renders only if `programmes.js` supplies content, so a thin entry gives
a shorter honest page rather than empty scaffolding — Kids, Women and Men have
no `sessions`, so that whole block is absent for them. Do not invent sessions
to fill it; a listing of things that never happened is the mistake that got
`News` pulled. `impact` (the fourth "at a glance" tile) is a factual claim, so
it likewise only appears where there is a source.

Because the slug drives colour, `Programme.jsx` holds a literal `SKIN` map —
`text-${tone}` would never be generated by Tailwind's text scan.

## Shared components

- **`Button`** — the only button. `variant`: `blue` (default) · `red` · `yellow`
  · `ghost` · `outline`. Element follows the props: `to` → `<Link>`, `href` →
  `<a>`, otherwise `<button type={type}>`. `className` is appended last so a
  caller can resize or recolour it. Border **colour** lives on each variant, not
  in the shared base — see the Tailwind ordering gotcha below.
- **`WipeBand`** — a section whose background colour sweeps in from one edge
  on scroll (the `[data-wipe]` / `[data-wipe-scene]` pair `useGsap` scrubs),
  with the container floating above it. `from` is the edge the colour anchors
  to, so `right` sweeps leftwards.
- **`SplitFeature`** / **`StepsFeature`** — the two banded cards the Zakat page
  introduced, now shared with the programme pages: a dark copy-and-photo card,
  and a white card with a stack of labelled `[label, text]` steps. Both wrap
  `WipeBand`; both take the CTA as children so the caller picks the Button
  variant. Changing either changes Zakat _and_ all four programme pages —
  a refactor that produced pixel-identical Zakat output, so keep it that way.
- **`AboutStrip`** (v1) / **`AboutSplit`** (v2) — two interchangeable "about"
  treatments driven off the same `programmes.js` entry. v1 is a badged lede
  plus a row of ringed icons; v2 is an editorial two-column spread — ruled
  eyebrow, oversized heading with one word in italic accent, stat and photo
  left, numbered rows right. **`SECTIONS.programmeAbout` picks between them**
  and changes every programme page at once. `about.accent` and `about.stat`
  are read only by v2; v1 ignores them, so either renders from one entry.
- **`Icon`** — the shared glyph set, wrapping `@tabler/icons-react`. Import
  Tabler icons **by name** — a namespace import pulls in several thousand
  components and defeats tree-shaking. Config files refer to icons by the
  short names in the `ICONS` map, so swapping the underlying set again is a
  change to that one file.
- **`Modal`** — generic dialog shell: backdrop, panel, close button, Escape,
  body scroll lock, initial focus. Wrap feature content in it. It takes
  `panelClassName` and `closeClassName` so a feature can restyle the shell —
  `EventModal` passes `closeClassName` because its header is dark.

## Colour — all of it lives in `tailwind.config.js`

**No hex code may appear anywhere in `src/`.** The config is the single source:

- `palette` — fixed colours, including the four programme colours
  (`women` `#ee5f9e`, `kids` `#3694db`, `men` `#234967`, `youth` `#3994b3`,
  available as `bg-women`, `text-youth`, …). Each programme's own colour is
  named on its entry in `navPages.js` as `tone`, so the programmes grid and the nav
  can't disagree about it.
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

## Maps

`lib/map.js` builds the embed and directions URLs for the event modal, in
order of preference:

1. `coords: [lat, lng]` on the event → **OpenStreetMap**'s official embed.
   Keyless, no tracking, pins the exact spot. Use this once a venue's real
   position is known.
2. an address string → **Google's `output=embed`** query, which is the only
   keyless way to map a place from text (the OSM embed wants a bounding box,
   not a search term). It needs no key but is **not** part of Google's
   documented Embed API — for something that must not break, add `coords` and
   let route 1 handle it, or move to the official Embed API with a key.

Venue names in `events.js` are placeholders ("Iwan Hall, 14 Main Street"), so
searching them would pin somewhere arbitrary. Anything without its own
`coords` or `mapQuery` therefore falls back to `BRAND.address` — which is why
that value living in one place matters.

## Instagram feed

Real posts are pulled by `.github/workflows/instagram.yml` (daily) via
`scripts/fetch-instagram.mjs`, which writes `src/config/instagram-feed.json`
and commits it. **The site never calls Instagram** — no token in the bundle,
no runtime dependency, and an Instagram outage cannot take the section down.
Until the secrets exist the wall falls back to placeholder stock images.

To turn it on:

1. Switch the Instagram account to **Professional** (Business or Creator).
2. Create an app on Meta for Developers and authorise it against the account.
3. Add repo secrets `IG_USER_ID` and `IG_ACCESS_TOKEN` (a long-lived token).
4. Run the workflow by hand once (`workflow_dispatch`) to seed the file.

The Basic Display API most guides still describe was **shut down in December
2024** — this uses the Graph API. Long-lived tokens last ~60 days; the
`rotate-token` job refreshes and rewrites the secret automatically, but only
if an optional `GH_PAT` secret with secrets write access exists. Without it
the job warns and the token must be rotated by hand.

**Captions are not alt text.** Feed images render `alt=""` and the link
carries the accessible name; only the hand-written placeholders have real alt.

## Gotchas that have already bitten

- **`[data-count]` counters must render empty.** `useGsap` writes the number
  in; seeding the element with the final value makes it visibly snap back to
  zero when the ScrollTrigger fires. See `About.jsx`.
- **The Journey timeline pins the viewport, and carries `refreshPriority: 1`
  because of it.** `[data-journey]` scrubs a fill → draw → fill sequence and
  pins its section until it finishes. Pinning inserts a spacer that pushes
  everything below further down the page; ScrollTriggers refresh in creation
  order, so the wipes further up this file measured a layout with no spacer
  and fired ~1500px early. The higher priority makes the pin refresh first.
  **Any new pinned trigger needs the same.** It only pins at `nav` and up —
  the stacked layout has no connectors, so holding there would feel stuck.
- **`useScrollAnimations` is keyed on the pathname, not just on mount.** Two
  routes rendering the SAME component — all four programme pages render
  `Programme` — are reconciled by React rather than remounted, so a
  mount-only effect never re-runs and everything the new route added is
  stranded at `opacity: 0` until a hard refresh. Do not drop that dependency.
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
- **Nav dropdowns are click-toggled, not hover.** One `menu` state holds the
  single open label, so opening one closes the other by construction. Outside
  click (`mousedown`, which beats a link's own handler), Escape (returns focus
  to the trigger) and a route change all close it. Panels toggle `hidden`
  (`display:none`) with **no transition** — they snap, like Webflow's default
  dropdown. Do not add a fade: the reference behaviour depends on it.
- **The mobile tray is a sibling inside the `<header>`.** Its `z-index: 99`
  will swallow the logo and the burger unless they out-stack it. The drawer
  breakpoint is the `nav` screen (**1000px**), not 780 — the nav runs out of
  room just under 1000. Custom screens: `nav` 1000 · `wide` 1240 · `phone` 780 ·
  `xs` 560, used almost entirely as `max-*` variants.
- **`body` uses `overflow-x: clip`, not `hidden`.** `hidden` makes the body a
  scroll container, which silently breaks `position: sticky` for every
  descendant — the AboutSplit column and the Events calendar both rely on it,
  and both were broken by it. `clip` cuts off the same overflow without
  creating a scroll container. Do not change it back.
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
