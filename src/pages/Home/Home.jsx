import { useScrollAnimations } from "../../hooks/useGsap.js";
import Hero from "../../components/Hero/Hero.jsx";
import HeroV2 from "../../components/HeroV2/HeroV2.jsx";
import { SECTIONS } from "../../config/sections.js";
import TrustedBy from "../../components/TrustedBy/TrustedBy.jsx";
import {
  useCopy,
  useHero,
  useNav,
  useProgrammes,
} from "../../content/ContentProvider.jsx";
import Pillars from "../../components/Pillars/Pillars.jsx";
import TakeAction from "../../components/TakeAction/TakeAction.jsx";
import Events from "../../components/Events/Events.jsx";
import Testimonials from "../../components/Testimonials/Testimonials.jsx";
import Instagram from "../../components/Instagram/Instagram.jsx";
import Faq from "../../components/Faq/Faq.jsx";

/* Who Iwan is → what it stands for → what it runs → what's on →
   what members say → what it looks like.

   Three components are deliberately parked, each one import away from
   coming back:
     News       — every item is invented press copy about worldwide
                  offices Iwan does not have.
     Difference — a donor appeal ladder ("sponsor an orphan from $75 a
                  month"), which is not what Iwan does.
     Contact    — the closing "get in touch" band. It owned id="contact",
                  so the header and hero CTAs now go to mailto: instead.
                  It is also the only place the social accounts appeared. */
export default function Home() {
  const { programmeMarks } = useHero();
  const { trustedBy, comingSoon } = useCopy();
  const { pages } = useNav();
  const { content: PROGRAMMES_CONTENT } = useProgrammes();
  useScrollAnimations();

  /* a mark whose programme has no content in this country (still in the
     nav, just nulled — see content/ca and App.jsx's ComingSoon routing)
     shows "Coming soon" here instead of its short label, so this band
     matches what clicking through the mark actually finds. */
  const marks = programmeMarks.map((m) => {
    const page = pages.find((p) => p.mark === m.id);
    const running = !page || PROGRAMMES_CONTENT[page.path.replace("/", "")];
    return running ? m : { ...m, label: comingSoon.badge };
  });

  return (
    <main>
      {SECTIONS.homeHero === "v2" ? <HeroV2 /> : <Hero />}
      <TrustedBy {...trustedBy} items={marks} />
      <Pillars />
      <TakeAction />
      <Events />
      <Instagram />
      <Faq />
      <Testimonials />
    </main>
  );
}
