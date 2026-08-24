import { LayoutGrid, Kanban, Lightbulb, FileText, Users, Settings, LucideIcon } from "lucide-react";

const MODULES: { icon: LucideIcon; name: string; body: string }[] = [
  { icon: LayoutGrid, name: "Dashboard", body: "Aggregates open deals, follow-ups, and recent activity in one view." },
  { icon: Kanban, name: "Deals", body: "Sponsorship pipeline as a staged board, from inbound to paid." },
  { icon: Lightbulb, name: "Ideas", body: "Captures content ideas and tracks them through a status." },
  { icon: FileText, name: "Drafts", body: "Where an idea becomes written content, ready to publish." },
  { icon: Users, name: "Team", body: "Invites collaborators into the account under a specific role." },
  { icon: Settings, name: "Settings", body: "Account, profile, and connected-integration state." },
];

export function ProductSystemMap() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-2 rounded-2xl border border-line-strong bg-surface px-6 py-6 text-center">
        <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">ONE ACCOUNT</span>
        <span className="text-[19px] font-medium tracking-[-0.02em]">CreatorFlow</span>
        <span className="text-[13px] leading-[1.6] text-ink-faint">
          Shared auth, one account per workspace, one role-based permission layer underneath every module.
        </span>
      </div>

      <div className="relative w-full max-w-[900px]">
        <div className="hidden h-6 border-l border-line-strong tab:mx-auto tab:block tab:w-px" />
        <div className="h-px w-full bg-line-strong" />
      </div>

      <div className="grid w-full max-w-[900px] grid-cols-2 gap-3.5 tab:grid-cols-3">
        {MODULES.map(({ icon: Icon, name, body }) => (
          <div key={name} className="flex flex-col gap-2.5 rounded-xl border border-line-soft px-4 py-4 tab:px-5 tab:py-5">
            <Icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[14px] font-medium tracking-[-0.01em]">{name}</span>
            <span className="text-[13px] leading-[1.55] text-ink-faint text-pretty">{body}</span>
          </div>
        ))}
      </div>

      <p className="m-0 max-w-[560px] text-center text-[13px] leading-[1.6] text-ink-faint text-pretty">
        Search works as a lightweight layer across Ideas and Deals rather than a separate module — this is a
        connected system, not six disconnected screens.
      </p>
    </div>
  );
}
