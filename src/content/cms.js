import { ENV } from "../config/env.js";
import { merge } from "./merge.js";

export const CMS_URL = (ENV.cmsApiUrl ?? "").replace(/\/$/, "");

export const CMS_ENABLED = Boolean(CMS_URL);

/* ⚠ One request, before the first render, with a hard timeout — NOT a fetch
   that lands later and swaps the content in.

   That is not a performance choice, it is a correctness one. `useGsap` scans
   the DOM once per mount and animates what it finds; anything that appears
   afterwards is stranded at `opacity: 0` forever (see the `.reveal` note in
   CLAUDE.md). Content arriving mid-session would hit exactly that, on every
   section it touched. Fetching first costs one round trip against an
   edge-cached response and sidesteps the whole class of bug.

   The timeout is what stops a slow or dead API from holding the page hostage:
   when it fires the site renders without the CMS-owned sections and carries
   on. ⚠ Nothing in content/base backs those four any more, so a timeout costs
   real content — the empty states are honest, not a soft landing.

   ⚠ It is also a WHITE-SCREEN budget, which is what stops it being generous:
   primeContent is awaited before the first render, so this number is how long
   a visitor can stare at nothing. 3s was too tight — the first request after
   Render's free tier spins the API down measured 3.2s and was cancelled,
   emptying every CMS-owned section for the visitor who paid the wait. 5s
   clears that without making a dead API cost the page five seconds twice.

   ⚠ The real fix is upstream: .github/workflows/keep-warm.yml pings the API
   so it never sleeps. Raising this number is the belt, not the braces. */
const TIMEOUT_MS = 5000;

/* ⚠ Today as the VISITOR's calendar day, not the server's. The API filters
   upcoming events against this, so a server in UTC never decides that an event
   happening this evening is already in the past for someone reading in the
   morning. Built field-by-field for the same reason the site never calls
   `new Date("2026-08-21")` — see lib/events.js. */
export const todayKey = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export async function fetchContent(code) {
  if (!CMS_ENABLED) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${CMS_URL}/api/content?country=${code}&from=${todayKey()}`, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    return await res.json();
  } catch (err) {
    /* Never rethrow. A CMS that is down must cost the site its events, blogs,
       podcast and promo — not take the whole site with it. */
    if (import.meta.env.DEV) {
      console.warn(
        `[cms] no content — events, blogs, podcast and promo will be empty: ${err.name === "AbortError" ? `no response in ${TIMEOUT_MS}ms` : err.message}`
      );
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* ⚠ The bootstrap carries the FIRST PAGE of each list, not the whole list, and
   its size is bounded no matter how much content exists. Everything past page
   one — and every detail record, which is where the weight is — is fetched by
   the route that needs it (see hooks/useCms.js).

   The lists arrive as `{ items, total, page, limit }` and are unwrapped to plain
   arrays here, because that is the shape every component already reads:
   `useEvents()` returns an array and always has. The paging metadata is kept
   beside them under `totals`, so a listing knows whether there is a page two
   without changing any existing hook.

   ⚠ These four keys have no static counterpart — content/base does not carry
   events, blogs, podcast or promo at all, so whatever the API says is the whole
   answer. A key it omits stays absent and the matching hook returns empty;
   `merge` treats `null` as a deletion, which is how the API says "there is no
   promo to show". "The CMS has nothing for you" is a real answer for a country
   with no events yet, and the site renders it properly — the homepage section
   disappears rather than showing a heading over an empty calendar. */
export function applyCms(snapshot, payload) {
  if (!payload) return snapshot;

  const override = {};

  if (payload.events) override.events = payload.events.items;
  if (payload.blogs) override.blogs = payload.blogs.items;
  if (payload.podcast) override.podcast = payload.podcast;
  if ("promo" in payload) override.promo = payload.promo;

  const merged = merge(snapshot, override);

  return {
    ...merged,
    /* How many there are in total, per type — what a listing page reads to
       decide whether to render a pager. Absent when the CMS is off, which is
       exactly right: there is nothing to page through then. */
    totals: payload.events
      ? {
          events: payload.events.total,
          blogs: payload.blogs?.total ?? 0,
          episodes: payload.podcast?.total ?? 0,
          perPage: payload.blogs?.limit ?? 6,
        }
      : null,
  };
}
