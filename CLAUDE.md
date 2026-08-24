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
npm run dev          # vite dev server, port 5173
npm run build        # production build — use this as the check, there are no tests
npm run build:dev    # same, but bakes in .env.development
npm run build:prod   # same, but bakes in .env.production
npm run preview:cf   # dev build served through the real Workers runtime
npm run deploy:dev   # → the iwan-community-dev Worker
npm run deploy:prod  # → the iwan-community Worker
npm run format       # prettier --write .
```

## Hosting and environments

Cloudflare Workers static assets — no Worker script, the built `dist/` is
served directly. Two Workers rather than one with Cloudflare "environments",
so dev and prod stay completely independent: `wrangler.dev.toml`
(`iwan-community-dev`) and `wrangler.toml` (`iwan-community`). Both set
`not_found_handling = "single-page-application"`, which is what makes `/ca/`
and every other deep link work; `public/_redirects` does the same job for any
host that reads it.

⚠ **Config is baked in at BUILD time, not read at runtime.** Vite inlines
`import.meta.env.VITE_*` into the bundle, so a `[vars]` block in wrangler.toml
would never reach the browser — `.env.development` and `.env.production` are
what configure a build, and dev and prod therefore need _separate builds_.
`src/config/env.js` is the only place that reads them; `sections.js` and
`countries.js` take their defaults from it, so a deployment can run a
different hero or default country without a code change.

`.env.local`, `.env.development` and `.env.production` are committed only in
their **SOPS-encrypted** form. Decrypt the one needed for local work, and
re-encrypt it before staging. The native hook in `.githooks/pre-commit`
rejects staged plaintext env files; `npm ci` installs that hook through the
`prepare` script. `TURNSTILE_SITE_KEY` is public and explicitly injected by
`vite.config.js`; `TURNSTILE_SECRET_KEY` must never become a `VITE_` key or be
read by frontend code.

`.github/workflows/deploy.yaml` deploys on a push to `develop` (dev) or a
`v*` tag (prod). It imports GPG, decrypts only the selected environment file,
builds it, then deploys through the matching Wrangler config. Required Actions
secrets are `GPG_PRIVATE_KEY`, `GPG_PRIVATE_KEY_PASSPHRASE`, `GIT_TOKEN`,
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. GitHub uses the same
`secrets.*` context for repository and organization secrets; this private repo
currently relies on repository-level copies because of the organization plan.

Turnstile is rendered in the event modal, event-detail registration panel,
newsletter and contact form. It gates the client controls, but this static app
has no submission backend yet, so canonical server-side Siteverify remains
pending until those handlers exist.

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
  config/              app configuration — sections.js · countries.js · themes.js
  content/             all copy — base/ + one folder per country + the provider
  hooks/useGsap.js     scroll animations
  lib/cx.js            className joiner
  lib/type.js          shared heading + highlight class sets (KICKER, MARK_*)
tailwind.config.js     EVERY colour in the project (see Colour below)
```

A class set used more than once inside a file is hoisted to a `const` at the top
of that file (`NAV_ITEM`, `CARD`, `PILL_Y`, …) rather than repeated inline.

Pages: Home, About, Blogs, BlogPost, Contact, Podcast, Programme, Events,
EventDetail, Zakat, Placeholder, NotFound.

**`/about-us`** is transcribed from the live about-us page — the 2020 genesis
story, the vision and mission statements and the six core values are the
organisation's own account of itself, so `content/base/about.js` keeps them
verbatim and only the section furniture is ours. Two things it deliberately
does not restate: the programme cards come from `nav` (so Canada shows three),
and the vision/mission four-part lists come from `pillars.js`, which already
carries both — each pillar names the vision value it serves. The live page's
`iwan_vision.webp` is a **mislabelled copy of `iwan_mission.webp`**, so neither
is used; the lists render as cards instead.

