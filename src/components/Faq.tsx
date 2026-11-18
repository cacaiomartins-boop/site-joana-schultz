import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../motion/setup";
import { faq, messages } from "../data/clinic";
import { Eyebrow, FitBox, IconPlus, Reveal, SplitHeading, WhatsAppButton, rich } from "./ui";

export type FaqItem = { q: string; a: string };

function Item({ it, i, o, toggle, compact, onEnd }: { it: FaqItem; i: number; o: boolean; toggle: () => void; compact: boolean; onEnd: () => void }) {
  return (
    <li data-reveal-item className="border-t border-bronze/25">
      <h3 className="text-[1em] font-normal leading-none tracking-normal">
        <button type="button" id={`faq-q-${i}`} aria-expanded={o} aria-controls={`faq-a-${i}`} onClick={toggle} className={`group flex w-full items-start text-left ${compact ? "gap-4 py-5 lg:gap-3 lg:py-[clamp(0.55rem,1.7svh,1rem)]" : "gap-5 py-7 sm:gap-7 sm:py-8"}`}>
          <span aria-hidden className="w-6 shrink-0 pt-1 font-display text-[1.1rem] italic leading-none text-bronze">{String(i + 1).padStart(2, "0")}</span>
          <span className={`flex-1 font-display font-medium leading-[1.2] transition-colors duration-500 ease-[var(--ease-silk)] group-hover:text-wine ${compact ? "text-[1.3rem] lg:text-[clamp(1.05rem,2.4svh,1.3rem)]" : "text-[1.35rem] sm:text-[1.5rem]"} ${o ? "text-wine" : "text-ink"}`}>{it.q}</span>
          <span aria-hidden className={`grid shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500 ease-[var(--ease-silk)] ${compact ? "size-9" : "-mt-1 size-11"} ${o ? "border-wine bg-wine text-ivory" : "border-bronze/35 text-bronze group-hover:border-wine group-hover:text-wine"}`}>
            <IconPlus className={`size-4 transition-transform duration-700 ease-[var(--ease-silk)] ${o ? "rotate-[135deg]" : ""}`} />
          </span>
        </button>
      </h3>
      <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} data-open={o ? "true" : "false"} className="faq-body" onTransitionEnd={(e) => { if (e.target === e.currentTarget) onEnd(); }} {...(!o ? { inert: "" as any } : {})}>
        <div><p className={`max-w-prose text-text ${compact ? "pb-5 pl-10 pr-2 text-[1rem] leading-[1.65] lg:pb-3 lg:text-[clamp(0.85rem,1.95svh,0.95rem)] lg:leading-[1.5]" : "pb-8 pl-12 pr-2 text-[1.0625rem] leading-[1.75] sm:pb-9 sm:pl-14 sm:pr-16"}`}>{it.a}</p></div>
      </div>
    </li>
  );
}

/** compact = duas colunas e só uma resposta aberta por vez (cabe na tela). */
export function FaqList({ items, compact = false }: { items: FaqItem[]; compact?: boolean }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const t = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(t.current), []);
  const onEnd = () => { window.clearTimeout(t.current); t.current = window.setTimeout(() => ScrollTrigger.refresh(), 150); };
  const toggle = (i: number) => setOpen((s) => {
    if (compact) return s.has(i) ? new Set<number>() : new Set<number>([i]);
    const n = new Set(s);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });
  if (!compact) {
    return (
      <Reveal as="ul" stagger={0.07} y={28} start="top 85%" className="border-b border-bronze/25">
        {items.map((it, i) => (<Item key={it.q} it={it} i={i} o={open.has(i)} toggle={() => toggle(i)} compact={false} onEnd={onEnd} />))}
      </Reveal>
    );
  }
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <div className="grid gap-x-8 lg:grid-cols-2">
      {cols.map((col, c) => (
        <Reveal as="ul" key={c} stagger={0.07} y={28} start="top 85%" className="self-start border-b border-bronze/25">
          {col.map((it, k) => { const i = c * half + k; return <Item key={it.q} it={it} i={i} o={open.has(i)} toggle={() => toggle(i)} compact onEnd={onEnd} />; })}
        </Reveal>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="fit-section relative overflow-clip bg-linen py-24 sm:py-32 lg:py-40">
      <FitBox className="container-site grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <Eyebrow number={faq.eyebrow.number} label={faq.eyebrow.label} />
          <SplitHeading as="h2" className="mt-7 text-[clamp(2.2rem,3.6vw,3.5rem)] leading-[1.04] sm:mt-8 lg:mt-[clamp(0.75rem,2svh,1.5rem)] lg:!text-[clamp(1.9rem,min(2.9vw,5.4svh),3rem)]"><span id="duvidas-titulo">{rich(faq.title)}</span></SplitHeading>
          <Reveal className="mt-6 lg:mt-[clamp(0.75rem,2svh,1.5rem)]" y={24}>
            <p className="max-w-[22rem] text-[1.0625rem] leading-[1.7] text-text lg:text-[clamp(0.9rem,2.1svh,1rem)] lg:leading-[1.5]">{faq.text}</p>
            <div className="mt-6 lg:mt-[clamp(0.75rem,2svh,1.5rem)]"><WhatsAppButton message={messages.doubt} source="duvidas" variant="outline" className="lg:!h-11">{faq.cta}</WhatsAppButton></div>
          </Reveal>
        </div>
        <div className="lg:col-span-9"><FaqList items={faq.items} compact /></div>
      </FitBox>
    </section>
  );
}
