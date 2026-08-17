import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Zakat from "./pages/Zakat/Zakat.jsx";
import Placeholder from "./pages/Placeholder/Placeholder.jsx";
import Programme from "./pages/Programme/Programme.jsx";
import { NAV_PAGES } from "./config/navPages.js";
import { PROGRAMMES_CONTENT } from "./config/programmes.js";
import { SECTIONS } from "./config/sections.js";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.jsx";
import WhatsAppFab from "./components/WhatsAppFab/WhatsAppFab.jsx";

function Shell() {
  const [stuck, setStuck] = useState(false);
  const { pathname } = useLocation();
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* the hero's top padding and the overlaid header's offset are both measured
     from the topbar, so its height has to collapse when it's switched off */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--topbar-h",
      SECTIONS.topbar ? "34px" : "0px"
    );
  }, []);

  /* The v2 hero is a full-bleed mark on a photograph with nothing else on
     it, so the header is held back until the page is scrolled. It then
     arrives solid rather than overlaid — there is no hero copy left for it
     to sit over. */
  const heroV2 = home && SECTIONS.homeHero === "v2";

  /* `pinned` stays on for the whole home route, not just while overlaid — the
     chrome must never re-enter flow mid-scroll or the page jolts. */
  const overlay = home && !stuck && !heroV2;

  return (
    <>
      <ScrollToTop />
      {SECTIONS.topbar && <Topbar overlay={overlay} hidden={home && stuck} />}
      <Header stuck={stuck} overlay={overlay} pinned={home} hidden={heroV2 && !stuck} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zakat" element={<Zakat />} />
        {/* a nav page with an entry in programmes.js gets the full
            programme template; everything else stays a stub */}
        {NAV_PAGES.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={
              PROGRAMMES_CONTENT[page.path.replace("/", "")] ? (
                <Programme page={page} />
              ) : (
                <Placeholder title={page.label} intro={page.intro} />
              )
            }
          />
        ))}
      </Routes>
      <Footer />
      <ThemeSwitcher />
      <WhatsAppFab />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
