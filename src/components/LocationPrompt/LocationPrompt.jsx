import { useEffect, useState } from "react";
import Modal from "../Modal/Modal.jsx";
import Button from "../Button/Button.jsx";
import { getCountry } from "../../config/countries.js";
import { useCopy, useCountry } from "../../content/ContentProvider.jsx";
import { detectCountry } from "../../lib/geo.js";
import { fill } from "../../lib/fill.js";
import { cx } from "../../lib/cx.js";
import { MARK_Y } from "../../lib/type.js";

const STORAGE_KEY = "iwan.location-prompt";

/* localStorage throws in Safari private browsing rather than returning null. */
const answered = () => {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
};

const remember = () => {
  try {
    localStorage.setItem(STORAGE_KEY, "answered");
  } catch {
    /* the prompt just comes back next visit */
  }
};

const PAD = "px-[clamp(1.5rem,5vw,2.75rem)]";

/* Asks — never redirects. The guess comes from the visitor's time zone and is
   only ever a guess, so acting on it silently would drop someone on the wrong
   country's site with no idea why.

   It appears only when the guess is a country we actually serve AND differs
   from the one being viewed; someone in the UK sees nothing, because there is
   nothing to offer them. Any answer, including dismissing it, is remembered —
   a prompt that returns on every page load is worse than none. */
export default function LocationPrompt() {
  const [active, setCountry] = useCountry();
  const copy = useCopy().locationPrompt;
  const [suggested, setSuggested] = useState(null);

  useEffect(() => {
    if (answered()) return;
    const guess = detectCountry();
    if (guess && guess !== active.code) setSuggested(getCountry(guess));
  }, [active.code]);

  if (!suggested) return null;

  const values = { detected: suggested.label, active: active.label, name: "Iwan" };

  const dismiss = () => {
    remember();
    setSuggested(null);
  };

  return (
    <Modal
      onClose={dismiss}
      labelledBy="location-prompt-title"
      panelClassName="!w-[min(560px,100%)]"
    >
      <div
        className={cx(PAD, "pb-[clamp(1.9rem,4vw,2.9rem)] pt-[clamp(1.9rem,4vw,2.9rem)]")}
      >
        {/* the close button sits on this row, so the eyebrow stops short of it */}
        <p className="mb-4 pr-12 text-[12px] font-bold uppercase leading-4 tracking-[0.16em] text-primary">
          {copy.eyebrow}
        </p>

        <h2
          id="location-prompt-title"
          className="mb-5 text-[clamp(1.5rem,3.4vw,32px)] font-black uppercase leading-[1.18] tracking-[-0.01em]"
        >
          {copy.headingLead}{" "}
          <span className={cx(MARK_Y, "whitespace-nowrap")}>{suggested.label}</span>
        </h2>

        <p className="max-w-[46ch] text-[17px] leading-[29px] text-ink-2">
          {fill(copy.body, values)}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button
            className="max-xs:w-full"
            onClick={() => {
              remember();
              setCountry(suggested.code);
            }}
          >
            <span aria-hidden="true" className="text-[15px] leading-none">
              {suggested.flag}
            </span>
            {fill(copy.switch, values)}
          </Button>
          <Button variant="outline" className="max-xs:w-full" onClick={dismiss}>
            {fill(copy.stay, values)}
          </Button>
        </div>

        <p className="mt-9 border-t border-line pt-5 text-[13px] leading-[21px] text-muted">
          {copy.stayNote}
        </p>
      </div>
    </Modal>
  );
}
