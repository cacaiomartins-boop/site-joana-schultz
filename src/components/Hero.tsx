import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, SplitText, useGSAP, MQ, onIntroDone } from "../motion/setup";
import { clinic, hero, messages } from "../data/clinic";
import { GhostLotus, IconDown, ThemeIcon, WhatsAppButton, rich } from "./ui";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = ref.current;
    if (!root) return;
    const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s);
    const qa = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));

    /* ---------- sublinhado feito à mão sob o último trecho em itálico ---------- */
    const underline = q<SVGSVGElement>("[data-hero-underline]");
    const title = q("[data-hero-title]");
    const place = () => {
      const em = title?.querySelector("em:last-of-type");
      const box = underline?.parentElement;
      if (!em || !underline || !box) return;
      const rects = em.getClientRects();
      const r = rects[rects.length - 1];
      const o = box.getBoundingClientRect();
      const fs = parseFloat(getComputedStyle(em).fontSize) || 60;
      Object.assign(underline.style, {
        left: `${r.left - o.left - 0.08 * fs}px`,
        top: `${r.top - o.top + 0.78 * r.height}px`,
        width: `${r.width + 0.16 * fs}px`,
        height: `${0.27 * fs}px`,
      });
    };
    const ro = typeof ResizeObserver !== "undefined" && title ? new ResizeObserver(place) : null;
    if (title) ro?.observe(title);
    document.fonts?.ready.then(place);
    place();

    const showAll = () => {
      gsap.set(qa("[data-reveal]"), { autoAlpha: 1 });
      gsap.set(qa("[data-hero-frame]"), { clipPath: "none" });
      gsap.set(qa("[data-hero-media]"), { scale: 1, filter: "none" });
      gsap.set(qa("[data-arc-path], [data-underline-path]"), { drawSVG: "100%", visibility: "visible" });
      gsap.set(qa("[data-hero-underline]"), { autoAlpha: 1 });
    };

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", showAll);

    /* ---------- entrada ---------- */
    mm.add(MQ.motion, () => {
      const cue = q("[data-cue-arrow]");
      const bounce = cue ? gsap.to(cue, { y: 4, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true }) : null;
      let split: SplitText | null = null;
      let done = false;
      const st = ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: (s) => bounce && (s.isActive ? bounce.resume() : bounce.pause()) });

      const run = () => {
        try {
          const frame = q("[data-hero-frame]");
          const media = q("[data-hero-media]");
          const eyebrow = q<HTMLElement>("[data-hero-eyebrow]");
          const tl = gsap.timeline({ defaults: { ease: "silk" }, onComplete: () => { done = true; } });
          gsap.set(qa("[data-hero-text] [data-reveal], [data-hero-stage] [data-reveal], [data-hero-cue]"), { autoAlpha: 1 });
          if (frame) tl.fromTo(frame, { clipPath: "inset(38% 22% 0% 22% round 50cqw 50cqw 32px 32px)" }, { clipPath: "inset(0% 0% 0% 0% round 50cqw 50cqw 32px 32px)", duration: 1.6, ease: "breath" }, 0).set(frame, { clipPath: "none" }, 1.6);
          if (media) tl.fromTo(media, { scale: 1.16 }, { scale: 1, duration: 2.2 }, 0).fromTo(media, { filter: "blur(14px)" }, { filter: "blur(0px)", duration: 1.6, ease: "power2.out" }, 0).set(media, { filter: "none" }, 1.6);
          tl.fromTo("[data-hero-shadow]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 }, 0.2);
          tl.fromTo("[data-hero-ghost]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.4, ease: "breath" }, 0.2);
          if (eyebrow) {
            const cs = getComputedStyle(eyebrow);
            const fs = parseFloat(cs.fontSize) || 12;
            const ls = cs.letterSpacing;
            const start = `${0.5 * fs}px`;
            const h = eyebrow.offsetHeight;
            const old = eyebrow.style.letterSpacing;
            eyebrow.style.letterSpacing = start;
            const fits = eyebrow.offsetHeight === h;
            eyebrow.style.letterSpacing = old;
            const useLS = ls !== "normal" && fits;
            tl.fromTo(eyebrow, useLS ? { autoAlpha: 0, letterSpacing: start } : { autoAlpha: 0, x: -14 }, { autoAlpha: 1, ...(useLS ? { letterSpacing: ls } : { x: 0 }), duration: 1.6, ease: "power3.out", clearProps: "letterSpacing,transform" }, 0.15);
            tl.fromTo("[data-eb-line]", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 1.2 }, 0.15);
          }
          tl.fromTo("[data-arc-path]", { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.9, ease: "power2.inOut" }, 0.55)
            .set("[data-hero-arc]", { autoAlpha: 1 }, 0.55)
            .fromTo("[data-arc-dot]", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.8, ease: "back.out(2)" }, 1.35);
          tl.fromTo("[data-hero-sub]", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.95)
            .fromTo(["[data-hero-ctas]", "[data-hero-cred]"], { y: 14 }, { y: 0, duration: 1.5, stagger: 0.08, clearProps: "transform" }, 0.05)
            .fromTo("[data-hero-card]", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.12 }, 1.25);
          const paths = qa("[data-underline-path]");
          if (underline && paths.length) {
            tl.set(underline, { autoAlpha: 1 }, 1.5);
            paths.forEach((p, i) => {
              const at = 1.5 + 0.22 * i;
              tl.fromTo(p, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut" }, at).fromTo(p, { visibility: "hidden" }, { visibility: "visible", duration: 0.01, ease: "none" }, at);
            });
          }
          const cueLine = q("[data-cue-line]");
          if (cueLine) tl.fromTo(cueLine, { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 1.4 }, 1.6);
          tl.fromTo("[data-cue-body]", { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 1.1 }, 1.95);

          const h1 = q<HTMLElement>("[data-hero-title]");
          if (h1) {
            split = SplitText.create(h1, {
              type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
              onSplit: (self: any) => {
                gsap.set(h1, { autoAlpha: 1 });
                place();
                if (done) { gsap.set(self.lines, { yPercent: 0, rotate: 0 }); return; }
                return gsap.from(self.lines, { yPercent: 140, rotate: 2, transformOrigin: "0% 100%", duration: 1.3, stagger: 0.12, delay: 0.35, ease: "silk", onComplete: place });
              },
            });
          }
        } catch (e) { showAll(); }
      };
      const cancel = onIntroDone(run);
      return () => { cancel(); split?.revert(); st.kill(); bounce?.kill(); };
    });

    /* ---------- parallax na rolagem (desktop) ---------- */
    mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
      const portrait = q("[data-hero-portrait]");
      const text = q("[data-hero-text]");
      const cue = q("[data-hero-cue]");
      const cards = qa("[data-hero-card]");
      const tl = gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true } });
      if (portrait) tl.to(portrait, { yPercent: 10, scale: 1.05 }, 0);
      tl.to([text, cue].filter(Boolean) as HTMLElement[], { y: () => -0.14 * (text?.offsetHeight ?? 0) }, 0);
      cards.forEach((c, i) => tl.to(c, { yPercent: -(4 + 3 * i) }, 0));
    });

    /* ---------- parallax do mouse (ponteiro fino) ---------- */
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const media = q("[data-hero-media]");
      if (!media) return;
      const qx = gsap.quickTo(media, "xPercent", { duration: 1.8, ease: "power3.out" });
      const qy = gsap.quickTo(media, "yPercent", { duration: 1.8, ease: "power3.out" });
      let active = true;
      const st = ScrollTrigger.create({ trigger: root, start: "top top", end: "bottom top", onToggle: (s) => (active = s.isActive) });
      active = st.isActive || window.scrollY < root.offsetHeight;
      const move = (e: PointerEvent) => { if (!active) return; qx(-(1.6 * (e.clientX / window.innerWidth - 0.5))); qy(-(1.2 * (e.clientY / window.innerHeight - 0.5))); };
      window.addEventListener("pointermove", move, { passive: true });
      return () => { window.removeEventListener("pointermove", move); st.kill(); };
    });

    return () => { ro?.disconnect(); mm.revert(); };
  }, { scope: ref });

  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-title" className="relative isolate flex flex-col overflow-clip pb-14 pt-[6.75rem] sm:pt-[8rem] lg:min-h-[100svh] lg:pt-[6.5rem] lg:pb-8">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-cream)_0%,var(--color-cream)_55%,var(--color-blush)_150%)]" />
      <div data-hero-ghost aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GhostLotus className="-left-[14%] top-[2%] w-[46rem]" />
        <GhostLotus className="-right-[12%] bottom-[-8%] w-[38rem]" />
      </div>

      <div className="container-site relative grid flex-1 grid-cols-1 lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:gap-x-10">
        {/* ---------- texto ---------- */}
        <div data-hero-text className="relative lg:col-start-1 lg:row-start-1 lg:self-center">
          <p data-hero-eyebrow data-reveal className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.3em] text-bronze sm:text-[0.75rem]">
            <span data-eb-line aria-hidden className="mr-1 h-px w-8 bg-current opacity-60 sm:w-14" />
            {hero.eyebrow.map((e, i) => (
              <span key={e} className="inline-flex items-center gap-3 whitespace-nowrap">
                {e}
                {i < hero.eyebrow.length - 1 && (<><span aria-hidden className="size-[3px] rounded-full bg-current opacity-70" /><span className="sr-only">, </span></>)}
              </span>
            ))}
          </p>

          <div className="relative mt-6 sm:mt-8 lg:mt-[clamp(1.25rem,3.6svh,2rem)]">
            <h1 id="hero-title" data-hero-title data-reveal className="max-w-[7em] font-display text-[clamp(2.6rem,11.5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.015em] text-ink lg:text-[clamp(2.9rem,min(5.6vw,9svh),5.75rem)]">
              {rich(hero.title)}
            </h1>
            <svg data-hero-underline aria-hidden viewBox="0 0 400 26" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none invisible absolute left-0 top-0 h-4 w-40 overflow-visible text-bronze">
              <path data-underline-path d="M3 17.2C64 11.4 142 8.2 220 8.8c62 .5 118 3.5 177 8.6" strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
              <path data-underline-path d="M54 21.8c78-4.6 164-6.2 262-3.2" strokeWidth="1.25" opacity=".5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <p data-hero-sub data-reveal className="mt-6 max-w-[30rem] text-[1.0625rem] leading-[1.7] text-text sm:mt-8 sm:text-[1.15rem] lg:mt-[clamp(1.25rem,3.4svh,2rem)]">{hero.subtitle}</p>

          <div data-hero-ctas className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:mt-[clamp(1.25rem,3.6svh,2.25rem)]">
            <WhatsAppButton message={messages.general} source="hero" size="lg" icon="arrow" className="w-full sm:w-auto">{hero.primary}</WhatsAppButton>
            <a href="#processo" className="ulink inline-flex items-center justify-center py-2 text-[1rem] font-medium text-wine">{hero.secondary}</a>
          </div>

          <p data-hero-cred className="mt-6 text-[0.9375rem] leading-[1.6] tracking-[0.01em] text-muted lg:mt-[clamp(1rem,2.6svh,1.5rem)]">
            <span className="block">{clinic.role} {clinic.fullName} · {clinic.registry}</span>
            <span className="block">Online e presencial em {clinic.district}, {clinic.city}</span>
          </p>
        </div>

        {/* ---------- foto em arco ---------- */}
        <div data-hero-stage className="relative mx-auto mt-12 w-full max-w-[30rem] [--arc-d:0.75rem] sm:[--arc-d:1.25rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:ml-auto lg:w-[min(100%,32rem,calc((100svh-18rem)*0.8))] lg:min-w-[20rem] lg:self-center lg:[--arc-d:1.5rem]">
          <div data-hero-portrait className="cq relative aspect-[4/5] w-full lg:will-change-transform">
            <div data-hero-shadow data-reveal aria-hidden className="absolute inset-x-[10%] -bottom-5 h-14 rounded-[50%] bg-bronze-deep/25 blur-2xl" />
            <div data-hero-arc data-reveal aria-hidden className="pointer-events-none absolute -inset-[var(--arc-d)] text-bronze">
              <svg viewBox="0 0 100 125" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                <path data-arc-path d="M1.2 124V50.5A48.8 48.8 0 0 1 98.8 50.5V124" vectorEffect="non-scaling-stroke" opacity=".55" />
              </svg>
              <span data-arc-dot className="absolute bottom-0 right-0 size-2 rounded-full bg-bronze" />
            </div>
            <div data-hero-frame className="arch absolute inset-0 overflow-hidden bg-sand">
              <div data-hero-media className="absolute inset-0">
                <img src={hero.image.src} alt={hero.image.alt} {...({ fetchpriority: "high" } as any)} width={341} height={341} className="size-full object-cover object-[50%_18%]" />
              </div>
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(79,29,39,0.28))]" />
              <div aria-hidden className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25" />
            </div>
          </div>

          <ul data-hero-cards aria-label="Temas que trabalho" className="no-scrollbar mt-8 flex snap-x gap-3 overflow-x-auto pb-2 lg:absolute lg:inset-x-2 lg:-bottom-7 lg:mt-0 lg:gap-2 lg:overflow-visible lg:pb-0">
            {hero.cards.map((c, i) => (
              <li key={c.title} data-hero-card data-reveal className={`w-[17.25rem] shrink-0 snap-start lg:w-auto lg:min-w-0 lg:flex-1`}>
                <Link to={`/terapia/${c.slug}`} className="group flex items-center gap-3 rounded-2xl border border-white/60 bg-ivory/90 p-3.5 pr-4 lg:flex-col lg:gap-1.5 lg:p-2.5 lg:text-center shadow-soft backdrop-blur-md transition-[translate,box-shadow] duration-700 ease-[var(--ease-silk)] hover:-translate-y-1 hover:shadow-card">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-bronze/20 bg-cream text-bronze lg:size-8"><ThemeIcon name={c.icon} className="size-5 lg:size-4" /></span>
                  <span className="min-w-0">
                    <span className="block font-display text-[1.2rem] font-medium leading-tight text-ink lg:text-[0.95rem]">{c.title}</span>
                    <span className="mt-0.5 block text-[0.85rem] leading-snug text-text lg:hidden">{c.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- cue de rolagem ---------- */}
        <a data-hero-cue data-reveal href="#espelho" className="group mt-6 flex w-fit flex-col items-start self-start rounded-full sm:mt-10 lg:[@media(max-height:800px)]:hidden lg:col-start-1 lg:row-start-2 lg:mt-[clamp(0.5rem,2svh,1.25rem)]">
          <span data-cue-line aria-hidden className="mb-3 ml-[1.375rem] hidden h-10 w-px bg-bronze/40 sm:block" />
          <span data-cue-body className="flex items-center gap-3 text-[0.9rem] text-muted transition-colors duration-500 group-hover:text-ink">
            <span aria-hidden className="grid size-11 place-items-center rounded-full border border-bronze/35 text-bronze"><span data-cue-arrow><IconDown className="size-4" /></span></span>
            {hero.scrollCue}
          </span>
        </a>
      </div>
    </section>
  );
}
