const STACK = [
  { name: "Next.js + TypeScript", purpose: "Application framework and type safety across operator, remote, and display surfaces." },
  { name: "Supabase Realtime", purpose: "Postgres change subscriptions driving every surface off one shared state row — no polling." },
  { name: "Supabase Auth", purpose: "Per-operator accounts, replacing an earlier shared-PIN cookie scheme." },
  { name: "PostgreSQL", purpose: "11-table schema covering sessions, programs, live state, displays, and broadcasts." },
  { name: "Zod", purpose: "Request validation on the API routes that mutate shared live state." },
];

export function StackList() {
  return (
    <ul className="m-0 flex list-none flex-col gap-0 p-0">
      {STACK.map((item) => (
        <li
          key={item.name}
          className="flex flex-col gap-1 border-t border-line-soft py-4 first:border-t-0 first:pt-0 tab:flex-row tab:items-baseline tab:justify-between tab:gap-6"
        >
          <span className="text-[14.5px] font-medium tracking-[-0.01em] tab:w-[240px] tab:shrink-0">{item.name}</span>
          <span className="text-[15px] leading-[1.6] text-ink-faint text-pretty">{item.purpose}</span>
        </li>
      ))}
    </ul>
  );
}
