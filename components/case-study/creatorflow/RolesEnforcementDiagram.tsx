import { MousePointerClick, ServerCog, Database, ShieldCheck, Crown, Briefcase, PenLine, Palette, Megaphone } from "lucide-react";
import { FlowDiagram } from "@/components/case-study/FlowDiagram";

const FLOW = [
  { icon: MousePointerClick, label: "UI action", body: "A member clicks “move deal,” “invite,” or “remove.”" },
  { icon: ServerCog, label: "Application logic", body: "A server action runs, scoped to the caller's account." },
  { icon: Database, label: "Database permission check", body: "has_role_access() asks: is this caller a member of this account, in an allowed role?" },
  { icon: ShieldCheck, label: "RLS enforcement", body: "Postgres allows or denies the row — not just the button." },
];

const ROLES = [
  { icon: Crown, name: "Owner" },
  { icon: Briefcase, name: "Manager" },
  { icon: PenLine, name: "Editor" },
  { icon: Palette, name: "Designer" },
  { icon: Megaphone, name: "Moderator" },
];

const EXAMPLES = [
  { resource: "Deals & automations", roles: "Owner, Manager" },
  { resource: "Ideas & drafts", roles: "Owner, Editor" },
  { resource: "Repurposed content", roles: "Owner, Editor, Designer" },
];

export function RolesEnforcementDiagram() {
  return (
    <div className="flex flex-col gap-10">
      <FlowDiagram steps={FLOW} />

      <div className="flex flex-col items-center gap-4">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">THE FIVE ENFORCED ROLES</span>
        <div className="flex flex-wrap justify-center gap-2.5">
          {ROLES.map(({ icon: Icon, name }) => (
            <span
              key={name}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-[13px] font-medium text-ink-secondary"
            >
              <Icon size={13} strokeWidth={2} />
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 rounded-xl border border-line-soft px-5 py-5 tab:px-6">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">VERIFIED ACCESS EXAMPLES</span>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {EXAMPLES.map((ex) => (
            <li key={ex.resource} className="flex flex-wrap items-baseline justify-between gap-2 text-[13.5px]">
              <span className="text-ink-secondary">{ex.resource}</span>
              <span className="text-ink-faint">{ex.roles}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
