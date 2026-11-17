import { useRef, useState } from "react";
import { gsap, useGSAP, reduced } from "../motion/setup";
import { Lotus } from "./ui";
import { clinic } from "../data/clinic";

const KEY = "site-intro-seen";
let decided: boolean | null = null;

/** Decide uma única vez se o loader aparece (1ª visita da sessão, sem reduced-motion). */
export function shouldShowIntro() {
  if (decided === null) {
    let seen = false;
    try { seen = window.sessionStorage.getItem(KEY) === "1"; } catch { seen = true; }
    decided = !(reduced() || seen);
    window.__introDone = !decided;
  }
  return decided;
}

export function Loader() {
  const [show, setShow] = useState(() => shouldShowIntro());
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || !show) return;
    const html = document.documentElement;
    const stop = (e: Event) => e.cancelable && e.preventDefault();
    html.style.overflow = "hidden";
    html.style.scrollbarGutter = "stable";
    window.__lenis?.stop();
    window.addEventListener("wheel", stop, { passive: false });
    window.addEventListener("touchmove", stop, { passive: false });

    const release = () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      html.style.overflow = "";
      html.style.scrollbarGutter = "";
      window.__lenis?.start();
    };
    const finish = () => {
      try { window.sessionStorage.setItem(KEY, "1"); } catch {}
      window.__introDone = true;
      window.dispatchEvent(new Event("site:intro-done"));
    };
    const safety = window.setTimeout(() => { release(); finish(); setShow(false); }, 3800);

    const q = (s: string) => el.querySelectorAll(s);
    gsap.set(el.querySelector("[data-loader-inner]"), { autoAlpha: 1 });
    gsap.set(q(".lotus-petal"), { drawSVG: "50% 50%" });
    gsap.set(q(".lotus-rule"), { autoAlpha: 0 });
    gsap.set(q(".lotus-dot"), { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ defaults: { ease: "silk" }, onComplete: () => { window.clearTimeout(safety); setShow(false); } });
    tl.fromTo(q(".lotus-petal"), { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", duration: 1.2, ease: "power2.inOut", stagger: 0.1 }, 0)
      .fromTo(q(".lotus-dot"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0.4)
      .fromTo(q(".lotus-rule"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "none" }, 0.45)
      .fromTo(q(".lotus-rule"), { drawSVG: "100% 100%" }, { drawSVG: "0% 100%", duration: 0.9, ease: "breath" }, 0.45)
      .fromTo(q("[data-loader-word]"), { yPercent: 105 }, { yPercent: 0, duration: 0.9 }, 0.65)
      .fromTo(q(".logo-role"), { autoAlpha: 0, scaleX: 1.22, transformOrigin: "50% 50%" }, { autoAlpha: 1, scaleX: 1, duration: 1, ease: "power3.out" }, 0.8)
      .fromTo(q("[data-loader-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "0% 50%" }, 0.35)
      .add(() => { el.style.pointerEvents = "none"; release(); finish(); }, 1.85)
      .fromTo(el, { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, 1.85);

    return () => { window.clearTimeout(safety); release(); };
  }, { scope: ref, dependencies: [show] });

  if (!show) return null;
  return (
    <div ref={ref} data-loader aria-hidden="true" className="fixed inset-0 z-[100] grid place-items-center bg-cream">
      <div data-loader-inner className="relative flex flex-col items-center text-bronze" style={{ visibility: "hidden" }}>
        <Lotus withBase strokeWidth={2} className="h-auto w-[7.5rem] sm:w-[8.75rem]" />
        <div className="mt-7 overflow-hidden pb-1 sm:mt-8">
          <span className="logo-name block text-center font-display text-[1.5rem] font-medium uppercase tracking-[0.22em] text-ink" data-loader-word>
            {clinic.displayName}
          </span>
        </div>
        <span className="logo-role mt-1 text-[0.6rem] font-medium uppercase tracking-[0.55em] text-bronze-deep">Psicologia</span>
        <div className="mt-8 h-px w-36 overflow-hidden bg-bronze/15 sm:mt-9 sm:w-44">
          <div data-loader-bar className="h-full w-full origin-left bg-bronze/80" />
        </div>
      </div>
    </div>
  );
}
