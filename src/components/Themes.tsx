import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP, MQ, scrollToY } from "../motion/setup";
import { messages, themes, themesIntro } from "../data/clinic";
import { Eyebrow, GhostLotus, IconArrow, Lotus, SplitHeading, ThemeIcon, WhatsAppButton, lotusHide, rich } from "./ui";

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function Wheel({ name, initial }: { name: string; initial: number }) {
  return (
    <span className="relative block h-[1.6em] overflow-hidden pr-[0.06em]">
      <span data-wheel={name} className="flex flex-col text-left transition-transform duration-700 ease-[var(--ease-silk)]" style={{ transform: `translateY(-${10 * initial}%)` }}>
        {digits.map((d) => (<span key={d} className="block h-[1.6em] leading-[1.6em]">{d}</span>))}
      </span>
    </span>
  );
}

export function Themes() {
  const ref = useRef<HTMLElement>(null);
  const total = themes.length + 1;

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const track = el.querySelector<HTMLElement>("[data-track]")!;
    const list = el.querySelector<HTMLElement>("[data-list]")!;
    const head = el.querySelector<HTMLElement>("[data-head]")!;
    const bar = el.querySelector<HTMLElement>("[data-bar]")!;
    const tens = el.querySelector<HTMLElement>("[data-wheel='tens']");
    const units = el.querySelector<HTMLElement>("[data-wheel='units']");
    const prev = el.querySelector<HTMLElement>("[data-nav='prev']");
    const next = el.querySelector<HTMLElement>("[data-nav='next']");
    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);
    const n = cards.length;
    if (!track || !list || !bar) return;

    const setBar = gsap.quickSetter(bar, "scaleX");
    let cur = 1;
    const setIdx = (i: number) => {
      const c = gsap.utils.clamp(1, total, i);
      if (c === cur) return;
      cur = c;
      if (tens) tens.style.transform = `translateY(-${10 * Math.floor(c / 10)}%)`;
      if (units) units.style.transform = `translateY(-${(c % 10) * 10}%)`;
    };
    const setProgress = (p: number, idx: number) => { setBar(1 / n + (1 - 1 / n) * gsap.utils.clamp(0, 1, p)); setIdx(idx); };

    /* timeline de entrada de cada card */
    const entrance = new Map<HTMLElement, gsap.core.Timeline>();
    const build = (card: HTMLElement) => {
      const art = card.querySelector<HTMLElement>("article");
      const inner = card.querySelector<HTMLElement>("[data-card-inner]");
      const tl = gsap.timeline({ paused: true, onComplete: () => { art && gsap.set(art, { clearProps: "clipPath" }); } });
      if (art) { gsap.set(art, { clipPath: "circle(0% at 50% 100%)" }); tl.fromTo(art, { clipPath: "circle(0% at 50% 100%)" }, { clipPath: "circle(140% at 50% 100%)", duration: 1.9, ease: "power3.inOut" }); }
      if (inner) tl.fromTo(inner, { scale: 1.1, transformOrigin: "50% 100%" }, { scale: 1, duration: 2.1 }, 0);
      if (card.hasAttribute("data-card-final")) {
        const petals = card.querySelectorAll("[data-final-lotus] .lotus-petal, [data-final-lotus] .lotus-rule");
        const dot = card.querySelector("[data-final-lotus] .lotus-dot");
        const its = card.querySelectorAll("[data-final-item]");
        tl.fromTo(petals, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", duration: 1.5, stagger: 0.1, ease: "breath" }, 0.55);
        if (dot) tl.fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.8, ease: "back.out(2)" }, 1.2);
        tl.fromTo(its, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.7);
      }
      return tl;
    };
    const play = (card: HTMLElement, delay = 0) => { const t = entrance.get(card); if (!t || t.progress() >= 1) return; t.delay(delay).restart(true); };
    const onFocusIn = (e: FocusEvent) => { try { const c = (e.target as HTMLElement).closest("[data-card]") as HTMLElement | null; const t = c && entrance.get(c); if (t && t.progress() < 1) t.progress(1); } catch {} };
    el.addEventListener("focusin", onFocusIn);
    const movingTimer = gsap.delayedCall(0.2, () => list.removeAttribute("data-moving")).pause();

    const mm = gsap.matchMedia();
    mm.add({ reel: `${MQ.desktopPin} and ${MQ.motion}`, motion: MQ.motion, fine: MQ.fine }, (ctx) => {
      const { reel, motion, fine } = ctx.conditions as any;
      const cleanups: (() => void)[] = [];

      if (reel) {
        el.dataset.reel = "on";
        let vw = el.clientWidth, L = 0, lefts: number[] = [];
        const dist = () => Math.max(0, track.scrollWidth - el.clientWidth);
        const measure = () => { vw = el.clientWidth; L = dist(); lefts = cards.map((c) => c.offsetLeft); };
        measure();
        if (motion) cards.forEach((c) => entrance.set(c, build(c)));
        const tween = gsap.to(track, {
          x: () => -dist(), ease: "none",
          onUpdate() {
            const p = this.progress(), tx = -L * p, thr = 0.58 * vw;
            let idx = 1;
            for (let i = 0; i < n; i++) if (lefts[i] + tx < thr) idx = i + 1;
            setProgress(p, idx);
          },
          scrollTrigger: {
            trigger: el, start: "top top", end: () => "+=" + Math.round(0.8 * dist()), pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true, onRefresh: measure,
            onUpdate: () => { if (!list.hasAttribute("data-moving")) list.setAttribute("data-moving", ""); movingTimer.restart(true); },
          },
        });
        const st = tween.scrollTrigger!;
        gsap.fromTo(head, { xPercent: 0, opacity: 1 }, { xPercent: 20, opacity: 0, ease: "none", scrollTrigger: { trigger: head, containerAnimation: tween, start: () => `left ${head.offsetLeft}px`, end: "right left", scrub: true, invalidateOnRefresh: true } });
        cards.forEach((c, i) => {
          if (motion) {
            if (lefts[i] < 0.92 * vw) ScrollTrigger.create({ trigger: el, start: "top 68%", once: true, onEnter: () => play(c, 0.15 + 0.16 * i) });
            else ScrollTrigger.create({ trigger: c, containerAnimation: tween, start: "left 90%", once: true, onEnter: () => play(c) });
          }
          const num = c.querySelector("[data-card-num]");
          if (num) gsap.fromTo(num, { xPercent: 26 }, { xPercent: -26, ease: "none", scrollTrigger: { trigger: c, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        });
        const onFocus = (e: FocusEvent) => {
          const c = (e.target as HTMLElement).closest("[data-card]") as HTMLElement | null;
          if (!c) return;
          const x = Number(gsap.getProperty(track, "x")) || 0;
          const left = c.offsetLeft + x;
          const y = window.scrollY;
          if (y >= st.start - 1 && y <= st.end + 1 && left >= 24 && left + c.offsetWidth <= vw - 24) return;
          const center = (vw - c.offsetWidth) / 2;
          const prog = gsap.utils.clamp(0, 1, (c.offsetLeft - center) / L);
          scrollToY(st.start + prog * (st.end - st.start));
        };
        track.addEventListener("focusin", onFocus);
        cleanups.push(() => { track.removeEventListener("focusin", onFocus); list.removeAttribute("data-moving"); delete el.dataset.reel; });
      } else {
        const sync = () => {
          const max = list.scrollWidth - list.clientWidth, sl = list.scrollLeft, base = cards[0]?.offsetLeft ?? 0;
          let idx = 1, best = Infinity;
          cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft - base - sl); if (d < best) { best = d; idx = i + 1; } });
          setProgress(max > 0 ? sl / max : 0, idx);
          prev?.setAttribute("aria-disabled", String(sl <= 2));
          next?.setAttribute("aria-disabled", String(sl >= max - 2));
        };
        list.addEventListener("scroll", sync, { passive: true });
        window.addEventListener("resize", sync);
        sync();
        if (motion) {
          cards.forEach((c) => entrance.set(c, build(c)));
          ScrollTrigger.create({ trigger: list, start: "top 82%", once: true, onEnter: () => cards.forEach((c, i) => play(c, 0.14 * i)) });
        }
        cleanups.push(() => { list.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); });
      }

      /* marca-d'água do lótus redesenha ao passar o mouse */
      if (fine && motion) {
        cards.forEach((c, i) => {
          const art = c.querySelector("article");
          const petals = c.querySelectorAll("[data-watermark] .lotus-petal");
          if (!art || !petals.length) return;
          const draw = () => { if (list.hasAttribute("data-moving")) return; gsap.fromTo(petals, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", duration: 1.6, stagger: 0.09, ease: "breath", overwrite: true }); };
          art.addEventListener("pointerenter", draw);
          cleanups.push(() => art.removeEventListener("pointerenter", draw));
        });
      }
      return () => cleanups.forEach((f) => f());
    });

    return () => { el.removeEventListener("focusin", onFocusIn); movingTimer.kill(); mm.revert(); setProgress(0, 1); entrance.clear(); };
  }, { scope: ref });

  const scrollBy = (dir: number) => {
    const el = ref.current;
    const list = el?.querySelector<HTMLElement>("[data-list]");
    const card = list?.querySelector<HTMLElement>("[data-card]");
    const btn = el?.querySelector<HTMLElement>(`[data-nav='${dir > 0 ? "next" : "prev"}']`);
    if (!list || !card || btn?.getAttribute("aria-disabled") === "true") return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    list.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} id="como-ajudo" aria-labelledby="como-ajudo-title" className="help relative overflow-x-clip bg-cream py-24 sm:py-32 lg:py-40">
      <GhostLotus className="-bottom-[16%] -right-[22%] w-[34rem] sm:w-[48rem] lg:-right-[10%] lg:w-[56rem]" />
      <div data-track className="help-track">
        <div className="container-site help-head-wrap">
          <div data-head className="max-w-3xl">
            <Eyebrow number={themesIntro.eyebrow.number} label={themesIntro.eyebrow.label} />
            <SplitHeading as="h2" className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02]">
              <span id="como-ajudo-title">{rich(themesIntro.title)}</span>
            </SplitHeading>
            <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.75] text-text">{themesIntro.text}</p>
          </div>
        </div>

        <ul data-list className="help-list" id="lista-temas">
          {themes.map((t, i) => (
            <li key={t.slug} data-card className="help-card cq relative">
              <article aria-labelledby={`tema-${t.slug}`} className="help-card-article arch group/card relative flex h-full flex-col overflow-hidden bg-ivory shadow-card">
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(70%_60%_at_50%_0%,var(--color-linen),transparent)]" />
                <span aria-hidden className="pointer-events-none absolute inset-2.5 rounded-t-[calc(50cqw-0.625rem)] rounded-b-[1.45rem] border border-bronze/15" />
                <div data-watermark aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-[9%] flex justify-center text-bronze opacity-0 transition-opacity duration-700 ease-[var(--ease-silk)]">
                  <Lotus className="w-[70%]" strokeWidth={1.2} />
                </div>
                <div data-card-inner className="relative flex h-full flex-col items-center px-6 pb-5 pt-11 text-center sm:px-8">
                  <span data-card-num aria-hidden className="font-display text-[2.9rem] font-normal italic leading-none text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <ThemeIcon name={t.icon} className="mt-4 size-7 text-bronze" />
                  <h3 id={`tema-${t.slug}`} className="mt-5 font-sans text-[0.78rem] font-medium uppercase leading-snug tracking-[0.22em] text-bronze-deep">{t.label}</h3>
                  <p className="mt-3 text-balance font-display text-[1.65rem] font-medium leading-[1.1] text-ink">{rich(t.title)}</p>
                  <p className="mt-4 text-[1.0625rem] leading-[1.62] text-text">{t.text}</p>
                  <div className="mt-auto flex w-full flex-col items-center gap-1 pt-6">
                    <span aria-hidden className="mb-4 flex items-center gap-2 text-bronze/45"><span className="h-px w-7 bg-current" /><span className="size-1 rounded-full bg-current" /><span className="h-px w-7 bg-current" /></span>
                    <WhatsAppButton message={messages.theme(t.label.toLowerCase())} source={`tema-${t.slug}`} variant="outline" className="!h-auto min-h-12 w-full py-2.5 text-center leading-snug" magnetic={false}>{t.cta}</WhatsAppButton>
                    <Link to={`/terapia/${t.slug}`} className="ulink mt-2 inline-flex items-center gap-2 py-1.5 text-[0.95rem] font-medium text-wine">
                      Saiba mais<span className="sr-only"> sobre {t.label}</span> <IconArrow className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}

          <li data-card data-card-final className="help-card cq relative">
            <article aria-labelledby="tema-outros" className="help-card-article arch relative flex h-full flex-col overflow-hidden bg-wine-deep text-ivory shadow-card">
              <div data-card-inner className="grain relative flex h-full flex-col items-center justify-center px-6 pb-8 pt-12 text-center sm:px-8">
                <div data-final-lotus aria-hidden className="w-[46%] text-gold-soft"><Lotus withBase strokeWidth={1.5} className="h-auto w-full" /></div>
                <h3 id="tema-outros" data-final-item className="mt-8 text-balance font-display text-[1.75rem] font-medium leading-[1.1] text-ivory">{themesIntro.more.title}</h3>
                <p data-final-item className="mt-4 text-[1.0625rem] leading-[1.62] text-ivory/80">{themesIntro.more.text}</p>
                <div data-final-item className="mt-7 w-full">
                  <WhatsAppButton message={messages.general} source="tema-outros" variant="light" className="w-full" magnetic={false}>{themesIntro.more.cta}</WhatsAppButton>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>

      <div className="help-controls container-site">
        <div className="flex items-center gap-5 sm:gap-8">
          <p aria-hidden className="flex shrink-0 items-baseline gap-2 font-display text-[1.4rem] italic leading-none text-bronze">
            <span className="inline-flex"><Wheel name="tens" initial={0} /><Wheel name="units" initial={1} /></span>
            <span className="text-bronze/50">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </p>
          <div aria-hidden className="relative h-px flex-1 bg-bronze/20">
            <div data-bar className="absolute inset-0 origin-left bg-bronze" style={{ transform: `scaleX(${1 / total})` }} />
          </div>
          <div data-nav-buttons data-float-avoid className="flex shrink-0 gap-2.5">
            {(["prev", "next"] as const).map((d) => (
              <button key={d} type="button" data-nav={d} aria-controls="lista-temas" aria-disabled={d === "prev"} aria-label={d === "prev" ? "Ver tema anterior" : "Ver próximo tema"} onClick={() => scrollBy(d === "prev" ? -1 : 1)} className="grid size-11 place-items-center rounded-full border border-bronze/35 text-bronze transition-[background-color,color,border-color,opacity] duration-500 ease-[var(--ease-silk)] hover:border-wine hover:bg-wine hover:text-ivory aria-disabled:pointer-events-none aria-disabled:opacity-35">
                <IconArrow className={`size-5 ${d === "prev" ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
