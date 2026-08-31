import { useEffect, useState } from "react";
import Modal from "../Modal/Modal.jsx";
import Button from "../Button/Button.jsx";
import { SECTIONS } from "../../config/sections.js";
import { usePromo } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";
import { KICKER, MARK_YB } from "../../lib/type.js";

const STORAGE_PREFIX = "iwan.promo-seen.";
/* long enough to read the page first, short enough to still feel "on load" */
const DELAY_MS = 900;
const DAY_MS = 24 * 60 * 60 * 1000;

/* sessionStorage, not localStorage: dismissing it should only hold for this
   tab — a new tab is a fresh session and should see it again, where
   localStorage would have suppressed it there too, being shared across
   every tab on the origin.

   The stored value is a timestamp, not just a flag, so a dismissal also
   expires after a day even inside the SAME tab (one left open, or pinned) —
   "seen" only holds for 24h from the moment it was dismissed, not forever.

   Both still throw in Safari private browsing rather than returning null,
   same guard LocationPrompt uses for its own (localStorage) flag. */
const seen = (id) => {
  try {
    const at = sessionStorage.getItem(STORAGE_PREFIX + id);
    return at !== null && Date.now() - Number(at) < DAY_MS;
  } catch {
    return false;
  }
};

const remember = (id) => {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + id, String(Date.now()));
  } catch {
    /* it just shows again next visit */
  }
};

/* Gated by SECTIONS.promoPopup (config/sections.js) and by the CMS having a
   promo to show — flip the flag off, or publish none, and this renders
   nothing. There is no static promo behind it.

   Dismissal is remembered per `promo.id`, not a fixed key, so changing the
   id when the actual promotion changes (a new season, a new campaign) shows
   it again to everyone, even people who dismissed the last one — no flag to
   reset by hand.

   It waits a beat before appearing (DELAY_MS) rather than flashing in at
   paint, and skips itself entirely if another dialog (LocationPrompt) is
   already open — Modal doesn't coordinate two instances of itself, and two
   full-screen dialogs racing on the same load reads as broken, not catchy.
   It'll simply get its turn on the next load instead. */
export default function PromoPopup() {
  const promo = usePromo();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!SECTIONS.promoPopup || !promo || seen(promo.id)) return undefined;
    const t = setTimeout(() => {
      if (!document.querySelector('[role="dialog"]')) setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [promo]);

  if (!open || !promo) return null;

  const dismiss = () => {
    remember(promo.id);
    setOpen(false);
  };

  return (
    <Modal
      onClose={dismiss}
      labelledBy="promo-title"
      panelClassName="!w-[min(600px,100%)] !bg-transparent !shadow-none"
      closeClassName="!text-white/70 hover:!text-accent"
    >
      <div
        className={cx(
          "relative overflow-hidden rounded-lg border border-white/[0.06]",
          "bg-gradient-to-br from-primary-800 to-ink",
          "px-[clamp(1.6rem,5vw,2.75rem)] py-[clamp(2rem,5vw,3rem)]"
        )}
      >
        {/* the same ambient-glow treatment the podcast player uses, so a
            catchy pop-up still reads as this site rather than a generic one */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-[300px] w-[300px] rounded-full bg-teal/25 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-16 h-[260px] w-[260px] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative z-[1]">
          {promo.eyebrow && (
            <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink">
              {promo.eyebrow}
            </span>
          )}

          <h2
            id="promo-title"
            className={cx(
              KICKER,
              "!mb-4 !text-[clamp(1.7rem,4.2vw,34px)] !leading-[1.2] text-white"
            )}
          >
            {promo.heading} <span className={MARK_YB}>{promo.mark}</span>
          </h2>

          <p className="mb-8 max-w-[46ch] text-[16px] leading-[26px] text-white/80">
            {promo.body}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Button to={promo.cta.to} variant="yellow" onClick={dismiss}>
              {promo.cta.label}
            </Button>
            {promo.dismiss && (
              <button
                type="button"
                onClick={dismiss}
                className="cursor-pointer border-0 bg-transparent text-[14px] font-bold text-white/60 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
              >
                {promo.dismiss}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
