import { useEffect, useRef, useState } from "react";
import { useCopy, useFacebook } from "../../content/ContentProvider.jsx";
import SocialPanel, { BODY_H } from "../SocialPanel/SocialPanel.jsx";
import { cx } from "../../lib/cx.js";

/* Facebook's Page Plugin, cropped down to just the timeline.

   A cross-origin iframe cannot be restyled from here, so all of this is done
   from the OUTSIDE: the plugin is asked for a page bigger than the window it
   sits in, then offset so what we do not want falls outside the parent's
   overflow.

   ⚠ THE FRAME IS TALL AND WE DO THE SCROLLING. That is the whole design, and
   it is what stops the timeline repeating itself.

   Asked for a short frame, the plugin scrolls internally and lazily fetches
   more posts as you reach the bottom — and on a page with only a handful of
   posts it comes back round to the first one, so the same post appears again
   further down. Asked for a frame taller than it can fill, it lays the whole
   timeline out ONCE, in order, and ends with its own "Find us on Facebook"
   row. Verified by rendering this page at 5200px: five posts, no repeat.

   So the plugin gets a frame TALLER than its whole timeline, lays all of it
   out at once, and never scrolls; the scrolling belongs to the box below,
   which we own. Three faults go away with it: no repeated posts, no grey tail
   past the last loaded post, and no scrollbar inside the card.

   ⚠ FRAME_H is a floor, not a window. `height` is a hint to the plugin, not a
   cap — it renders the timeline it has either way, so a frame SHORTER than
   the content simply overflows and the scrollbar (and the lazy loading, and
   the repeats) come back. Measured: this page renders ~3150px of timeline, so
   2000 still overflowed and 5200 did not.

   ⚠ SCROLL_H is how far we let people scroll, and it exists because the frame
   is deliberately taller than the content: without it the box would scroll on
   past the last post into the empty tail of the frame. Keep it under what the
   page fills, so scrolling stops on real content — the header link is what
   goes to the rest.

   The other two numbers, both measured against the rendered plugin:

   MAX_W 500 — the plugin's own ceiling. Ask for 501 and it renders a blank
   panel, not a wider one, which is why CHROME is subtracted from the width we
   ask for rather than added to it.

   HEAD 84 — the plugin's own page header (avatar, name, Follow button). It
   repeats the header row the panel already draws above the card, so it is
   scrolled off the top.

   CHROME 18 — the 9px margin the plugin leaves down each side of its card.
   Cropping only the left one left the right margin inside our white card,
   which read as a second card nested in the first. There is no scrollbar in
   this number any more: a frame that does not overflow does not draw one, on
   any platform. An earlier version assumed a 16px scrollbar and cropped for
   it, which sliced the Facebook logo in half on machines with overlay
   scrollbars, where no width is reserved. */
const MAX_W = 500;
const MIN_W = 180;
const HEAD = 84;
const GUTTER = 9;
const CHROME = GUTTER * 2;
const FRAME_H = 5200;
const SCROLL_H = 2500;

export default function FacebookFeed() {
  const { page } = useFacebook() ?? {};
  const copy = useCopy().facebook;
  const social = useCopy().social;
  const box = useRef(null);
  /* null until measured — mounting the iframe at a guessed width and
     correcting afterwards reloads the plugin in front of the visitor */
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const read = () => setWidth(el.clientWidth);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!page) return null;

  /* ask for the margins back on top, so what stays VISIBLE fills the panel */
  const req = width == null ? null : Math.min(MAX_W, Math.max(MIN_W, width + CHROME));

  const src =
    `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(page)}` +
    `&tabs=timeline&width=${req}&height=${FRAME_H}` +
    "&small_header=true&hide_cover=true&show_facepile=false&adapt_container_width=true";

  return (
    <SocialPanel icon="facebook" label={copy.label} href={page} cta={social.cta}>
      {/* Our scroller, not Facebook's. Its own scrollbar is hidden rather than
          styled: it would sit inside the card exactly where the plugin's used
          to, which is the nested-card look this whole component exists to
          avoid. The wheel still scrolls it. */}
      <div
        ref={box}
        className={cx(
          "overflow-y-auto overflow-x-hidden",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
        style={{ height: BODY_H }}
      >
        {req && (
          <div className="relative overflow-hidden" style={{ height: SCROLL_H }}>
            <iframe
              title={copy.frameTitle}
              src={src}
              width={req}
              height={FRAME_H}
              loading="lazy"
              className="absolute block border-0"
              style={{ top: -HEAD, left: -GUTTER, maxWidth: "none" }}
              frameBorder="0"
              allow="encrypted-media"
            />
          </div>
        )}
      </div>
    </SocialPanel>
  );
}
