const STACK = [
  { name: "Next.js + TypeScript", purpose: "Application framework and type safety across the codebase." },
  { name: "Supabase + PostgreSQL", purpose: "Authentication, data storage, and permission enforcement at the row level." },
  { name: "Row Level Security", purpose: "Every role's data access enforced in the database, not just the UI." },
  { name: "Vitest", purpose: "Unit-level validation for isolated logic." },
  { name: "Playwright", purpose: "End-to-end coverage of critical flows (login, onboarding, invite acceptance)." },
  { name: "GitHub Actions", purpose: "CI checks defined for type-checking, linting, tests, and build." },
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
