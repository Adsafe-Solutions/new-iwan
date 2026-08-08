import "./components.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Zakat from "./pages/Zakat.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Topbar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zakat" element={<Zakat />} />
      </Routes>
      <Footer />
      <ThemeSwitcher />
    </BrowserRouter>
  );
}
