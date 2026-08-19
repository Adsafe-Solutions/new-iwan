import { IconChevronDown } from "@tabler/icons-react";
import { COUNTRIES } from "../../config/countries.js";
import { useCountry } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* Controlled by Header's single `menu` state, so opening this closes the
   Programmes dropdown by construction — and Header's outside-click and Escape
   handlers already cover it, since it renders inside the same <header>. */

const TRIGGER = cx(
  "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-[0.45rem]",
  "text-[13px] font-bold leading-[18px] transition-colors duration-200"
);

/* Snaps open like the nav panels — display:none, no transition. In the drawer
   it stops floating and becomes an inline accordion, the same treatment the
   nav panels get, so it pushes the tray open instead of escaping past it. */
const PANEL = cx(
  "absolute right-0 top-full z-[99] mt-2 w-[190px] overflow-hidden rounded-[8px]",
  "bg-primary-800 py-2 shadow-mega",
  "max-nav:static max-nav:w-full max-nav:shadow-none"
);

const ITEM = cx(
  "group/link flex w-full cursor-pointer items-center gap-3 border-0 bg-transparent",
  "px-5 py-3 text-left text-[15px] text-white transition-colors duration-[400ms]",
  "hover:text-accent"
);

const PILL = "h-1 w-0 flex-none rounded-[10px] bg-accent transition-[width] duration-300";

export default function CountrySwitcher({
  open = false,
  overlay = false,
  onToggle,
  onClose,
  triggerRef,
  panelId = "country-menu",
  className,
}) {
  const [country, setCountry] = useCountry();

  if (COUNTRIES.length < 2) return null;

  return (
    <div className={cx("relative", className)}>
      <button
        type="button"
        ref={triggerRef}
        className={cx(
          TRIGGER,
          overlay
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-line text-ink hover:border-primary hover:text-primary"
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-label={`Country: ${country.label}. Change country`}
        onClick={onToggle}
      >
        <span aria-hidden="true" className="text-[15px] leading-none">
          {country.flag}
        </span>
        <span className="uppercase tracking-[0.06em]">{country.code}</span>
        <IconChevronDown
          className={cx(
            "h-[15px] w-[15px] opacity-70 transition-transform duration-[250ms]",
            open && "rotate-180"
          )}
          stroke={2.4}
          aria-hidden="true"
        />
      </button>

      <div id={panelId} className={cx(PANEL, open ? "block" : "hidden")}>
        {COUNTRIES.map((c) => {
          const current = c.code === country.code;
          return (
            <button
              type="button"
              key={c.code}
              className={cx(ITEM, current && "text-accent")}
              aria-current={current || undefined}
              onClick={() => {
                setCountry(c.code);
                onClose?.();
              }}
            >
              <span
                className={cx(PILL, current ? "w-4" : "group-hover/link:w-4")}
                aria-hidden="true"
              />
              <span aria-hidden="true" className="text-[17px] leading-none">
                {c.flag}
              </span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
