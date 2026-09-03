import { Link } from "react-router-dom";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useCopy } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* Prev/next cards at the foot of a blog post or podcast episode. `prev` and
   `next` are the API's sibling cards (or null), `base` the listing path they
   link under ("/blogs", "/podcast").

   ⚠ No `.reveal` here or in RelatedRail. Both mount from the detail fetch,
   which can land AFTER GSAP's scan when the page first painted from bootstrap
   data — a reveal class then strands them at opacity 0 forever. */
/* ⚠ `min-w-0` is load-bearing, twice. A grid item and a flex item both default
   to `min-width: auto`, so a child that cannot shrink — a nowrap title is one
   unbreakable run — pushes its box past the track and off the screen. It reads
   as a text-overflow bug; it is the box growing. */
const CARD = cx(
  "group flex min-w-0 flex-col gap-1.5 rounded-2xl border border-line bg-white",
  "p-4 sm:p-6",
  "transition-[border-color,box-shadow,transform] duration-[250ms]",
  "hover:-translate-y-1 hover:border-primary hover:shadow-ecard"
);

const LABEL = "text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary";

/* The arrow sits ON the title's line, not centred against the card — a two-line
   title otherwise floats it in the middle of nowhere. One line, truncated:
   enough of the title to recognise, and the card stays the same height
   whatever the title's length. */
function NavCard({ item, base, label, back = false }) {
  const Arrow = back ? IconArrowLeft : IconArrowRight;
  const arrow = (
    <Arrow
      className={cx(
        "h-5 w-5 flex-none text-primary transition-transform duration-200",
        back ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
      )}
      stroke={2}
      aria-hidden="true"
    />
  );

  return (
    <Link
      to={`${base}/${item.id}`}
      className={cx(CARD, back ? "items-start" : "items-end")}
    >
      <span className={LABEL}>{label}</span>
      <span
        className={cx("flex w-full min-w-0 items-center gap-2.5", !back && "justify-end")}
      >
        {back && arrow}
        <span className="min-w-0 truncate text-[15px] font-bold leading-[1.35] sm:text-[16px]">
          {item.title}
        </span>
        {!back && arrow}
      </span>
    </Link>
  );
}

export default function DetailNav({ prev, next, base, className }) {
  const copy = useCopy().detailNav;
  if (!prev && !next) return null;

  return (
    <nav
      aria-label={`${copy.prev} / ${copy.next}`}
      className={cx("grid gap-4 sm:grid-cols-2", className)}
    >
      {/* The placeholder only holds the left column when there is no previous.
          In the single-column phone layout it would be an empty row. */}
      {prev ? (
        <NavCard item={prev} base={base} label={copy.prev} back />
      ) : (
        <span className="hidden sm:block" />
      )}
      {next && <NavCard item={next} base={base} label={copy.next} />}
    </nav>
  );
}
