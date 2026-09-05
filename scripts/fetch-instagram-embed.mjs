#!/usr/bin/env node
/* Fills instagram-feed.json with REAL posts, without a token.
 *
 * Instagram's profile embed — https://www.instagram.com/<user>/embed — is
 * keyless and public: it is what their own embed.js loads. The HTML it serves
 * carries none of the posts, but once a browser runs its JavaScript the DOM
 * holds the six most recent thumbnails on instagram.*.fbcdn.net. So this
 * renders the page with headless Chrome and reads the URLs back out.
 *
 * Why this exists next to fetch-instagram.mjs: that one is the documented
 * Graph API route and needs IG_USER_ID and IG_ACCESS_TOKEN. This one needs
 * nothing, which is the whole point — but it is undocumented and Meta can
 * break it, in which case the site falls back to the placeholder tiles exactly
 * as it does today. Prefer the Graph API once the secrets exist.
 *
 *   node scripts/fetch-instagram-embed.mjs
 *
 * ⚠ The image URLs are signed and expire — measured at ~110 hours. Run this
 * daily so a fetch failure has four more days of runway before tiles break.
 */
import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const run = promisify(execFile);

/* Which account feeds which content folder. A country with its own account
   gets its own file; content/<code>/index.js reads it. */
const ACCOUNTS = [
  { user: "iwan.community", file: "src/content/base/instagram-feed.json" },
  { user: "iwan.community.canada", file: "src/content/ca/instagram-feed.json" },
];

const CHROME =
  process.env.CHROME_BIN ??
  ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].find(Boolean);

async function thumbnails(user) {
  const { stdout } = await run(
    CHROME,
    [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
      "--window-size=500,900",
      /* the posts arrive after their JS runs, not in the served HTML */
      "--virtual-time-budget=20000",
      "--dump-dom",
      `https://www.instagram.com/${user}/embed`,
    ],
    { maxBuffer: 64 * 1024 * 1024 }
  );

  /* Their static UI sprites live on static.cdninstagram.com; post media is on
     the regional instagram.*.fbcdn.net hosts, which is the distinction. */
  const found =
    stdout.match(/https:\/\/instagram\.[a-z0-9.-]*fbcdn\.net\/[^"'\\ ]+/g) ?? [];
  return [...new Set(found.map((url) => url.replaceAll("&amp;", "&")))];
}

let failures = 0;

for (const { user, file } of ACCOUNTS) {
  try {
    const images = await thumbnails(user);
    if (images.length === 0) {
      /* Never blank a good file over one bad run: an empty list would replace
         real posts with nothing, and the site would drop to placeholders. */
      console.error(`${user}: no post images found — leaving ${file} alone.`);
      failures += 1;
      continue;
    }

    const posts = images.map((img) => ({
      img,
      /* The embed exposes no per-post permalinks, so every tile points at the
         profile. Captions are not available either, and a caption is not alt
         text anyway — see the note in content/base/instagram.js. */
      href: `https://www.instagram.com/${user}/`,
    }));

    await writeFile(
      file,
      `${JSON.stringify({ fetchedAt: new Date().toISOString(), posts }, null, 2)}\n`
    );
    console.log(`${user}: wrote ${posts.length} posts to ${file}`);
  } catch (error) {
    console.error(`${user}: ${error.message}`);
    failures += 1;
  }
}

process.exit(failures === ACCOUNTS.length ? 1 : 0);
