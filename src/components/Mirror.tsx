import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ, scrollToY } from "../motion/setup";
import { messages, mirror } from "../data/clinic";
import { Eyebrow, Lotus, SplitHeading, WhatsAppButton, rich } from "./ui";

export function Mirror() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const qa = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const lines = qa("[data-mirror-line]");
    const markers = qa("[data-mirror-marker]");
    const lotus = el.querySelector<HTMLElement>("[data-mirror-lotus]");
    const petals = qa("[data-mirror-lotus] .lotus-petal");
    const rules = qa("[data-mirror-lotus] .lotus-rule");
    const dot = qa("[data-mirror-lotus] .lotus-dot");
    const closing = el.querySelector<HTMLElement>("[data-mirror-closing]");
    const items = qa("[data-mirror-closing-item]");
    const win = el.querySelector<HTMLElement>("[data-mirror-window]");
    const inner = el.querySelector<HTMLElement>("[data-mirror-inner]");
    if (!lotus || !closing || !win || !inner || !lines.length) return;
    gsap.set([lotus, closing], { autoAlpha: 1 });

    const mm = gsap.matchMedia();
    mm.add({ pin: MQ.desktopPin, motion: MQ.motion }, (ctx) => {
      const { pin, motion } = ctx.conditions as any;
      if (!motion) return;
      const n = lines.length;
      gsap.set(lines, { opacity: 0.35, x: 16 });
      gsap.set(markers, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set(petals, { drawSVG: "50% 50%", opacity: 0 });
      gsap.set(rules, { drawSVG: "100% 100%", opacity: 0 });
      gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(items, { opacity: 0, y: 28 });

      if (pin) {
        el.dataset.pinned = "true";
        const maxY = () => Math.max(0, inner.offsetHeight - win.clientHeight);
        const padB = () => parseFloat(getComputedStyle(inner).paddingBottom) || 0;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: () => "+=" + Math.round(1.6 * window.innerHeight), pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1 },
        });
        lines.forEach((ln, i) => {
          if (i > 0) tl.to(lines[i - 1], { opacity: 0.75, duration: 0.4 }, i).to(markers[i - 1], { opacity: 0, scale: 0, duration: 0.3 }, i);
          tl.to(ln, { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" }, i).to(markers[i], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, i + 0.08);
        });
        petals.forEach((p, i) => {
          const at = Math.min(i, n - 1);
          tl.to(p, { opacity: 1, duration: 0.05 }, at).to(p, { drawSVG: "0% 100%", duration: 0.9, ease: "power1.inOut" }, at);
        });
        const g = Math.min(petals.length, n - 1);
        tl.to(dot, { scale: 1, duration: 0.4, ease: "back.out(2)" }, g).to(rules, { opacity: 1, duration: 0.05 }, g + 0.1).to(rules, { drawSVG: "0% 100%", duration: 0.8, ease: "power1.inOut" }, g + 0.1);
        tl.to(lines[n - 1], { opacity: 0.75, duration: 0.4 }, n).to(markers[n - 1], { opacity: 0, scale: 0, duration: 0.3 }, n).to(items, { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: "power2.out" }, n + 0.1);
        lines.forEach((ln, i) => {
          if (i > 0) tl.to(inner, { y: () => -Math.min(maxY(), Math.max(0, ln.offsetTop + ln.offsetHeight + padB() - win.clientHeight)), duration: 0.6, ease: "power1.inOut" }, i - 0.1);
        });
        tl.to(inner, { y: () => -maxY(), duration: 0.9, ease: "power1.inOut" }, n - 0.05);
        tl.to({}, { duration: 0.7 });

        const st = tl.scrollTrigger!;
        let raf = 0;
        const jump = () => { if (st.progress >= 1 && tl.progress() >= 1) return; cancelAnimationFrame(raf); raf = requestAnimationFrame(() => scrollToY(st.end)); };
        closing.addEventListener("focusin", jump);
        const r = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => { cancelAnimationFrame(r); cancelAnimationFrame(raf); closing.removeEventListener("focusin", jump); delete el.dataset.pinned; };
      }

      /* ---------- sem pin: acende conforme passa ---------- */
      const state = new Array(n).fill("");
      const apply = (i: number, s: string, instant = false) => {
        if (state[i] === s) return;
        state[i] = s;
        const k = instant ? 0 : 1;
        gsap.to(lines[i], { opacity: s === "lit" ? 1 : s === "settled" ? 0.75 : 0.35, x: s === "dim" ? 16 : 0, duration: 0.9 * k, ease: "silk", overwrite: "auto" });
        gsap.to(markers[i], { opacity: s === "lit" ? 1 : 0, scale: s === "lit" ? 1 : 0, duration: (s === "lit" ? 0.6 : 0.35) * k, ease: s === "lit" ? "back.out(2)" : "power2.out", overwrite: "auto" });
      };
      const calc = (s: ScrollTrigger) => (s.isActive ? "lit" : s.progress >= 1 ? "settled" : "dim");
      lines.forEach((ln, i) => ScrollTrigger.create({ trigger: ln, start: "top 65%", end: "bottom 65%", onUpdate: (s) => apply(i, calc(s)), onToggle: (s) => apply(i, calc(s)), onRefresh: (s) => apply(i, calc(s), true) }));
      const tlLotus = gsap.timeline({ scrollTrigger: { trigger: lotus, start: "top 85%", once: true } });
      tlLotus.to(petals, { opacity: 1, duration: 0.2, stagger: 0.12 }, 0).to(petals, { drawSVG: "0% 100%", duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0).to(dot, { scale: 1, duration: 0.6, ease: "back.out(2)" }, "-=0.5").to(rules, { opacity: 1, duration: 0.2 }, "<0.1").to(rules, { drawSVG: "0% 100%", duration: 1.1, ease: "power2.inOut" }, "<");
      const tw = gsap.to(items, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14, ease: "silk", scrollTrigger: { trigger: closing, start: "top 85%", once: true } });
      const done = () => { if (tw.progress() < 1) tw.progress(1); };
      closing.addEventListener("focusin", done);
      return () => closing.removeEventListener("focusin", done);
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="espelho" aria-labelledby="espelho-titulo" className="mirror relative overflow-clip bg-linen py-24 sm:py-32 lg:py-40">
      <div className="container-site mirror-grid grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow number={mirror.eyebrow.number} label={mirror.eyebrow.label} />
          <SplitHeading as="h2" className="mt-7 max-w-[14ch] text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] sm:mt-8" >
            <span id="espelho-titulo">{rich(mirror.title)}</span>
          </SplitHeading>
          <div data-mirror-lotus data-reveal aria-hidden className="mt-12 hidden w-[min(100%,16rem)] text-bronze lg:block">
            <Lotus withBase strokeWidth={1.5} className="h-auto w-full" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div data-mirror-window>
            <div data-mirror-inner>
              <ol>
                {mirror.lines.map((t, i) => (
                  <li key={i} data-mirror-line className="relative grid grid-cols-[1.75rem_1fr] items-baseline gap-x-5 border-b border-bronze/20 py-6 pr-8 first:border-t sm:grid-cols-[2rem_1fr] sm:gap-x-7 sm:py-7 lg:py-[clamp(0.5rem,1.5svh,1rem)]">
                    <span aria-hidden className="font-sans text-[0.78rem] tracking-[0.1em] text-bronze">{String(i + 1).padStart(2, "0")}</span>
                    <p data-mirror-text className="font-display text-[1.45rem] leading-[1.3] text-ink sm:text-[1.65rem]">{t}</p>
                    <span data-mirror-marker aria-hidden className="absolute right-1 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-wine" />
                  </li>
                ))}
              </ol>
              <div data-mirror-closing data-reveal className="mt-12 sm:grid sm:grid-cols-[2rem_1fr] sm:gap-x-7 lg:mt-[clamp(1.25rem,3.5svh,2.5rem)]">
                <span aria-hidden className="hidden sm:block" />
                <div>
                  <p data-mirror-closing-item className="max-w-[34rem] text-[1.0625rem] leading-[1.75] text-text">{mirror.closing}</p>
                  <div data-mirror-closing-item className="mt-7">
                    <WhatsAppButton message={messages.mirror} source="espelho" variant="outline">{mirror.cta}</WhatsAppButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
