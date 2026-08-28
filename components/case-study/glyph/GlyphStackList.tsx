const STACK = [
  { name: "Next.js 16 + TypeScript", purpose: "Server Components by default, Server Actions for mutations, Route Handlers for reads that need pagination." },
  { name: "Supabase Postgres", purpose: "19-table schema — identity, projects, devlogs, playtests, social graph, events, collaboration." },
  { name: "Supabase Auth + RLS", purpose: "Email/password and GitHub OAuth; every table enforces ownership and visibility at the database layer." },
  { name: "Supabase Storage", purpose: "Project covers and screenshots resolved to short-lived signed URLs, scoped by owner and project visibility." },
  { name: "Zod", purpose: "Request validation on server actions — project creation, devlog publishing, playtest requests." },
  { name: "Tailwind v4", purpose: "A dark, editorial visual system — peach/sand/coral tokens over Inter and JetBrains Mono." },
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
