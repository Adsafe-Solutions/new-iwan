import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";
import Brand from "../Brand/Brand.jsx";
import Button from "../Button/Button.jsx";
import CountrySwitcher from "../CountrySwitcher/CountrySwitcher.jsx";
import { useCopy, useNav } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* The country switcher shares the nav's single-open-dropdown state under these
   reserved labels, so opening it closes the Programmes panel and vice versa.
   Two instances, because at 360px the bar cannot hold the brand, the switcher,
   the CTA and the burger at once: below the drawer breakpoint it moves into
   the tray. They take separate labels so each keeps its own trigger ref. */
const COUNTRY = "__country";
const COUNTRY_TRAY = "__country-tray";

/* A dropdown is either `simple` — one vertical list — or `mega`, a wider
   panel of columns each holding one or more labelled groups. Everything
   ungrouped is a plain link. The `mega` branch in Panel is therefore unused
   at the moment — kept because it is a few lines and the shape is already
   proven.

   One dropdown per distinct `group` found in `pages`, built in the order
   groups first appear — so nav.js's ordering is the only thing that decides
   where a dropdown's trigger sits in the bar. Everything else in that group
   is folded into its panel rather than shown again as its own link. */
function buildLinks({ pages }) {
  const seen = new Set();
  return pages.reduce((links, page) => {
    if (!page.group) {
      links.push({ label: page.label, to: page.path });
      return links;
    }
    if (seen.has(page.group)) return links;
    seen.add(page.group);
    const inGroup = pages.filter((p) => p.group === page.group);
    links.push({
      label: page.group,
      menu: {
        type: "simple",
        columns: [
          { groups: [{ items: inGroup.map(({ label, path }) => [label, path]) }] },
        ],
      },
    });
    return links;
  }, []);
}

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

/* Panels snap open and shut — `hidden` is display:none, and there is no
   transition on it. That is Webflow's default dropdown behaviour, and what
   the reference does. */
const PANEL = cx(
  "absolute z-[99] overflow-hidden rounded-[8px] bg-primary-800 shadow-mega",
  /* in the drawer it stops floating and becomes an inline accordion */
  "max-nav:static max-nav:w-full max-nav:translate-x-0 max-nav:shadow-none"
);

const PANEL_LINK = cx(
  "group/link flex items-center gap-3 px-6 py-3.5 text-[16px] text-white",
  "transition-colors duration-[400ms] hover:text-accent",
  "max-nav:px-4 max-nav:py-3"
);

/* The reveal indicator: 16×4 at rest only once hovered or current. */
const PILL = "h-1 w-0 flex-none rounded-[10px] bg-accent transition-[width] duration-300";

function PanelLink({ to, label, current, onNavigate }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cx(PANEL_LINK, current && "is-current text-accent")}
    >
      <span
        className={cx(PILL, current ? "w-4" : "group-hover/link:w-4")}
        aria-hidden="true"
      />
      <span>{label}</span>
    </Link>
  );
}

