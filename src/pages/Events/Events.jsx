import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import EventCard from "../../components/EventCard/EventCard.jsx";
import EventFilters from "../../components/EventFilters/EventFilters.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useCopy, useEvents, useNav, useTotals } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import {
  ALL_PROGRAMMES,
  NO_PROGRAMME,
  matchesProgramme,
  midnight,
  upcomingFrom,
} from "../../lib/events.js";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";

const PER_PAGE = 12;

/* Cards are mounted by a filter change, so they animate by keyframe —
   `.reveal` is scanned once at mount and would strand anything later. */
const CARD_DELAYS = [
  "[animation-delay:0ms]",
  "[animation-delay:60ms]",
  "[animation-delay:120ms]",
  "[animation-delay:180ms]",
  "[animation-delay:240ms]",
  "[animation-delay:300ms]",
];

const NOTE = "rounded-lg border border-line bg-white p-8 text-[16px] text-muted";

/* No photo hero: there is no real Iwan photograph to put behind one, and a
   stock image at that size would read as a claim about the events below. */
export default function EventsPage() {
  const EVENTS = useEvents();
  const totals = useTotals();
  const copy = useCopy().eventsPage;
  const { pages } = useNav();
  const listRef = useRef(null);

  /* ⚠ Page and filter live in the URL — /events?page=2 has to be an address the
     server can answer, and it makes a filtered list shareable. */
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);
  const programme = params.get("programme") ?? ALL_PROGRAMMES;

  const today = useMemo(() => midnight(new Date()), []);
  const isFirstView = page === 1 && programme === ALL_PROGRAMMES;

  /* What the site can answer without a request. The bootstrap already holds
     page one of the upcoming list — already filtered to upcoming by the API's
     `?from=` — and with the CMS off the static files are the entire list, so
     everything is filtered and paged here instead. */
  const local = useMemo(() => {
    if (CMS_ENABLED) {
      return isFirstView
        ? { items: EVENTS, total: totals?.events ?? EVENTS.length }
        : null;
    }
    const upcoming = upcomingFrom(EVENTS, today);
    const filtered = upcoming.filter((e) => matchesProgramme(e, programme, pages));
    return {
      items: filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
      total: filtered.length,
    };
  }, [EVENTS, totals, isFirstView, programme, page, pages, today]);

  const query =
    `/api/events?page=${page}&limit=${PER_PAGE}` +
    (programme === ALL_PROGRAMMES
      ? ""
      : `&programme=${encodeURIComponent(programme === NO_PROGRAMME ? "__none" : programme)}`);

  const { data, loading, ready } = useCms(query, {
    enabled: CMS_ENABLED,
    initial: local,
  });

  useScrollAnimations(ready);

  const result = data ?? local;
  const shown = result?.items ?? [];
  const count = result?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(count / PER_PAGE));

  const setParam = (next) => {
    const q = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === undefined || v === "") q.delete(k);
      else q.set(k, String(v));
    }
    setParams(q);
  };

  const goTo = (n) => {
    setParam({ page: Math.min(Math.max(1, n), totalPages) });
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

      <section className="py-11" id="all-events" ref={listRef}>
        <div className="mx-auto w-full max-w-container px-6">
          <div className="reveal mb-8 flex flex-wrap items-center justify-between gap-4">
            {/* ⚠ Chips from the NAV, not from the page on screen — page one
                deciding which filters exist would hide a programme whose events
                start on page two. */}
            <EventFilters
              fromNav
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
              {programme === ALL_PROGRAMMES ? copy.past : copy.empty}
            </p>
          )}

          {/* keyed on the filter so the cards replay their entrance */}
          <div
            className="grid grid-cols-3 gap-5 max-nav:grid-cols-2 max-phone:grid-cols-1 max-phone:gap-4"
            key={`${programme}-${page}`}
          >
            {loading && shown.length === 0
              ? /* ⚠ Not `.reveal` — the GSAP pass has already run, so a
                   placeholder wearing it would sit invisible. */
                Array.from({ length: 6 }, (_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="h-[380px] animate-pulse rounded-2xl bg-mist"
                  />
                ))
              : null}
            {shown.map((e, i) => (
              <EventCard
                key={e.id}
                event={e}
                size="tile"
                to={`/events/${e.id}`}
                className={cx(
                  "animate-ecardIn",
                  CARD_DELAYS[Math.min(i, CARD_DELAYS.length - 1)]
                )}
              />
            ))}
          </div>

          <Pagination
            page={Math.min(page, totalPages)}
            total={totalPages}
            onChange={goTo}
            className="mt-10 justify-center"
          />
        </div>
      </section>
    </main>
  );
}
