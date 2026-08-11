import { useScrollAnimations } from "../../hooks/useGsap.js";
import Hero from "../../components/Hero/Hero.jsx";
import Charity from "../../components/Charity/Charity.jsx";
import Difference from "../../components/Difference/Difference.jsx";
import TakeAction from "../../components/TakeAction/TakeAction.jsx";
import News from "../../components/News/News.jsx";
import Events from "../../components/Events/Events.jsx";

export default function Home() {
  useScrollAnimations();
  return (
    <main>
      <Hero />
      <Charity />
      <Difference />
      <TakeAction />
      <News />
      <Events />
    </main>
  );
}
