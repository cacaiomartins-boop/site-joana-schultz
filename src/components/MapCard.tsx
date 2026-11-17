import { useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "../motion/setup";
import { IconMap, Lotus } from "./ui";

const xs = [-140, 110, 250, 545, 690, 940];
const ys = [-140, 70, 190, 300, 420, 540, 740];
type Block = { x: number; y: number; w: number; h: number; tone: string };
const blocks: Block[] = (() => {
  const out: Block[] = [];
  for (let i = 0; i < xs.length - 1; i++)
    for (let j = 0; j < ys.length - 1; j++) {
      if (i === 3 && j === 1) continue;
      const x0 = xs[i] + 11, x1 = xs[i + 1] - 11, y0 = ys[j] + 11, y1 = ys[j + 1] - 11;
      const tone = (i + j) % 3 === 0 ? "cream" : "sand";
      if (x1 - x0 > 200) {
        const m = (x0 + x1) / 2;
        out.push({ x: x0, y: y0, w: m - 10 - x0, h: y1 - y0, tone });
        out.push({ x: m + 10, y: y0, w: x1 - m - 10, h: y1 - y0, tone: tone === "sand" ? "cream" : "sand" });
      } else out.push({ x: x0, y: y0, w: x1 - x0, h: y1 - y0, tone });
    }
  return out;
})();
const hStreets = ys.slice(1, -1).filter((y) => y !== 300);
const vStreets = xs.slice(1, -1);
const trees: [number, number, number][] = [[584, 108, 9], [611, 128, 12], [646, 104, 8], [655, 150, 10], [590, 152, 7]];
const halo = { stroke: "var(--color-linen)", strokeWidth: 5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };

function MapSvg({ district, street, avenue, className = "" }: { district: string; street: string; avenue: string; className?: string }) {
  const id = "av-" + useRef(Math.random().toString(36).slice(2, 8)).current;
  const AV = "M-40 520C80 492 160 470 240 438S360 380 420 330S560 215 660 172S800 122 860 112";
  const RIVER = "M-40 236C90 220 170 200 260 202S420 188 500 178S690 156 860 116";
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={className} fill="none" strokeLinecap="round" aria-hidden>
      <rect width="800" height="600" className="fill-linen" />
      <g transform="rotate(-9 400 300)">
        {blocks.map((b, i) => (<rect key={i} data-map-block="" x={b.x} y={b.y} width={b.w} height={b.h} rx={10} className={b.tone === "sand" ? "fill-sand/45" : "fill-cream/80"} />))}
        <rect data-map-block="" x={556} y={81} width={123} height={98} rx={22} className="fill-sage-soft/55" />
        {trees.map(([cx, cy, r], i) => (<circle key={i} data-map-block="" cx={cx} cy={cy} r={r} className="fill-sage/20" />))}
      </g>
      <path data-map-river="" d={RIVER} className="stroke-sage-soft/80" strokeWidth={15} />
      <path data-map-river="" d={RIVER} className="stroke-sage/35" strokeWidth={1.4} />
      <g transform="rotate(-9 400 300)">
        {hStreets.map((y) => (<path key={"h" + y} data-map-street="" d={`M-140 ${y}H940`} className="stroke-bronze/35" strokeWidth={1.6} />))}
        {vStreets.map((x) => (<path key={"v" + x} data-map-street="" d={`M${x} -140V740`} className="stroke-bronze/35" strokeWidth={1.6} />))}
        <path data-map-street="" d="M-140 300H940" className="stroke-bronze/55" strokeWidth={2.4} />
        <path data-map-route="" d="M-140 300H400" className="stroke-wine/55" strokeWidth={3.2} />
        {street && <text data-map-label="" x={150} y={291} className="fill-bronze-deep/80 font-sans uppercase" fontSize={12} fontWeight={500} style={{ letterSpacing: "0.22em", ...halo }}>{street}</text>}
        <text data-map-label="" x={490} y={470} textAnchor="middle" className="fill-bronze/60 font-display italic" fontSize={36} style={halo}>{district}</text>
      </g>
      <path id={id} data-map-avenue="" d={AV} className="stroke-sand" strokeWidth={21} />
      <path data-map-avenue="" d={AV} className="stroke-ivory" strokeWidth={15} />
      {avenue && (
        <text data-map-label="" className="fill-bronze-deep/75 font-sans uppercase" fontSize={11} fontWeight={500} dy={4} style={{ letterSpacing: "0.24em" }}>
          <textPath href={`#${id}`} startOffset="19%">{avenue}</textPath>
        </text>
      )}
      <g data-map-label="" transform="translate(742 84)">
        <circle r={19} className="fill-ivory/60 stroke-bronze/35" strokeWidth={1.2} />
        <path d="M0 -13L4 4L0 1L-4 4Z" className="fill-bronze/70" />
        <text y={-26} textAnchor="middle" className="fill-bronze-deep/80 font-sans" fontSize={11} fontWeight={500}>N</text>
      </g>
    </svg>
  );
}

