import "./components.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Zakat from "./pages/Zakat.jsx";
import Placeholder from "./pages/Placeholder.jsx";
import { NAV_PAGES } from "./config/navPages.js";
import { SECTIONS } from "./config/sections.js";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";

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

  /* `pinned` stays on for the whole home route, not just while overlaid — the
     chrome must never re-enter flow mid-scroll or the page jolts. */
  const overlay = home && !stuck;

  return (
    <>
      <ScrollToTop />
      {SECTIONS.topbar && <Topbar overlay={overlay} hidden={home && stuck} />}
      <Header stuck={stuck} overlay={overlay} pinned={home} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zakat" element={<Zakat />} />
        {NAV_PAGES.map(({ label, path, intro }) => (
          <Route
            key={path}
            path={path}
            element={<Placeholder title={label} intro={intro} />}
          />
        ))}
      </Routes>
      <Footer />
      <ThemeSwitcher />
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
