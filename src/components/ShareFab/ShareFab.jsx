import { useEffect, useRef, useState } from "react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconLink,
  IconShare2,
} from "@tabler/icons-react";
import { useCopy } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* The corner share button on detail pages — it takes the WhatsApp FAB's spot
   (see App.jsx), so it copies that button's geometry exactly and ThemeSwitcher's
   tray behaviour: ⚠ pointer-events-none on the closed tray, or an invisible
   column of buttons floats over the content beneath it.

   Plain share URLs, no SDK — every network still accepts a GET with the page's
   address, and a script per network is a price this page has nothing to show
   for. The URL and title are read at click time, so a client-side route change
   under an open tray cannot share the previous page. */

const NETWORKS = [
  {
    id: "whatsapp",
    icon: IconBrandWhatsapp,
    tone: "bg-whatsapp",
    /* URL on its own line — apps linkify it more reliably than when it is
       glued to the sentence. */
    href: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
  },
  {
    id: "facebook",
    icon: IconBrandFacebook,
    tone: "bg-facebook",
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "x",
    icon: IconBrandX,
    tone: "bg-xbrand",
    href: (url, text) =>
      `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "linkedin",
    icon: IconBrandLinkedin,
    tone: "bg-linkedin",
    href: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "telegram",
    icon: IconBrandTelegram,
    tone: "bg-telegram",
    href: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
];

const ROUND =
  "grid h-[44px] w-[44px] place-items-center rounded-full text-white shadow-fab";

export default function ShareFab({ title }) {
  const copy = useCopy().share;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
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

  const page = () => ({
    url: window.location.href,
    text: title || document.title,
  });

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(page().url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard refused (http, permissions) — the tray stays open so the
         address bar is still right there. */
    }
  };

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed bottom-5 right-5 z-[200] flex flex-col items-end gap-3"
    >
      {/* Speed-dial: each button pops in on its own, nearest the trigger
          first, spreading upward — the stagger is a per-item transition-delay,
          reversed on close so the tray retracts back into the button. The
          wrapper only gates pointer events and the accessibility state. */}
      <div
        className={cx(
          "flex flex-col gap-2",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        role="menu"
        aria-hidden={!open}
      >
        {NETWORKS.map(({ id, icon: Glyph, tone, href }, i) => (
          <a
            key={id}
            role="menuitem"
            className={cx(
              ROUND,
              tone,
              "transition-[opacity,transform] duration-[240ms] ease-out hover:!scale-[1.08]",
              open
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-50 opacity-0"
            )}
            style={{
              transitionDelay: `${(open ? NETWORKS.length - i : i) * 35}ms`,
            }}
            href={open ? href(page().url, page().text) : undefined}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={copy[id]}
            title={copy[id]}
          >
            <Glyph className="h-5 w-5" stroke={2} aria-hidden="true" />
          </a>
        ))}
        <button
          type="button"
          role="menuitem"
          onClick={copyLink}
          aria-label={copied ? copy.copied : copy.copy}
          title={copied ? copy.copied : copy.copy}
          className={cx(
            ROUND,
            "cursor-pointer border-0 transition-[opacity,transform,background-color] duration-[240ms] ease-out hover:!scale-[1.08]",
            copied ? "bg-green" : "bg-ink",
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-50 opacity-0"
          )}
          /* the copy button sits nearest the trigger, so it leads the way in
             and leaves last */
          style={{ transitionDelay: open ? "0ms" : `${NETWORKS.length * 35}ms` }}
        >
          {copied ? (
            <IconCheck className="h-5 w-5" stroke={2.4} aria-hidden="true" />
          ) : (
            <IconLink className="h-5 w-5" stroke={2} aria-hidden="true" />
          )}
        </button>
      </div>

      <button
        type="button"
        aria-label={copy.open}
        title={copy.open}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "pointer-events-auto grid h-[52px] w-[52px] cursor-pointer place-items-center",
          "rounded-full border-0 bg-primary text-white shadow-fab",
          "transition-[transform,background-color] duration-[250ms] hover:scale-[1.08]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        )}
      >
        <IconShare2 className="h-6 w-6" stroke={2} aria-hidden="true" />
      </button>
    </div>
  );
}
