import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Zakat from "./pages/Zakat/Zakat.jsx";
import Placeholder from "./pages/Placeholder/Placeholder.jsx";
import Programme from "./pages/Programme/Programme.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import EventsPage from "./pages/Events/Events.jsx";
import EventDetail from "./pages/EventDetail/EventDetail.jsx";
import About from "./pages/About/About.jsx";
import BlogsPage from "./pages/Blogs/Blogs.jsx";
import BlogPost from "./pages/BlogPost/BlogPost.jsx";
import { SECTIONS } from "./config/sections.js";
import { DEFAULT_COUNTRY, basenameFor, countryFromPath } from "./config/countries.js";
import ContentProvider, { useNav, useProgrammes } from "./content/ContentProvider.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher.jsx";
import WhatsAppFab from "./components/WhatsAppFab/WhatsAppFab.jsx";
import LocationPrompt from "./components/LocationPrompt/LocationPrompt.jsx";

/* Nav entries that have a page of their own rather than the shared programme
   template or the stub. Keyed by path so a country that drops the entry drops
   the route with it. */
const PAGES = {
  "/events": EventsPage,
  "/blogs": BlogsPage,
  "/about-us": About,
};

function Shell() {
  const { pages } = useNav();
  const { content: PROGRAMMES_CONTENT } = useProgrammes();
  const [stuck, setStuck] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const { pathname } = useLocation();
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 10);
      setOverHero(window.scrollY < window.innerHeight - 80);
    };
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
  /* transparent for as long as the header sits on the hero photo, so the
     hero reads as one uninterrupted image; solid white once past it */
  const overlay = home && overHero;

  return (
    <>
      <ScrollToTop />
      {SECTIONS.topbar && <Topbar overlay={overlay} hidden={home && stuck} />}
      <Header stuck={stuck} overlay={overlay} pinned={home} hidden={heroV2 && !stuck} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zakat" element={<Zakat />} />
        {/* the default country carries no prefix, so /in/… is a real URL
            people will try — send it to the unprefixed one rather than
            leaving a page that matches nothing */}
        <Route
          path={`/${DEFAULT_COUNTRY}/*`}
          element={<Navigate to={stripDefaultPrefix()} replace />}
        />
        {/* a nav page with an entry in programmes.js gets the full
            programme template; everything else stays a stub */}
        {pages.map((page) => {
          const Own = PAGES[page.path];
          return (
            <Route
              key={page.path}
              path={page.path}
              element={
                Own ? (
                  <Own />
                ) : PROGRAMMES_CONTENT[page.path.replace("/", "")] ? (
                  <Programme page={page} />
                ) : (
                  <Placeholder title={page.label} intro={page.intro} />
                )
              }
            />
          );
        })}
        {/* each event's and post's own page, only where its listing exists */}
        {pages.some((p) => p.path === "/events") && (
          <Route path="/events/:slug" element={<EventDetail />} />
        )}
        {pages.some((p) => p.path === "/blogs") && (
          <Route path="/blogs/:slug" element={<BlogPost />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ThemeSwitcher />
      <WhatsAppFab />
      <LocationPrompt />
    </>
  );
}

const stripDefaultPrefix = () =>
  window.location.pathname.replace(new RegExp(`^/${DEFAULT_COUNTRY}`), "") || "/";

/* The country lives in the URL, and the default country has no prefix: India
   is `/iwan-youth`, Canada is `/ca/iwan-youth`. Handing that prefix to the
   router as its `basename` means every <Link to="/…"> and <Route path="/…">
   in the app is written without it and still lands in the right country.
   basename is fixed for the life of the router, which is why switching
   country is a full page load — see ContentProvider. */
export default function App() {
  const country = countryFromPath(window.location.pathname);

  return (
    <BrowserRouter basename={basenameFor(country)}>
      <ContentProvider country={country}>
        <Shell />
      </ContentProvider>
    </BrowserRouter>
  );
}
