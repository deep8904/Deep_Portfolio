"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { IntroOverlay } from "@/components/layout/IntroOverlay";
import { buildRevealScene, prefersReducedMotion, registerGsap } from "@/lib/motion";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const frame = requestAnimationFrame(() => {
      const cleanup = buildRevealScene();
      ScrollTrigger.refresh();
      return cleanup;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-bg">
      <IntroOverlay />
      <MobileNav key={pathname} />
      <Sidebar />
      <main className="tab:ml-[214px] desk:ml-[264px]">
        {children}
        <Footer />
      </main>
    </div>
  );
}
