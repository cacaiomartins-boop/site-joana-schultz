import { useRef } from "react";
import { gsap, useGSAP, MQ } from "../motion/setup";
import { psychoeducation as pe } from "../data/clinic";
import { Eyebrow, Lotus, Reveal, SplitHeading, WhatsAppButton, rich } from "./ui";

const offsets = ["lg:mt-0", "lg:mt-14", "lg:mt-5", "lg:mt-16"];
const drift = [18, 44, 28, 50];

export function Psychoeducation() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 1 });
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      tl.fromTo(el.querySelectorAll("[data-pe-frame]"), { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }, { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", duration: 1.6, ease: "breath", stagger: 0.1 })
        .fromTo(el.querySelectorAll("[data-pe-inner]"), { scale: 1.2 }, { scale: 1, duration: 2.1, stagger: 0.1 }, 0);
    });
    mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
      el.querySelectorAll("[data-pe-col]").forEach((c, i) => {
        const d = drift[i % drift.length];
        gsap.fromTo(c, { y: d }, { y: -d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section id="psicoeducacao" aria-labelledby="pe-titulo" className="relative overflow-x-clip bg-cream py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <header className="lg:col-span-7">
            <Eyebrow number={pe.eyebrow.number} label={pe.eyebrow.label} />
            <SplitHeading as="h2" className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] sm:mt-8"><span id="pe-titulo">{rich(pe.title)}</span></SplitHeading>
          </header>
          <Reveal className="lg:col-span-5" y={24}><p className="max-w-[28rem] text-[1.0625rem] leading-[1.75] text-text">{pe.text}</p></Reveal>
        </div>

        <div ref={ref} data-reveal className="mt-14 lg:mt-20">
          <ul className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-16">
            {pe.cards.map((c, i) => (
              <li key={c.title} data-pe-col className={`w-[72vw] max-w-[18rem] shrink-0 snap-start lg:w-auto lg:max-w-none ${offsets[i]}`}>
                <div data-pe-frame className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-wine-deep text-ivory shadow-soft transition-shadow duration-700 ease-[var(--ease-silk)] hover:shadow-card">
                  <div data-pe-inner className="grain absolute inset-0 flex flex-col justify-between p-6">
                    <div aria-hidden className="absolute -bottom-6 -right-6 w-[70%] text-gold-soft opacity-20"><Lotus strokeWidth={1.4} className="h-auto w-full" /></div>
                    <span className="relative text-[0.72rem] font-medium uppercase tracking-[0.28em] text-gold-soft">{c.tag}</span>
                    <div className="relative">
                      <span aria-hidden className="font-display text-[2.4rem] italic leading-none text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 font-display text-[1.55rem] font-medium leading-[1.1] text-ivory">{c.title}</h3>
                      <p className="mt-3 text-[0.95rem] leading-[1.55] text-ivory/80">{c.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-4" y={24}><WhatsAppButton message={pe.ctaMessage} source="psicoeducacao" variant="outline">{pe.cta}</WhatsAppButton></Reveal>
      </div>
    </section>
  );
}
