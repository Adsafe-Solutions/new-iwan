/* Real photographs from iwan.community, named once so a caption and a picture
   cannot drift apart.

   ⚠ `?w=1200` is NOT optional. The originals are 8–9MB camera JPEGs, and
   i0.wp.com (Jetpack's CDN) answers 429 when several full-size ones are pulled
   at once — the same rule the blog images already follow.

   ⚠ Each of these is a photograph of a REAL session, so it can only be used
   where that session is what is being shown. The live site publishes no Iwan
   Women or Iwan Men session photograph, so those two heroes borrow a picture
   off the CDN rather than claiming a session that did not happen — do not
   caption either as a photograph of that programme. */
const live = (path) =>
  `https://i0.wp.com/www.iwan.community/wp-content/uploads/${path}?w=1200`;

/* ⚠ Two hosts, and both are the live site. `cdn.iwan.community` serves the
   newer exports directly; the older ones come through i0.wp.com, Jetpack's
   CDN, which is the one that needs the width parameter. */
export const PROGRAMME_PHOTOS = {
  youth: "https://cdn.iwan.community/iwan-youth-fitness-2.webp",
  kids: live("2025/11/DSC05966.jpg"),
  men: "https://cdn.iwan.community/iwan-youth-0.webp",
  women: "https://cdn.iwan.community/iwan-kids-3.webp",
};

export const PHOTOS = {
  /* ── Iwan Youth ─────────────────────────────────────────────────────── */
  youthCursorWorkshop: live("2025/10/WhatsApp-Image-2025-10-25-at-11.04.24_b1d6663b.jpg"),
  youthEmotionalGranularity: live("2025/11/DSC05944-1.jpg"),
  youthFinancialLiteracy: live(
    "2025/11/WhatsApp-Image-2025-11-15-at-01.48.55_9feb00fc.jpg"
  ),
  youthBuildingHabits: live("2025/11/DSC06064.jpg"),
  youthMentalModels: live("2025/12/WhatsApp-Image-2025-12-01-at-14.44.01_fc4d96b4.jpg"),
  youthLeadershipAtHome: live("2026/02/WhatsApp-Image-2026-02-09-at-12.57.05-PM.jpeg"),

  /* ── Iwan Kids ──────────────────────────────────────────────────────── */
  kidsGlassPainting: live("2025/11/DSC05966.jpg"),
  kidsScienceCentre: live("2025/11/WhatsApp-Image-2025-11-05-at-15.15.51_9739df76.jpg"),
  kidsCooking: live("2025/11/DSC06096.jpg"),

  /* ── community sessions, not tied to one programme ──────────────────── */
  communityMakkahToMadinah: live("2026/02/WhatsApp-Image-2026-02-22-at-9.12.58-PM.jpeg"),
  communityBattleOfBadr: live("2026/03/WhatsApp-Image-2026-03-01-at-7.31.22-PM.jpeg"),
};

export default PHOTOS;
