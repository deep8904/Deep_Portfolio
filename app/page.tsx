import { Hero } from "@/components/home/Hero";
import { WhatIBring } from "@/components/home/WhatIBring";
import { AboutPreview } from "@/components/home/AboutPreview";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIBring />
      <AboutPreview />
      <SelectedWork />
      <Process />
      <Testimonials />
    </>
  );
}
