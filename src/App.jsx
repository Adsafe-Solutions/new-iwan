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

/* Lives inside the router so it can read the route. Owns the single scroll
   listener for the chrome — the topbar and header both derive from it, so they
   can never visually desync. */
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

  /* On the home route the chrome floats over the hero photo. It stays fixed
     even once solid, so it never re-enters flow and shifts the page. */
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
