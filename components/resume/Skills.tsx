import type { ComponentType } from "react";
import { Palette, Code2, Database, BrainCircuit, Settings2, Sparkles } from "lucide-react";
import {
  siFigma,
  siFramer,
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siAngular,
  siNodedotjs,
  siSupabase,
  siPostgresql,
  siGit,
  siGithubactions,
  siVercel,
  siGooglegemini,
  siClaude,
} from "simple-icons";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { RESUME_SKILLS } from "@/lib/data";

// Only genuine products/languages/tools get a brand mark — the rest of each
// category is methodology and stays as plain text. That split is what creates
// the two-tier visual weight (recognizable tool vs. quieter practice) instead
// of a single flat tag cloud where everything reads with equal emphasis.
const BRAND_ICONS: Record<string, { path: string; title: string }> = {
  Figma: siFigma,
  Framer: siFramer,
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  HTML5: siHtml5,
  CSS3: siCss,
  "Tailwind CSS": siTailwindcss,
  Angular: siAngular,
  "Node.js": siNodedotjs,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  Git: siGit,
  "GitHub Actions": siGithubactions,
  Vercel: siVercel,
  "Gemini API": siGooglegemini,
  "Claude Code": siClaude,
};

const CATEGORY_ICONS: Record<string, ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  "Product & UX": Sparkles,
  "Design Systems & Tools": Palette,
  Frontend: Code2,
  "Backend / Data": Database,
  "AI & Prototyping": BrainCircuit,
  "Delivery / Tooling": Settings2,
};

function BrandMark({ path, title }: { path: string; title: string }) {
  return (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor" aria-hidden="true" className="flex-none">
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
}

export function Skills() {
  return (
    <section className="pt-[50px] tab:pt-[68px]">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <SectionLabel>Technical Skills</SectionLabel>
            <h2 className="m-0 max-w-full text-h2 font-medium tracking-[-0.028em] text-balance tab:max-w-[13ch]">
              Skills and tools.
            </h2>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-6 tab:grid-cols-2 tab:gap-8 desk:grid-cols-3">
            {RESUME_SKILLS.map((s) => {
              const CategoryIcon = CATEGORY_ICONS[s.category];
              const tools = s.items.filter((item) => BRAND_ICONS[item]);
              const practices = s.items.filter((item) => !BRAND_ICONS[item]);
              return (
                <div key={s.category}>
                  <h3 className="m-0 mb-3 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    {CategoryIcon && <CategoryIcon size={13} strokeWidth={2} className="flex-none opacity-80" />}
                    {s.category}
                  </h3>

                  {tools.length > 0 && (
                    <ul className="m-0 mb-2 flex list-none flex-wrap gap-1.5 p-0">
                      {tools.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-[12.5px] font-medium leading-[1.4] text-ink"
                        >
                          <BrandMark {...BRAND_ICONS[item]} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {practices.length > 0 && (
                    <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                      {practices.map((item) => (
                        <li
                          key={item}
                          className="rounded-md px-2 py-0.5 text-[12.5px] leading-[1.4] text-ink-tertiary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
