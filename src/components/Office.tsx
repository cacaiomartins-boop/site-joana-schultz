import { clinic, mapsLinks, messages, office } from "../data/clinic";
import { MapCard } from "./MapCard";
import { Eyebrow, IconArrow, IconClock, IconLeaf, IconPin, IconVideo, Reveal, Seal, SplitHeading, WhatsAppButton, rich } from "./ui";

function OpenStatus() {
  const week = clinic.hours.week;
  if (!week.length) return null;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: clinic.hours.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const day = dayMap[get("weekday")] ?? 0;
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  const toM = (s: string) => { const [h, m] = s.split(":").map(Number); return h * 60 + (m || 0); };
  const today = week.find((w) => w.day === day);
  const open = today && mins >= toM(today.opens) && mins < toM(today.closes);
  return (
    <p className="mt-3 inline-flex items-center gap-2.5 rounded-full bg-bronze/10 px-3.5 py-1.5 text-[0.85rem] text-ink">
      {open ? (<><span aria-hidden className="relative flex size-2.5"><span className="animate-ping absolute inline-flex size-full rounded-full bg-sage opacity-60" /><span className="relative inline-flex size-2.5 rounded-full bg-sage" /></span>Aberto agora</>) : (<><span aria-hidden className="inline-flex size-2 rounded-full bg-bronze/60" />Fechado agora</>)}
    </p>
  );
}

export function Office() {
  const p = office.presencial, o = office.online;
  const addr = [clinic.address.street, clinic.address.complement].filter(Boolean).join(" · ");
  return (
    <section id="consultorio" aria-labelledby="consultorio-titulo" className="relative overflow-x-clip bg-cream py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <header className="max-w-[52rem]">
          <Eyebrow number={office.eyebrow.number} label={office.eyebrow.label} />
          <SplitHeading as="h2" className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] sm:mt-8"><span id="consultorio-titulo">{rich(office.title)}</span></SplitHeading>
        </header>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <article aria-labelledby="presencial-titulo" className="lg:col-span-7">
            <MapCard embedUrl={mapsLinks.embed} title={`Mapa de ${clinic.district}, ${clinic.city}`} district={clinic.district} street={clinic.address.street.toUpperCase()} pinName={`Consultório em ${clinic.district}`} pinStreet={`${clinic.city} · ${clinic.state}`}>
              <Seal text={p.seal} className="absolute -bottom-8 right-4 size-[8.5rem] sm:right-8 sm:size-[9.5rem]" />
            </MapCard>
            <Reveal className="mt-14" y={28}>
              <h3 id="presencial-titulo" className="font-display text-[clamp(1.7rem,2.4vw,2.1rem)] font-medium">{p.title}</h3>
              <p className="mt-4 max-w-[36rem] text-[1.0625rem] leading-[1.75] text-text">{p.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {p.features.map((f) => (<li key={f} className="rounded-full border border-bronze/25 bg-ivory px-4 py-2 text-[0.85rem] text-ink">{f}</li>))}
              </ul>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-[0.22em] text-bronze-deep"><IconPin className="size-4" />Endereço</p>
                  <p className="mt-2 text-[1.0625rem] leading-[1.65] text-ink">{addr && <>{addr}<br /></>}{clinic.district}<br />{clinic.city}/{clinic.state}{clinic.address.zip && ` · CEP ${clinic.address.zip}`}</p>
                </div>
                {clinic.hours.summary && (
                  <div>
                    <p className="flex items-center gap-2.5 text-[0.78rem] font-medium uppercase tracking-[0.22em] text-bronze-deep"><IconClock className="size-4" />Horários</p>
                    <p className="mt-2 text-[1.0625rem] text-ink">{clinic.hours.summary}</p>
                    <OpenStatus />
                  </div>
                )}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton message={messages.presencial} source="consultorio">{p.cta}</WhatsAppButton>
                <a href={mapsLinks.directions} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-wine/40 px-6 text-[0.95rem] font-medium text-wine transition-colors duration-500 hover:border-wine hover:bg-wine hover:text-ivory">Como chegar<span className="sr-only"> (Google Maps, abre em nova aba)</span></a>
                <a href={mapsLinks.waze} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full border border-wine/40 px-6 text-[0.95rem] font-medium text-wine transition-colors duration-500 hover:border-wine hover:bg-wine hover:text-ivory">Waze<span className="sr-only"> (abre em nova aba)</span></a>
              </div>
            </Reveal>
          </article>

          <Reveal as="article" className="self-start rounded-[2rem] border border-bronze/15 bg-ivory p-7 shadow-soft sm:p-9 lg:col-span-5" y={32} aria-labelledby="online-titulo">
            <span className="grid size-12 place-items-center rounded-full border border-bronze/20 bg-cream text-bronze"><IconVideo className="size-6" /></span>
            <h3 id="online-titulo" className="mt-5 font-display text-[clamp(1.7rem,2.4vw,2.1rem)] font-medium">{o.title}</h3>
            <p className="mt-4 text-[1.0625rem] leading-[1.75] text-text">{o.text}</p>
            <ul className="mt-6 space-y-3 border-t border-bronze/15 pt-6">
              {o.points.map((t) => (<li key={t} className="flex gap-3 text-[1rem] leading-snug text-ink"><IconLeaf className="mt-1 size-3.5 shrink-0 text-bronze" />{t}</li>))}
            </ul>
            <div className="mt-7 rounded-[1.25rem] border border-sage/30 bg-sage-soft/30 p-5">
              <p className="flex items-start justify-between gap-3 font-display text-[1.35rem] font-medium leading-tight text-ink">{o.note.title}<IconArrow className="mt-1 size-4 shrink-0 text-sage" /></p>
              <p className="mt-2 text-[0.95rem] leading-snug text-text">{o.note.text}</p>
            </div>
            <div className="mt-7"><WhatsAppButton message={messages.online} source="online" variant="outline">{o.cta}</WhatsAppButton></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
