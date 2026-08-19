#!/usr/bin/env node
/* =========================================================
   Pulls the latest posts from the Instagram Graph API and writes them to
   src/content/base/instagram-feed.json, which the site imports at build time.

   Run by .github/workflows/instagram.yml on a schedule — the site itself
   never talks to Instagram, so there is no token in the bundle, no runtime
   dependency, and an Instagram outage cannot take the section down.

   Required env:
     IG_USER_ID       the Instagram *professional* account id
     IG_ACCESS_TOKEN  a long-lived token (~60 days, must be rotated)

   Optional env:
     IG_GRAPH_HOST    default graph.instagram.com (the Instagram-Login flow).
                      Use graph.facebook.com if the app was set up through
                      Facebook Login with a linked Page instead.
     IG_API_VERSION   default v21.0. Meta retires versions on a rolling
                      basis — check the current one if calls start 400ing.
     IG_LIMIT         how many posts to request (default 12).

   The Basic Display API this replaces was shut down in December 2024; any
   guide still referencing it is out of date.
========================================================= */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/content/base/instagram-feed.json"
);

const {
  IG_USER_ID,
  IG_ACCESS_TOKEN,
  IG_GRAPH_HOST = "graph.instagram.com",
  IG_API_VERSION = "v21.0",
  IG_LIMIT = "12",
} = process.env;

if (!IG_USER_ID || !IG_ACCESS_TOKEN) {
  console.error("Missing IG_USER_ID or IG_ACCESS_TOKEN. Set both as repository secrets.");
  process.exit(1);
}

const FIELDS = [
  "id",
  "caption",
  "media_type",
  "media_url",
  "permalink",
  "thumbnail_url",
  "timestamp",
].join(",");

const url =
  `https://${IG_GRAPH_HOST}/${IG_API_VERSION}/${IG_USER_ID}/media` +
  `?fields=${FIELDS}&limit=${IG_LIMIT}&access_token=${IG_ACCESS_TOKEN}`;

const res = await fetch(url);
const body = await res.json();

if (!res.ok) {
  /* never echo the URL — it carries the token */
  console.error("Instagram API error:", JSON.stringify(body.error ?? body));
  process.exit(1);
}

const posts = (body.data ?? [])
  /* a VIDEO's media_url is the file itself, so use its thumbnail. a
     CAROUSEL_ALBUM's media_url is already the first image. */
  .map((p) => ({
    id: p.id,
    img: p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url,
    href: p.permalink,
    caption: (p.caption ?? "").slice(0, 140),
    type: p.media_type,
    timestamp: p.timestamp,
  }))
  .filter((p) => p.img);

if (posts.length === 0) {
  console.error("No usable posts returned — leaving the existing file alone.");
  process.exit(1);
}

await mkdir(dirname(OUT), { recursive: true });
await writeFile(
  OUT,
  `${JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2)}\n`
);

console.log(`Wrote ${posts.length} posts to src/content/base/instagram-feed.json`);
