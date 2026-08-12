import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Brand from "../Brand/Brand.jsx";
import Button from "../Button/Button.jsx";
import { NAV_PAGES, PROGRAMMES } from "../../config/navPages.js";
import { cx } from "../../lib/cx.js";

const inGroup = NAV_PAGES.filter((p) => p.group === PROGRAMMES);

const LINKS = [
  {
    label: PROGRAMMES,
    menu: {
      title: "Our Programmes",
      items: inGroup.map(({ label, path }) => [label, path]),
      img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop",
    },
  },
  ...NAV_PAGES.filter((p) => !p.group).map(({ label, path }) => ({ label, to: path })),
  {
    label: "About Us",
    menu: {
      title: "About Us",
      items: [
        ["Our Story", "/"],
        ["Leadership", "/"],
        ["Financials", "/"],
        ["Careers", "/"],
        ["Contact", "/"],
      ],
      img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop",
    },
  },
];

/* Shared by <a> and the dropdown <button> so both get the same underline. */
const NAV_ITEM = cx(
  "relative flex items-center gap-1 whitespace-nowrap border-0 bg-transparent",
  "cursor-pointer py-[0.3rem] text-[18px] font-bold normal-case leading-7 tracking-normal",
  "after:absolute after:-bottom-[3px] after:left-0 after:h-[2px] after:w-0",
  "after:transition-[width] after:duration-300 after:content-['']",
  "hover:after:w-full",
  /* the inline bar gets tight before it gives up and becomes a drawer */
  "max-wide:text-[16px] max-nav:text-[18px]"
);