Components: About, AboutSplit, AboutStrip, AudioPlayer, BlogCard, Brand,
Button, Contact,
ContactCta, Pagination, ReadingProgress,
CountrySwitcher, Difference, EventModal, Events, Footer, Header, Hero, Icon,
Instagram, Journey, Modal, News, PageHero, Pillars, ScrollToTop, SplitFeature,
StepsFeature, TakeAction, Testimonials, ThemeSwitcher, Topbar, Typewriter,
WhatsAppFab, WipeBand.

Homepage order (`pages/Home/Home.jsx`): Hero → TrustedBy → Pillars →
TakeAction → Events → Testimonials → Instagram.

**Events are the one content type NOT split by country folder.** They live in
a single array in `content/base/events.js` and each carries its own `country` —
`"in"`, a list like `["in", "ca"]`, or omitted for everywhere. `resolveContent`
filters that list after the merge, so no component has to remember. An event is
a real thing that happens in one place; a base-plus-override model would have
meant restating the whole list per country to say so. ⚠ India has all six
today, so **Canada has none** — the homepage section renders nothing at all
rather than a heading over an empty calendar, and `/ca/events` shows its empty
state. Add Canadian events to the same array with `country: "ca"`.

**`/contact-us`** is a real page now, not a nav entry — the header CTA and
`ContactCta` point at it, so `Contact.jsx` (the parked homepage band) is the
only thing still reaching for `mailto:` as a CTA. ⚠ **The form does not post
anywhere.** The live site runs Contact Form 7, whose REST route this site
cannot call: `access-control-allow-origin` names another domain, and it also
wants a page-specific `_wpcf7_unit_tag`, a session `_wpnonce` and an hCaptcha
token. `lib/contact.js` is the seam — it opens a pre-filled email today, the
page awaits it and shows the same confirmation either way, and the copy says
plainly what happens. Swapping in a real request is a change to that one
function; delete `form.note` when it is no longer true.

**`/podcast`** is one show and one episode, transcribed from the live page
into `content/base/podcast.js`. `AudioPlayer` wraps a native `<audio>` — the
element stays the engine, so seeking, buffering and the media keys keep
working and only the chrome is ours. ⚠ It carries `preload="none"` and takes
the running time from `length` (seconds) in content: Podbean serves the whole
file rather than a partial, so `preload="metadata"` pulls **all 5.5MB on page
load** just to learn the duration. Audio and cover art are hotlinked from
Podbean.

