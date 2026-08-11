import { useEffect, useRef, useState } from "react";
import { THEMES, DEFAULT_THEME } from "../../themes.js";
import "./ThemeSwitcher.css";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });
  const ref = useRef(null);

  // apply + persist the selected theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  // close the tray on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`theme-fab${open ? " open" : ""}`} ref={ref}>
      <div className="theme-tray" role="menu" aria-hidden={!open}>
        <p className="theme-tray__title">Choose theme</p>
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={`theme-opt${theme === t.id ? " on" : ""}`}
            onClick={() => setTheme(t.id)}
            role="menuitemradio"
            aria-checked={theme === t.id}
          >
            <span className="theme-swatch">
              <i style={{ background: t.primary }} />
              <i style={{ background: t.accent }} />
            </span>
            <span className="theme-opt__name">{t.name}</span>
            {theme === t.id && <span className="theme-check">✓</span>}
          </button>
        ))}
      </div>

      <button
        className="theme-btn"
        aria-label="Change theme"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none">
          <path
            d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.36-.6-.36-.99 0-.83.67-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="7.5" cy="11.5" r="1.15" fill="currentColor" />
          <circle cx="12" cy="8.5" r="1.15" fill="currentColor" />
          <circle cx="16.5" cy="11.5" r="1.15" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
