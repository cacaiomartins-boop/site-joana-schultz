import { createElement, useEffect, useId, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, reduced, MQ } from "../motion/setup";
import { waLink } from "../data/clinic";

/* ------------------------------------------------------------------ */
/* Texto com *itálico*                                                 */
/* ------------------------------------------------------------------ */
export function rich(text: string, emClass = "italic text-wine"): ReactNode {
  const parts = text.split(/\*(.+?)\*/g);
  return parts.map((p, i) => (i % 2 ? <em key={i} className={emClass}>{p}</em> : <span key={i}>{p}</span>));
}

/* ------------------------------------------------------------------ */
/* Lótus de traço (desenhado por código)                               */
/* ------------------------------------------------------------------ */
const r1 = (n: number) => Math.round(n * 10) / 10;
function petal(a: number[], b: number[], w: number, w2 = w) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy;
  const p = (t: number, o: number) => [a[0] + ux * L * t + nx * o, a[1] + uy * L * t + ux * o];
  const c1 = p(0.3, w), c2 = p(0.82, 0.62 * w), c3 = p(0.82, -0.62 * w2), c4 = p(0.3, -w2);
  return (
    `M${r1(a[0])} ${r1(a[1])}C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(b[0])} ${r1(b[1])}` +
    `C${r1(c3[0])} ${r1(c3[1])} ${r1(c4[0])} ${r1(c4[1])} ${r1(a[0])} ${r1(a[1])}Z`
  );
}
const PETALS = [
  petal([300, 352], [300, 12], 110),
  petal([300, 352], [98, 100], 70, 88),
  petal([300, 352], [502, 100], 88, 70),
  petal([300, 368], [8, 248], 50, 118),
  petal([300, 368], [592, 248], 118, 50),
];

export function Lotus({ className = "", strokeWidth = 6, withBase = false }: { className?: string; strokeWidth?: number; withBase?: boolean }) {
  return (
    <svg
      viewBox={withBase ? "-10 0 620 470" : "-10 0 620 400"}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PETALS.map((d, i) => (
        <path key={i} className="lotus-petal" d={d} vectorEffect="non-scaling-stroke" />
      ))}
      {withBase && (
        <g className="lotus-base">
          <path className="lotus-rule" d="M40 438H272" vectorEffect="non-scaling-stroke" />
          <path className="lotus-rule" d="M560 438H328" vectorEffect="non-scaling-stroke" />
          <circle className="lotus-dot" cx="300" cy="438" r="11" fill="currentColor" stroke="none" />
        </g>
      )}
    </svg>
  );
}

/** Estado inicial "escondido" do lótus para depois florescer. */
export function lotusHide(root: Element) {
  gsap.set(root.querySelectorAll(".lotus-petal"), { drawSVG: "50% 50%", autoAlpha: 0 });
  gsap.set(root.querySelectorAll(".lotus-rule"), { drawSVG: "100% 100%", autoAlpha: 0 });
  gsap.set(root.querySelectorAll(".lotus-dot"), { scale: 0, transformOrigin: "50% 50%" });
}
/** Anima o lótus florescendo dentro de uma timeline. */
export function lotusBloom(tl: gsap.core.Timeline, root: Element, at = 0, o: { dur?: number; stagger?: number; ease?: string } = {}) {
  const petals = root.querySelectorAll(".lotus-petal");
  const rules = root.querySelectorAll(".lotus-rule");
  const dot = root.querySelectorAll(".lotus-dot");
  const { dur = 1.4, stagger = 0.12, ease = "power2.inOut" } = o;
  tl.to(petals, { autoAlpha: 1, duration: 0.2, stagger }, at)
    .to(petals, { drawSVG: "0% 100%", duration: dur, stagger, ease }, at);
  if (dot.length) tl.to(dot, { scale: 1, duration: 0.6, ease: "back.out(2)" }, at + dur * 0.7);
  if (rules.length)
    tl.to(rules, { autoAlpha: 1, duration: 0.2 }, at + dur * 0.4).to(rules, { drawSVG: "0% 100%", duration: dur * 0.8, ease: "breath" }, at + dur * 0.4);
  return tl;
}