export function MapCard({ embedUrl, title, district, street = "", avenue = "", pinName, pinStreet, mini = false, children }: { embedUrl: string; title: string; district: string; street?: string; avenue?: string; pinName: string; pinStreet: string; mini?: boolean; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");

  useGSAP(() => {
    const root = ref.current;
    if (!root) return;
    const card = root.querySelector("[data-map-card]");
    const inner = root.querySelector("[data-map-inner]");
    const s = gsap.utils.selector(root);
    if (!card || !inner) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
      const { desktop } = ctx.conditions as any;
      if (!mini) {
        const sc = () => ({ trigger: root, start: "top bottom", end: desktop ? "top 30%" : "top 45%", scrub: 1 });
        gsap.fromTo(card, { clipPath: desktop ? "inset(16% 7% 0% 7% round 4rem)" : "inset(9% 5% 0% 5% round 3rem)" }, { clipPath: "inset(0% 0% 0% 0% round 2rem)", ease: "none", scrollTrigger: sc() });
        gsap.fromTo(inner, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: sc() });
      }
      gsap.timeline({ defaults: { ease: "breath" }, scrollTrigger: { trigger: root, start: "top 72%", once: true } })
        .fromTo(s("[data-map-block]"), { opacity: 0 }, { opacity: 1, duration: 1.4, stagger: { each: 0.025, from: "center" } }, 0)
        .fromTo(s("[data-map-river]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 2.6 }, 0)
        .fromTo(s("[data-map-street]"), { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", duration: 2, stagger: 0.08 }, 0.15)
        .fromTo(s("[data-map-avenue]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 2.2 }, 0.45)
        .fromTo(s("[data-map-label]"), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.12, ease: "silk" }, 1.3)
        .fromTo(s("[data-map-route]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.5 }, 1.2)
        .fromTo(s("[data-map-pin]"), { opacity: 0, y: -34, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "back.out(2)" }, 2.3)
        .fromTo(s("[data-map-dot]"), { scale: 0 }, { scale: 1, duration: 0.7, ease: "back.out(2)" }, 2.4)
        .fromTo(s("[data-map-tag]"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 1, ease: "silk" }, 2.6);
      const ring = gsap.fromTo(s("[data-map-ring]"), { scale: 0.6, opacity: 0.55 }, { scale: 2.4, opacity: 0, duration: 2.6, ease: "power2.out", repeat: -1, repeatDelay: 0.5, paused: true });
      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: (st) => (st.isActive ? ring.play() : ring.pause()) });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className="relative">
      <div data-map-card className={`relative overflow-hidden bg-linen shadow-card ${mini ? "h-40 rounded-[1.25rem] border border-white/60" : "h-[22rem] rounded-[2rem] sm:h-[26rem] lg:h-[28rem]"}`}>
        <div data-map-inner className="absolute inset-0 will-change-transform">
          {state !== "idle" && (
            <iframe src={embedUrl} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen onLoad={() => setState("ready")} className="absolute inset-0 size-full border-0" style={{ filter: "saturate(.6) sepia(.16)" }} />
          )}
          <div className={`absolute inset-0 transition-[opacity,visibility] duration-700 ease-[var(--ease-silk)] ${state === "ready" ? "invisible opacity-0" : ""}`}>
            <MapSvg district={district} street={street} avenue={avenue} className="absolute inset-0 size-full" />
            <div aria-hidden className="grain pointer-events-none size-full" />
            <div aria-hidden className="absolute left-1/2 top-1/2">
              <span data-map-ring className="absolute left-0 top-0 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine/25" />
              <span data-map-dot className="absolute left-0 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine" />
              <div data-map-pin className="absolute bottom-1 left-0 flex -translate-x-1/2 flex-col items-center">
                <span className={`grid place-items-center rounded-full border border-wine/20 bg-ivory shadow-card ${mini ? "size-9" : "size-14"}`}><Lotus className={`${mini ? "w-5" : "w-8"} text-bronze`} strokeWidth={5} /></span>
                <span className="h-5 w-px bg-wine/60" />
              </div>
              {!mini && (
                <div data-map-tag className="absolute bottom-10 left-11 hidden whitespace-nowrap rounded-2xl border border-white/70 bg-ivory/80 px-4 py-2.5 shadow-soft backdrop-blur-md sm:block">
                  <span className="block font-display text-[1.15rem] leading-tight text-ink">{pinName}</span>
                  <span className="block text-[0.875rem] leading-snug text-text">{pinStreet}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {state !== "ready" && (
          <button ref={btn} type="button" onClick={() => setState((v) => (v === "idle" ? "loading" : v))} aria-busy={state === "loading"} className={`absolute inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-ivory/85 font-medium text-ink shadow-soft backdrop-blur-md transition-colors duration-500 hover:bg-white ${mini ? "bottom-2 left-2 px-3 py-1.5 text-[0.75rem]" : "bottom-5 left-5 px-5 py-3 text-[0.95rem]"}`}>
            <IconMap className={`${mini ? "size-3.5" : "size-[1.15em]"} text-bronze ${state === "loading" ? "animate-pulse" : ""}`} />
            {state === "loading" ? "Carregando o mapa…" : "Ver mapa interativo"}
            <span className="sr-only"> (carrega o Google Maps)</span>
          </button>
        )}
        <p aria-live="polite" className="sr-only">{state === "ready" ? "Mapa interativo carregado." : ""}</p>
      </div>
      {children}
    </div>
  );
}
