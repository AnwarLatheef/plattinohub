import Navigation from "@/components/Navigation/Navigation";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import WhatWeServe from "@/components/WhatWeServe/WhatWeServe";
import StoreLocator from "@/components/StoreLocator/StoreLocator";
import Footer from "@/components/Footer/Footer";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="page">
        <Hero />
        <About />
        <WhatWeServe />
        <StoreLocator />
        <Contact />
      </main>

      <Footer />
    </>
  );
}