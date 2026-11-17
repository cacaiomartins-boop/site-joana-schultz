import { clinic, privacyText } from "../data/clinic";
import { Eyebrow, Reveal } from "../components/ui";

export function Privacy() {
  return (
    <section className="bg-cream pb-24 pt-[9rem] sm:pt-[11rem] lg:pb-32">
      <div className="container-site max-w-[52rem]">
        <Eyebrow label="Política de privacidade" />
        <h1 className="mt-7 text-[clamp(2.4rem,5vw,4rem)] leading-[1.02]">Política de <em className="italic text-wine">privacidade</em></h1>
        <Reveal className="mt-10 space-y-8" y={24} stagger={0.08}>
          {privacyText.map((s) => (
            <div key={s.h} data-reveal-item>
              <h2 className="font-display text-[1.7rem] font-medium">{s.h}</h2>
              <p className="mt-2 text-[1.0625rem] leading-[1.75] text-text">{s.p}</p>
            </div>
          ))}
          <p data-reveal-item className="text-[0.95rem] text-muted">{clinic.role} {clinic.fullName} · {clinic.registry}</p>
        </Reveal>
      </div>
    </section>
  );
}
