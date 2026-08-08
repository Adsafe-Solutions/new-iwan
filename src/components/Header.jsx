import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand.jsx";
import { FOCUS_AREAS, FOCUS_LINKS } from "../focusAreas.js";

const FLAGSHIP = FOCUS_AREAS.find((a) => a.flagship)?.label;

const LINKS = [
  { label: "Zakat", to: "/zakat" },
  {
    label: "Religious Giving",
    menu: {
      title: "Religious Giving",
      items: [
        ["Give Zakat", "/zakat"],
        ["Calculate Your Zakat", "/zakat"],
        ["Sadaqah & Sadaqah Jariyah", "/"],
      ],
      img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800&auto=format&fit=crop",
    },
  },
  {
    label: "What We Do",
    menu: {
      title: "Our Focus Areas",
      items: FOCUS_LINKS,
      img: FOCUS_AREAS[0].img,
    },
  },
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

export default function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [menu, setMenu] = useState(null); // active mega-menu label
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = LINKS.find((l) => l.label === menu && l.menu)?.menu;
  const close = () => {
    setOpen(false);
    setMenu(null);
  };

  return (
    <header
      className={`header${stuck ? " stuck" : ""}`}
      onMouseLeave={() => setMenu(null)}
    >
      <div className="container header__inner">
        <Brand />

        <nav className={`nav${open ? " open" : ""}`}>
          <ul>
            {LINKS.map((l) => (
              <li key={l.label} onMouseEnter={() => setMenu(l.menu ? l.label : null)}>
                <Link
                  to={l.to || "/"}
                  className={menu === l.label && l.menu ? "active" : ""}
                  onClick={close}
                >
                  {l.label}
                  {l.menu && <span className="caret">▾</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__cta">
          <div className="langs">
            <span aria-hidden="true">🇨🇦</span>
            <button className={lang === "EN" ? "on" : ""} onClick={() => setLang("EN")}>
              EN
            </button>
            <button className={lang === "FR" ? "on" : ""} onClick={() => setLang("FR")}>
              FR
            </button>
          </div>
          <span className="grid-ico" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <a href="#donate" className="btn btn--red">
            Donate
          </a>
          <button
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
                  {label === FLAGSHIP && (
                    <span className="mega__flag">Primary focus</span>
                  )}
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
