import { useScrollAnimations } from "../../hooks/useGsap.js";
import Hero from "../../components/Hero/Hero.jsx";
import HeroV2 from "../../components/HeroV2/HeroV2.jsx";
import { SECTIONS } from "../../config/sections.js";
import TrustedBy from "../../components/TrustedBy/TrustedBy.jsx";
import { PROGRAMME_MARKS } from "../../config/heroLogos.js";
import Pillars from "../../components/Pillars/Pillars.jsx";
import TakeAction from "../../components/TakeAction/TakeAction.jsx";
import Events from "../../components/Events/Events.jsx";
import Testimonials from "../../components/Testimonials/Testimonials.jsx";
import Instagram from "../../components/Instagram/Instagram.jsx";

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
  useScrollAnimations();
  return (
    <main>
      {SECTIONS.homeHero === "v2" ? <HeroV2 /> : <Hero />}
      <TrustedBy
        eyebrow="One community, four programmes"
        headingLines={["We're a", { mark: "community-led" }, "Muslim organisation."]}
        items={PROGRAMME_MARKS}
      />
      <Pillars />
      <TakeAction />
      <Events />
      <Testimonials />
      <Instagram />
    </main>
  );
}
