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
const CARD = cx(
  "group flex items-center gap-4 rounded-2xl border border-line bg-white p-6",
  "transition-[border-color,box-shadow,transform] duration-[250ms]",
  "hover:-translate-y-1 hover:border-primary hover:shadow-ecard"
);

function NavCard({ item, base, label, back = false }) {
  const arrow = cx(
    "h-5 w-5 flex-none text-primary transition-transform duration-200",
    back ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
  );
  return (
    <Link to={`${base}/${item.id}`} className={cx(CARD, back ? "" : "text-right")}>
      {back && <IconArrowLeft className={arrow} stroke={2} aria-hidden="true" />}
      <span className="min-w-0 flex-1">
        <span className="mb-1 block text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary">
          {label}
        </span>
        <span className="block truncate text-[16px] font-bold leading-[1.3]">
          {item.title}
        </span>
      </span>
      {!back && <IconArrowRight className={arrow} stroke={2} aria-hidden="true" />}
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
      {prev ? <NavCard item={prev} base={base} label={copy.prev} back /> : <span />}
      {next && <NavCard item={next} base={base} label={copy.next} />}
    </nav>
  );
}