export default function Header({ stuck = false, overlay = false, pinned = false }) {
  const [open, setOpen] = useState(false); // mobile drawer
  const [menu, setMenu] = useState(null); // active mega-menu label

  const { pathname } = useLocation();
  const active = LINKS.find((l) => l.label === menu && l.menu)?.menu;
  const close = () => {
    setOpen(false);
    setMenu(null);
  };

  /* Below the drawer breakpoint the tray is a white panel, so the overlay's
     white-on-photo treatment has to be undone for anything sitting on it. */
  const navTone = overlay
    ? "text-white after:bg-accent hover:text-accent max-nav:text-ink max-nav:hover:text-primary"
    : "text-ink after:bg-primary hover:text-primary";
  const navToneActive = overlay
    ? "text-accent after:w-full max-nav:text-primary"
    : "text-primary after:w-full";

  return (
    <header
      className={cx(
        "z-[100] border-b",
        "transition-[top,background-color,border-color,box-shadow] duration-300",
        /* pinned for the whole home route, not only while overlaid: staying
           fixed in both states means the chrome never re-enters flow mid-scroll
           and jolts the page */
        pinned ? "fixed w-full" : "sticky top-0",
        pinned && (overlay ? "top-topbar" : "top-0"),
        overlay ? "border-transparent bg-transparent" : "border-line bg-white",
        /* the open tray is white and full width, so an overlaid header would
           lose its reversed logo and burger against it */
        overlay && open && "max-nav:border-line max-nav:bg-white",
        stuck && "shadow-header"
      )}
      onMouseLeave={() => setMenu(null)}
    >
      <div
        className={cx(
          "mx-auto flex w-full max-w-container items-center justify-between gap-6 px-6",
          "transition-[height] duration-300",
          stuck ? "h-16" : "h-header"
        )}
      >
        <Brand light={overlay && !open} compact={stuck} />

        <nav
          className={cx(
            /* below 1000px this becomes a full-width tray that drops from
               behind the header — z-99 against the header's 100 */
            "max-nav:fixed max-nav:inset-x-0 max-nav:top-0 max-nav:z-[99] max-nav:w-full",
            "max-nav:max-h-[100svh] max-nav:overflow-y-auto max-nav:bg-white max-nav:shadow",
            "max-nav:px-6 max-nav:pb-[2.4rem] max-nav:pt-[calc(theme(spacing.header)+1.6rem)]",
            "max-nav:transition-transform max-nav:duration-[420ms]",
            "max-nav:ease-[cubic-bezier(0.4,0,0.2,1)]",
            open ? "max-nav:translate-y-0" : "max-nav:-translate-y-full"
          )}
        >
          <ul
            className={cx(
              "flex items-center gap-[1.15rem] max-wide:gap-[1.05rem]",
              "max-nav:flex-col max-nav:items-start max-nav:gap-[1.3rem]"
            )}
          >
            {LINKS.map((l) => {
              const isActive = l.menu ? menu === l.label : l.to === pathname;
              return (
                <li key={l.label} onMouseEnter={() => setMenu(l.menu ? l.label : null)}>
                  {l.menu ? (
                    <button
                      type="button"
                      className={cx(NAV_ITEM, navTone, isActive && navToneActive)}
                      aria-expanded={menu === l.label}
                      onClick={() => setMenu(menu === l.label ? null : l.label)}
                    >
                      {l.label}
                      <span
                        className={cx(
                          "text-[0.6rem] opacity-60 transition-transform duration-[250ms]",
                          isActive && "rotate-180"
                        )}
                      >
                        ▾
                      </span>
                    </button>
                  ) : (
                    <Link
                      to={l.to}
                      className={cx(NAV_ITEM, navTone, isActive && navToneActive)}
                      onClick={close}
                    >
                      {l.label}
                    </Link>
                  )}

                  {/* the mega panel is hidden in the drawer, so grouped pages
                      would be unreachable on mobile without this nested list */}
                  {l.menu && (
                    <ul className="ml-[0.9rem] mt-[0.9rem] hidden flex-col gap-[0.9rem] border-l-2 border-line pb-[0.3rem] pl-[0.9rem] max-nav:flex">
                      {l.menu.items.map(([label, to]) => (
                        <li key={label}>
                          <Link
                            to={to}
                            className={cx(
                              "text-[16px] font-semibold",
                              to !== "/" && to === pathname
                                ? "text-primary"
                                : "text-muted"
                            )}
                            onClick={close}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* out-stacks the tray's z-99, or the open tray swallows the burger
            that is supposed to close it */}
        <div className="relative z-[100] flex flex-none items-center gap-[0.9rem]">
          <Button
            href="#contact"
            className={cx(
              "px-[1.35rem] py-[0.7rem] text-[13px] leading-[18px]",
              /* `!` because Tailwind orders utilities by property, not by the
                 order they appear in the attribute — the variant's own
                 text-white would otherwise win over this one */
              overlay &&
                "!bg-white !text-primary-800 hover:!bg-white hover:!text-primary-800",
              overlay &&
                open &&
                "max-nav:!bg-primary max-nav:!text-white max-nav:hover:!bg-primary max-nav:hover:!text-white"
            )}
          >
            Contact Us
          </Button>

          <button
            type="button"
            className="hidden cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1.5 max-nav:flex"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cx(
                  "h-[2px] w-6 rounded-[2px] transition-all duration-300",
                  overlay && !open ? "bg-white" : "bg-ink",
                  open && i === 0 && "translate-y-[7px] rotate-45",
                  open && i === 1 && "opacity-0",
                  open && i === 2 && "-translate-y-[7px] -rotate-45"
                )}
              />
            ))}
          </button>
        </div>
      </div>

      {active && (
        <div className="absolute left-0 top-full z-[99] w-full animate-megaIn border-t border-line bg-white shadow-mega max-nav:hidden">
          <div className="mx-auto grid w-full max-w-container grid-cols-[1fr_1.15fr] items-start gap-16 px-6 pb-[2.8rem] pt-[2.6rem]">
            <div>
              {/* a quiet eyebrow above the links, not a title */}
              <h4 className="mb-[0.4rem] border-b border-line pb-[0.9rem] text-[12px] font-extrabold uppercase tracking-[0.14em] text-muted">
                {active.title}
              </h4>
              {active.items.map(([label, to]) => (
                <Link
                  key={label}
                  to={to}
                  onClick={close}
                  className={cx(
                    "flex items-center gap-[0.7rem] rounded py-[0.72rem] pl-0 pr-[0.6rem]",
                    "text-[17px] font-bold text-primary",
                    "transition-[padding-left,background-color] duration-200",
                    "hover:bg-primary/5 hover:pl-[10px]"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
            {/* matches the height of the links column beside it */}
            <div
              className="min-h-[260px] self-stretch rounded-lg bg-cover bg-center shadow-img"
              style={{ backgroundImage: `url(${active.img})` }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
