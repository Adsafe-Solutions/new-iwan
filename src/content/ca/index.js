/* Canada runs all four programmes in nav, but only Youth and Men have real
   Canadian content today — Kids and Women stay in the nav (so the tile,
   the route and the homepage link all still exist) with their
   `programmes.content` entry nulled. That makes `Programme` render nothing,
   so App.jsx's routing falls through to the `Placeholder` stub instead — the
   same "this page is coming soon" treatment every other unbuilt page gets,
   using each programme's own nav intro rather than India's Bangalore-specific
   copy. See ../ops.js for `null`-deletes-a-key. */
import feed from "./instagram-feed.json";

const instagramUrl = "https://www.instagram.com/iwan.community.canada?utm_source=qr";

export default {
  brand: {
    socials: (socials) =>
      socials.map((social) => {
        if (social.icon === "instagram") return { ...social, href: instagramUrl };
        if (social.icon === "facebook") {
          return {
            ...social,
            href: "https://www.facebook.com/share/17JTta6ADU/?mibextid=wwXIfr",
          };
        }
        return social;
      }),
  },
  instagram: {
    handle: "@iwan.community.canada",
    url: instagramUrl,
    posts: (feed.posts ?? []).map((post) => ({
      img: post.img,
      href: post.href,
      label: post.caption
        ? `Instagram post: ${post.caption}`
        : "View this post on Instagram",
    })),
    isLive: (feed.posts ?? []).length > 0,
  },
  programmes: { content: { "iwan-kids": null, "iwan-women": null } },
};

/* ⚠ Everything else is still inherited from India — the Bangalore address, the
   +91 WhatsApp number, the "started in Bangalore in 2020" story.

   Events are the exception: they live in one list in base/events.js and carry
   their own `country`, so Canada shows only the ones tagged for it rather than
   inheriting India's.

   Nothing above has been invented; these are the keys that need real Canadian
   values before this country is shown publicly:

     brand.address        · the map fallback in the event modal reads this
     brand.whatsapp       · digits only, country code first
     brand.email          · if it differs
     programmes.contact   · phone + address on Youth and Men's programme pages
     programmes.content   · Youth and Men's copy, if Canada's differs; Kids and
                             Women stay "coming soon" until there is real content
     testimonials         · ⚠ real quotes from real people — never invent these
*/
