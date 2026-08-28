import { CircleDashed, CircleSlash, Sparkles, CheckCircle2, LucideIcon } from "lucide-react";
import clsx from "clsx";

type Tier = "real-ai" | "template" | "not-ai" | "not-implemented";

const TIER_CONFIG: Record<Tier, { label: string; icon: LucideIcon; className: string }> = {
  "real-ai": { label: "Real AI", icon: CheckCircle2, className: "border-line-strong text-ink-secondary" },
  template: { label: "Template / Preview", icon: CircleDashed, className: "border-dashed border-line-strong text-ink-secondary" },
  "not-ai": { label: "Real, not AI", icon: Sparkles, className: "border-line-strong text-ink-secondary" },
  "not-implemented": { label: "Not implemented", icon: CircleSlash, className: "border-dashed border-line-soft text-ink-faint" },
};

const ROWS: { name: string; tier: Tier; note: string }[] = [
  {
    name: "Repurpose suggestions",
    tier: "real-ai",
    note: "In production, generating a new suggestion calls Gemini against the video's real transcript — genuinely model-backed. The demo account ships pre-generated results for a few videos instead of requiring a live API key, and says so in the UI.",
  },
  {
    name: "AI Assistant",
    tier: "template",
    note: "Labeled in its own interface: “answers are assembled from templates against your real data, not a live model call.”",
  },
  {
    name: "“Draft reply” / “Review contract”",
    tier: "template",
    note: "Template-based output built from a rate card and structure. Labeled “— preview” on the button itself.",
  },
  {
    name: "Gmail deal detection",
    tier: "not-ai",
    note: "A real, narrow keyword-based classifier — genuine integration code, but not a model call. Worth stating plainly either way.",
  },
  {
    name: "Draft dictation (mic)",
    tier: "not-ai",
    note: "The browser's own Web Speech API. Easy to mistake for an AI feature because of where it sits in the UI; it isn't one.",
  },
  {
    name: "Video → repurpose suggestions",
    tier: "not-implemented",
    note: "The automation rule exists and is visible in Settings; nothing currently generates a suggestion when it fires.",
  },
];

export function AiHonestyMatrix() {
  return (
    <div className="flex flex-col gap-3.5">
      {ROWS.map((row) => {
        const cfg = TIER_CONFIG[row.tier];
        return (
          <div key={row.name} className="flex flex-col gap-2 rounded-xl border border-line-soft px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-[13.5px] font-medium tracking-[-0.01em]">{row.name}</span>
              <span
                className={clsx(
                  "inline-flex h-[24px] shrink-0 items-center gap-[6px] rounded-md border px-2.5 text-[11.5px] font-medium tracking-[0.02em]",
                  cfg.className
                )}
              >
                <cfg.icon size={11} strokeWidth={2.25} />
                {cfg.label}
              </span>
            </div>
            <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{row.note}</p>
          </div>
        );
      })}
    </div>
  );
}
