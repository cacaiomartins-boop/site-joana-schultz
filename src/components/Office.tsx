import { clinic, mapsLinks, messages, office } from "../data/clinic";
import { MapCard } from "./MapCard";
import { Eyebrow, FitBox, IconClock, IconLeaf, IconPin, IconVideo, Reveal, Seal, SplitHeading, WhatsAppButton, rich } from "./ui";

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
    <p className="mt-2 inline-flex items-center gap-2.5 rounded-full bg-bronze/10 px-3.5 py-1 text-[0.85rem] text-ink">
      {open ? (<><span aria-hidden className="relative flex size-2.5"><span className="animate-ping absolute inline-flex size-full rounded-full bg-sage opacity-60" /><span className="relative inline-flex size-2.5 rounded-full bg-sage" /></span>Aberto agora</>) : (<><span aria-hidden className="inline-flex size-2 rounded-full bg-bronze/60" />Fechado agora</>)}
    </p>
  );
}

const pill = "inline-flex h-11 items-center gap-2 rounded-full border border-wine/40 px-5 text-[0.92rem] font-medium text-wine transition-colors duration-500 hover:border-wine hover:bg-wine hover:text-ivory";

export function Office() {
  const p = office.presencial, o = office.online;
  const addr = [clinic.address.street, clinic.address.complement].filter(Boolean).join(" · ");
  return (
    <section id="consultorio" aria-labelledby="consultorio-titulo" className="fit-section relative overflow-x-clip bg-cream py-24 sm:py-32 lg:py-40">
      <FitBox className="container-site">
        <header className="max-w-[52rem]">
          <Eyebrow number={office.eyebrow.number} label={office.eyebrow.label} />
          <SplitHeading as="h2" className="mt-7 text-[clamp(2.3rem,4.4vw,4.25rem)] leading-[1.02] sm:mt-8 lg:mt-[clamp(0.75rem,2svh,1.5rem)] lg:!text-[clamp(2rem,min(3.6vw,5.8svh),3.4rem)]"><span id="consultorio-titulo">{rich(office.title)}</span></SplitHeading>
        </header>

        <div className="mt-12 grid gap-10 lg:mt-[clamp(1rem,3svh,2rem)] lg:grid-cols-12 lg:gap-x-8 lg:gap-y-5">
          <div className="lg:col-span-6">
            <MapCard heightClass="lg:!h-[clamp(13rem,40svh,20rem)]" embedUrl={mapsLinks.embed} title={`Mapa de ${clinic.district}, ${clinic.city}`} district={clinic.district} street={clinic.address.street.toUpperCase()} pinName={`Consultório em ${clinic.district}`} pinStreet={`${clinic.city} · ${clinic.state}`}>
              <Seal text={p.seal} className="absolute -bottom-6 right-4 size-[7.5rem] sm:right-8 sm:size-[8.5rem]" />
            </MapCard>
          </div>

          <article aria-labelledby="presencial-titulo" className="lg:col-span-6">
            <Reveal y={28}>
              <h3 id="presencial-titulo" className="font-display text-[clamp(1.7rem,2.4vw,2.1rem)] font-medium lg:text-[clamp(1.5rem,3.4svh,1.9rem)]">{p.title}</h3>
              <p className="mt-3 max-w-[36rem] text-[1.0625rem] leading-[1.7] text-text lg:text-[clamp(0.9rem,2.1svh,1rem)] lg:leading-[1.55]">{p.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.features.map((f) => (<li key={f} className="rounded-full border border-bronze/25 bg-ivory px-3.5 py-1.5 text-[0.82rem] text-ink">{f}</li>))}
              </ul>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-bronze-deep"><IconPin className="size-4" />Endereço</p>
                  <p className="mt-1.5 text-[1rem] leading-[1.5] text-ink">{addr && <>{addr}<br /></>}{clinic.district}, {clinic.city}/{clinic.state}{clinic.address.zip && ` · CEP ${clinic.address.zip}`}</p>
                </div>
                {clinic.hours.summary && (
                  <div>
                    <p className="flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-bronze-deep"><IconClock className="size-4" />Horários</p>
                    <p className="mt-1.5 text-[1rem] text-ink">{clinic.hours.summary}</p>
                    <OpenStatus />
                  </div>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <WhatsAppButton message={messages.presencial} source="consultorio" className="lg:!h-11">{p.cta}</WhatsAppButton>
                <a href={mapsLinks.directions} target="_blank" rel="noopener noreferrer" className={pill}>Como chegar<span className="sr-only"> (Google Maps, abre em nova aba)</span></a>
                <a href={mapsLinks.waze} target="_blank" rel="noopener noreferrer" className={pill}>Waze<span className="sr-only"> (abre em nova aba)</span></a>
              </div>
            </Reveal>
          </article>

          <Reveal as="aside" aria-labelledby="online-titulo" y={32} className="grid gap-5 rounded-[1.75rem] border border-bronze/15 bg-ivory p-6 shadow-soft lg:col-span-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:items-center lg:gap-8 lg:p-[clamp(1rem,2.6svh,1.75rem)]">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-bronze/20 bg-cream text-bronze"><IconVideo className="size-5" /></span>
              <div>
                <h3 id="online-titulo" className="font-display text-[1.6rem] font-medium leading-none lg:text-[clamp(1.35rem,3.2svh,1.7rem)]">{o.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-[1.55] text-text lg:text-[clamp(0.85rem,1.95svh,0.95rem)]">{o.text}</p>
              </div>
            </div>
            <ul className="space-y-2 lg:border-l lg:border-bronze/15 lg:pl-8">
              {o.points.map((t) => (<li key={t} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink"><IconLeaf className="mt-1 size-3 shrink-0 text-bronze" />{t}</li>))}
            </ul>
            <div className="space-y-3 lg:border-l lg:border-bronze/15 lg:pl-8">
              <p className="rounded-xl border border-sage/30 bg-sage-soft/30 p-3 text-[0.9rem] leading-snug text-text"><strong className="block font-display text-[1.1rem] font-medium text-ink">{o.note.title}</strong>{o.note.text}</p>
              <WhatsAppButton message={messages.online} source="online" variant="outline" className="lg:!h-11">{o.cta}</WhatsAppButton>
            </div>
          </Reveal>
        </div>
      </FitBox>
    </section>
  );
}
