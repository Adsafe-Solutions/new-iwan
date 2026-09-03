import { useEffect, useRef, useState } from "react";
import { THEMES, DEFAULT_THEME } from "../../config/themes.js";
import { cx } from "../../lib/cx.js";

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
    /* ⚠ `pointer-events-none` on the WRAPPER, with each control turning them
       back on. The closed panel is invisible but still takes up its full height
       inside this flex column, so the wrapper is a ~275px transparent box at
       z-200 over the bottom-left corner — which is exactly where the footer's
       Privacy and Terms links sit. They were unclickable because of it. */
    <div
      data-fab
      className="pointer-events-none fixed bottom-5 left-5 z-[200] flex flex-col items-start gap-3"
      ref={ref}
    >
      <div
        className={cx(
          "w-[220px] origin-bottom-left rounded-[14px] border border-line bg-white p-[14px] shadow-tray",
          "transition-[opacity,transform] duration-[220ms]",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-[10px] scale-[0.92] opacity-0"
        )}
        role="menu"
        aria-hidden={!open}
      >
        <p className="mx-1 mb-2.5 mt-0.5 text-[12px] font-extrabold uppercase tracking-[0.1em] text-muted">
          Choose theme
        </p>
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={cx(
              "flex w-full cursor-pointer items-center gap-[11px] rounded-[9px] border-none px-2 py-[9px]",
              "text-[14px] font-bold text-ink transition-colors duration-200 hover:bg-softbg",
              theme === t.id ? "bg-softbg" : "bg-transparent"
            )}
            onClick={() => setTheme(t.id)}
            role="menuitemradio"
            aria-checked={theme === t.id}
          >
            <span className="inline-flex overflow-hidden rounded-lg border border-line shadow-swatch">
              <i className={cx("block h-6 w-4", t.primary)} />
              <i className={cx("block h-6 w-4", t.accent)} />
            </span>
            <span className="flex-1 text-left">{t.name}</span>
            {theme === t.id && <span className="font-extrabold text-primary">✓</span>}
          </button>
        ))}
      </div>

      <button
        className={cx(
          "pointer-events-auto",
          "grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full border-none",
          "bg-primary text-white shadow-fab",
          "transition-[transform,background-color] duration-[250ms]",
          "hover:rotate-[-8deg] hover:scale-[1.08]"
        )}
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
