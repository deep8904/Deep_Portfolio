import { UserCircle2, Lock, Eye, ScrollText, Compass, LucideIcon } from "lucide-react";

const STEPS: { icon: LucideIcon; label: string; body: string }[] = [
  { icon: UserCircle2, label: "Developer profile", body: "Role, engines, skills, and availability — created once." },
  { icon: Lock, label: "Private project", body: "Every new project starts private. Nothing is exposed by default." },
  { icon: Eye, label: "Deliberate visibility", body: "The owner chooses when a project becomes unlisted or public." },
  { icon: ScrollText, label: "Devlog", body: "Progress posts attach to the project, not a separate timeline." },
  { icon: Compass, label: "Profile / feed / discover", body: "Public devlogs distribute through the feed and Discover." },
];

export function GlyphValueLoop() {
  return (
    <div className="flex flex-col items-stretch gap-2 tab:flex-row tab:items-start tab:gap-0">
      {STEPS.map((s, i) => (
        <div key={s.label} className="flex flex-1 items-center gap-2 tab:flex-col tab:items-center tab:text-center">
          <div className="flex flex-1 flex-col items-center gap-3 px-2 py-4 text-center tab:flex-none">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong">
              <s.icon size={18} strokeWidth={2} className="text-ink-secondary" />
            </div>
            <span className="text-[13.5px] font-medium tracking-[-0.01em]">{s.label}</span>
            <p className="m-0 text-[13px] leading-[1.5] text-ink-faint text-pretty">{s.body}</p>
          </div>
          {i < STEPS.length - 1 && (
            <span className="shrink-0 text-ink-faint tab:mt-11">→</span>
          )}
        </div>
      ))}
    </div>
  );
}
