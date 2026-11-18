import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { clinic, messages, themes } from "../data/clinic";
import { FaqList } from "../components/Faq";
import { Eyebrow, FitBox, IconArrow, Reveal, SplitHeading, ThemeIcon, WhatsAppButton } from "../components/ui";

export function ThemePage() {
  const { slug } = useParams();
  const theme = themes.find((t) => t.slug === slug);
  useEffect(() => {
    if (!theme) return;
    document.title = `Terapia para ${theme.label.toLowerCase()} no ${clinic.city} · ${clinic.displayName}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", theme.page.metaDescription);
    return () => { document.title = clinic.seo.title; document.querySelector('meta[name="description"]')?.setAttribute("content", clinic.seo.description); };
  }, [theme]);
  if (!theme) return <Navigate to="/" replace />;
  const p = theme.page;
  const others = themes.filter((t) => t.slug !== theme.slug);

  return (
    <>
      <section className="fit-section relative overflow-clip bg-[linear-gradient(180deg,var(--color-cream),var(--color-blush)_160%)] pb-20 pt-[8.5rem] sm:pt-[10rem] lg:pb-28">
        <FitBox className="container-site">
          <nav aria-label="Você está em" className="text-[0.9rem] text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="ulink">Início</Link></li><li aria-hidden>/</li>
              <li><Link to="/#como-ajudo" className="ulink">Como posso ajudar</Link></li><li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">{theme.label}</li>
            </ol>
          </nav>
          <div className="mt-10 max-w-[52rem]">
            <Eyebrow label={`Psicoterapia · ${theme.label}`} />
            <SplitHeading as="h1" className="mt-7 text-[clamp(2.6rem,6vw,5rem)] leading-[1] tracking-[-0.015em] text-ink">
              {p.h1a}<br /><em className="italic text-wine">{p.h1b}</em>
            </SplitHeading>
            <Reveal className="mt-8" y={28}>
              <p className="max-w-[40rem] text-[1.15rem] leading-[1.75] text-text">{p.intro}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <WhatsAppButton message={messages.theme(theme.label.toLowerCase())} source={`pagina-${theme.slug}`} size="lg" icon="arrow">{theme.cta}</WhatsAppButton>
                <Link to="/#processo" className="ulink py-2 text-[1rem] font-medium text-wine">Como funciona a terapia</Link>
              </div>
            </Reveal>
          </div>
        </FitBox>
      </section>

      <section aria-labelledby="reconhecer" className="fit-section bg-linen py-24 sm:py-28 lg:py-32">
        <FitBox className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow label="Talvez seja com você" />
            <SplitHeading as="h2" className="mt-7 text-[clamp(2.2rem,3.8vw,3.5rem)] leading-[1.04]"><span id="reconhecer">Você se reconhece <em className="italic text-wine">em alguma destas situações?</em></span></SplitHeading>
          </div>
          <Reveal as="ol" className="lg:col-span-7" stagger={0.1} y={24}>
            {p.recognize.map((t, i) => (
              <li key={i} data-reveal-item className="grid grid-cols-[2rem_1fr] gap-5 border-b border-bronze/20 py-6 first:border-t">
                <span aria-hidden className="pt-1.5 text-[0.78rem] tracking-[0.1em] text-bronze">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display text-[1.5rem] leading-[1.3] text-ink">{t}</p>
              </li>
            ))}
          </Reveal>
        </FitBox>
      </section>

      <section aria-labelledby="caminhos" className="fit-section bg-cream py-24 sm:py-28 lg:py-32">
        <FitBox className="container-site">
          <Eyebrow label="Como a terapia ajuda" />
          <SplitHeading as="h2" className="mt-7 max-w-[40rem] text-[clamp(2.2rem,3.8vw,3.5rem)] leading-[1.04]"><span id="caminhos">Caminhos <em className="italic text-wine">possíveis, no seu ritmo.</em></span></SplitHeading>
          <Reveal as="ul" className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12} y={32}>
            {p.paths.map((x, i) => (
              <li key={x.title} data-reveal-item className="rounded-[1.75rem] border border-bronze/15 bg-ivory p-8 shadow-soft">
                <span aria-hidden className="font-display text-[2.4rem] italic leading-none text-bronze">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[1.6rem] font-medium leading-[1.1]">{x.title}</h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.65] text-text">{x.text}</p>
              </li>
            ))}
          </Reveal>
        </FitBox>
      </section>

      <section aria-labelledby="abordagem" className="fit-section bg-linen py-24 sm:py-28 lg:py-32">
        <FitBox className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow label="Minha abordagem" />
            <SplitHeading as="h2" className="mt-7 text-[clamp(2.2rem,3.8vw,3.5rem)] leading-[1.04]"><span id="abordagem">Como eu <em className="italic text-wine">trabalho esse tema.</em></span></SplitHeading>
          </div>
          <Reveal className="space-y-5 text-[1.0625rem] leading-[1.75] text-text lg:col-span-7" stagger={0.1} y={24}>
            {p.approach.map((t, i) => (<p key={i} data-reveal-item>{t}</p>))}
          </Reveal>
        </FitBox>
      </section>

      <section aria-labelledby="faq-tema" className="fit-section bg-cream py-24 sm:py-28 lg:py-32">
        <FitBox className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow label="Dúvidas sobre este tema" />
            <SplitHeading as="h2" className="mt-7 text-[clamp(2.2rem,3.6vw,3.25rem)] leading-[1.04]"><span id="faq-tema">Antes de começar, <em className="italic text-wine">talvez você se pergunte…</em></span></SplitHeading>
          </div>
          <div className="lg:col-span-8"><FaqList items={p.faq} /></div>
        </FitBox>
      </section>

      <section aria-labelledby="outros" className="fit-section bg-linen py-24 sm:py-28 lg:py-32">
        <FitBox className="container-site">
          <Eyebrow label="Outros temas" />
          <h2 id="outros" className="sr-only">Outros temas</h2>
          <Reveal as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} y={24}>
            {others.map((t) => (
              <li key={t.slug} data-reveal-item>
                <Link to={`/terapia/${t.slug}`} className="group flex items-center gap-4 rounded-[1.5rem] border border-bronze/15 bg-ivory p-5 shadow-soft transition-shadow duration-700 hover:shadow-card">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-bronze/20 bg-cream text-bronze"><ThemeIcon name={t.icon} className="size-6" /></span>
                  <span className="flex-1 font-display text-[1.35rem] font-medium leading-tight">{t.label}</span>
                  <IconArrow className="size-5 text-bronze transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </Reveal>
          <Reveal className="mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center" y={24}>
            <WhatsAppButton message={messages.theme(theme.label.toLowerCase())} source={`pagina-${theme.slug}-final`} size="lg">Agendar uma conversa</WhatsAppButton>
          </Reveal>
        </FitBox>
      </section>
    </>
  );
}
