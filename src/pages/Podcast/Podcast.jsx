import { useEffect } from "react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import PodcastCard from "../../components/PodcastCard/PodcastCard.jsx";
import EventFilters from "../../components/EventFilters/EventFilters.jsx";
import ContactCta from "../../components/ContactCta/ContactCta.jsx";
import { useCopy, usePodcast, useTotals } from "../../content/ContentProvider.jsx";
import { useCms } from "../../hooks/useCms.js";
import { CMS_ENABLED } from "../../content/cms.js";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination.jsx";

const PER_PAGE = 12;
import { ALL_PROGRAMMES, NO_PROGRAMME } from "../../lib/events.js";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

const CONTAINER = "mx-auto w-full max-w-container px-6";

export default function PodcastPage() {
  const show = usePodcast();
  const totals = useTotals();

  /* ⚠ The bootstrap carries only the first page of episodes. Reading it alone
     silently truncated this list the moment a seventh episode existed. Page
     and filter live in the URL, like /events and /blogs. */
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get("page")) || 1);
  const programme = params.get("programme") ?? ALL_PROGRAMMES;

  /* Only the unfiltered first page — the bootstrap knows nothing about a
     programme filter, so serving it under one would show the wrong list. */
  const local =
    page === 1 && programme === ALL_PROGRAMMES
      ? {
          items: show.episodes ?? [],
          total: totals?.episodes ?? (show.episodes ?? []).length,
        }
      : null;

  const query =
    `/api/podcast?page=${page}&limit=${PER_PAGE}` +
    (programme === ALL_PROGRAMMES
      ? ""
      : `&programme=${encodeURIComponent(programme === NO_PROGRAMME ? "__none" : programme)}`);

  const { data, loading, ready } = useCms(query, {
    enabled: CMS_ENABLED,
    initial: local,
  });

  const result = data ?? local;
  const count = result?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(count / PER_PAGE));

  /* ⚠ An out-of-range ?page= (a stale share, a hand-typed URL) otherwise
     renders an empty grid under a pager pointing elsewhere. Once the real
     total is known, walk back to the last page that exists — `replace`, so
     Back does not return to the dead address. */
  useEffect(() => {
    if (loading || page <= totalPages) return;
    const q = new URLSearchParams(params);
    if (totalPages > 1) q.set("page", String(totalPages));
    else q.delete("page");
    setParams(q, { replace: true });
  }, [loading, page, totalPages, params, setParams]);
  const copy = useCopy().podcastPage;
  useScrollAnimations(ready);

  const episodes = result?.items ?? result?.episodes ?? [];

  return (
    <main>
      <section className="bg-mist pb-10 pt-[clamp(2.25rem,5vw,3.25rem)]">
        <div className={CONTAINER}>
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

      <section className="py-12" id="episodes">
        <div className={CONTAINER}>
          <h2 className="reveal mb-6 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary">
            {copy.episodesHeading}
          </h2>

          <EventFilters
            fromNav
            events={episodes}
            value={programme}
            onChange={(v) => {
              const q = new URLSearchParams(params);
              if (v === ALL_PROGRAMMES) q.delete("programme");
              else q.set("programme", v);
              /* A different filter is a different list — page 2 of the old
                 one is not an address in the new one. */
              q.delete("page");
              setParams(q);
            }}
            className="reveal mb-8"
          />

          {loading && episodes.length === 0 ? null : episodes.length === 0 ? (
            <p className="rounded-2xl border border-line bg-white p-8 text-[16px] text-muted">
              {copy.empty}
            </p>
          ) : (
            <div
              className="grid grid-cols-3 gap-5 max-nav:grid-cols-2 max-phone:grid-cols-1"
              data-stagger
            >
              {episodes.map((ep, i) => (
                <PodcastCard
                  key={ep.id}
                  className="reveal"
                  episode={ep}
                  /* ⚠ The EPISODE's own cover only. Falling back to the show's
                     here painted the same Podbean artwork on every card, and
                     the card's own fallback — the programme mark — was never
                     reached. The show art already has its band above. */
                  cover={ep.cover}
                  /* Continuous across pages — page 2 must not restart at 01.
                     ⚠ Position within the current filter's list, which is the
                     only honest number a filtered page has. */
                  index={(page - 1) * PER_PAGE + i}
                />
              ))}
            </div>
          )}

          <Pagination
            page={Math.min(page, totalPages)}
            total={totalPages}
            onChange={(n) => {
              const q = new URLSearchParams(params);
              if (n <= 1) q.delete("page");
              else q.set("page", String(n));
              setParams(q);
            }}
            className="mt-10 justify-center"
          />
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
