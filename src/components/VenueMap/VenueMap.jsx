import { IconArrowUpRight, IconMapPin } from "@tabler/icons-react";
import { cx } from "../../lib/cx.js";
import { fill } from "../../lib/fill.js";
import { mapEmbed, mapLink } from "../../lib/map.js";

/* The "Where" block, shared by the event detail page and the event modal so the
   two cannot drift apart — they previously carried two near-identical copies
   with different heights, radii and border treatments.

   One card holds everything: the map, a floating venue pill over it, and a
   footer carrying the address and the directions button. The venue name sits on
   the map rather than under it because the map is the thing a visitor looks at
   first, and a pin with no name attached is not worth much.

   ⚠ `mapEmbed` falls back to the brand address for any event without its own
   `coords` or `mapQuery`, so this renders a real map far more often than the
   events actually have real positions. See lib/map.js. */

/* Two sizes rather than a free height: the modal is a cramped two-column
   layout, the detail page is not. */
const FRAME = {
  compact: "h-[180px]",
  full: "h-[260px]",
};

const STYLISED = {
  compact: "h-[132px]",
  full: "h-[190px]",
};

export default function VenueMap({
  event = {},
  fallback = "",
  copy = {},
  size = "full",
  className,
}) {
  const embed = mapEmbed(event, fallback);
  const link = mapLink(event, fallback);

  return (
    <div
      className={cx(
        "overflow-hidden rounded-lg border border-line bg-white shadow-ecard",
        "transition-shadow duration-200 hover:shadow-soft",
        className
      )}
    >
      <div className="relative">
        {embed ? (
          /* lazy so the modal opens instantly and the tiles only load once
             someone actually looks at the map */
          <iframe
            src={embed}
            title={fill(copy.mapTitle ?? "", { venue: event.venue })}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={cx("block w-full border-0", FRAME[size] ?? FRAME.full)}
          />
        ) : (
          /* no coordinates and no address — a suggestion of a street map
             rather than a real one */
          <div
            className={cx(
              "relative overflow-hidden bg-cloud bg-map-grid [background-size:34px_34px]",
              STYLISED[size] ?? STYLISED.full
            )}
            aria-hidden="true"
          >
            <i className="absolute inset-x-0 top-[46%] h-[10px] bg-grid" />
            <i className="absolute bottom-0 left-[62%] top-0 w-2 bg-grid" />
            <i className="absolute left-1/2 top-[44%] h-[18px] w-[18px] -translate-x-1/2 -translate-y-full -rotate-45 rounded-[999px_999px_999px_2px] bg-primary" />
          </div>
        )}

        {/* ⚠ pointer-events-none, or the pill would swallow drags meant for the
            map underneath it. */}
        {event.venue && (
          <span className="pointer-events-none absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-lg bg-white/90 px-[0.6rem] py-[0.35rem] shadow-arrowSoft backdrop-blur-sm">
            <IconMapPin
              className="h-4 w-4 flex-none text-primary"
              stroke={2}
              aria-hidden="true"
            />
            <strong className="truncate text-[13px] font-extrabold leading-[18px] text-ink">
              {event.venue}
            </strong>
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-line bg-mist px-4 py-3">
        <p className="min-w-0 flex-1 text-[14px] leading-[20px] text-muted">
          {event.address}
        </p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex flex-none items-center gap-1 rounded border border-line bg-white px-3 py-2 text-[13px] font-extrabold text-primary transition-colors duration-200 hover:border-primary hover:bg-softbg"
          >
            {copy.directions}
            <IconArrowUpRight className="h-4 w-4" stroke={2} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