function Panel({ menu, id, open, pathname, onNavigate }) {
  const mega = menu.type === "mega";

  return (
    <div
      id={id}
      className={cx(
        PANEL,
        open ? "is-open block" : "hidden",
        mega
          ? "left-1/2 top-full mt-10 w-[540px] -translate-x-1/2 py-6 max-nav:mt-2 max-nav:py-4"
          : "left-0 top-full mt-2 w-[260px] py-2 max-nav:mt-2"
      )}
    >
      <div
        className={cx(
          mega && "flex flex-row gap-10 px-2 max-phone:flex-col max-phone:gap-6"
        )}
      >
        {menu.columns.map((col) => (
          <div className="flex flex-1 flex-col" key={col.groups[0].title ?? "col"}>
            {col.groups.map((g, gi) => (
              <div className={cx("flex flex-col", gi > 0 && "mt-7")} key={g.title ?? gi}>
                {g.title && (
                  <p className="px-6 pb-2 text-[13px] font-bold uppercase tracking-[0.14em] text-white/50 max-nav:px-4">
                    {g.title}
                  </p>
                )}
                {g.items.map(([label, to]) => (
                  <PanelLink
                    key={label}
                    to={to}
                    label={label}
                    current={to !== "/" && to === pathname}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Header({
  stuck = false,
  overlay = false,
  pinned = false,
  /* v2 homepage hero holds the header off until the page is scrolled */
  hidden = false,
}) {
  const copy = useCopy().header;
  const navContent = useNav();
  const LINKS = useMemo(() => buildLinks(navContent), [navContent]);

  const [open, setOpen] = useState(false); // mobile drawer
  const [menu, setMenu] = useState(null); // the one open dropdown, by label

  const { pathname } = useLocation();
  const nav = useRef(null);
  const triggers = useRef({});

  const close = useCallback(() => {
    setOpen(false);
    setMenu(null);
  }, []);

  /* Clicking a trigger toggles it; opening one closes any other, because
     `menu` only ever holds a single label. */
  const toggle = (label) => setMenu((m) => (m === label ? null : label));

  /* Click anywhere outside the nav closes whatever is open. mousedown
     rather than click, so it fires before a link's own handler. */
  useEffect(() => {
    if (!menu) return undefined;
    const onDown = (e) => {
      if (nav.current && !nav.current.contains(e.target)) setMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menu]);

  /* Escape closes and hands focus back to the trigger that opened it. */
  useEffect(() => {
    if (!menu) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      const back = triggers.current[menu];
      setMenu(null);
      back?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  /* a route change should never leave a panel hanging open */
  useEffect(() => close(), [pathname, close]);

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
      ref={nav}
      className={cx(
        "z-[100] border-b",
        "transition-[top,transform,opacity,background-color,border-color,box-shadow] duration-300",
        /* slides up out of the way rather than vanishing, and stops taking
           clicks while it is gone */
        hidden && "pointer-events-none -translate-y-full opacity-0",
        /* pinned for the whole home route, not only while overlaid: staying
           fixed in both states means the chrome never re-enters flow mid-scroll
           and jolts the page */
        pinned ? "fixed w-full" : "sticky top-0",
        pinned && (overlay ? "top-topbar" : "top-0"),
        overlay && !open ? "border-transparent bg-transparent" : "border-line bg-white",
        overlay && open && "max-nav:border-line max-nav:bg-white",
        stuck && "shadow-header"
      )}
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
              const isOpen = menu === l.label;
              const isActive = l.menu ? isOpen : l.to === pathname;
              const panelId = `nav-${l.label.replace(/\s+/g, "-").toLowerCase()}`;

              return (
                <li className="relative max-nav:w-full" key={l.label}>
                  {l.menu ? (
                    <button
                      type="button"
                      ref={(el) => {
                        triggers.current[l.label] = el;
                      }}
                      className={cx(
                        NAV_ITEM,
                        navTone,
                        isActive && navToneActive,
                        isOpen && "is-open"
                      )}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-haspopup="true"
                      onClick={() => toggle(l.label)}
                    >
                      {l.label}
                      <IconChevronDown
                        className={cx(
                          "h-[18px] w-[18px] opacity-70 transition-transform duration-[250ms]",
                          isOpen && "rotate-180"
                        )}
                        stroke={2.4}
                        aria-hidden="true"
                      />
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

                  {l.menu && (
                    <Panel
                      id={panelId}
                      menu={l.menu}
                      open={isOpen}
                      pathname={pathname}
                      onNavigate={close}
                    />
                  )}
                </li>
              );
            })}
            <li className="relative hidden w-full max-nav:block" key={COUNTRY_TRAY}>
              <CountrySwitcher
                open={menu === COUNTRY_TRAY}
                panelId="country-menu-tray"
                onToggle={() => toggle(COUNTRY_TRAY)}
                onClose={close}
                triggerRef={(el) => {
                  triggers.current[COUNTRY_TRAY] = el;
                }}
              />
            </li>
          </ul>
        </nav>

        {/* out-stacks the tray's z-99, or the open tray swallows the burger
            that is supposed to close it */}
        <div className="relative z-[100] flex flex-none items-center gap-[0.9rem]">
          <CountrySwitcher
            className="max-nav:hidden"
            open={menu === COUNTRY}
            overlay={overlay && !open}
            onToggle={() => toggle(COUNTRY)}
            onClose={() => setMenu(null)}
            triggerRef={(el) => {
              triggers.current[COUNTRY] = el;
            }}
          />

          <Button
            to="/contact-us"
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
            {copy.cta}
          </Button>

          <button
            type="button"
            className="hidden cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1.5 max-nav:flex"
            aria-label={copy.menu}
            aria-expanded={open}
            onClick={() => {
              setMenu(null);
              setOpen((v) => !v);
            }}
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
    </header>
  );
}
