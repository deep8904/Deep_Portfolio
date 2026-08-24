"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { Section, Container } from "@/components/ui/Container";
import { Footer } from "@/components/layout/Footer";
import { prefersReducedMotion, registerGsap } from "@/lib/motion";
import { AfterHoursHero } from "@/components/after-hours/AfterHoursHero";
import { ConsoleGrid } from "@/components/after-hours/ConsoleGrid";
import { ModeSwitcher } from "@/components/after-hours/ModeSwitcher";
import { ModePanel } from "@/components/after-hours/ModePanel";
import { CurrentlyList } from "@/components/after-hours/CurrentlyList";
import { ModeId, MODES } from "@/lib/after-hours-data";

const VALID_MODES = new Set(MODES.map((m) => m.id));

function readModeFromUrl(): ModeId | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("mode");
  return value && VALID_MODES.has(value as ModeId) ? (value as ModeId) : null;
}

const FrameMode = dynamic(() => import("@/components/after-hours/modes/FrameMode").then((m) => m.FrameMode), {
  ssr: false,
});
const PlayMode = dynamic(() => import("@/components/after-hours/modes/PlayMode").then((m) => m.PlayMode), {
  ssr: false,
});
const SignalMode = dynamic(() => import("@/components/after-hours/modes/SignalMode").then((m) => m.SignalMode), {
  ssr: false,
});
const LabMode = dynamic(() => import("@/components/after-hours/modes/LabMode").then((m) => m.LabMode), {
  ssr: false,
});

export function AfterHoursExperience() {
  const [activeMode, setActiveMode] = useState<ModeId | null>(readModeFromUrl);
  const [completed, setCompleted] = useState<Set<ModeId>>(new Set());
  const rootRef = useRef<HTMLDivElement>(null);
  const allDone = completed.size === 4;

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-ah-intro]"));
    if (!els.length) return;

    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    gsap.set(els, { opacity: 0, y: 14 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.07,
    });
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeMode) url.searchParams.set("mode", activeMode);
    else url.searchParams.delete("mode");
    window.history.replaceState(null, "", url);
  }, [activeMode]);

  const markComplete = (id: ModeId) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div ref={rootRef} className="ah-scope min-h-screen">
      <Section tight>
        <AfterHoursHero />
      </Section>

      <Section>
        {activeMode === null ? (
          <ConsoleGrid completed={completed} onSelect={setActiveMode} />
        ) : (
          <div className="flex flex-col gap-4">
            <ModeSwitcher active={activeMode} completed={completed} onSelect={setActiveMode} />
            <ModePanel active={activeMode} completed={completed}>
              {activeMode === "frame" && <FrameMode onComplete={() => markComplete("frame")} />}
              {activeMode === "play" && <PlayMode onComplete={() => markComplete("play")} />}
              {activeMode === "signal" && <SignalMode onComplete={() => markComplete("signal")} />}
              {activeMode === "lab" && <LabMode onComplete={() => markComplete("lab")} />}
            </ModePanel>
          </div>
        )}

        {allDone && (
          <p className="mt-8 text-[13.5px] leading-[1.6] text-ink-muted text-pretty" role="status">
            You found the part of the portfolio I built mostly for myself.
          </p>
        )}
      </Section>

      <Container>
        <CurrentlyList />
      </Container>

      <Footer />
    </div>
  );
}
