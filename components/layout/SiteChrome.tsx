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
    let cleanup = () => {};
    const frame = requestAnimationFrame(() => {
      cleanup = buildRevealScene();
      ScrollTrigger.refresh();
    });
    // Web fonts and below-the-fold images can resize content after this
    // route's initial reveal-scene is built; re-measure so ScrollTrigger's
    // start positions don't go stale for a route the user is still on.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(frame);
      cleanup();
      window.removeEventListener("load", refresh);
    };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-bg">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[400] -translate-y-20 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-cream transition-transform duration-150 focus:translate-y-0"
      >
        Skip to content
      </a>
      <IntroOverlay />
      <MobileNav key={pathname} />
      <Sidebar />
      <main id="main-content" tabIndex={-1} className="outline-none tab:ml-[214px] desk:ml-[264px]">
        {children}
        <Footer />
      </main>
    </div>
  );
}
