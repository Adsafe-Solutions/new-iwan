import { useScrollAnimations } from "../hooks/useGsap.js";
import Hero from "../components/Hero.jsx";
import { Charity, Difference, TakeAction, News } from "../components/Sections.jsx";

export default function Home() {
  useScrollAnimations();
  return (
    <main>
      <Hero />
      <Charity />
      <Difference />
      <TakeAction />
      <News />
    </main>
  );
}
