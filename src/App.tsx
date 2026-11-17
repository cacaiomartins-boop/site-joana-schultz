import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ScrollTrigger, initLenis } from "./motion/setup";
import { Loader } from "./components/Loader";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Home } from "./pages/Home";
import { ThemePage } from "./pages/ThemePage";
import { Privacy } from "./pages/Privacy";

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const go = () => {
      ScrollTrigger.refresh();
      if (hash) {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY;
          if (window.__lenis) window.__lenis.scrollTo(y, { immediate: false, duration: 1.2 });
          else window.scrollTo(0, y);
          return;
        }
      }
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };
    const t = window.setTimeout(go, 120);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  useEffect(() => {
    const off = initLenis();
    if (!window.__introDone) window.__lenis?.stop();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => { off(); window.removeEventListener("load", refresh); };
  }, []);

  return (
    <>
      <Loader />
      <Header />
      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terapia/:slug" element={<ThemePage />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <RouteEffects />
    </>
  );
}
