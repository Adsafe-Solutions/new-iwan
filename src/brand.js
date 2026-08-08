/* Single source of truth for brand identity. Anything naming or picturing the
   organisation reads from here — components, page copy, meta tags. */
export const BRAND = {
  name: "Iwan",
  fullName: "iwan.community",

  heading: "Iwan",
  subheading: "Bringing hope, support and brighter futures to those in need.",

  /* logo is the dark lockup for light backgrounds; logoLight is the reversed
     one for the hero header and footer. Brand.jsx falls back to a whitened
     `logo` if logoLight is missing. */
  logo: "/brand-logo.webp",
  logoLight: "/brand-logo-light.webp",
  footerLogo: "/brand-logo-light.webp",

  email: "info@iwan.community",
  domain: "iwan.community",
};

export default BRAND;
