import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "../motion/setup";
import { psychoeducation as pe } from "../data/clinic";
import { Eyebrow, Lotus, Reveal, SplitHeading, WhatsAppButton, rich } from "./ui";

export function Psychoeducation() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 1 });
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl.fromTo(el.querySelectorAll("[data-pe-frame]"), { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 1.6, ease: "breath", stagger: 0.12 })
        .fromTo(el.querySelectorAll("[data-pe-inner]"), { scale: 1.2 }, { scale: 1, duration: 2.1, stagger: 0.12 }, 0);
    });
    return () => mm.revert();
  }, { scope: ref });

  useEffect(() => {
    if (open === null) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    window.__lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % pe.cards.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + pe.cards.length) % pe.cards.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = "";
      window.__lenis?.start();
      lastFocus.current?.focus();
    };
  }, [open]);

  return (
    <section id="psicoeducacao" data-theme="dark" aria-labelledby="pe-titulo" className="grain relative overflow-x-clip bg-wine-deep py-24 text-ivory sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute -right-[10%] -top-[20%] size-[46rem] rounded-full bg-[radial-gradient(closest-side,rgba(98,140,112,0.3),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[6rem] -left-[8rem] w-[32rem] text-gold-soft opacity-[0.07]"><Lotus strokeWidth={1.2} className="h-auto w-full" /></div>
      <div className="container-site relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <header className="lg:col-span-7">
            <Eyebrow number={pe.eyebrow.number} label={pe.eyebrow.label} tone="light" />
            <SplitHeading as="h2" className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] !text-ivory sm:mt-8"><span id="pe-titulo">{rich(pe.title, "italic text-gold-soft")}</span></SplitHeading>
          </header>
          <Reveal className="lg:col-span-5" y={24}><p className="max-w-[28rem] text-[1.0625rem] leading-[1.75] text-ivory/80">{pe.text}</p></Reveal>
        </div>

        <div ref={ref} data-reveal className="mt-14 lg:mt-20">
          <ul className="grid gap-6 sm:grid-cols-2">
            {pe.cards.map((c, i) => (
              <li key={c.title}>
                <button type="button" onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }} className="group block w-full text-left" aria-label={`Ampliar: ${c.title}`}>
                  <div data-pe-frame className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-ivory shadow-card">
                    <div data-pe-inner className="absolute inset-0"><img src={c.src} alt={c.alt} loading="lazy" className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-silk)] group-hover:scale-[1.03]" /></div>
                    <span aria-hidden className="absolute bottom-3 right-3 rounded-full bg-wine-deep/85 px-3.5 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">Ampliar</span>
                  </div>
                  <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-gold-soft">{c.tag}</p>
                  <h3 className="mt-1.5 font-display text-[1.65rem] font-medium leading-[1.1] !text-ivory">{c.title}</h3>
                  <p className="mt-2 text-[1rem] leading-[1.6] text-ivory/75">{c.text}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-14" y={24}><WhatsAppButton message={pe.ctaMessage} source="psicoeducacao" variant="light">{pe.cta}</WhatsAppButton></Reveal>
      </div>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={pe.cards[open].title} data-lenis-prevent className="fixed inset-0 z-[90] grid place-items-center bg-wine-deep/90 p-3 backdrop-blur-sm sm:p-8" onClick={() => setOpen(null)}>
          <div className="relative max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={pe.cards[open].src} alt={pe.cards[open].alt} className="max-h-[85svh] w-full rounded-2xl bg-ivory object-contain shadow-card" />
            <button ref={closeRef} type="button" onClick={() => setOpen(null)} className="absolute -top-3 right-0 grid size-11 -translate-y-full place-items-center rounded-full bg-ivory text-wine shadow-soft sm:-right-3 sm:-top-3 sm:translate-y-0" aria-label="Fechar">
              <span aria-hidden className="text-2xl leading-none">×</span>
            </button>
            <div className="mt-4 flex items-center justify-between gap-4 text-ivory">
              <button type="button" onClick={() => setOpen((open - 1 + pe.cards.length) % pe.cards.length)} className="rounded-full border border-ivory/30 px-5 py-2.5 text-[0.95rem] hover:border-ivory">← Anterior</button>
              <span className="text-[0.9rem] text-ivory/70">{open + 1} / {pe.cards.length}</span>
              <button type="button" onClick={() => setOpen((open + 1) % pe.cards.length)} className="rounded-full border border-ivory/30 px-5 py-2.5 text-[0.95rem] hover:border-ivory">Próximo →</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
