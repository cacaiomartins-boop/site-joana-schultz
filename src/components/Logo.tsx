import { clinic } from "../data/clinic";
import { Lotus } from "./ui";

/** Marca em texto + lótus. Troque por SVG da logo quando a Joana enviar. */
export function Logo({ className = "", stacked = false, lotus = true }: { className?: string; stacked?: boolean; lotus?: boolean }) {
  return (
    <span className={`inline-flex items-center ${stacked ? "flex-col gap-3" : "gap-3"} ${className}`}>
      {lotus && <Lotus className={stacked ? "h-9 w-auto" : "h-8 w-auto shrink-0"} strokeWidth={stacked ? 3.2 : 3.6} />}
      <span className={`flex flex-col leading-none ${stacked ? "items-center" : "items-start"}`}>
        <span data-loader-word className="logo-name font-display text-[1.3rem] font-medium uppercase tracking-[0.22em] sm:text-[1.45rem]">
          {clinic.displayName}
        </span>
        <span className="logo-role mt-1.5 text-[0.58rem] font-medium uppercase tracking-[0.55em] opacity-80">{clinic.role === "Psicóloga" ? "Psicologia" : clinic.role}</span>
      </span>
    </span>
  );
}