**Blogs mirror the events shape**: `/blogs` (`pages/Blogs`) lists every post
with the same programme filter, and `/blogs/:slug` (`pages/BlogPost`) is the
post's own page. Content is `content/base/blogs.js`, transcribed from the live
site — 13 posts, each `[kind, text]` blocks (`h` / `p` / `li`), which is as
much structure as the source pages carry. Two posts have no date and none has
been invented for them: `byNewest` sorts them last and both the card and the
page render without one. **Pagination is component state, not the URL** — six
per page, and paging never remounts the route or resets the filter. Posts tied
to no programme are filed as **"Default"**, not events' "Open to all"
(`EventFilters` takes a `communityLabel`), and a post with no photo falls back
to its programme's mark — the community one on a dark ground, because that
mark is drawn light. Every post closes with `ContactCta`; the comment
markup the source pages included was stripped from `blogs.js`, and one
slug lost a percent-encoded emoji, which could never have matched since React
Router decodes a param before it reaches us.
⚠ Post images are hotlinked from the live site's uploads **with `?w=1200`**,
which is not optional: the originals are 8–9MB camera JPEGs and i0.wp.com
(Jetpack's CDN) returns 429 when several are pulled at once.

**Events have three surfaces, one card and one form.** The homepage section
(`components/Events`) opens the `EventModal`; `/events` (`pages/Events`) lists
everything and links through; `/events/:slug` (`pages/EventDetail`) is the
event's own page and registers inline. `EventCard` renders in both lists —
`size="row"` is the compact line the homepage lists, `size="tile"` the large
photo card the events page grids two-up; pass `onOpen` for the modal, `to` for
the link — and `RegisterForm` is the
cta → form → done flow shared by the modal and the detail page, so the two
cannot drift. `EventFilters` builds its chips from the events themselves, so
a programme with nothing coming up never gets an empty chip. All the date
handling lives in `lib/events.js`; nothing parses a date locally any more.

`TakeAction`'s tiles use each programme's own **hero** photograph, so the tile
and the page it opens are the same picture; `tile` in `nav.js` is the stock
fallback for a programme with no hero of its own.

`TrustedBy` is the yellow wipe band under the hero, and it is generic — every
word comes from props (`eyebrow`, `headingLines`, `items`), plus `id`,
`wipeTone` and `className`, so it can be dropped on any page with different
copy. `headingLines` is an array where a string is a plain line and
`{ mark: "…" }` is a highlighted one, which is how the caller controls where
the block breaks. The homepage passes `hero.programmeMarks`
— the four programme marks minus the community one, carrying the `scale`
field that evens out the uneven padding in those exports.
`About` (the 2020 origin story plus the `[data-count]` counters) is parked;
it was the only thing reading `content/base/stats.js`, and `advisors.js` is
now used only by `/zakat`.

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
content. `Difference` also owns the only remaining use of
`content/base/focusAreas.js` outside `/zakat`.

Two consequences of `Contact` being parked: it owned `id="contact"`, so the
header and hero CTAs point at `mailto:BRAND.email` instead — **there is no
in-page contact anchor, so do not reintroduce `href="#contact"`**. It was
also the only place `BRAND.socials` was rendered, so Iwan's four accounts
currently appear nowhere on the site.

## Content vs config — two different folders

Copy is separated from app configuration, because copy is going to move to a
CMS and vary by country, and app configuration is not.

**`src/config/` is app configuration.** It ships with the code and no CMS will
ever own it.

| file           | holds                                                                                                                                                                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sections.js`  | feature switches. `topbar: false` hides the "Emergency Monitor" strip; `programmeAbout: "v1" \| "v2"` picks the programme pages' about treatment; `homeHero: "v1" \| "v2"` picks the homepage hero — **App.jsx reads this too**, because v2 holds the header back until you scroll. |
| `countries.js` | the country registry — `code` (lowercase ISO 3166-1 alpha-2, and the folder name under `src/content/`), `label`, `flag`, `locale`, `currency`, `timeZone` — plus `DEFAULT_COUNTRY`. India and Canada today.                                                                         |
| `themes.js`    | the theme-switcher entries. Design system, not content (see Colour below).                                                                                                                                                                                                          |

**`src/content/` is everything a CMS will eventually own.**

```
src/content/
  base/         the full content set — the default every country inherits
  in/           India: only the keys that differ from base
  merge.js      deep merge; objects merge, ARRAYS REPLACE
  index.js      resolveContent(code) → one merged snapshot, cached
  ContentProvider.jsx   the context, and every read hook
```

`base/` holds `brand.js` · `nav.js` · `pillars.js` · `programmes.js` ·
`events.js` · `testimonials.js` · `stats.js` · `instagram.js` (+ the generated
`instagram-feed.json`) · `hero.js` · `focusAreas.js` · `advisors.js` — and
**`copy.js`**, which holds every word the components used to hold themselves.
`base/index.js` assembles them into the one snapshot shape everything
downstream reads:

```js
{ brand, copy, nav: { programmesGroup, pages }, pillars,
  programmes: { content, contact }, events, testimonials, stats,
  instagram: { handle, url, posts, isLive },
  hero: { image, logos, slides, programmeMarks }, focus: { areas, links },
  advisors }
```

**`copy.js` is one key per section** — `header`, `hero`, `heroV2`, `trustedBy`,
`pillars`, `takeAction`, `events`, `testimonials`, `instagram`, `eventModal`,
`footer`, `programme`, `placeholder`, `notFound`. A component reads its own
key and nothing else:

```jsx
const copy = useCopy().pillars;
…
<h2>{copy.heading} <span className={MARK_YB}>{copy.mark}</span></h2>
```

Two conventions in there:

- **A heading that breaks across a plain line and a highlighted one keeps the
  two parts separate** (`heading` + `mark`), because where it breaks is a
  decision the copy has to be able to move.
- **Sentences stay whole**, with `{name}`-style placeholders filled by
  `lib/fill.js` — never concatenated at the call site, or a rewrite cannot move
  the value within the sentence.

⚠ Anything that names a real thing stays in its own file, not `copy.js`: the
org in `brand.js`, the programmes in `nav.js` and `programmes.js`, the quotes
in `testimonials.js`.

`/zakat` and the parked components (About, Contact, News) still hold their own
copy — Zakat is slated for deletion and the others render nowhere.

⚠ `testimonials.js` holds **real quotes from real, named members.** Rewrite
the marketing copy freely; never these.

**Adding a country is two steps** — an entry in `config/countries.js` and a
`src/content/<code>/index.js` default-exporting only what differs. Country
folders are discovered with `import.meta.glob`, so there is no list to keep in
step.

**Every key in the snapshot is overridable, at any depth.** Four rules:

| write in a country file                               | effect                                        |
| ----------------------------------------------------- | --------------------------------------------- |
| `{ brand: { email: "…" } }`                           | changes `email`, inherits the rest of `brand` |
| `{ programmes: { content: { "iwan-women": null } } }` | **deletes** that key                          |
| `{ events: add({ … }) }`                              | edits base's list — see `content/ops.js`      |
| `{ events: [ … ] }`                                   | **replaces** the list outright                |

A plain array replaces because merging two unrelated lists by index is a
footgun. `null` deletes, because merging objects can otherwise only ever add —
it is the only way to say a country runs _fewer_ of something.

**A function override is handed the base value and returns the new one**, which
is what makes per-item list edits readable. `content/ops.js` holds the three
worth naming — `add` / `addFirst`, `remove`, `update` — and anything they do
not cover is a plain arrow:

```js
events: add({ title: "Toronto meetup", date: "2026-09-12" }),
nav: { pages: remove("path", "/iwan-women") },
testimonials: update("name", "Aisha", { role: "Volunteer lead" }),
stats: (list) => list.slice(0, 3),
```

The first argument is whichever field identifies an item in that list — `path`
for nav pages, `id` for hero logos, `date` for events. Content is data, so
neither `null` nor a function is ever a real value, and both sentinels are
unambiguous. Base is never mutated.

`content/ca/index.js` is the worked example: Canada runs three programmes, so
it removes Women from `nav.pages` (which is also where routes and the homepage
tiles come from) and from the hero rotation, nulls the programme entry, and
adjusts the TrustedBy eyebrow — five lines, and a tile or an intro changed in
base still reaches Canada.

**Components never import a content module.** They call a hook:

```jsx
const BRAND = useBrand();
const { pages, programmesGroup } = useNav();
```

`useContent` · `useCountry` · `useBrand` · `useCopy` · `useNav` · `usePillars` ·
`useProgrammes` · `useEvents` · `useTestimonials` · `useStats` ·
`useInstagram` · `useHero` · `useFocus` · `useAdvisors`, all from
`content/ContentProvider.jsx`. That indirection is the whole point: moving to
the CMS means changing `resolveContent` and nothing else, and a country toggle
re-renders the site for free. `useCountry()` returns `[country, setCountry]`,
which is what `CountrySwitcher` calls. **The API source is not built yet**,
only the seam it plugs into.

⚠ **`src/content/ca/index.js` only drops the Women programme.** Everything else
is still India's — the Bangalore address, the +91 WhatsApp number, the "started
in Bangalore in 2020" story, India's events. The file lists the keys that need
real values. Nothing there has been invented; do not invent it.

`lib/map.js` is a plain module rather than a component, so it takes the
fallback address as an argument instead; `EventModal` passes
`BRAND.address` in.

`/zakat` is a full donation funnel inherited from the charity template. It is
not in the nav (only the `Placeholder` stub links it) and is slated for
deletion — do not wire it back in.

Routes: `/` and `/zakat` are real pages. Every other route is built from
`nav.pages`, so the active country's content decides which pages exist. An
entry with a matching key in `content/base/programmes.js` renders the shared
`Programme` template — that is all four programmes in India and three in
Canada; everything else (`/blogs`, `/events`, `/podcast`)
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

## The country is in the URL

The default country carries no prefix and every other one does: India is
`/iwan-youth`, Canada is `/ca/iwan-youth`. That prefix is handed to
`BrowserRouter` as its **`basename`**, which is why every `<Link to="/…">` and
`<Route path="/…">` in the app is still written without it — the router adds
and strips it. `countryFromPath`, `basenameFor` and `stripBasename` in
`config/countries.js` are the only places that know the shape.

- **The URL is the only source of truth.** There is no stored preference to
  fall out of step with the address bar, and a country link can be shared.
- **Switching country is a full page load** (`window.location.assign`), because
  `basename` is fixed for the life of the router. It also means the new country
  arrives on a clean mount — a client-side swap would strand everything the new
  content rendered at `opacity: 0`, since `useGsap` scans the DOM once per
  mount. If you ever make switching client-side, that is the bug you will hit.
- The switcher keeps you on the same page when the target country has it, and
  drops you on its home page when it does not (`/iwan-women` → `/ca/`).
- `/in/…` redirects to the unprefixed path, so the URL people will guess works.
- `*` renders `NotFound`, which names the active country — `/ca/iwan-women` is
  a real shareable URL for a programme Canada does not run, and a bare "not
  found" would read as a broken link.
- ⚠ **Deep links need the host to serve `index.html` for any path**, and
  `public/_redirects` is what does that on Netlify (`/* /index.html 200`).
  Without it every direct hit or hard refresh outside `/` gets the host's own
  404 — `/ca/`, `/blogs`, `/events/kids-club`, all of them. It has to be a
  200 rewrite, not a 301: the URL must stay as it was, because the router
  reads the country out of it. Another host needs the same rule in its own
  form — `vercel.json` rewrites, an nginx `try_files`.

**`LocationPrompt` asks when the guess disagrees with the URL** — it never
redirects. `lib/geo.js` reads the visitor's own IANA time zone out of `Intl`
and matches it against the `zones` list on each entry in `config/countries.js`
(legacy aliases included — a Mac in Bangalore still reports `Asia/Calcutta`),
falling back to the region in `navigator.languages`. No network call, no
geo-IP service, nothing to rate-limit or leak an address to, and it works
offline. It is only ever a guess, which is why nothing acts on it silently.

- It appears only when the guess is **a country we serve** AND differs from
  the one being viewed. Someone in the UK sees nothing — there is nothing to
  offer them.
- Any answer, including dismissing it, is remembered in `localStorage` under
  `iwan.location-prompt`. That is a "do not ask again" flag, not a country
  preference — the URL is still the only thing that decides the country.
- Swapping in a CDN country header (`CF-IPCountry`, `x-vercel-ip-country`) is
  a change to the body of `detectCountry` and nothing else.
- ⚠ It intercepts pointer events, so a Playwright run on a machine whose time
  zone disagrees with the route under test has to seed that flag first.

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
- **`CountrySwitcher`** — the flag pill in the header. It is _controlled_: it
  shares Header's single `menu` state under a reserved label, so opening it
  closes the Programmes panel by construction, and Header's existing
  outside-click and Escape handlers already cover it because it renders inside
  the same `<header>`. **It is rendered twice** — in the right-hand cluster at
  `nav` and up, and inside the mobile tray below it — because at 360px the bar
  cannot hold the brand, the switcher, the CTA and the burger at once. The two
  instances take separate `menu` labels and separate `panelId`s so each keeps
  its own trigger ref. Its panel goes `static` in the drawer, like the nav
  panels, or it escapes past the tray's bottom edge. Choosing a country
  navigates (see The country is in the URL), and the provider writes
  `document.documentElement.lang` from the country's `locale`.
  `flag` is emoji: Apple and Android draw the real flag, **Windows has no flag
  glyphs and renders the two letters instead**. Real artwork would be a
  `flagSrc` on the country entry and an `<img>` in the component.
- **`LocationPrompt`** — the country mismatch dialog, rendered by `App.jsx`
  so it covers every route. See The country is in the URL.
- **`Modal`** — generic dialog shell: backdrop, panel, close button, Escape,
  body scroll lock, initial focus. Wrap feature content in it. It takes
  `panelClassName` and `closeClassName` so a feature can restyle the shell —
  `EventModal` passes `closeClassName` because its header is dark, and has to
  mark it `!` or the shared close's own colour wins on Tailwind's ordering.
  The close is a bare `IconX` with no chip behind it, keeping the 38px box as
  the touch target. **Initial focus goes to the panel, not to Close** — the
  dialog still receives focus, but landing it on Close draws a focus ring
  around the glyph the moment the modal opens, which reads as a background.

## Colour — all of it lives in `tailwind.config.js`

**No hex code may appear anywhere in `src/`.** The config is the single source:

- `palette` — fixed colours, including the four programme colours
  (`women` `#ee5f9e`, `kids` `#3694db`, `men` `#234967`, `youth` `#3994b3`,
  available as `bg-women`, `text-youth`, …). Each programme's own colour is
  named on its entry in `content/base/nav.js` as `tone`, so the programmes grid and the nav
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
`cssColor()` in `useGsap.js`. `config/themes.js` lists the switcher entries and
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
`scripts/fetch-instagram.mjs`, which writes `src/content/base/instagram-feed.json`
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
- **`Pillars` deals its four cards out of a pile, and pins to do it.** The
  cards start stacked centre-of-row and scrub into their grid positions, one
  after another, with the section pinned until the last one lands. Three
  things it has to get right, all of them already bitten elsewhere:
  the pin needs `refreshPriority: 1` (see the Journey note below); positions
  come from `offsetLeft`, which is layout and so unaffected by the transform
  GSAP is writing, with `invalidateOnRefresh` to recompute on resize; and the
  deck transform lives on a **wrapper**, not on the card, because GSAP's
  inline transform would otherwise override the card's `hover:-translate-y-2`
  outright. It pins only at `nav` and up — the narrow layout is a vertical
  stack with no row to deal into, so below that the cards take an ordinary
  staggered reveal. Their rules are `[data-pillar-line]`, not `[data-line]`,
  so the generic rule pass does not measure them through the deck transform.
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
  west of Greenwich. Event dates are `YYYY-MM-DD` strings parsed
  field-by-field — `parse()` in **`lib/events.js`**, which is the only copy of
  that logic now. `longDate()` there takes the active country's `locale`, so
  the same event reads "21 August 2026" in India and "August 21, 2026" in
  Canada.
- **An event's programme is a nav path, not a label.** `programmeOf()` reads
  the label back out of the active country's nav, so the chip, the filter and
  the programme page cannot disagree — and an event pointing at a programme
  the country does not run (Canada has no `/iwan-women`) degrades to the
  community chip with no dangling link, rather than breaking.
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
- **Adding `.no-smooth` is not enough on its own — the style has to be
  flushed.** `classList.add("no-smooth")` followed immediately by `scrollTo`
  still animates: the class is set but not yet recalculated, so the browser
  reads the old `scroll-behavior`. `ScrollToTop` reads `root.offsetHeight`
  between the two to force the flush.
- **A route change must scroll instantly, and may have to land twice.** With
  smooth scrolling, a route change animates the reset over ~1s — during which
  the outgoing page's GSAP context reverts (removing the Pillars pin spacer),
  the incoming page refreshes its own triggers, and the header goes `fixed` →
  `sticky`. The document shrinks under a scroll that is still running, which
  reads as the page shuddering, and it lands short of the top because the
  browser clamps the animation against the old page's maximum. `ScrollToTop`
  jumps instantly, then re-checks on the next frame and jumps again if
  something moved underneath it. Measured: 24 scroll events landing at y=51,
  down to 1 landing at y=0.
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
