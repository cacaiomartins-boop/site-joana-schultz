import { useRef } from "react";
import { gsap, useGSAP, reduced, MQ, ScrollTrigger } from "../motion/setup";
import { about, clinic, messages } from "../data/clinic";
import { Eyebrow, GhostLotus, Lotus, Seal, SplitHeading, WhatsAppButton, rich, Reveal } from "./ui";

function AboutArch() {
  const ref = useRef<HTMLDivElement>(null);
  const idx = about.quote.indexOf(". ");
  const first = idx > 0 ? about.quote.slice(0, idx + 1) : about.quote;
  const rest = idx > 0 ? about.quote.slice(idx + 2) : "";
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 1 });
    if (reduced()) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const petals = el.querySelectorAll(".lotus-petal, .lotus-rule");
      const dot = el.querySelector(".lotus-dot");
      const lines = el.querySelectorAll("[data-arch-line]");
      gsap.fromTo(el, { clipPath: "inset(38% 22% 0% 22% round 999px 999px 28px 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)", duration: 1.6, ease: "breath", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", end: "center 40%", scrub: 0.8 } });
      tl.fromTo(petals, { drawSVG: "50% 50%", autoAlpha: 0 }, { drawSVG: "0% 100%", autoAlpha: 1, stagger: 0.12, ease: "none", duration: 1 });
      if (dot) tl.fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3 }, "<0.2");
      gsap.fromTo(lines, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14, scrollTrigger: { trigger: el, start: "top 55%", once: true } });
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <div ref={ref} data-reveal className="cq relative aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-t-[999px] rounded-b-[1.75rem] border border-bronze/25 bg-[linear-gradient(180deg,var(--color-ivory),var(--color-linen))] shadow-card">
      <div aria-hidden className="pointer-events-none absolute inset-2.5 rounded-t-[999px] rounded-b-[1.45rem] border border-bronze/15" />
      <div className="relative flex h-full flex-col items-center justify-center px-[13%] pb-[14%] pt-[20%] text-center">
        <Lotus withBase strokeWidth={1.5} className="h-auto w-[62%] text-bronze" />
        <figure className="mt-[9%]">
          <blockquote>
            <p className="text-balance font-display text-[clamp(1.3rem,2.1vw,1.85rem)] italic leading-[1.3] text-ink">
              <span data-arch-line className="block">“{first}{!rest && "”"}</span>
              {rest && <span data-arch-line className="mt-2 block text-[0.86em] text-ink/75">{rest}”</span>}
            </p>
          </blockquote>
          <figcaption data-arch-line className="mt-5 font-sans text-[0.78rem] font-medium uppercase tracking-[0.28em] text-bronze-deep">{about.signature}</figcaption>
        </figure>
      </div>
    </div>
  );
}

function YearsStat() {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const { value, plus, label } = clinic.yearsStat;
  useGSAP(() => {
    const el = ref.current, num = numRef.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 1 });
    if (reduced()) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(el, { autoAlpha: 0, y: 32, duration: 1.3, delay: 0.35, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      const t = num?.firstChild;
      if (!num || !t || t.nodeType !== Node.TEXT_NODE) return;
      const set = (v: number) => { t.nodeValue = String(v); };
      const o = { v: 0 };
      set(0);
      const st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: value, duration: 2.2, delay: 0.45, ease: "power2.out", onUpdate: () => set(Math.round(o.v)) }) });
      return () => { st.kill(); set(value); };
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <div ref={ref} data-reveal className="rounded-[1.5rem] border border-white/60 bg-ivory/75 px-4 py-3.5 shadow-soft backdrop-blur-xl sm:px-6 sm:py-5">
      <p className="text-[0.78rem] uppercase tracking-[0.2em] text-muted">mais de</p>
      <p aria-hidden className="flex flex-col">
        <span className="font-display text-[2.4rem] font-medium leading-[0.9] text-bronze tabular-nums sm:text-[3.6rem]"><span ref={numRef}>{value}</span>{plus && <span className="ml-0.5 text-[0.6em]">+</span>}</span>
        <span className="mt-1.5 text-[0.875rem] leading-snug text-ink sm:text-[0.98rem]">{label}</span>
      </p>
      <p className="sr-only">Mais de {value} {label}</p>
    </div>
  );
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative overflow-x-clip bg-[linear-gradient(180deg,var(--color-ivory)_0%,var(--color-ivory)_30%,var(--color-cream)_100%)] py-24 sm:py-32 lg:py-40">
      <GhostLotus className="-left-[14%] top-[6%] w-[38rem]" />
      <div className="container-site relative grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="relative mx-auto w-full max-w-[26rem] pb-16 lg:col-span-5 lg:mx-0 lg:pb-10">
          <AboutArch />
          <Seal text={about.sealText} className="absolute -bottom-2 -left-6 size-[9.5rem] sm:-left-12 sm:size-[11rem]" />
          <div className="absolute -bottom-4 right-0 sm:-right-8"><YearsStat /></div>
        </div>

        <div className="lg:col-span-7">
          <Eyebrow number={about.eyebrow.number} label={about.eyebrow.label} />
          <SplitHeading as="h2" className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] sm:mt-8">
            <span id="sobre-titulo">{rich(about.title)}</span>
          </SplitHeading>
          <Reveal className="mt-8 max-w-[38rem] space-y-5 text-[1.0625rem] leading-[1.75] text-text" stagger={0.1} y={24}>
            {about.paragraphs.map((p, i) => (<p key={i} data-reveal-item>{p}</p>))}
          </Reveal>
          <Reveal as="dl" className="mt-10 grid max-w-[38rem] gap-x-8 gap-y-5 border-t border-bronze/20 pt-8 sm:grid-cols-2" stagger={0.08} y={20}>
            {about.credentials.map((c) => (
              <div key={c.label} data-reveal-item>
                <dt className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-bronze-deep">{c.label}</dt>
                <dd className="mt-1 text-[1.0625rem] text-ink">
                  {c.value}
                  {"verify" in c && c.verify && (<><br /><a href={clinic.registryVerifyUrl} target="_blank" rel="noopener noreferrer" className="ulink text-[0.9rem] text-wine">Verificar no Cadastro Nacional<span className="sr-only"> (abre em nova aba)</span></a></>)}
                </dd>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10" y={24}><WhatsAppButton message={messages.about} source="sobre">{about.cta}</WhatsAppButton></Reveal>
        </div>
      </div>
    </section>
  );
}