/** Lótus fantasma de fundo, com parallax lento. */
export function GhostLotus({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute select-none text-bronze ${className}`}>
      <Lotus className="h-auto w-full opacity-[0.07]" strokeWidth={1.2} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Eyebrow                                                             */
/* ------------------------------------------------------------------ */
export function Eyebrow({ number, label, tone = "bronze", className = "" }: { number?: string; label: string; tone?: "bronze" | "light"; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { autoAlpha: 1 });
    if (reduced()) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      const line = el.querySelector("[data-eb-line]");
      const num = el.querySelector("[data-eb-num]");
      const lab = el.querySelector<HTMLElement>("[data-eb-label]");
      if (line) tl.from(line, { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2 }, 0);
      if (num) tl.from(num, { autoAlpha: 0, x: -14, duration: 1 }, 0);
      if (lab) {
        const h = el.offsetHeight;
        lab.style.letterSpacing = "0.7em";
        const fits = el.offsetHeight === h;
        lab.style.letterSpacing = "";
        if (fits) tl.fromTo(lab, { letterSpacing: "0.7em", autoAlpha: 0 }, { letterSpacing: "0.3em", autoAlpha: 1, duration: 1.6, ease: "power3.out", clearProps: "letterSpacing" }, 0.1);
        else tl.from(lab, { autoAlpha: 0, x: -14, duration: 1.3 }, 0.1);
      }
    });
    return () => mm.revert();
  }, { scope: ref });
  return (
    <p ref={ref} data-reveal className={`flex items-center gap-4 ${tone === "light" ? "text-gold-soft" : "text-bronze"} ${className}`}>
      {number && <span data-eb-num className="font-display text-[1.35rem] italic leading-none">{number}</span>}
      <span data-eb-line aria-hidden className="h-px w-10 bg-current opacity-60" />
      <span data-eb-label className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.3em]">{label}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal / SplitHeading                                               */
/* ------------------------------------------------------------------ */
export function Reveal({ as = "div", children, className = "", delay = 0, y = 36, stagger = 0.12, start = "top 82%", ...rest }: { as?: string; children: ReactNode; className?: string; delay?: number; y?: number; stagger?: number; start?: string; [k: string]: any }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-reveal-item]");
    const targets = items.length ? Array.from(items) : [el];
    gsap.set(el, { autoAlpha: 1 });
    if (reduced()) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tw = gsap.fromTo(targets, { opacity: 0, y }, { opacity: 1, y: 0, duration: 1.2, delay, stagger, ease: "silk", scrollTrigger: { trigger: el, start, once: true } });
      const done = () => { if (tw.progress() < 1) { tw.scrollTrigger?.kill(false, true); tw.progress(1); } };
      el.addEventListener("focusin", done);
      return () => el.removeEventListener("focusin", done);
    });
    return () => mm.revert();
  }, { scope: ref });
  return createElement(as, { ref, "data-reveal": "", className, ...rest }, children);
}

export function SplitHeading({ as = "h2", children, className = "", delay = 0, start = "top 85%" }: { as?: string; children: ReactNode; className?: string; delay?: number; start?: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) { gsap.set(el, { autoAlpha: 1 }); return; }
    let split: SplitText | null = null;
    let finished = false;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        aria: /^H[1-6]$/.test(el.tagName) ? "auto" : "none",
        onSplit: (self: any) => {
          gsap.set(el, { autoAlpha: 1 });
          if (finished) { gsap.set(self.lines, { yPercent: 0 }); return; }
          return gsap.from(self.lines, { yPercent: 110, duration: 1.25, stagger: 0.1, delay, ease: "silk", onComplete: () => { finished = true; }, scrollTrigger: { trigger: el, start, once: true } });
        },
      });
    });
    return () => { mm.revert(); split?.revert(); };
  }, { scope: ref });
  return createElement(as, { ref, "data-reveal": "", className }, children);
}

/* ------------------------------------------------------------------ */
/* Ícones                                                              */
/* ------------------------------------------------------------------ */
const sp = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
export const IconWhats = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.2A9.5 9.5 0 1 0 12 2.5Z" />
    <path fill="currentColor" d="M16.6 14c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.3-.6-2.2-1.2-3-2.6-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.4-.9 2.3.1.7.5 1.5 1 2.2 1.1 1.5 2.5 2.7 4.3 3.4 1.4.5 2.1.4 2.6.3.6-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.2-.3-.2-.6-.4Z" />
  </svg>
);
export const IconArrow = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><path d="M4 12h15M13 6l6 6-6 6" /></svg>);
export const IconDown = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><path d="M12 4v15M6 13l6 6 6-6" /></svg>);
export const IconPlus = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><path d="M12 5v14M5 12h14" /></svg>);
export const IconPin = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.8" r="2.4" /></svg>);
export const IconClock = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const IconVideo = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><rect x="3" y="6" width="13" height="12" rx="2.5" /><path d="m16 10.5 5-3v9l-5-3" /></svg>);
export const IconInfo = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>);
export const IconMap = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} {...sp} aria-hidden><path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4ZM9 4v13M15 6.5v13" /></svg>);
export const IconPlay = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden><path d="M4 2.5v11l9-5.5-9-5.5Z" /></svg>);
export const IconPause = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden><rect x="3" y="2.5" width="3.2" height="11" rx="1" /><rect x="9.8" y="2.5" width="3.2" height="11" rx="1" /></svg>);
export const IconLeaf = ({ className = "" }: { className?: string }) => (<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden><path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" opacity=".9" /></svg>);

export function ThemeIcon({ name, className = "" }: { name: string; className?: string }) {
  const p = { viewBox: "0 0 24 24", className, ...sp, "aria-hidden": true } as any;
  switch (name) {
    case "body": return (<svg {...p}><circle cx="12" cy="5" r="2.2" /><path d="M12 8v6m0 0-3 6m3-6 3 6M6 10.5c2-1.3 4-1.7 6-1.7s4 .4 6 1.7" /></svg>);
    case "wave": return (<svg {...p}><path d="M2.5 12c2-4 4-4 6 0s4 4 6 0 4-4 7 0" /><path d="M2.5 17c2-3 4-3 6 0s4 3 6 0 4-3 7 0" opacity=".6" /></svg>);
    case "lotus": return (<svg {...p}><path d="M12 19c-3-2.5-3-8 0-12 3 4 3 9.500 0 12Z" /><path d="M12 19c-4 0-7-2.500-8-6.500 3.500 0 7 1.500 8 6.500Z" /><path d="M12 19c4 0 7-2.500 8-6.500-3.500 0-7 1.500-8 6.500Z" /></svg>);
    case "glass": return (<svg {...p}><path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Z" /><path d="M12 14v6M8.500 20h7" /></svg>);
    case "book": return (<svg {...p}><path d="M4 5.500C6.500 4.500 9.500 4.500 12 6c2.500-1.500 5.500-1.500 8-.5V19c-2.500-1-5.500-1-8 .5C9.500 18 6.500 18 4 19V5.500Z" /><path d="M12 6v13.500" /></svg>);
    case "video": return (<svg {...p}><rect x="3" y="6" width="13" height="12" rx="2.500" /><path d="m16 10.500 5-3v9l-5-3" /></svg>);
    default: return (<svg {...p}><circle cx="12" cy="12" r="8" /></svg>);
  }
}

/* ------------------------------------------------------------------ */
/* Botão WhatsApp                                                      */
/* ------------------------------------------------------------------ */
type Variant = "primary" | "outline" | "light" | "ghost";
const VARIANTS: Record<Variant, string> = {
  primary: "bg-wine text-ivory shadow-wine hover:bg-wine-deep",
  outline: "border border-wine/40 text-wine hover:border-wine hover:bg-wine hover:text-ivory",
  light: "bg-ivory text-wine shadow-soft hover:bg-white",
  ghost: "text-wine underline decoration-wine/30 underline-offset-[6px] hover:decoration-wine",
};

export function track(source: string) {
  const w = window as any;
  w.dataLayer?.push({ event: "whatsapp_click", whatsapp_source: source });
  w.gtag?.("event", "whatsapp_click", { whatsapp_source: source });
  w.fbq?.("track", "Contact", { content_name: source });
}

export function WhatsAppButton({ message, source, children, variant = "primary", size = "md", icon = "whatsapp", className = "", magnetic = true }: { message: string; source: string; children: ReactNode; variant?: Variant; size?: "md" | "lg"; icon?: "whatsapp" | "arrow" | "none"; className?: string; magnetic?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !magnetic || variant === "ghost") return;
    if (!window.matchMedia(MQ.fine).matches || reduced()) return;
    el.style.willChange = "transform";
    const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.18);
      qy((e.clientY - (r.top + r.height / 2)) * 0.28);
    };
    const leave = () => { qx(0); qy(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); el.style.willChange = ""; };
  }, [magnetic, variant]);
  const sizing = variant === "ghost" ? "py-1" : size === "lg" ? "h-14 px-7 text-[1.02rem] sm:h-[3.75rem] sm:px-8" : "h-12 px-6 text-[0.95rem]";
  return (
    <a
      ref={ref}
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp={source}
      onClick={() => track(source)}
      className={`group relative inline-flex items-center justify-center gap-3 rounded-full font-sans font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-500 ease-[var(--ease-silk)] ${sizing} ${VARIANTS[variant]} ${className}`}
    >
      {icon === "whatsapp" && <IconWhats className="size-[1.15em] shrink-0" />}
      <span>{children}</span>
      {icon === "arrow" && <IconArrow className="size-[1.1em] shrink-0 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-1" />}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Selo circular giratório                                             */
/* ------------------------------------------------------------------ */
export function Seal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const ring = el.querySelector("[data-seal-ring]");
    gsap.set(el, { autoAlpha: 1 });
    if (!ring || reduced()) return;
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from(el, { scale: 0.4, rotate: -120, autoAlpha: 0, duration: 1.8, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      const spin = gsap.to(ring, { rotation: 360, duration: 36, ease: "none", repeat: -1, transformOrigin: "50% 50%", paused: true });
      const qTime = gsap.quickTo(spin, "timeScale", { duration: 0.2 });
      const settle = gsap.to(spin, { timeScale: 1, duration: 1.8, ease: "power2.out", paused: true });
      const delayed = gsap.delayedCall(0.2, () => { settle.invalidate().restart(); }).pause();
      const st = ScrollTrigger.create({
        trigger: el, start: "top bottom", end: "bottom top",
        onToggle: (s) => spin.paused(!s.isActive),
        onRefresh: (s) => spin.paused(!s.isActive),
        onUpdate: (s) => {
          if (!s.isActive) return;
          const v = Math.min(Math.abs(s.getVelocity()) / 400, 6);
          settle.pause();
          qTime(1 + v);
          delayed.restart(true);
        },
      });
      return () => { st.kill(); spin.kill(); settle.kill(); delayed.kill(); };
    });
    return () => mm.revert();
  }, { scope: ref });
  const pathId = `seal-${uid}`;
  return (
    <div ref={ref} data-reveal aria-hidden className={`relative grid place-items-center rounded-full border border-bronze/25 bg-ivory shadow-card ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <path id={pathId} d="M100 100m-77 0a77 77 0 1 1 154 0a77 77 0 1 1 -154 0" />
        </defs>
        <g data-seal-ring>
          <text className="fill-bronze-deep font-sans" style={{ fontSize: 12.5, fontWeight: 500 }}>
            <textPath href={`#${pathId}`} textLength={478} lengthAdjust="spacing">{text}</textPath>
          </text>
        </g>
      </svg>
      <Lotus className="relative w-[34%] text-bronze" strokeWidth={5} />
    </div>
  );
}
