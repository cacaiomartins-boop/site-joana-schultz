import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "../motion/setup";
import { messages, process as proc } from "../data/clinic";
import { Eyebrow, Lotus, Reveal, SplitHeading, WhatsAppButton, lotusHide, rich, FitBox } from "./ui";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 1 });
    const q = (s: string, r: ParentNode = el) => r.querySelector<HTMLElement>(s);
    const qa = (s: string, r: ParentNode = el) => Array.from(r.querySelectorAll<HTMLElement>(s));
    const steps = qa("[data-step]");
    const pulse = (ring: Element | null) => { if (ring) gsap.fromTo(ring, { scale: 1, autoAlpha: 0.85 }, { scale: 2.1, autoAlpha: 0, duration: 1.4, ease: "power2.out", overwrite: true }); };

    const mm = gsap.matchMedia();
    mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
      const trackX = q("[data-track-x]"), lotusX = q("[data-lotus-x]");
      if (!trackX || !lotusX) return;
      const petals = qa(".lotus-petal", lotusX), rules = qa(".lotus-rule", lotusX), dot = q(".lotus-dot", lotusX), glow = q("[data-lotus-glow]", lotusX);
      gsap.set(qa("[data-seg-x]"), { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(qa("[data-dot]"), { scale: 0 });
      gsap.set(qa("[data-lit]"), { autoAlpha: 0.55, y: 10 });
      gsap.set([...petals, ...rules], { drawSVG: "50% 50%", autoAlpha: 0 });
      if (dot) gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });
      if (glow) gsap.set(glow, { autoAlpha: 0, scale: 0.6 });
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: trackX, start: "top 70%", end: "bottom 65%", scrub: 0.6, invalidateOnRefresh: true } });
      let t = 0.08;
      steps.forEach((s, i) => {
        tl.to(q("[data-dot]", s), { scale: 1, duration: 0.35, ease: "back.out(2)" }, t).to(qa("[data-lit]", s), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, t);
        const ring = q("[data-ring]", s);
        tl.call(() => { if ((tl.scrollTrigger?.direction ?? 1) > 0) pulse(ring); }, undefined, t);
        t += 0.3;
        const seg = q("[data-seg-x]", s);
        if (seg) { const d = i === steps.length - 1 ? 0.6 : 1; tl.to(seg, { scaleX: 1, duration: d }, t); t += d; }
      });
      if (glow) tl.to(glow, { autoAlpha: 0.7, scale: 1, duration: 0.8, ease: "power2.out" }, t);
      tl.to(petals, { drawSVG: "0% 100%", autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: "power1.inOut" }, t).to(rules, { drawSVG: "0% 100%", autoAlpha: 1, duration: 0.55, ease: "power1.out" }, t + 0.25);
      if (dot) tl.to(dot, { scale: 1, duration: 0.3, ease: "back.out(2)" }, t + 0.4);
    });
    mm.add(`(max-width: 1023px) and ${MQ.motion}`, () => {
      const line = q("[data-line-y]"), fill = q("[data-fill-y]"), lot = q("[data-lotus-y]");
      if (!line || !fill || !lot) return;
      gsap.fromTo(fill, { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: line, start: "top 62%", end: "bottom 62%", scrub: 0.6 } });
      steps.forEach((s) => {
        const node = q("[data-node]", s), dot = q("[data-dot]", s), lit = qa("[data-lit]", s);
        gsap.set(dot, { scale: 0 });
        gsap.set(lit, { autoAlpha: 0.55, y: 10 });
        const tl = gsap.timeline({ paused: true }).to(dot, { scale: 1, duration: 0.6, ease: "back.out(2)" }).to(lit, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.05);
        ScrollTrigger.create({ trigger: node ?? s, start: "center 62%", onEnter: () => { tl.play(); pulse(q("[data-ring]", s)); }, onLeaveBack: () => tl.reverse() });
      });
      const ps = qa(".lotus-petal", lot);
      gsap.set(ps, { drawSVG: "50% 50%", autoAlpha: 0 });
      const lt = gsap.timeline({ paused: true }).to(ps, { drawSVG: "0% 100%", autoAlpha: 1, duration: 1.3, stagger: 0.12, ease: "power2.inOut" });
      ScrollTrigger.create({ trigger: lot, start: "top 60%", onEnter: () => lt.play(), onLeaveBack: () => lt.reverse() });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section id="processo" aria-labelledby="processo-titulo" className="fit-section relative overflow-x-clip bg-linen py-24 sm:py-32 lg:py-40">
      <FitBox className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow number={proc.eyebrow.number} label={proc.eyebrow.label} />
            <SplitHeading as="h2" className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] sm:mt-8"><span id="processo-titulo">{rich(proc.title)}</span></SplitHeading>
          </div>
          <Reveal className="lg:col-span-5" y={24}><p className="max-w-[28rem] text-[1.0625rem] leading-[1.75] text-text">{proc.text}</p></Reveal>
        </div>

        <div ref={ref} data-reveal className="relative mt-16 lg:mt-20">
          <span aria-hidden data-line-y className="absolute bottom-[3.65rem] left-[calc(1.375rem-0.5px)] top-[18px] w-px bg-bronze/20 lg:hidden">
            <span data-fill-y className="absolute inset-0 bg-bronze" />
          </span>
          <div data-track-x className="relative lg:pt-6">
            <ol className="relative grid gap-y-12 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-0">
              {proc.steps.map((s, i) => {
                const last = i === proc.steps.length - 1;
                return (
                  <li key={s.title} data-step className="relative grid grid-cols-[2.75rem_1fr] content-start gap-x-4 sm:gap-x-6 lg:grid-cols-1 lg:gap-x-0">
                    <span aria-hidden data-seg-x className={`absolute left-[11px] top-[calc(4.5rem+10.5px)] hidden h-px bg-bronze lg:block ${last ? "w-[calc(100%-11px-6.9rem)]" : "w-[calc(100%+3rem)]"}`} />
                    <span aria-hidden data-lit className="font-display text-[2.6rem] italic leading-none text-bronze lg:mb-5 lg:text-[3.4rem]">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden data-node className="relative z-10 mt-1.5 grid size-[22px] place-items-center rounded-full border border-bronze/50 bg-linen lg:mb-6 lg:mt-0">
                      <span data-ring className="absolute -inset-px rounded-full border border-bronze opacity-0" />
                      <span data-dot className="size-2 rounded-full bg-bronze" />
                    </span>
                    <h3 data-lit className="col-start-2 font-display text-[1.55rem] font-medium leading-[1.15] text-ink lg:col-start-auto">{s.title}</h3>
                    <p data-lit className="col-start-2 mt-3 text-[1rem] leading-[1.7] text-text lg:col-start-auto lg:pr-4">{s.text}</p>
                  </li>
                );
              })}
            </ol>
            <div data-lotus-x aria-hidden className="pointer-events-none absolute -right-2 top-[2.2rem] hidden w-[5.5rem] text-bronze lg:block">
              <span data-lotus-glow className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(124,159,136,0.35),transparent)]" />
              <Lotus withBase strokeWidth={1.4} className="relative h-auto w-full" />
            </div>
          </div>
          <div data-lotus-y aria-hidden className="relative mt-8 h-[3.4rem] w-[4.4rem] -translate-x-[calc(50%-1.375rem)] text-bronze lg:hidden">
            <Lotus className="h-full w-full" strokeWidth={1.3} />
          </div>
        </div>

        <Reveal className="mt-16 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8" y={24}>
          <WhatsAppButton message={messages.general} source="processo" size="lg">{proc.cta}</WhatsAppButton>
          <p className="text-[1rem] text-muted">{proc.note}</p>
        </Reveal>
      </FitBox>
    </section>
  );
}
