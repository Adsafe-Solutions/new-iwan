import { useCopy, useNav } from "../../content/ContentProvider.jsx";
import {
  ALL_PROGRAMMES,
  NO_PROGRAMME,
  programmeFilters,
  programmeOf,
} from "../../lib/events.js";
import { cx } from "../../lib/cx.js";

const CHIP = cx(
  "cursor-pointer rounded-full border px-4 py-2",
  "text-[13px] font-bold uppercase tracking-[0.06em]",
  "transition-colors duration-200"
);

/* Chips are built from the events themselves, so a programme with nothing
   coming up never gets an empty filter — and a country that does not run a
   programme never sees it here, because the labels come from its own nav. */
/* `communityLabel` overrides the chip for items tied to no programme —
   events call that "Open to all", blogs call it "Default". */
export default function EventFilters({
  events,
  value,
  onChange,
  communityLabel,
  className,
}) {
  const { pages } = useNav();
  const copy = useCopy().events;

  const programmes = programmeFilters(events, pages);
  const hasCommunity = events.some((e) => !programmeOf(e, pages));

  const options = [
    [ALL_PROGRAMMES, copy.allProgrammes],
    ...programmes.map((p) => [p.path, p.label]),
    ...(hasCommunity ? [[NO_PROGRAMME, communityLabel ?? copy.community]] : []),
  ];

  if (options.length < 3) return null;

  return (
    <div className={cx("flex flex-wrap gap-2", className)} role="group">
      {options.map(([key, label]) => {
        const on = value === key;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(key)}
            className={cx(
              CHIP,
              on
                ? "border-transparent bg-primary text-white"
                : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
