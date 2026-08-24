const STEPS = [
  {
    label: "Problem",
    body: "Sending or viewing a team invite silently failed — no error visible in the UI.",
  },
  {
    label: "Root cause",
    body: "The invite-visibility RLS policy queried auth.users directly in its USING clause. RLS policies run as the querying role, which has no grant on auth.users — so that one policy throwing broke every authenticated query against team_invites, including the owner's own.",
  },
  {
    label: "Fix",
    body: "Replaced the auth.users lookup with auth.jwt() ->> 'email' — reading the caller's own email off their session token instead of querying a table they can't access.",
  },
  {
    label: "Verification",
    body: "Re-ran a real invite → accept → revoke cycle against the live database and confirmed each step by querying the table directly, not by trusting the UI.",
  },
];

export function InviteVisibilityDiagram() {
  return (
    <ol className="m-0 flex list-none flex-col gap-0 p-0">
      {STEPS.map((step, i) => (
        <li key={step.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-[12px] font-medium text-ink-secondary">
              {i + 1}
            </span>
            {i < STEPS.length - 1 && <span className="my-1 w-px flex-1 bg-line-soft" />}
          </div>
          <div className="flex flex-col gap-1 pb-7">
            <span className="text-[13.5px] font-medium tracking-[-0.01em]">{step.label}</span>
            <p className="m-0 max-w-[540px] text-[13.5px] leading-[1.65] text-ink-faint text-pretty">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
