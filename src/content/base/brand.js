import logo from "../../assests/logos/brand-main-logo.webp";
import logoLight from "../../assests/logos/brand-main-logo-light.webp";

/* Single source of truth for brand identity. Anything naming or picturing the
   organisation reads from here — components, page copy, meta tags. */
export const BRAND = {
  name: "Iwan",
  fullName: "iwan.community",

  heading: "Iwan",
  subheading: "A Muslim community in Bangalore. Believe, act, serve thrive.",

  /* logo is the dark lockup for light backgrounds; logoLight is the reversed
     one for the hero header and footer. Brand.jsx falls back to a whitened
     `logo` if logoLight fails to load — it no longer does now that both
     files exist, but the fallback stays as a safety net. */
  logo,
  logoLight,
  footerLogo: logoLight,

  email: "info@iwan.community",
  domain: "iwan.community",

  /* ⚠ digits only, country code first — wa.me rejects spaces and "+".
     Transcribed from the live Iwan Youth page; VERIFY before launch. */
  whatsapp: "916360049969",

  /* The same number written the way it is read aloud. `whatsapp` cannot double
     as this — wa.me rejects the spacing — and a country that only sets one of
     the two would show its own number in one place and India's in the other,
     so both are overridden together. Every phone number the site displays
     comes from here. */
  phone: "+91 63600 049969",

  /* ⚠ Also transcribed from the live Iwan Youth page — VERIFY.
     The one address the site shows: the contact page, the programme contact
     panel, and the map fallback in the event modal all read it, so a wrong
     value here shows the wrong place on a map. */
  address: "6 Church Rd, Kanakapura, Basavanagudi, Bengaluru, Karnataka 560004",

  /* Live accounts. `icon` picks the glyph drawn in Contact.jsx. */
  socials: [
    {
      label: "Instagram",
      icon: "instagram",
      href: "https://instagram.com/iwan.community/",
    },
    { label: "X", icon: "x", href: "https://x.com/iwan__community" },
    { label: "YouTube", icon: "youtube", href: "https://youtube.com/@iwan.community" },
    {
      label: "Facebook",
      icon: "facebook",
      href: "https://facebook.com/the.iwan.community",
    },
  ],
};

export default BRAND;
