import { Hero } from "../components/Hero";
import { Mirror } from "../components/Mirror";
import { Manifesto } from "../components/Manifesto";
import { Themes } from "../components/Themes";
import { About } from "../components/About";
import { Process } from "../components/Process";
import { Office } from "../components/Office";
import { Psychoeducation } from "../components/Psychoeducation";
import { Faq } from "../components/Faq";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Mirror />
      <Manifesto />
      <Themes />
      <About />
      <Process />
      <Office />
      <Psychoeducation />
      <Faq />
      <Contact />
    </>
  );
}
