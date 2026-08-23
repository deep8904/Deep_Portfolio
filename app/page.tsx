import { Hero } from "@/components/home/Hero";
import { WhatIBring } from "@/components/home/WhatIBring";
import { AboutPreview } from "@/components/home/AboutPreview";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="order-1">
        <Hero />
      </div>
      <div className="order-2">
        <WhatIBring />
      </div>
      {/*
        Mobile-only reorder: Selected Work (the evidence) surfaces right after
        "What I Bring" instead of waiting behind the About preview. Desktop/tablet
        keep the original, approved order (About preview, then Selected Work).
      */}
      <div className="order-3 tab:order-4">
        <SelectedWork />
      </div>
      <div className="order-4 tab:order-3">
        <AboutPreview />
      </div>
      <div className="order-5">
        <Process />
      </div>
      <div className="order-6">
        <Testimonials />
      </div>
    </div>
  );
}
