/* Canada runs all four programmes in nav, but only Men has real Canadian
   content today — Kids, Women and Youth stay in the nav (so the tile,
   the route and the homepage link all still exist) with their
   `programmes.content` entry nulled. That makes `Programme` render nothing,
   so App.jsx's routing falls through to the `Placeholder` stub instead — the
   same "this page is coming soon" treatment every other unbuilt page gets,
   using each programme's own nav intro rather than India's Bangalore-specific
   copy. See ../ops.js for `null`-deletes-a-key. */
import feed from "./instagram-feed.json";

/* Canada's own accounts. X and YouTube are not overridden — those are shared,
   so they stay inherited rather than being restated here. */
const INSTAGRAM_URL = "https://www.instagram.com/iwan.community.canada?utm_source=qr";
/* The share link the team gave us (facebook.com/share/17JTta6ADU) is a
   redirect. brand.socials can use it, but the Page Plugin cannot — it needs
   the canonical page, which that link resolves to. */
const FACEBOOK_URL = "https://www.facebook.com/share/17JTta6ADU/?mibextid=wwXIfr";
const FACEBOOK_PAGE = "https://www.facebook.com/iwan.community.canada";

export default {
  /* Canada's own number and address. All three are overridden together: the
     digits feed wa.me and tel:, `phone` is what is printed, and every surface
     that shows either — the contact page, the programme "talk to us" panel,
     the WhatsApp button, the event modal's map fallback — reads them off
     brand, so this block is the whole change. */
  brand: {
    whatsapp: "12896254455",
    phone: "+1 (289) 625-4455",
    address: "1418-1423 Mississauga Vly Blvd, Mississauga, ON L5A 4A5",

    /* A function override is handed the base list and returns the new one, so
       only the two accounts that differ are named — X and YouTube keep their
       inherited hrefs. Replacing the array outright would mean restating all
       four here, and a new social added to base would then never reach Canada.
       The footer and the contact page both read brand.socials. */
    socials: (socials) =>
      socials.map((social) => {
        if (social.icon === "instagram") return { ...social, href: INSTAGRAM_URL };
        if (social.icon === "facebook") return { ...social, href: FACEBOOK_URL };
        return social;
      }),
  },

  /* The homepage wall's handle and its "view us on Instagram" link point at the
     Canadian account. `posts` are deliberately NOT overridden while
     ca/instagram-feed.json is still empty — an empty list would replace base's
     and leave the section blank. Once the workflow fills that file, the spread
     below starts using it and the wall goes live for Canada on its own. */
  facebook: { page: FACEBOOK_PAGE },

  instagram: {
    handle: "@iwan.community.canada",
    username: "iwan.community.canada",
    url: INSTAGRAM_URL,
    ...(feed.posts?.length
      ? {
          posts: feed.posts.map((post) => ({
            img: post.img,
            href: post.href,
            label: post.caption
              ? `Instagram post: ${post.caption}`
              : "View this post on Instagram",
          })),
          isLive: true,
        }
      : {}),
  },

  programmes: {
    content: { "iwan-kids": null, "iwan-women": null, "iwan-youth": null },
  },
};

/* ⚠ Everything else is still inherited from India — the "started in Bangalore
   in 2020" story included.

   Events, blogs, podcast and promo are the exception: nothing in content/base
   carries them, so Canada gets whatever the CMS publishes for `ca` and nothing
   else — there is no India content to inherit or override.

   Nothing above has been invented; these are the keys that need real Canadian
   values before this country is shown publicly:

     brand.email          · if it differs
     programmes.content   · Men's copy, if Canada's differs; Kids, Women and
                             Youth stay "coming soon" until there is real content
     testimonials         · ⚠ real quotes from real people — never invent these
*/
