import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP, reduced } from "../motion/setup";
import { clinic, messages, nav, themes } from "../data/clinic";
import { Logo } from "./Logo";
import { SectionLink } from "./links";
import { IconArrow, IconDown, ThemeIcon, WhatsAppButton } from "./ui";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [mobThemes, setMobThemes] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef(false);
  menuRef.current = menuOpen;

  // fecha menus ao trocar de página
  useEffect(() => { setMenuOpen(false); setDd(false); }, [pathname]);

  // trava a rolagem com o menu aberto
  useEffect(() => {
    const html = document.documentElement;
    if (menuOpen) { html.style.overflow = "hidden"; window.__lenis?.stop(); }
    else { html.style.overflow = ""; window.__lenis?.start(); }
    return () => { html.style.overflow = ""; };
  }, [menuOpen]);

  // esconde ao descer / mostra ao subir + estado "scrolled"
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const qy = gsap.quickTo(el, "yPercent", { duration: 0.6, ease: "silk" });
    const st = ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        el.dataset.scrolled = y > 40 ? "true" : "false";
        if (menuRef.current) return;
        const focusInside = el.matches(":focus-within");
        if (y < 160 || focusInside) qy(0);
        else qy(self.direction === 1 ? -140 : 0);
      },
    });
    return () => st.kill();
  }, { scope: ref });

  // tom claro/escuro conforme a seção que está sob o cabeçalho
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const active = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? active.add(e.target) : active.delete(e.target)));
      el.dataset.tone = active.size ? "dark" : "light";
    }, { rootMargin: "0px 0px -94% 0px" });
    const scan = () => document.querySelectorAll('[data-theme="dark"]').forEach((n) => io.observe(n));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [pathname]);

  // dropdown: fecha com Esc / clique fora
  useEffect(() => {
    if (!dd) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDd(false);
    const onDoc = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest("[data-dd]")) setDd(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDoc);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onDoc); };
  }, [dd]);

  const linkCls = "ulink inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-[0.9rem] text-ink/85 transition-colors duration-300 hover:text-ink xl:text-[0.95rem] group-data-[tone=dark]/header:text-ivory/85 group-data-[tone=dark]/header:hover:text-ivory";

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ivory focus:px-5 focus:py-3 focus:text-wine">Pular para o conteúdo</a>
      <header
        ref={ref}
        data-scrolled="false"
        data-tone="light"
        data-menu-open={menuOpen ? "true" : "false"}
        className="group/header fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,color] duration-700 data-[scrolled=true]:bg-cream/85 data-[scrolled=true]:shadow-[0_1px_0_rgb(146_108_62/0.14)] data-[scrolled=true]:backdrop-blur-xl data-[tone=dark]:data-[scrolled=true]:bg-wine-deep/80 data-[tone=dark]:data-[scrolled=true]:shadow-[0_1px_0_rgb(216_192_154/0.18)] data-[menu-open=true]:!bg-cream data-[menu-open=true]:shadow-[0_1px_0_rgb(146_108_62/0.14)]"
      >
        <div className="container-site flex h-[5.5rem] items-center justify-between gap-6 transition-[height] duration-700 ease-[var(--ease-silk)] lg:h-[6.25rem] group-data-[scrolled=true]/header:h-[4.25rem] lg:group-data-[scrolled=true]/header:h-[4.75rem]">
          <Link to="/" aria-label={`${clinic.displayName}, psicóloga — início`} className="text-ink transition-colors duration-700 group-data-[tone=dark]/header:text-ivory group-data-[menu-open=true]/header:!text-ink">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8 min-[1400px]:gap-10">
              {nav.map((n) =>
                n.dropdown ? (
                  <li key={n.id} className="relative" data-dd onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
                    <button type="button" aria-expanded={dd} aria-haspopup="true" onClick={() => setDd((v) => !v)} className={linkCls}>
                      {n.label}
                      <IconDown className={`size-3.5 transition-transform duration-500 ${dd ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`absolute left-1/2 top-full w-[35rem] -translate-x-[42%] pt-3 transition-[opacity,visibility,translate] duration-500 ease-[var(--ease-silk)] ${dd ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                      <div className="rounded-[1.5rem] border border-bronze/15 bg-ivory p-4 shadow-card">
                        <ul className="grid grid-cols-2 gap-1">
                          {themes.map((t) => (
                            <li key={t.slug}>
                              <Link to={`/terapia/${t.slug}`} onClick={() => setDd(false)} className="flex items-center gap-3 rounded-xl p-3 text-ink transition-colors duration-300 hover:bg-linen">
                                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-bronze/20 bg-cream text-bronze"><ThemeIcon name={t.icon} className="size-5" /></span>
                                <span className="text-[0.95rem] leading-snug">{t.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 border-t border-bronze/15 px-3 pt-3">
                          <SectionLink id="como-ajudo" onClick={() => setDd(false)} className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-wine">
                            Ver todos os temas <IconArrow className="size-4" />
                          </SectionLink>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={n.id} className={n.xlOnly ? "hidden xl:block" : undefined}>
                    <SectionLink id={n.id} className={linkCls}>{n.label}</SectionLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <WhatsAppButton message={messages.header} source="header" className="whitespace-nowrap group-data-[tone=dark]/header:!bg-ivory group-data-[tone=dark]/header:!text-wine group-data-[tone=dark]/header:!shadow-none">
                Agendar conversa
              </WhatsAppButton>
            </div>
            <button type="button" aria-expanded={menuOpen} aria-controls="menu-mobile" onClick={() => setMenuOpen((v) => !v)} className="grid size-11 place-items-center rounded-full text-ink group-data-[tone=dark]/header:text-ivory group-data-[menu-open=true]/header:!text-ink lg:hidden">
              <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* menu mobile */}
      <div id="menu-mobile" role="dialog" aria-label="Menu" hidden={!menuOpen} data-lenis-prevent className="fixed inset-0 z-40 overflow-y-auto bg-cream px-5 pb-10 pt-28 sm:px-10 lg:hidden">
        <nav aria-label="Principal">
          <ul className="flex flex-col divide-y divide-bronze/15 border-y border-bronze/15">
            {nav.map((n) =>
              n.dropdown ? (
                <li key={n.id}>
                  <button type="button" aria-expanded={mobThemes} onClick={() => setMobThemes((v) => !v)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-ink">
                    <span className="block font-display text-[2rem] leading-none">{n.label}</span>
                    <IconDown className={`size-5 text-bronze transition-transform duration-500 ${mobThemes ? "rotate-180" : ""}`} />
                  </button>
                  <div className="acc" data-open={mobThemes ? "true" : "false"}>
                    <div {...(!mobThemes ? { inert: "" as any } : {})}>
                      <ul className={`grid gap-x-4 pb-5 transition-opacity duration-500 sm:grid-cols-2 ${mobThemes ? "opacity-100" : "opacity-0"}`}>
                        {themes.map((t) => (
                          <li key={t.slug}>
                            <Link to={`/terapia/${t.slug}`} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center gap-3 py-1.5 text-[1.05rem] text-ink">
                              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-bronze/20 bg-ivory text-bronze"><ThemeIcon name={t.icon} className="size-5" /></span>
                              {t.label}
                            </Link>
                          </li>
                        ))}
                        <li className="sm:col-span-2">
                          <SectionLink id="como-ajudo" onClick={() => setMenuOpen(false)} className="mt-1 flex min-h-12 items-center gap-2.5 text-[1.0625rem] font-medium text-wine">
                            Ver todos os temas <IconArrow className="size-4" />
                          </SectionLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={n.id}>
                  <SectionLink id={n.id} onClick={() => setMenuOpen(false)} className="flex items-center justify-between gap-4 py-5 text-ink">
                    <span className="block font-display text-[2rem] leading-none">{n.label}</span>
                    <span aria-hidden className="text-base text-bronze">→</span>
                  </SectionLink>
                </li>
              )
            )}
          </ul>
        </nav>
        <div className="mt-10 flex flex-col gap-4">
          <WhatsAppButton message={messages.header} source="menu-mobile" size="lg" magnetic={false}>Agendar conversa no WhatsApp</WhatsAppButton>
          <p className="text-center text-[0.9375rem] text-muted">{clinic.role} {clinic.fullName} · {clinic.registry}</p>
        </div>
      </div>
    </>
  );
}
