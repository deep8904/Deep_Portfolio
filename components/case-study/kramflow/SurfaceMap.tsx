import { Gamepad2, Smartphone, Tv, Radio, Users, MonitorPlay, LucideIcon } from "lucide-react";

const SURFACES: { icon: LucideIcon; name: string; body: string }[] = [
  { icon: Gamepad2, name: "Operator", body: "The desktop control room — session switcher, controls, live details." },
  { icon: Smartphone, name: "Remote", body: "A one-handed mobile controller sharing the same lock/control logic as Operator." },
  { icon: Tv, name: "General display", body: "The default audience-facing screen." },
  { icon: Radio, name: "AV display", body: "Technical-requirements view for the AV team." },
  { icon: Users, name: "Green Room", body: "Speaker-facing view with a ready-to-go toggle." },
  { icon: MonitorPlay, name: "Presenter", body: "A confidence monitor — 6 modes, keyboard shortcuts, wake lock." },
];

export function SurfaceMap() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-2 rounded-2xl border border-line-strong bg-surface px-6 py-6 text-center">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">ONE LIVE STATE</span>
        <span className="text-[19px] font-medium tracking-[-0.02em]">Supabase Realtime</span>
        <span className="text-[15px] leading-[1.6] text-ink-faint">
          Every surface below subscribes to the same Postgres row over a Realtime channel — nothing polls.
        </span>
      </div>

      <div className="relative w-full max-w-[900px]">
        <div className="hidden h-6 border-l border-line-strong tab:mx-auto tab:block tab:w-px" />
        <div className="h-px w-full bg-line-strong" />
      </div>

      <div className="grid w-full max-w-[900px] grid-cols-2 gap-3.5 tab:grid-cols-3">
        {SURFACES.map(({ icon: Icon, name, body }) => (
          <div key={name} className="flex flex-col gap-2.5 rounded-xl border border-line-soft px-4 py-4 tab:px-5 tab:py-5">
            <Icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[14px] font-medium tracking-[-0.01em]">{name}</span>
            <span className="text-[15px] leading-[1.55] text-ink-faint text-pretty">{body}</span>
          </div>
        ))}
      </div>

      <p className="m-0 max-w-[600px] text-center text-[15px] leading-[1.6] text-ink-faint text-pretty">
        Six purpose-built surfaces reading one shared truth about what’s happening now and what’s next — not six
        screens each guessing independently.
      </p>
    </div>
  );
}
