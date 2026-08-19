import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useCopy } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";

const BTN = cx(
  "grid h-10 min-w-10 cursor-pointer place-items-center rounded-lg border px-3",
  "text-[14px] font-bold transition-colors duration-200",
  "disabled:cursor-default disabled:opacity-40"
);

const IDLE = "border-line bg-white text-ink hover:border-primary hover:text-primary";
const ON = "border-transparent bg-primary text-white";

/* Page state only — no URL. The listing keeps its place in component state, so
   moving between pages never remounts the page or resets the filter. */
export default function Pagination({ page, total, onChange, className }) {
  const copy = useCopy().blogsPage;
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav
      className={cx("flex flex-wrap items-center gap-2", className)}
      aria-label={fill(copy.page, { page, total })}
    >
      <button
        type="button"
        className={cx(BTN, IDLE)}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label={copy.prev}
      >
        <IconChevronLeft className="h-[18px] w-[18px]" stroke={2.2} aria-hidden="true" />
      </button>

      {pages.map((n) => (
        <button
          key={n}
          type="button"
          className={cx(BTN, n === page ? ON : IDLE)}
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          aria-label={fill(copy.goToPage, { page: n })}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        className={cx(BTN, IDLE)}
        onClick={() => onChange(page + 1)}
        disabled={page === total}
        aria-label={copy.next}
      >
        <IconChevronRight className="h-[18px] w-[18px]" stroke={2.2} aria-hidden="true" />
      </button>
    </nav>
  );
}
