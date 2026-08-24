import Button from "../../components/Button/Button.jsx";
import Icon from "../../components/Icon/Icon.jsx";
import { useCopy, useHero } from "../../content/ContentProvider.jsx";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import { KICKER } from "../../lib/type.js";

/* Stands in for `Programme` when a nav entry belongs to the programmes group
   but this country has no `programmes.content` for it yet (see App.jsx's
   routing and content/ca/index.js) — the programme still has a tile, a route
   and a place in the nav, it just isn't running here. `page` is the same nav
   entry `Programme` takes, so the tone classes (`soft`/`edge`/`text`) and the
   logo id (`mark`) are already on it — nothing here is programme-specific by
   name. */
export default function ComingSoon({ page }) {
  const copy = useCopy().comingSoon;
  const { logos } = useHero();
  const mark = logos.find((l) => l.id === page.mark);

  return (
    <main className="pb-24 pt-24">
      <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-6 text-center">
        {mark && (
          <span
            className={cx(
              "mb-8 grid h-[136px] w-[136px] flex-none place-items-center rounded-full border",
              page.soft,
              page.edge
            )}
          >
            <img
              src={mark.src}
              alt={mark.alt}
              style={{ "--s": mark.scale ?? 1 }}
              className="w-[calc(76px*var(--s))] max-w-full"
            />
          </span>
        )}

        <span
          className={cx(
            "mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5",
            "text-[13px] font-extrabold uppercase tracking-[0.14em]",
            page.soft,
            page.text
          )}
        >
          <Icon name="clock" className="h-4 w-4" strokeWidth={2.4} />
          {copy.badge}
        </span>

        <h1 className={cx(KICKER, "!mb-5 !text-[clamp(1.9rem,4.5vw,48px)]")}>
          {page.label} <span className={page.text}>{copy.heading}</span>
        </h1>

        <p className="mb-9 text-[18px] leading-[28px] text-muted">
          {fill(copy.body, { label: page.label, intro: page.intro })}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/" variant="blue">
            {copy.home}
          </Button>
          <Button to="/contact-us" variant="outline">
            {copy.contact}
          </Button>
        </div>
      </div>
    </main>
  );
}
