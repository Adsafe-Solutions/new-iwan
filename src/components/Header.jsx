import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Brand from "./Brand.jsx";
import { NAV_PAGES, PROGRAMMES } from "../config/navPages.js";

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

export default function Header({ stuck = false, overlay = false, pinned = false }) {
  const [open, setOpen] = useState(false); // mobile drawer
  const [menu, setMenu] = useState(null); // active mega-menu label

  const { pathname } = useLocation();
  const active = LINKS.find((l) => l.label === menu && l.menu)?.menu;
  const close = () => {
    setOpen(false);
    setMenu(null);
  };

  return (
    <header
      className={`header${stuck ? " stuck" : ""}${pinned ? " pinned" : ""}${
        overlay ? " overlay" : ""
      }${open ? " is-open" : ""}`}
      onMouseLeave={() => setMenu(null)}
    >
      <div className="container header__inner">
        <Brand light={overlay && !open} />

        <nav className={`nav${open ? " open" : ""}`}>
          <ul>
            {LINKS.map((l) => {
              const isActive = l.menu ? menu === l.label : l.to === pathname;
              return (
                <li key={l.label} onMouseEnter={() => setMenu(l.menu ? l.label : null)}>
                  {l.menu ? (
                    <button
                      type="button"
                      className={`nav__parent${isActive ? " active" : ""}`}
                      aria-expanded={menu === l.label}
                      onClick={() => setMenu(menu === l.label ? null : l.label)}
                    >
                      {l.label}
                      <span className="caret">▾</span>
                    </button>
                  ) : (
                    <Link to={l.to} className={isActive ? "active" : ""} onClick={close}>
                      {l.label}
                    </Link>
                  )}

                  {/* the mega panel is hidden in the drawer, so grouped pages
                      would be unreachable on mobile without this nested list */}
                  {l.menu && (
                    <ul className="nav__sub">
                      {l.menu.items.map(([label, to]) => (
                        <li key={label}>
                          <Link
                            to={to}
                            className={to !== "/" && to === pathname ? "active" : ""}
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

        <div className="header__cta">
          <a href="#contact" className="btn btn--blue">
            Contact Us
          </a>
          <button
            type="button"
            className={`burger${open ? " on" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {active && (
        <div className="mega">
          <div className="container mega__inner">
            <div className="mega__links">
              <h4>{active.title}</h4>
              {active.items.map(([label, to]) => (
                <Link key={label} to={to} onClick={close}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="mega__img" style={{ "--img": `url(${active.img})` }} />
          </div>
        </div>
      )}
    </header>
  );
}
