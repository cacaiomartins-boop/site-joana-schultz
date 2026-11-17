import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../motion/setup";
import { faq, messages } from "../data/clinic";
import { Eyebrow, IconPlus, Reveal, SplitHeading, WhatsAppButton, rich } from "./ui";

export type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const t = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(t.current), []);
  const toggle = (i: number) => setOpen((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <Reveal as="ul" stagger={0.07} y={28} start="top 85%" className="border-b border-bronze/25">
      {items.map((it, i) => {
        const o = open.has(i);
        return (
          <li key={it.q} data-reveal-item className="border-t border-bronze/25">
            <h3 className="text-[1em] font-normal leading-none tracking-normal">
              <button type="button" id={`faq-q-${i}`} aria-expanded={o} aria-controls={`faq-a-${i}`} onClick={() => toggle(i)} className="group flex w-full items-start gap-5 py-7 text-left sm:gap-7 sm:py-8">
                <span aria-hidden className="w-6 shrink-0 pt-1.5 font-display text-[1.1rem] italic leading-none text-bronze">{String(i + 1).padStart(2, "0")}</span>
                <span className={`flex-1 font-display text-[1.35rem] font-medium leading-[1.25] transition-colors duration-500 ease-[var(--ease-silk)] group-hover:text-wine sm:text-[1.5rem] ${o ? "text-wine" : "text-ink"}`}>{it.q}</span>
                <span aria-hidden className={`-mt-1 grid size-11 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500 ease-[var(--ease-silk)] ${o ? "border-wine bg-wine text-ivory" : "border-bronze/35 text-bronze group-hover:border-wine group-hover:text-wine"}`}>
                  <IconPlus className={`size-[1.15rem] transition-transform duration-700 ease-[var(--ease-silk)] ${o ? "rotate-[135deg]" : ""}`} />
                </span>
              </button>
            </h3>
            <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} data-open={o ? "true" : "false"} className="faq-body" onTransitionEnd={(e) => { if (e.target === e.currentTarget) { window.clearTimeout(t.current); t.current = window.setTimeout(() => ScrollTrigger.refresh(), 150); } }} {...(!o ? { inert: "" as any } : {})}>
              <div><p className="max-w-prose pb-8 pl-12 pr-2 text-[1.0625rem] leading-[1.75] text-text sm:pb-9 sm:pl-14 sm:pr-16">{it.a}</p></div>
            </div>
          </li>
        );
      })}
    </Reveal>
  );
}

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="relative overflow-clip bg-linen py-24 sm:py-32 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <Eyebrow number={faq.eyebrow.number} label={faq.eyebrow.label} />
          <SplitHeading as="h2" className="mt-7 text-[clamp(2.2rem,3.6vw,3.5rem)] leading-[1.04] sm:mt-8"><span id="duvidas-titulo">{rich(faq.title)}</span></SplitHeading>
          <Reveal className="mt-6" y={24}>
            <p className="max-w-[22rem] text-[1.0625rem] leading-[1.7] text-text">{faq.text}</p>
            <div className="mt-6"><WhatsAppButton message={messages.doubt} source="duvidas" variant="outline">{faq.cta}</WhatsAppButton></div>
          </Reveal>
        </div>
        <div className="lg:col-span-8"><FaqList items={faq.items} /></div>
      </div>
    </section>
  );
}
