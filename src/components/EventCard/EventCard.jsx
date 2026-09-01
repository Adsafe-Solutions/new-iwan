import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import Button from "../Button/Button.jsx";
import { useCopy, useNav } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { dayNumber, isPast, programmeOf, shortMonth } from "../../lib/events.js";
import MediaBrand from "../MediaBrand/MediaBrand.jsx";
import { cx } from "../../lib/cx.js";

const ROW = cx(
  "flex items-center gap-4 rounded-2xl border border-line bg-white px-[1.3rem] py-[1.1rem]",
  "transition-[border-color,box-shadow,transform] duration-[250ms]",
  "hover:-translate-y-0.5 hover:border-primary hover:shadow-ecard",
  "max-phone:flex-col max-phone:items-stretch max-phone:gap-[0.9rem]"
);

/* `relative` anchors the stretched title link that makes the whole tile
   clickable — see the after:inset-0 below. */
const TILE = cx(
  "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white",
  "transition-[border-color,box-shadow,transform] duration-[250ms]",
  "hover:-translate-y-1 hover:border-primary hover:shadow-ecard"
);

/* the whole left side is the trigger, so the row is one big hit target */
const ROW_TRIGGER = cx(
  "flex min-w-0 flex-1 items-center gap-[1.2rem] text-left text-inherit",
  "max-phone:flex-col max-phone:items-stretch"
);

/* rounded-xl inside the card's rounded-2xl, so the inner curve sits inside
   the outer one instead of poking through it. */
const ROW_THUMB =
  "relative h-[96px] w-[132px] flex-none overflow-hidden rounded-xl max-phone:h-[150px] max-phone:w-full";

/* No colour of its own: the programme's `tone` supplies the background, and a
   base rule with an opinion on it would outrank that — Tailwind emits
   utilities in its own order, not the order they appear in the attribute. */
const CHIP = cx(
  "inline-block rounded-full px-2 py-[3px]",
  "text-[11px] font-extrabold uppercase tracking-[0.12em]"
);

/* for an event that belongs to no single programme */
const CHIP_NEUTRAL = "bg-primary/[0.08] text-primary";

const DATE_BADGE = cx(
  "flex flex-col items-center rounded bg-primary px-2 py-1 leading-[1.1] text-white"
);

function DateBadge({ iso, big = false, muted = false }) {
  return (
    <span
      className={cx(
        DATE_BADGE,
        big && "px-[0.6rem] py-[0.35rem]",
        /* `!` — DATE_BADGE's own bg-primary would win on Tailwind's ordering */
        muted && "!bg-ink/50"
      )}
      aria-hidden="true"
    >
      <b className={big ? "text-[19px] font-extrabold" : "text-[17px] font-extrabold"}>
        {dayNumber(iso)}
      </b>
      <small className="text-[10px] font-bold uppercase tracking-[0.08em] opacity-85">
        {shortMonth(iso)}
      </small>
    </span>
  );
}

/* One card, two shapes. `row` is the compact line the homepage lists; `tile`
   is the large photo card the events page uses. `to` makes it a link to the
   event's own page, `onOpen` makes it a button that raises the modal —
   passing both is a caller error, and `to` wins, because a link inside a
   button is invalid markup anyway. */
