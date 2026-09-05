/* =========================================================
   The Instagram wall on the homepage.

   Real posts come from `instagram-feed.json`, which a scheduled
   GitHub Action writes via scripts/fetch-instagram.mjs. The site
   never calls Instagram itself — no token in the bundle, no runtime
   dependency, and an Instagram outage cannot take the section down.

   While that file is empty (before the secrets are set, or if a
   fetch fails) the PLACEHOLDERS below render instead, so the page
   never has a hole in it. They are stock photos, not Iwan's posts,
   which is why they render as decorative images rather than as
   links: describing a stock photo as an Iwan session in alt text
   would be a small lie, and twelve links all called "View on
   Instagram" is worse than none. The header CTA covers that.

   Once the feed is live each tile IS a distinct post, so they become
   links named from the caption. Captions are still never used as alt
   text — a caption is not a description of a picture.
========================================================= */
import feed from "./instagram-feed.json";

/* the bare username is what the profile embed URL is built from —
   the handle carries an @ and the URL a trailing slash, and neither
   works there */
export const INSTAGRAM_USERNAME = "iwan.community";
export const INSTAGRAM_HANDLE = "@iwan.community";
export const INSTAGRAM_URL = "https://instagram.com/iwan.community/";

const u = (id, w) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const PLACEHOLDERS = [
  { img: u("1509099836639-18ba1795216d", 700) },
  { img: u("1523240795612-9a054b0db644", 600) },
  { img: u("1552664730-d307ca884978", 600) },
  { img: u("1540575467063-178a50c2df87", 700) },
  { img: u("1488521787991-ed7bbaae773c", 600) },
  { img: u("1521737711867-e3b97375f902", 600) },
  { img: u("1531058020387-3be344556be6", 700) },
  { img: u("1497486751825-1233686d5d80", 600) },
  { img: u("1475721027785-f74eccf877e2", 600) },
  { img: u("1454165804606-c3d57bc86b40", 600) },
  { img: u("1511578314322-379afb476865", 700) },
  { img: u("1544027993-37dbfe43562a", 600) },
];

/* Feed posts win when there are any; otherwise the placeholders do. */
export const INSTAGRAM_IS_LIVE = feed.posts?.length > 0;

/* Real posts only — no placeholder is mixed in with them.

   ⚠ The keyless profile embed returns exactly SIX posts, whatever it is asked
   for, so the twelve-tile mosaic renders half full. Filling the rest needs a
   source that is not capped: scripts/fetch-instagram.mjs (Graph API, needs
   IG_USER_ID and IG_ACCESS_TOKEN) or a provider's JSON feed. Until one of
   those runs, six real posts is what there is. */
export const INSTAGRAM_POSTS = INSTAGRAM_IS_LIVE
  ? feed.posts.map((p) => ({
      img: p.img,
      href: p.href,
      label: p.caption ? `Instagram post: ${p.caption}` : "View this post on Instagram",
    }))
  : PLACEHOLDERS;

export default INSTAGRAM_POSTS;
