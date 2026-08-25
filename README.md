# Iwan Community Website

Vite/React marketing site for Iwan Community, deployed as static assets on
Cloudflare Workers.

## Prerequisites

- Node.js 24 and npm
- GnuPG with access to one of the recipients in `.sops.yaml`
- [SOPS](https://github.com/getsops/sops)
- Wrangler access for manual Cloudflare deployments

## Local development

Install dependencies. The `prepare` lifecycle also installs the repository's
native pre-commit hook:

```bash
npm ci
```

Decrypt the local environment and start Vite:

```bash
sops --decrypt --in-place .env.local
npm run dev
```

The app is served at `http://localhost:5173`. Before committing, encrypt the
file again and stage the encrypted version:

```bash
sops --encrypt --in-place .env.local
git add .env.local
```

Never commit a decrypted `.env.local`, `.env.development`, or
`.env.production`. The pre-commit hook rejects staged plaintext copies.

## Environment files

| File               | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `.env.local`       | Local Vite development and local Turnstile key  |
| `.env.development` | Build configuration for `dev.iwan.community`    |
| `.env.production`  | Build configuration for `new.iwan.community`    |
| `.env.example`     | Plaintext variable-name template without values |

All three real environment files are SOPS-encrypted in Git. Only decrypt the
file needed for the task, then re-encrypt it before committing.

Turnstile variables:

```dotenv
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

`TURNSTILE_SITE_KEY` is deliberately injected into the browser by
`vite.config.js`. `TURNSTILE_SECRET_KEY` must never be prefixed with `VITE_` or
otherwise included in frontend code. It is reserved for a future server-side
Siteverify handler.

## Turnstile

The shared widget is rendered at four user-facing placements:

- Event registration modal
- Event-detail registration panel
- Newsletter form
- Contact form

Each submit control is gated until the widget returns a token. This is
currently client-side gating only: registration and newsletter are visual
flows, and contact opens a pre-filled email. Complete bot protection requires
each future backend handler to validate the token through Cloudflare
Siteverify using `TURNSTILE_SECRET_KEY`.

## Checks

```bash
npm run format:check
npm run build:dev
npm run build:prod
```

The dependency-free Git hook lives at `.githooks/pre-commit`. `npm ci` runs
`scripts/install-git-hooks.sh`, which configures:

```text
core.hooksPath=.githooks
```

The hook checks that staged environment files remain SOPS-encrypted and runs
Prettier against staged source/configuration files.

## Deployment

| Trigger            | Build                      | Worker/config                              |
| ------------------ | -------------------------- | ------------------------------------------ |
| Push to `develop`  | `npm run build:dev`        | `iwan-community-dev` / `wrangler.dev.toml` |
| Push of a `v*` tag | `npm run build:prod`       | `iwan-community` / `wrangler.toml`         |
| Manual dispatch    | Selected dev or prod build | Matching Wrangler config                   |

`.github/workflows/deploy.yaml` uses Node 24-compatible actions, installs and
checksum-verifies SOPS, imports the deployment GPG key, decrypts only the
selected environment file, builds, and deploys through Wrangler.

Required GitHub Actions secrets:

- `GPG_PRIVATE_KEY`
- `GPG_PRIVATE_KEY_PASSPHRASE`
- `GIT_TOKEN` — token with read access to the private `Adsafe-Solutions/gpg` repository
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

GitHub exposes repository, organization, and environment secrets through the
same `${{ secrets.NAME }}` context. If duplicate names exist, environment
secrets override repository secrets, and repository secrets override
organization secrets. Under the organization's current plan, this private
repository uses the repository-level copies shown in its Actions settings.

Manual deployment commands:

```bash
npm run deploy:dev
npm run deploy:prod
```
