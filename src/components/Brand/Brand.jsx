import { useState } from "react";
import { Link } from "react-router-dom";
import { useBrand } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* The lockup stacks the arch above its wordmark (~1.66:1), so it needs far
   more height than a single-line logo to stay legible. `compact` is the
   scrolled-header size — the header owns that state, so it passes it down.
   z-100 out-stacks the mobile tray that opens inside .header. */
export default function Brand({ light = false, compact = false }) {
  const BRAND = useBrand();
  const [lightMissing, setLightMissing] = useState(false);
  const useLight = light && !lightMissing;

  return (
    <Link
      to="/"
      className="group relative z-[100] flex flex-none items-center"
      aria-label={`${BRAND.fullName} home`}
    >
      <img
        className={cx(
          "block w-auto transition-[height,transform] duration-300",
          compact ? "h-[46px]" : "h-[56px]",
          "group-hover:-translate-y-px",
          /* fallback only: whitens the dark lockup when the reversed
             one is missing */
          light && lightMissing && "brightness-0 invert"
        )}
        src={useLight ? BRAND.logoLight : BRAND.logo}
        alt={BRAND.fullName}
        onError={() => light && setLightMissing(true)}
      />
    </Link>
  );
}
