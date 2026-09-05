import { IconArrowUpRight } from "@tabler/icons-react";
import Icon from "../Icon/Icon.jsx";
import { cx } from "../../lib/cx.js";

/* The chrome around one embedded social feed: a labelled header row and the
   white card the provider's iframe sits in.

   Both panels share it rather than each drawing their own, for the same
   reason RegisterForm is shared between the event modal and the detail page —
   the two sit side by side, so any drift between them is visible.

   ⚠ 467px — the w-[468px] below — is the width both feeds are laid out at, and it is set by
   Facebook, not by us. The Page Plugin accepts 180–500 and renders NOTHING at
   all above 500, and it spends 33 of those pixels on margins and a scrollbar
   rather than on its card (see FacebookFeed). 500 − 33 is therefore the widest
   card it can draw. Instagram's embed will take any width, so it takes this
   one: the two panels match because the constrained one sets the number. */
/* Both cards are exactly this tall, and it is Instagram that sets it: its
   embed draws a five-line profile header and two rows of three tiles, and
   stops. Anything taller left dead white space under the last row of tiles.
   Facebook's timeline is far longer than any height we could pick, so it is
   the one that gets cropped — see FacebookFeed. */
export const BODY_H = 470;

export default function SocialPanel({ icon, label, href, cta, children }) {
  return (
    <div className="reveal w-[468px] max-w-full">
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
          <Icon name={icon} className="h-[18px] w-[18px]" />
          {label}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={cx(
            "group inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted",
            "transition-colors duration-200 hover:text-primary-800"
          )}
        >
          {cta}
          <IconArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            stroke={2}
            aria-hidden="true"
          />
        </a>
      </div>

      {/* overflow-hidden is what lets each feed crop the provider's own
          header off — the iframe is offset inside this box, not resized */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-card">{children}</div>
    </div>
  );
}