export default function EventCard({ event, to, onOpen, size = "row", className }) {
  const copy = useCopy().events;
  const pageCopy = useCopy().eventsPage;
  const { pages } = useNav();
  const programme = programmeOf(event, pages);
  const label = fill(copy.more, { title: event.title });
  const chip = programme ? programme.label : copy.community;
  const chipTone = programme ? cx(programme.tone, "text-white") : CHIP_NEUTRAL;
  /* Ended events ride in the same list, dimmed, with no register affordance —
     the detail page and modal say the rest. */
  const ended = isPast(event.date);

  if (size === "tile") {
    return (
      <article className={cx(TILE, className)}>
        <span className="relative block aspect-[16/9] overflow-hidden">
          <img
            src={event.img}
            alt=""
            loading="lazy"
            className={cx(
              "h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]",
              ended && "opacity-70 grayscale"
            )}
          />
          <MediaBrand size={52} />
          <span className="absolute left-3 top-3">
            <DateBadge iso={event.date} big muted={ended} />
          </span>
        </span>

        <div className="flex flex-1 flex-col p-[1.25rem]">
          <span className="mb-2.5 flex flex-wrap gap-1.5 self-start">
            <span className={cx(CHIP, chipTone)}>{chip}</span>
            {ended && (
              <span className={cx(CHIP, "bg-ink/10 text-ink-2")}>{copy.ended}</span>
            )}
          </span>

          <h3 className="mb-1.5 text-[20px] font-bold leading-[1.28] tracking-[-0.01em]">
            <Link
              to={to}
              aria-label={label}
              /* the whole card reads as one target: the link stretches over it,
                 and the CTA below out-stacks it so it still takes its own click */
              className="after:absolute after:inset-0 after:content-[''] hover:text-primary"
            >
              {event.title}
            </Link>
          </h3>

          <p className="mb-2 text-[13px] font-semibold text-muted">
            {event.start}–{event.end} · {event.venue}
          </p>
          <p className="mb-5 flex-1 text-[14px] leading-[22px] text-muted">
            {event.summary}
          </p>

          <div className="relative z-[1] flex flex-wrap items-center gap-4 border-t border-line pt-4">
            {!ended && (
              <Button
                to={to}
                className="px-[1.2rem] py-[0.65rem] text-[12px] max-xs:w-full"
              >
                {copy.register}
              </Button>
            )}
            <Link
              to={to}
              className="inline-flex items-center gap-1 text-[14px] font-bold text-primary underline underline-offset-4"
            >
              {pageCopy.details}
              <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const inner = (
    <>
      <span className={ROW_THUMB}>
        <img
          src={event.img}
          alt=""
          loading="lazy"
          className={cx("h-full w-full object-cover", ended && "opacity-70 grayscale")}
        />
        <MediaBrand size={44} />
        <span className="absolute left-2 top-2">
          <DateBadge iso={event.date} muted={ended} />
        </span>
      </span>

      <span className="min-w-0">
        <span className="mb-[0.45rem] flex flex-wrap gap-1.5">
          <span className={cx(CHIP, chipTone)}>{chip}</span>
          {ended && (
            <span className={cx(CHIP, "bg-ink/10 text-ink-2")}>{copy.ended}</span>
          )}
        </span>
        <h3 className="mb-[0.3rem] text-[19px] font-bold leading-[1.3]">{event.title}</h3>
        <p className="mb-[0.35rem] text-[13px] font-semibold text-muted">
          {event.start}–{event.end} · {event.venue}
        </p>
        <p className="text-[14px] leading-[21px] text-muted">{event.summary}</p>
      </span>
    </>
  );

  return (
    <article className={cx(ROW, className)}>
      {to ? (
        <Link to={to} className={ROW_TRIGGER} aria-label={label}>
          {inner}
        </Link>
      ) : (
        <button
          type="button"
          className={cx(
            ROW_TRIGGER,
            "cursor-pointer border-0 bg-transparent p-0 [font:inherit]"
          )}
          onClick={onOpen}
          aria-label={label}
        >
          {inner}
        </button>
      )}

      {ended ? null : to ? (
        <Button
          variant="outline"
          to={to}
          className="flex-none px-[1.3rem] py-[0.7rem] text-[13px] max-phone:w-full"
        >
          {copy.register}
        </Button>
      ) : (
        <Button
          variant="outline"
          className="flex-none px-[1.3rem] py-[0.7rem] text-[13px] max-phone:w-full"
          onClick={onOpen}
        >
          {copy.register}
        </Button>
      )}
    </article>
  );
}
