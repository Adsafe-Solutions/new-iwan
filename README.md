# Iwan Community Website

Marketing site for **Iwan** (`iwan.community`) — a Muslim community organisation
founded in Bangalore in 2020 that runs classes, workshops, mentoring and
volunteering. The site is a Vite + React single-page app, deployed as static
assets on Cloudflare Workers.

It is **not** a relief charity and it is **not** Canadian. Copy speaks to
members about belonging and programmes, never to donors about beneficiaries —
the build was inherited from a charity template, so anything that reads like a
donor appeal is leftover and wrong.

## Documentation

| Document                                     | What it covers                                                                                  |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md) | How the app is put together — routing, the country model, content vs config, styling, animation |
| [docs/build.md](docs/build.md)               | How a build is configured and produced, and why config is baked in at build time                |
| [docs/deploy.md](docs/deploy.md)             | Environments, the GitHub Actions pipeline, secrets, manual deploys, cutover                     |
| [docs/third-party.md](docs/third-party.md)   | Every dependency, external service and hotlinked asset host, and what each costs                |
| [docs/prompts-deck.md](docs/prompts-deck.md) | The prompt library for working on this codebase with an AI agent                                |
| [CLAUDE.md](CLAUDE.md)                       | The working guide agents load automatically — conventions and past regressions                  |

## Prerequisites

| Tool                                    | Version               | Notes                                                               |
| --------------------------------------- | --------------------- | ------------------------------------------------------------------- |
| Node.js                                 | 20 or newer           | CI builds on 20, the deploy workflow on 24. Either works locally.   |
| npm                                     | ships with Node       | `npm ci` is the install — the lockfile is committed.                |
| GnuPG                                   | 2.x                   | Your key must be one of the recipients in [.sops.yaml](.sops.yaml). |
| [SOPS](https://github.com/getsops/sops) | 3.13.x                | Decrypts the environment files. The pre-commit hook needs it too.   |
| Wrangler                                | installed by `npm ci` | Only needed for manual Cloudflare deploys or `npm run preview:cf`.  |

No test runner and no database. The only server-side code is `worker/index.js`,
which handles newsletter, contact and event-registration API submissions;
everything else is static.
`npm run build` is the check.

## Quick start

```bash
git clone git@github.com:Adsafe-Solutions/new-iwan.git
cd new-iwan
npm ci                             # also installs the pre-commit hook
sops --decrypt --in-place .env.local
npm run dev                        # http://localhost:5173
```

Before you commit, put the environment file back:

```bash
sops --encrypt --in-place .env.local
git add .env.local
```

The pre-commit hook refuses a staged plaintext `.env.local`, `.env.development`
or `.env.production`, and runs Prettier over staged source files. It lives in
[.githooks/pre-commit](.githooks/pre-commit) and is wired up by the `prepare`
script (`git config core.hooksPath .githooks`), so `npm ci` is what installs it.

## Commands

| Command                | What it does                                                       |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Vite dev server on port 5173                                       |
| `npm run build`        | Production build to `dist/` (default mode)                         |
| `npm run build:dev`    | Build with `.env.development` baked in                             |
| `npm run build:prod`   | Build with `.env.production` baked in                              |
| `npm run preview`      | Serve the built `dist/` with Vite's own preview server             |
| `npm run preview:cf`   | Dev build served through the real Workers runtime (`wrangler dev`) |
| `npm run deploy:dev`   | Build + deploy to the `iwan-community-dev` Worker                  |
| `npm run deploy:prod`  | Build + deploy to the `iwan-community` Worker                      |
| `npm run format`       | `prettier --write .`                                               |
| `npm run format:check` | `prettier --check .` — the same check the hook and reviewers run   |

### Checking your work

There are no tests. The reliable loop is:

```bash
npm run format:check
npm run build          # a failing build is the only automated gate there is
npm run dev            # then drive the page and read back computed styles
```

For UI changes, drive Chrome against the dev server and read back geometry and
computed styles rather than eyeballing screenshots — past regressions found
this way include a logo rendering at 0px wide and a nav wrapping to two lines.

## Environment files

| File               | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `.env.local`       | Local development, including the local Turnstile keys      |
| `.env.development` | Build configuration for `dev.iwan.community`               |
| `.env.production`  | Build configuration for `new.iwan.community`               |
| `.env.example`     | Plaintext template — variable names and what each one does |

All three real files are **SOPS-encrypted in Git**. Decrypt only the one you
need, and re-encrypt before staging. See [docs/build.md](docs/build.md) for what
each variable does.

⚠ `TURNSTILE_SITE_KEY` is public and explicitly injected into the browser bundle
by [vite.config.js](vite.config.js). `TURNSTILE_SECRET_KEY`,
`TURNSTILE_HOSTNAMES` and the `RESEND_*` values are **server-only** — they are
read by `worker/index.js` at request time and must never gain a `VITE_` prefix,
which would publish them in the bundle. In a deployed Worker they are Cloudflare
secrets, not build values; `npm run preview:cf` passes `.env.local` to the local
Workers runtime so all `/api/*` form endpoints work while you develop.

## Deployment at a glance

| Trigger            | Build                | Worker / config                            | Hostname             |
| ------------------ | -------------------- | ------------------------------------------ | -------------------- |
| Push to `develop`  | `npm run build:dev`  | `iwan-community-dev` / `wrangler.dev.toml` | `dev.iwan.community` |
| Push of a `v*` tag | `npm run build:prod` | `iwan-community` / `wrangler.toml`         | `new.iwan.community` |
| Manual dispatch    | chosen dev or prod   | matching config                            | as above             |

The live WordPress site still serves `www.iwan.community`; neither Worker claims
that hostname yet. Full detail, including the required Actions secrets, is in
[docs/deploy.md](docs/deploy.md).

## Repository layout

```
src/
  App.jsx              routes + the Shell that owns header and scroll state
  index.css            the only .css file — @tailwind directives and base rules
  components/<Name>/<Name>.jsx
  pages/<Name>/<Name>.jsx
  config/              app configuration — sections · countries · themes · env
  content/             all copy — base/ + one folder per country + the provider
  hooks/useGsap.js     scroll animation
  lib/                 date, map, geo, contact and class-name helpers
scripts/               Instagram feed fetcher, git-hook installer
emails/                Resend Broadcast templates for the IN and CA segments
worker/                form APIs, Turnstile verification, Resend delivery
.githooks/pre-commit   SOPS + Prettier gate
tailwind.config.js     EVERY colour in the project
wrangler.toml          production Worker
wrangler.dev.toml      development Worker
```

## House rules

These are the ones that bite hardest. The full set is in
[CLAUDE.md](CLAUDE.md) and [docs/architecture.md](docs/architecture.md).

- **No hex codes anywhere in `src/`.** Every colour is a name in
  [tailwind.config.js](tailwind.config.js).
- **No component stylesheets.** Tailwind utilities in the JSX; `src/index.css`
  is the only stylesheet.
- **Components never import a content module** — they call a hook from
  `content/ContentProvider.jsx`.
- **Copy lives in `src/content/`, configuration in `src/config/`.** Content is
  going to a CMS; configuration is not.
- **Never `new Date("2026-08-21")`** — it parses as UTC and lands a day early.
  Use `parse()` in `src/lib/events.js`.
- Run `npx prettier --write src` after editing, and `npm run build` before
  calling anything done.
