import "./components.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Zakat from "./pages/Zakat.jsx";
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

  /* `pinned` stays on for the whole home route, not just while overlaid — the
     chrome must never re-enter flow mid-scroll or the page jolts. */
  const overlay = home && !stuck;

  return (
    <>
      <ScrollToTop />
      <Topbar overlay={overlay} hidden={home && stuck} />
      <Header stuck={stuck} overlay={overlay} pinned={home} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zakat" element={<Zakat />} />
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
