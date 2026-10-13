/*
THESIS: The portfolio is one rail network. A career line turns into a platform line, and the platform's own Control and
Signal lines carry live readings from a real cluster. It refuses the dark dashboard of stat cards.
OWN-WORLD: Light printed map ground, ink type, four line colors that each mean one thing (career blue, platform purple,
control green, signal red), Overpass signage lettering with Overpass Mono readouts, enamel plates, no cards or shadows.
STORY: The visitor reads the name as a station sign, sees security work branch into platform engineering in one strip,
then watches the live heartbeat arrive at "This page" and opens any station to its manifest.
FIRST VIEWPORT: Name plate at display size top left with a four-line color band, positioning line and contact plate
beneath; live service board top right; career strip map spanning the full width below.
FORM: Platform Transit Map, third on the ordered list, staged as station signage over a strip map. Seed bc9987c9.
*/

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { NetworkSection } from "@/components/network/NetworkSection";
import { NotExposed } from "@/components/network/NotExposed";
import { Timetable } from "@/components/career/Timetable";
import { StackIndex } from "@/components/career/StackIndex";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NetworkSection />
        <NotExposed />
        <Timetable />
        <StackIndex />
      </main>
      <Footer />
    </>
  );
}
