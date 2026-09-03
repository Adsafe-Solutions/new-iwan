import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useBrand } from "../../content/ContentProvider.jsx";
import { cx } from "../../lib/cx.js";

/* Floating WhatsApp button, bottom-right — the mirror of the theme
   switcher's bottom-left, so the two never collide.

   It keeps WhatsApp's own green rather than the site theme: the button is
   only recognisable at a glance in that colour, which is the whole point of
   a floating action button. */
export default function WhatsAppFab({ label = "Chat with us on WhatsApp" }) {
  const BRAND = useBrand();
  if (!BRAND.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}`}
      target="_blank"
      rel="noreferrer noopener"
      data-fab
      aria-label={label}
      title={label}
      className={cx(
        "group fixed bottom-5 right-5 z-[200] grid h-[52px] w-[52px] place-items-center",
        "rounded-full bg-whatsapp text-white shadow-fab",
        "transition-[transform,background-color] duration-[250ms]",
        "hover:scale-[1.08] hover:bg-whatsapp-dark",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-whatsapp"
      )}
    >
      <IconBrandWhatsapp className="h-7 w-7" stroke={2} aria-hidden="true" />
    </a>
  );
}
