import { useMemo, useState } from "react";
import { useScrollAnimations } from "../../hooks/useGsap.js";
import EventCard from "../../components/EventCard/EventCard.jsx";
import EventFilters from "../../components/EventFilters/EventFilters.jsx";
import { useCopy, useEvents, useNav } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import {
  ALL_PROGRAMMES,
  matchesProgramme,
  midnight,
  upcomingFrom,
} from "../../lib/events.js";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_B } from "../../lib/type.js";

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
  const copy = useCopy().eventsPage;
  const { pages } = useNav();
  useScrollAnimations();

  const today = useMemo(() => midnight(new Date()), []);
  const [programme, setProgramme] = useState(ALL_PROGRAMMES);

  const upcoming = useMemo(() => upcomingFrom(EVENTS, today), [EVENTS, today]);
  const shown = upcoming.filter((e) => matchesProgramme(e, programme, pages));

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

      <section className="py-11" id="all-events">
        <div className="mx-auto w-full max-w-container px-6">
          <div className="reveal mb-8 flex flex-wrap items-center justify-between gap-4">
            <EventFilters events={upcoming} value={programme} onChange={setProgramme} />
            <p className="text-[14px] font-semibold text-muted">
              {fill(copy.count, {
                count: shown.length,
                s: shown.length === 1 ? "" : "s",
              })}
            </p>
          </div>

          {upcoming.length === 0 && <p className={NOTE}>{copy.past}</p>}
          {upcoming.length > 0 && shown.length === 0 && (
            <p className={NOTE}>{copy.empty}</p>
          )}

          {/* keyed on the filter so the cards replay their entrance */}
          <div
            className="grid grid-cols-3 gap-5 max-nav:grid-cols-2 max-phone:grid-cols-1 max-phone:gap-4"
            key={programme}
          >
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
        </div>
      </section>
    </main>
  );
}
