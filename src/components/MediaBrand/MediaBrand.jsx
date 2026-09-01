import logo from "../../assests/logos/brand-main-logo-light.webp";
import { cx } from "../../lib/cx.js";

/* The brand stamp on a photo: a top-weighted scrim and the iwan.community
   mark at the top-right. One component so every card and detail image wears
   the identical treatment — see bg-brand-scrim in tailwind.config.js.

   ⚠ The LIGHT logo, always — the scrim guarantees a dark ground under it
   whatever the photo. Drop it inside a `relative overflow-hidden` frame,
   after the <img>. `size` is the logo width; the caller shrinks it on small
   thumbnails. Decorative through and through: empty alt, no pointer events,
   so it never intercepts the card's own link. */
export default function MediaBrand({ size = 72, className }) {
  return (
    <span
      aria-hidden="true"
      className={cx("pointer-events-none absolute inset-0 bg-brand-scrim", className)}
    >
      <img
        src={logo}
        alt=""
        style={{ width: `${size}px` }}
        className="absolute right-3 top-3"
      />
    </span>
  );
}
