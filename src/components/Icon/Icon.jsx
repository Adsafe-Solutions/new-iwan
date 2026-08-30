import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconAward,
  IconBook,
  IconBulb,
  IconCalendarEvent,
  IconClock,
  IconCompass,
  IconHeart,
  IconHeartHandshake,
  IconRoute,
  IconSparkles,
  IconTargetArrow,
  IconTool,
  IconTrendingUp,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";

/* Icons come from @tabler/icons-react. They are imported by name so Vite
   tree-shakes the rest of the set out of the bundle — never do a namespace
   import here, the full pack is several thousand components.

   The indirection is worth keeping: config files refer to icons by these
   short names, so swapping the underlying set again is a change to this
   map alone rather than to every entry in programmes.js. */
const ICONS = {
  people: IconUsersGroup,
  calendar: IconCalendarEvent,
  clock: IconClock,
  hands: IconHeartHandshake,
  growth: IconTrendingUp,
  compass: IconCompass,
  route: IconRoute,
  spark: IconSparkles,
  bulb: IconBulb,
  book: IconBook,
  target: IconTargetArrow,
  tool: IconTool,
  award: IconAward,
  heart: IconHeart,
  globe: IconWorld,
  /* the four accounts on brand.js — `icon` there names one of these */
  instagram: IconBrandInstagram,
  x: IconBrandX,
  youtube: IconBrandYoutube,
  facebook: IconBrandFacebook,
};

/* Tabler ships at stroke 2, which is the weight these are drawn for —
   thinner reads washed out at the sizes we use them, especially in the
   lighter programme colours. */
export default function Icon({ name, className = "h-6 w-6", strokeWidth = 2 }) {
  const Glyph = ICONS[name] ?? ICONS.spark;
  return <Glyph className={className} stroke={strokeWidth} aria-hidden="true" />;
}
