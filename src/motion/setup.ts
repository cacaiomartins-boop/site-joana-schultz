import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, CustomEase, useGSAP);
CustomEase.create("silk", "0.22, 1, 0.36, 1");
CustomEase.create("breath", "0.45, 0, 0.2, 1");
gsap.defaults({ ease: "silk", duration: 1.1 });

export { gsap, ScrollTrigger, SplitText, useGSAP };

declare global {
  interface Window {
    __lenis?: Lenis;
    __introDone?: boolean;
    __motionReady?: boolean;
  }
}

export const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktopPin: "(min-width: 1024px) and (min-height: 640px)",
  desktop: "(min-width: 1024px)",
  fine: "(hover: hover) and (pointer: fine)",
};

/** Rolagem suave (desligada com reduced-motion ou ponteiro "coarse"). */
export function initLenis(): () => void {
  window.__motionReady = true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduced() || coarse) return () => {};
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.95,
    anchors: true,
  });
  window.__lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    window.__lenis = undefined;
  };
}

/** Espera o fim do loader de abertura (ou o tempo de segurança). */
export function onIntroDone(cb: () => void, max = 3800): () => void {
  if (window.__introDone) {
    cb();
    return () => {};
  }
  let done = false;
  let timer = 0;
  const run = () => {
    if (done) return;
    done = true;
    window.clearTimeout(timer);
    window.removeEventListener("site:intro-done", run);
    cb();
  };
  timer = window.setTimeout(run, max);
  window.addEventListener("site:intro-done", run);
  return () => {
    done = true;
    window.clearTimeout(timer);
    window.removeEventListener("site:intro-done", run);
  };
}

export function scrollToY(y: number, duration = 1.1) {
  if (window.__lenis) window.__lenis.scrollTo(y, { duration, force: true });
  else window.scrollTo(0, y);
}
