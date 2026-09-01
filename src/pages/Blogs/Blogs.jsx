import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import EventFilters from "../../components/EventFilters/EventFilters.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useBlogs, useCopy, useTotals } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { ALL_PROGRAMMES, NO_PROGRAMME } from "../../lib/events.js";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

const PER_PAGE = 6;

/* Cards are mounted by a filter or a page change, so they animate by keyframe —
   `.reveal` is scanned once at mount and would strand anything later. */
const CARD_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:60ms]",
  "[animation-delay:120ms]",
  "[animation-delay:180ms]",
  "[animation-delay:240ms]",
  "[animation-delay:300ms]",
];

const NOTE = "rounded-2xl border border-line bg-white p-8 text-[16px] text-muted";

export default function BlogsPage() {
  const BLOGS = useBlogs();
  const totals = useTotals();
  const copy = useCopy().blogsPage;
  const listRef = useRef(null);

  /* ⚠ The page and the filter live in the URL, not in component state. With the
     whole list in the bundle they could be local; with server paging they
     cannot — /blogs?page=3 has to be a real address the server can answer, and
     it makes a filtered list shareable and crawlable. */
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);
  const programme = params.get("programme") ?? ALL_PROGRAMMES;

  const isFirstView = page === 1 && programme === ALL_PROGRAMMES;

  /* The one view the site can answer WITHOUT a request: the bootstrap already
     carries page one of the unfiltered list. Any other page or filter is the
     server's answer, and there is nothing local to page through — the CMS is
     the only source of posts. */
  const local = useMemo(
    () =>
      isFirstView
        ? { items: BLOGS, total: totals?.blogs ?? BLOGS.length, page: 1 }
        : null,
    [BLOGS, totals, isFirstView]
  );

  const query =
    `/api/blogs?page=${page}&limit=${PER_PAGE}` +
    (programme === ALL_PROGRAMMES
      ? ""
      : `&programme=${encodeURIComponent(programme === NO_PROGRAMME ? "__none" : programme)}`);

  /* `initial: local` is what stops the first view flashing a skeleton — page
     one is already in hand from the bootstrap, and the identical response
     simply replaces it a moment later. */
  const { data, loading, ready } = useCms(query, {
    enabled: CMS_ENABLED,
    initial: local,
  });

  useScrollAnimations(ready);

  const result = data ?? local;
  const slice = result?.items ?? [];
  const count = result?.total ?? 0;
  const total = Math.max(1, Math.ceil(count / PER_PAGE));
  const safePage = Math.min(page, total);

  /* ⚠ An out-of-range ?page= (a stale share, a hand-typed URL) otherwise
     renders an empty grid under a pager pointing elsewhere. Once the real
     total is known, walk back to the last page that exists — `replace`, so
     Back does not return to the dead address. */
  useEffect(() => {
    if (loading || page <= total) return;
    const q = new URLSearchParams(params);
    if (total > 1) q.set("page", String(total));
    else q.delete("page");
    setParams(q, { replace: true });
  }, [loading, page, total, params, setParams]);

  const setParam = (next) => {
    const q = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === undefined || v === "") q.delete(k);
      else q.set(k, String(v));
    }
    setParams(q);
  };

  /* Paging keeps you on the page — bring the top of the list back into view so
     you are not left staring at the foot of the previous one. */
  const goTo = (n) => {
    setParam({ page: Math.min(Math.max(1, n), total) });
    listRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <main>
      <section className="bg-mist pb-10 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className="mx-auto w-full max-w-container px-6">
          <p className="reveal mb-3 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-primary">
            {copy.eyebrow}
          </p>
          <h1 className={cx(KICKER, "reveal !mb-4 !text-[clamp(1.9rem,4vw,44px)]")}>
            {copy.heading} <span className={MARK_B}>{copy.mark}</span>
          </h1>
          <p className="reveal max-w-[62ch] text-[17px] leading-[27px] text-muted">
            {copy.body}
          </p>
        </div>
      </section>

      <section className="py-11" id="all-posts" ref={listRef}>
        <div className="mx-auto w-full max-w-container px-6">
          <div className="reveal mb-8 flex flex-wrap items-center justify-between gap-4">
            {/* ⚠ Chips come from the NAV now, not from the items on screen.
                They used to be derived from the loaded list, which was fine
                when the list was all of it — with paging, page one deciding
                which filters exist would hide a programme whose posts happen
                to start on page two. */}
            <EventFilters
              fromNav
              communityLabel={copy.community}
              value={programme}
              onChange={(v) =>
                setParam({ programme: v === ALL_PROGRAMMES ? null : v, page: null })
              }
            />
            <p className="text-[14px] font-semibold text-muted">
              {fill(copy.count, { count, s: count === 1 ? "" : "s" })}
            </p>
          </div>

          {!loading && count === 0 && (
            <p className={NOTE}>
              {programme === ALL_PROGRAMMES ? copy.none : copy.empty}
            </p>
          )}

          {/* keyed on filter + page so the cards replay their entrance */}
          <div
            className="grid grid-cols-3 gap-5 max-nav:grid-cols-2 max-phone:grid-cols-1 max-phone:gap-4"
            key={`${programme}-${safePage}`}
          >
            {loading && slice.length === 0
              ? /* ⚠ Not `.reveal` — that is animated by a GSAP pass which has
                   already run, so a placeholder wearing it would sit invisible.
                   Card-shaped, so the grid does not resize when they land. */
                Array.from({ length: PER_PAGE }, (_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="h-[340px] animate-pulse rounded-2xl bg-mist"
                  />
                ))
              : null}
            {slice.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                className={cx(
                  "animate-ecardIn",
                  CARD_DELAYS[Math.min(i, CARD_DELAYS.length - 1)]
                )}
              />
            ))}
          </div>

          <Pagination
            page={safePage}
            total={total}
            onChange={goTo}
            className="mt-10 justify-center"
          />
        </div>
      </section>
    </main>
  );
}
