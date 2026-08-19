import { useMemo, useRef, useState } from "react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import BlogCard from "../../components/BlogCard/BlogCard.jsx";
import EventFilters from "../../components/EventFilters/EventFilters.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useBlogs, useCopy, useNav } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { ALL_PROGRAMMES, byNewest, matchesProgramme } from "../../lib/events.js";
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

const NOTE = "rounded-lg border border-line bg-white p-8 text-[16px] text-muted";

export default function BlogsPage() {
  const BLOGS = useBlogs();
  const copy = useCopy().blogsPage;
  const { pages: navPages } = useNav();
  const listRef = useRef(null);
  useScrollAnimations();

  const [programme, setProgramme] = useState(ALL_PROGRAMMES);
  const [page, setPage] = useState(1);

  const all = useMemo(() => [...BLOGS].sort(byNewest), [BLOGS]);
  const shown = all.filter((p) => matchesProgramme(p, programme, navPages));

  const total = Math.max(1, Math.ceil(shown.length / PER_PAGE));
  const safePage = Math.min(page, total);
  const slice = shown.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  /* Paging keeps you on the page — bring the top of the list back into view so
     you are not left staring at the foot of the previous one. */
  const goTo = (n) => {
    setPage(Math.min(Math.max(1, n), total));
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
            <EventFilters
              events={all}
              communityLabel={copy.community}
              value={programme}
              onChange={(v) => {
                setProgramme(v);
                setPage(1);
              }}
            />
            <p className="text-[14px] font-semibold text-muted">
              {fill(copy.count, {
                count: shown.length,
                s: shown.length === 1 ? "" : "s",
              })}
            </p>
          </div>

          {all.length === 0 && <p className={NOTE}>{copy.none}</p>}
          {all.length > 0 && shown.length === 0 && <p className={NOTE}>{copy.empty}</p>}

          {/* keyed on filter + page so the cards replay their entrance */}
          <div
            className="grid grid-cols-3 gap-5 max-nav:grid-cols-2 max-phone:grid-cols-1 max-phone:gap-4"
            key={`${programme}-${safePage}`}
          >
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
