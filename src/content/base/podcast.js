/* The podcast, transcribed from the live iwan.community/podcast page.

   One show and one episode is all that is published today. `episodes` is a
   list so more can be added without touching the page.

   ⚠ `audio` streams from Podbean and `cover` from Podbean's image CDN, the
   same hosts the live page uses — a rename there breaks them here. The file
   is ~5.5MB at 128kbps, so the player loads it with preload="none" and
   fetches nothing until someone presses play. */
export const PODCAST = {
  title: "iwan.community",
  description:
    "iwan.community is a vibrant podcast channel connecting individuals through shared stories, insights, and discussions.",
  cover:
    "https://i0.wp.com/pbcdn1.podbean.com/imglogo/image-logo/20023143/iwan_logo.png?ssl=1",

  episodes: [
    {
      id: "coco",
      title: "CoCo",
      /* the live page shows "Iwan podcast by iwan.community" under the player */
      author: "iwan.community",
      audio: "https://mcdn.podbean.com/mf/web/rjb9zcaa6ic27epa/Coco_2017.mp3",
      /* seconds. Kept here so the player can show the running time without
         downloading anything — see AudioPlayer. */
      length: 348,
    },
  ],
};

export default PODCAST;
