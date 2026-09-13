import { Rss, Layers, SearchCheck, PenLine, ShieldCheck, UploadCloud, Send, type LucideIcon } from "lucide-react";
import clsx from "clsx";

const STAGES: { icon: LucideIcon; name: string; body: string; kind: "auto" | "human" }[] = [
  { icon: Rss, name: "Discover", body: "Pull RSS, Atom, and Hacker News signals on a schedule. Deterministic, no model call.", kind: "auto" },
  { icon: Layers, name: "Cluster & rank", body: "Merge duplicate coverage and score every candidate against a fixed, explainable formula.", kind: "auto" },
  { icon: Send, name: "Topic approval", body: "A ranked shortlist goes to Telegram. Nothing is researched until a topic is approved.", kind: "human" },
  { icon: SearchCheck, name: "Research", body: "Retrieve and extract real sources, then score evidence sufficiency before anything drafts.", kind: "auto" },
  { icon: PenLine, name: "Draft & review", body: "One model writes the article; a second pass reviews it against deterministic blockers and revises until clean.", kind: "auto" },
  { icon: ShieldCheck, name: "Final approval", body: "The finished article returns to Telegram. Nothing publishes without an explicit approve.", kind: "human" },
  { icon: UploadCloud, name: "Publish & verify", body: "One commit to Deep-Blog, checked against a live Vercel deployment at that exact commit.", kind: "auto" },
];

export function PipelineFlow() {
  return (
    <div className="flex flex-col gap-3.5">
      {STAGES.map((stage, i) => (
        <div key={stage.name} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={clsx(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                stage.kind === "human" ? "border-accent bg-accent/10 text-accent" : "border-line-strong text-ink-faint"
              )}
            >
              <stage.icon size={16} strokeWidth={2} />
            </span>
            {i < STAGES.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-line-soft" />}
          </div>
          <div className="flex flex-col gap-1 pb-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[14.5px] font-medium tracking-[-0.01em]">{stage.name}</span>
              {stage.kind === "human" && (
                <span className="rounded-full border border-accent/40 px-2 py-[1px] text-[10.5px] font-semibold tracking-[0.08em] text-accent">
                  TELEGRAM
                </span>
              )}
            </div>
            <p className="m-0 max-w-[520px] text-[14.5px] leading-[1.6] text-ink-faint text-pretty">{stage.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
