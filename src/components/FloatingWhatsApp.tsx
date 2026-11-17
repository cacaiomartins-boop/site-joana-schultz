import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { messages, waLink } from "../data/clinic";
import { IconWhats, track } from "./ui";

/** Botão flutuante: aparece depois do hero, some sobre CTAs/rodapé e muda de tom sobre seções escuras. */
export function FloatingWhatsApp() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);
  const { pathname } = useLocation();
  const flags = useRef({ scrolled: false, avoid: false, footer: false, menu: false });

  useEffect(() => {
    const f = flags.current;
    const update = () => setShow(f.scrolled && !f.avoid && !f.footer && !f.menu);

    const onScroll = () => { f.scrolled = window.scrollY > Math.max(400, window.innerHeight * 0.7); update(); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const avoid = new Set<Element>(), dk = new Set<Element>();
    const ioAvoid = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? avoid.add(e.target) : avoid.delete(e.target))); f.avoid = avoid.size > 0; update(); }, { rootMargin: "-66% 0px 0px 0px" });
    const ioDark = new IntersectionObserver((es) => { es.forEach((e) => (e.isIntersecting ? dk.add(e.target) : dk.delete(e.target))); setDark(dk.size > 0); }, { rootMargin: "-85% 0px 0px 0px" });
    const ioFooter = new IntersectionObserver((es) => { f.footer = es[es.length - 1]?.isIntersecting ?? false; update(); }, { rootMargin: "0px 0px -4% 0px" });

    const scan = () => {
      document.querySelectorAll("[data-float-avoid]").forEach((n) => ioAvoid.observe(n));
      document.querySelectorAll('[data-theme="dark"]').forEach((n) => ioDark.observe(n));
      const foot = document.querySelector("[data-site-footer]");
      if (foot) ioFooter.observe(foot);
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const poll = window.setInterval(() => { f.menu = document.documentElement.style.overflow === "hidden"; update(); }, 400);
    return () => { window.removeEventListener("scroll", onScroll); ioAvoid.disconnect(); ioDark.disconnect(); ioFooter.disconnect(); mo.disconnect(); window.clearInterval(poll); };
  }, [pathname]);

  return (
    <a
      ref={ref}
      href={waLink(messages.header)}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp="flutuante"
      data-tone={dark ? "dark" : "light"}
      onClick={() => track("flutuante")}
      aria-label="Agendar conversa pelo WhatsApp (abre em nova aba)"
      className={`group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex h-[3.625rem] items-center rounded-full text-ivory transition-[background-color,color,box-shadow,opacity,transform] duration-500 ease-[var(--ease-silk)] focus-visible:outline-offset-4 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-6 lg:h-[3.75rem] ${dark ? "bg-ivory !text-wine hover:bg-cream" : "bg-wine shadow-wine hover:bg-wine-deep"} ${show ? "visible translate-y-0 opacity-100" : "invisible translate-y-3 opacity-0"}`}
    >
      <span aria-hidden className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-[0.95rem] font-medium opacity-0 transition-[max-width,padding,opacity] duration-500 ease-[var(--ease-silk)] group-hover:max-w-[11rem] group-hover:pl-6 group-hover:opacity-100 group-focus-visible:max-w-[11rem] group-focus-visible:pl-6 group-focus-visible:opacity-100">
        Agendar conversa
      </span>
      <span aria-hidden className="grid size-[3.625rem] shrink-0 place-items-center lg:size-[3.75rem]">
        <IconWhats className="size-[1.65rem]" />
      </span>
    </a>
  );
}
