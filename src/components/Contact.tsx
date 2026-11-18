import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP, MQ } from "../motion/setup";
import { clinic, contact, mapsLinks, messages, waLink } from "../data/clinic";
import { MapCard } from "./MapCard";
import { Lotus, Reveal, WhatsAppButton, lotusHide, rich, track } from "./ui";

const formats = [{ v: "presencial", l: "Presencial" }, { v: "online", l: "Online" }, { v: "indecisa", l: "Ainda não sei" }];
const periods = [{ v: "manha", l: "Manhã", t: "manhã" }, { v: "tarde", l: "Tarde", t: "tarde" }];

function Callback() {
  const [fmt, setFmt] = useState("");
  const [per, setPer] = useState("");
  const [err, setErr] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const chip = (on: boolean) => `rounded-full border px-5 py-2.5 text-[0.95rem] transition-colors duration-500 ${on ? "border-gold-soft bg-gold-soft text-wine-deep" : "border-ivory/30 text-ivory/90 hover:border-ivory"}`;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (String(f.get("site") ?? "").trim()) return;
    const nome = String(f.get("nome") ?? "").replace(/\s+/g, " ").trim();
    if (nome.length < 2) { setErr(true); input.current?.focus(); return; }
    setErr(false);
    let msg = `Olá, ${clinic.firstName}! Meu nome é ${nome}. Vim pelo site e gostaria que você me chamasse.`;
    if (fmt === "indecisa") msg += " Ainda não decidi entre presencial e online.";
    else if (fmt) msg += ` Prefiro atendimento ${fmt}.`;
    const p = periods.find((x) => x.v === per);
    if (p) msg += ` Prefiro o período da ${p.t}.`;
    track("formulario");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };
  return (
    <div data-float-avoid className="rounded-[2rem] border border-ivory/15 bg-ivory/10 p-7 backdrop-blur-md sm:p-9">
      <h3 id="cb-titulo" className="text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.08] !text-ivory">{contact.callback.title}</h3>
      <p className="mt-3 text-[1rem] leading-[1.65] text-ivory/75">{contact.callback.text}</p>
      <form noValidate aria-labelledby="cb-titulo" onSubmit={submit} className="mt-7 space-y-6">
        <div>
          <label htmlFor="cb-nome" className="text-[0.85rem] font-medium text-ivory/85">Seu nome</label>
          <input ref={input} id="cb-nome" name="nome" autoComplete="given-name" aria-invalid={err} aria-describedby={err ? "cb-erro" : undefined} className={`mt-2 h-13 w-full rounded-2xl border bg-ivory/10 px-4 py-3.5 text-ivory outline-none transition-colors placeholder:text-ivory/40 focus:border-gold-soft ${err ? "border-red-300" : "border-ivory/20"}`} />
          {err && <p id="cb-erro" role="alert" className="mt-2 text-[0.9rem] text-red-200">Por favor, digite seu nome.</p>}
        </div>
        <fieldset>
          <legend className="text-[0.85rem] font-medium text-ivory/85">Prefiro atendimento</legend>
          <div className="mt-2 flex flex-wrap gap-2.5">{formats.map((f) => (<button key={f.v} type="button" aria-pressed={fmt === f.v} onClick={() => setFmt(fmt === f.v ? "" : f.v)} className={chip(fmt === f.v)}>{f.l}</button>))}</div>
        </fieldset>
        <fieldset>
          <legend className="text-[0.85rem] font-medium text-ivory/85">Melhor período</legend>
          <div className="mt-2 flex flex-wrap gap-2.5">{periods.map((f) => (<button key={f.v} type="button" aria-pressed={per === f.v} onClick={() => setPer(per === f.v ? "" : f.v)} className={chip(per === f.v)}>{f.l}</button>))}</div>
        </fieldset>
        <div aria-hidden className="absolute -left-[9999px]"><label>Deixe este campo em branco<input name="site" tabIndex={-1} autoComplete="off" /></label></div>
        <button type="submit" className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-ivory px-7 text-[1.02rem] font-medium text-wine shadow-soft transition-colors duration-500 hover:bg-white">Abrir mensagem no WhatsApp<span className="sr-only"> (abre em nova aba)</span></button>
      </form>
      <p className="mt-5 text-[0.85rem] leading-snug text-ivory/65">{contact.callback.privacy} <Link to="/privacidade" className="underline underline-offset-4 hover:text-ivory">Política de privacidade</Link></p>
    </div>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const panel = el.querySelector("[data-cta-panel]");
    if (!panel) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
      const { desktop } = ctx.conditions as any;
      const st = { trigger: panel, start: "top bottom", end: "top 22%", scrub: 0.8 };
      gsap.fromTo(panel, { clipPath: desktop ? "inset(5% 7% 3% 7% round 4rem)" : "inset(2.5% 3.5% 1.5% 3.5% round 2.5rem)" }, { clipPath: desktop ? "inset(0% round 2.5rem)" : "inset(0% round 1.75rem)", ease: "none", scrollTrigger: st });
      const inner = el.querySelector("[data-cta-inner]");
      if (inner) gsap.fromTo(inner, { y: desktop ? 90 : 40 }, { y: 0, ease: "none", scrollTrigger: st });
      const glows = el.querySelectorAll("[data-cta-glow]");
      if (glows.length) gsap.fromTo(glows, { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1 } });
      const lot = el.querySelector("[data-cta-lotus]");
      if (lot) {
        lotusHide(lot);
        gsap.timeline({ scrollTrigger: { trigger: lot, start: "top 85%", once: true } })
          .to(lot.querySelectorAll(".lotus-petal"), { autoAlpha: 1, drawSVG: "0% 100%", duration: 1.6, stagger: 0.12, ease: "breath" })
          .to(lot.querySelectorAll(".lotus-rule"), { autoAlpha: 1, drawSVG: "0% 100%", duration: 1.2, ease: "breath" }, 0.5)
          .to(lot.querySelectorAll(".lotus-dot"), { scale: 1, duration: 0.8, ease: "back.out(2)" }, 0.55);
      }
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="contato" className="relative bg-cream px-2.5 py-16 sm:px-4 sm:py-20 lg:py-24">
      <div data-cta-panel data-theme="dark" className="grain relative overflow-hidden rounded-[2rem] bg-forest text-ivory sm:rounded-[2.5rem]">
        <div data-cta-glow aria-hidden className="pointer-events-none absolute -left-[10%] -top-[25%] size-[48rem] rounded-full bg-[radial-gradient(closest-side,rgba(98,140,112,0.45),transparent)]" />
        <div data-cta-glow aria-hidden className="pointer-events-none absolute -bottom-[30%] right-[-10%] size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(112,42,55,0.4),transparent)]" />
        <div data-cta-inner className="container-site relative grid gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-32">
          <div className="lg:col-span-6">
            <div data-cta-lotus aria-hidden className="w-24 text-gold-soft"><Lotus withBase strokeWidth={1.6} className="h-auto w-full" /></div>
            <h2 className="mt-8 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] !text-ivory">{rich(contact.title, "italic text-gold-soft")}</h2>
            <p className="mt-6 max-w-[32rem] text-[1.0625rem] leading-[1.75] text-ivory/75">{contact.text}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <WhatsAppButton message={messages.general} source="contato" variant="light" size="lg">{contact.button}</WhatsAppButton>
              <p className="text-[0.95rem] text-ivory/70">WhatsApp {clinic.phoneDisplay}{clinic.hours.short && <><br />{clinic.hours.short}</>}</p>
            </div>
          </div>
          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-8"><Callback /></div>
        </div>

        <div className="container-site relative pb-10 lg:flex lg:justify-end lg:pb-12">
          <div data-float-avoid className="w-full lg:w-[15rem]">
            <MapCard mini embedUrl={mapsLinks.embed} title={`Mapa de ${clinic.district}`} district={clinic.district} street={clinic.address.street.toUpperCase()} pinName={clinic.district} pinStreet={clinic.city}>
              <p className="mt-2 flex items-center justify-between gap-3 text-[0.8rem] text-ivory/75">
                <span>{clinic.district} · {clinic.city}</span>
                <span className="flex gap-3">
                  <a href={mapsLinks.directions} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ivory">Como chegar</a>
                  <a href={mapsLinks.waze} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ivory">Waze</a>
                </span>
              </p>
            </MapCard>
          </div>
        </div>
      </div>
    </section>
  );
}
