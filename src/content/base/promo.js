/* The on-load promo / seasonal-update pop-up. `SECTIONS.promoPopup` in
   config/sections.js is the master switch — this is what it shows once
   that's on.

   `id` is what gates the "already seen this one" flag in localStorage (see
   PromoPopup.jsx): change it whenever the promotion itself changes, and
   everyone sees the new one once, even those who dismissed an older id.
   `null` (or an unset `SECTIONS.promoPopup`) means nothing shows at all.

   `cta.to` is any in-app route — the popup closes itself when it's clicked,
   same as picking a country in LocationPrompt does.

   ⚠ This is placeholder copy, not a real live promotion. Replace it with
   the actual campaign before switching SECTIONS.promoPopup on for prod. */
export const PROMO = {
  id: "example-2026-01",
  eyebrow: "What's on",
  heading: "New sessions are",
  mark: "open for registration.",
  body: "A fresh round of classes, workshops and gatherings just went live — save your place before they fill up.",
  cta: { label: "See what's on", to: "/events" },
  dismiss: "Maybe later",
};

export default PROMO;
