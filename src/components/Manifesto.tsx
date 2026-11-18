import { useRef } from "react";
import { gsap, SplitText, useGSAP, MQ } from "../motion/setup";
import { manifesto } from "../data/clinic";
import { FitBox, Lotus } from "./ui";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const q = (s: string) => el.querySelector<HTMLElement>(s);
    const qa = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));
    const wrap = q("[data-mf-wrap]");
    const text = q("[data-mf-text]");
    const line = q("[data-mf-line]");
    const labels = qa("[data-mf-label]");
    const quote = q("[data-mf-quote]");
    const values = qa("[data-mf-value]");
    const lot = q("[data-mf-lotus]");
    if (!wrap || !text || !lot) return;
    gsap.set([lot, quote, ...values, ...labels].filter(Boolean) as HTMLElement[], { autoAlpha: 1 });
    const petals = qa("[data-mf-lotus] .lotus-petal");
    const rules = qa("[data-mf-lotus] .lotus-rule");
    const dot = qa("[data-mf-lotus] .lotus-dot");

    const mm = gsap.matchMedia();
    mm.add({ track: MQ.desktopPin, motion: MQ.motion }, (ctx) => {
      const { track, motion } = ctx.conditions as any;
      if (!motion) return;
      gsap.fromTo(el, { clipPath: "inset(0% 3% 0% 3% round 2.5rem 2.5rem 0rem 0rem)" }, { clipPath: "inset(0% 0% 0% 0% round 0rem 0rem 0rem 0rem)", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 20%", scrub: true } });
      const split = SplitText.create(text, { type: "words", tag: "span", aria: "none", wordsClass: "manifesto-word" });
      gsap.set(petals, { drawSVG: "50% 50%", opacity: 0 });
      gsap.set(rules, { drawSVG: "100% 100%", opacity: 0 });
      gsap.set(dot, { scale: 0, transformOrigin: "50% 50%" });

      if (track) {
        gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: wrap, start: "top 40%", end: "85% bottom", scrub: 0.8 } })
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.16, ease: "power1.out" }, 0)
          .fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.04 }, 0)
          .fromTo(split.words, { opacity: 0.14 }, { opacity: 1, duration: 0.08, stagger: { amount: 0.62 } }, 0.02)
          .to(petals, { opacity: 1, duration: 0.02, stagger: 0.06 }, 0.2)
          .to(petals, { drawSVG: "0% 100%", duration: 0.3, stagger: 0.06, ease: "power1.inOut" }, 0.2)
          .to(dot, { scale: 1, duration: 0.06, ease: "back.out(2)" }, 0.6)
          .to(rules, { opacity: 1, duration: 0.02 }, 0.62)
          .to(rules, { drawSVG: "0% 100%", duration: 0.13, ease: "power1.inOut" }, 0.62)
          .fromTo(quote, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.76)
          .fromTo(values, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.03, ease: "power2.out" }, 0.86);
      } else {
        gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: text, start: "top 82%", end: "bottom 40%", scrub: 0.8 } })
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: "power1.out" }, 0)
          .fromTo(split.words, { opacity: 0.14 }, { opacity: 1, duration: 0.1, stagger: { amount: 0.9 } }, 0);
        gsap.timeline({ scrollTrigger: { trigger: lot, start: "top 85%", once: true } })
          .to(petals, { opacity: 1, duration: 0.2, stagger: 0.12 }, 0)
          .to(petals, { drawSVG: "0% 100%", duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0)
          .to(dot, { scale: 1, duration: 0.6, ease: "back.out(2)" }, "-=0.5")
          .to(rules, { opacity: 1, duration: 0.2 }, "<0.1")
          .to(rules, { drawSVG: "0% 100%", duration: 1.1, ease: "power2.inOut" }, "<");
        gsap.fromTo([quote, ...values], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "silk", scrollTrigger: { trigger: quote, start: "top 85%", once: true } });
      }
      return () => split.revert();
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="manifesto" data-theme="dark" aria-labelledby="manifesto-titulo" className="fit-section grain relative overflow-hidden bg-forest-deep text-ivory">
      <div aria-hidden className="pointer-events-none absolute -left-[10%] top-[-20%] size-[52rem] rounded-full bg-[radial-gradient(closest-side,rgba(98,140,112,0.42),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-[12%] bottom-[-30%] size-[46rem] rounded-full bg-[radial-gradient(closest-side,rgba(112,42,55,0.38),transparent)]" />
      <FitBox data-mf-wrap className="container-site relative py-24 sm:py-32 lg:py-0">
        <h2 id="manifesto-titulo" className="flex items-center gap-4 font-sans text-[0.75rem] font-medium uppercase leading-none tracking-[0.32em] text-gold-soft sm:gap-6">
          <span data-mf-label>{manifesto.label}</span>
          <span data-mf-line aria-hidden className="h-px flex-1 origin-left bg-gold-soft/50" />
          <span data-mf-label>{manifesto.author}</span>
        </h2>

        <div className="mt-14 grid gap-14 lg:mt-[clamp(1.5rem,5svh,3.5rem)] lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <p data-mf-text className="font-display text-[clamp(1.9rem,3.6vw,3.35rem)] leading-[1.15] text-ivory lg:text-[clamp(1.7rem,min(3.4vw,6svh),3.1rem)]">{manifesto.text}</p>
            <p data-mf-quote className="mt-10 lg:mt-[clamp(1rem,3svh,2rem)] flex max-w-[34rem] gap-5 font-display text-[1.2rem] italic leading-[1.55] text-gold-soft sm:text-[1.35rem]">
              <span aria-hidden className="mt-4 hidden h-px w-10 shrink-0 bg-gold-soft/60 sm:block" />
              {manifesto.quote}
            </p>
            <ul className="mt-10 lg:mt-[clamp(1rem,3svh,2rem)] flex flex-wrap items-center gap-x-4 gap-y-3 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-ivory/85">
              {manifesto.values.map((v, i) => (
                <li key={v} data-mf-value className="flex items-center gap-4">
                  {v}
                  {i < manifesto.values.length - 1 && <span aria-hidden className="size-1.5 rotate-45 bg-gold-soft" />}
                </li>
              ))}
            </ul>
          </div>
          <div data-mf-lotus aria-hidden className="mx-auto w-[min(70%,22rem)] text-gold-soft lg:col-span-5">
            <Lotus withBase strokeWidth={1.4} className="h-auto w-full" />
          </div>
        </div>
      </FitBox>
    </section>
  );
}
