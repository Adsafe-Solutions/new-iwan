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

/* Two ways to build the chips.

   By default they come from the ITEMS, so a programme with nothing coming up
   never gets an empty filter. That is right for a list the caller holds in
   full — the homepage events section, and anything not paged.

   ⚠ `fromNav` is for a SERVER-PAGED list, where the items on screen are one
   page of many. Deriving chips from those would hide a programme whose posts
   happen to start on page two, so the chips come from the country's own nav
   instead and every programme it runs is offered. The trade is that a chip can
   now lead to an empty result; that is the honest answer, and better than
   silently having no way to ask the question. */
/* `communityLabel` overrides the chip for items tied to no programme —
   events call that "Open to all", blogs call it "Default". */
export default function EventFilters({
  events = [],
  fromNav = false,
  value,
  onChange,
  communityLabel,
  className,
}) {
  const { pages, programmesGroup } = useNav();
  const copy = useCopy().events;

  const programmes = fromNav
    ? pages.filter((p) => p.group === programmesGroup)
    : programmeFilters(events, pages);

  const hasCommunity = fromNav || events.some((e) => !programmeOf(e, pages));

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
