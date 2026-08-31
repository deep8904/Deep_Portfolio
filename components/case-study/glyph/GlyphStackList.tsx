const STACK = [
  { name: "Next.js 16 + TypeScript", purpose: "App Router, Server Components by default, Server Actions for mutations." },
  { name: "Supabase Postgres", purpose: "19-table schema — identity, projects, devlogs, social graph, playtests, events, collaboration." },
  { name: "Supabase Auth", purpose: "Email/password and GitHub OAuth, session refresh via SSR middleware." },
  { name: "Row Level Security", purpose: "Declared across all 19 tables; private-default projects enforced at the database layer." },
  { name: "Supabase Storage", purpose: "Owner-scoped project media, resolved to short-lived signed URLs." },
  { name: "Zod", purpose: "Server Action payload validation before any mutation runs." },
  { name: "Tailwind v4", purpose: "Warm near-black/sand/peach editorial system, configured via @theme." },
];

export function GlyphStackList() {
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
