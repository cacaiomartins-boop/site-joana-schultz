import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, reduced, MQ, scrollToY } from "../motion/setup";
import { clinic, footer, messages, nav, themes } from "../data/clinic";
import { SectionLink } from "./links";
import { IconArrow, IconWhats, Lotus, WhatsAppButton, lotusHide } from "./ui";

function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || !window.matchMedia(MQ.fine).matches || reduced()) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
    const clamp = gsap.utils.clamp(-12, 12);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx(clamp((e.clientX - (r.left + r.width / 2)) * 0.28));
      qy(clamp((e.clientY - (r.top + r.height / 2)) * 0.35));
    };
    const leave = () => { qx(0); qy(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, { scope: ref });
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        const focusTop = () => (document.querySelector("header a[href], #conteudo") as HTMLElement | null)?.focus({ preventScroll: true });
        if (window.__lenis) window.__lenis.scrollTo(0, { duration: 2.4, onComplete: focusTop });
        else { window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); window.setTimeout(focusTop, reduced() ? 0 : 900); }
      }}
      className="group inline-flex min-h-11 items-center gap-3.5 rounded-full text-[0.9375rem] text-ivory/80 transition-colors duration-500 ease-[var(--ease-silk)] hover:text-ivory focus-visible:outline-gold-soft"
    >
      <span>Voltar ao topo</span>
      <span aria-hidden className="grid size-11 place-items-center rounded-full border border-gold-soft/40 transition-colors duration-500 group-hover:border-gold-soft">
        <IconArrow className="size-4 -rotate-90" />
      </span>
    </button>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();
  const letters = clinic.displayName.toUpperCase().split("");

  useGSAP(() => {
    const root = ref.current;
    if (!root || reduced()) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
      const { desktop } = ctx.conditions as any;
      const panel = root.querySelector("[data-footer-panel]");
      if (panel)
        gsap.fromTo(panel,
          { clipPath: desktop ? "inset(0% 4% 0% 4% round 6rem 6rem 0rem 0rem)" : "inset(0% 3% 0% 3% round 3.5rem 3.5rem 0rem 0rem)" },
          { clipPath: desktop ? "inset(0% 0% 0% 0% round 2.5rem 2.5rem 0rem 0rem)" : "inset(0% 0% 0% 0% round 1.75rem 1.75rem 0rem 0rem)", ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "clamp(top 30%)", scrub: true } });
      const wm = root.querySelector("[data-wordmark]");
      if (wm) {
        lotusHide(wm);
        gsap.set(wm.querySelectorAll(".lotus-rule"), { autoAlpha: 1 });
        gsap.timeline({ scrollTrigger: { trigger: wm, start: "top bottom", end: "clamp(bottom bottom)", scrub: 1.2 } })
          .to(wm.querySelectorAll(".lotus-petal"), { autoAlpha: 1, drawSVG: "0% 100%", duration: 0.9, stagger: 0.08, ease: "none" }, 0)
          .fromTo(wm.querySelectorAll("[data-wm-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.out" }, 0.15)
          .fromTo(wm.querySelectorAll("[data-wm-dot]"), { scale: 0 }, { scale: 1, duration: 0.35, ease: "back.out(2)" }, 0.3)
          .fromTo(wm.querySelectorAll("[data-wm-char]"), { yPercent: 108 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "power2.out" }, 0.35);
      }
    });
    return () => mm.revert();
  }, { scope: ref });

  const colTitle = "mb-5 text-[0.75rem] font-medium uppercase tracking-[0.3em] text-gold-soft";
  const colLink = "inline-block py-1 text-[0.98rem] text-ivory/80 transition-colors duration-500 hover:text-ivory";

  return (
    <footer ref={ref} data-site-footer className="relative">
      <div data-footer-panel data-theme="dark" className="grain relative overflow-hidden bg-wine-deep text-ivory">
        <div aria-hidden className="pointer-events-none absolute -left-[10%] -top-[30%] size-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(112,42,55,0.55),transparent)]" />
        <div className="container-site relative pb-10 pt-20 sm:pt-24 lg:pt-28">
          <div className="flex flex-col gap-10 border-b border-gold-soft/20 pb-14 sm:flex-row sm:items-end sm:justify-between">
            <p className="font-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[1.04] text-ivory">
              {footer.tagline.split(/\*(.+?)\*/g).map((p, i) => (i % 2 ? <em key={i} className="italic text-gold-soft">{p}</em> : <span key={i}>{p}</span>))}
            </p>
            <WhatsAppButton message={messages.header} source="rodape" variant="light" size="lg">Agendar conversa</WhatsAppButton>
          </div>

          <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <nav aria-label="Navegação do rodapé" className="lg:col-span-2">
              <h2 className={colTitle}>Navegação</h2>
              <ul>
                {nav.map((n) => (<li key={n.id}><SectionLink id={n.id} className={colLink}>{n.label}</SectionLink></li>))}
              </ul>
            </nav>
            <nav aria-label="Temas" className="lg:col-span-4 xl:col-span-3">
              <h2 className={colTitle}>Temas</h2>
              <ul className="grid gap-x-6 sm:grid-cols-2">
                {themes.map((t) => (<li key={t.slug}><Link to={`/terapia/${t.slug}`} className={colLink}>{t.label}</Link></li>))}
              </ul>
            </nav>
            <div className="lg:col-span-3 xl:col-span-4">
              <h2 className={colTitle}>Contato</h2>
              <ul className="space-y-3 text-[0.98rem] text-ivory/80">
                <li><a href={`https://wa.me/${clinic.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 transition-colors hover:text-ivory"><IconWhats className="size-5 text-gold-soft" />WhatsApp {clinic.phoneDisplay}</a></li>
                <li>{clinic.address.street ? `${clinic.address.street} · ` : ""}{clinic.district} · {clinic.city}/{clinic.state}</li>
                {clinic.hours.summary && <li>{clinic.hours.summary}</li>}
              </ul>
            </div>
            <div className="lg:col-span-3 xl:col-span-3">
              <h2 className={colTitle}>Atendimento</h2>
              <ul className="space-y-2 text-[0.98rem] text-ivory/80">
                {footer.attend.map((a) => (<li key={a}>{a}</li>))}
              </ul>
            </div>
          </div>

          {/* nome gigante */}
          <div data-wordmark aria-hidden className="relative select-none py-6">
            <div className="flex items-center justify-center gap-4 text-gold-soft">
              <span data-wm-line className="h-px w-[18%] origin-right bg-gold-soft/40" />
              <span data-wm-dot className="size-1.5 rounded-full bg-gold-soft" />
              <Lotus className="h-10 w-auto sm:h-12" strokeWidth={2} />
              <span data-wm-dot className="size-1.5 rounded-full bg-gold-soft" />
              <span data-wm-line className="h-px w-[18%] origin-left bg-gold-soft/40" />
            </div>
            <div className="mt-4 flex justify-center overflow-hidden whitespace-pre font-display text-[clamp(1.6rem,7.4vw,6.5rem)] uppercase leading-[1.05] tracking-[0.12em] text-ivory/20">
              {letters.map((c, i) => (<span key={i} className="inline-block overflow-hidden"><span data-wm-char className="inline-block">{c === " " ? " " : c}</span></span>))}
            </div>
          </div>

          <p className="mt-8 text-center text-[0.9rem] text-ivory/70">{footer.emergency}</p>

          <div className="mt-10 flex flex-col gap-6 border-t border-gold-soft/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5 text-[0.9rem] text-ivory/70">
              <p>{clinic.role} {clinic.fullName} · {clinic.registry}</p>
              <p className="flex flex-wrap gap-x-5 gap-y-1">
                <a href={clinic.registryVerifyUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-gold-soft/40 underline-offset-4 hover:text-ivory">Verificar registro no CFP<span className="sr-only"> (abre em nova aba)</span></a>
                <Link to="/privacidade" className="underline decoration-gold-soft/40 underline-offset-4 hover:text-ivory">Política de privacidade</Link>
                <span>© {clinic.displayName} · {year}</span>
              </p>
            </div>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
