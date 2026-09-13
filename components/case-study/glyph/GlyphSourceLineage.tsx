import { GitBranch, Globe } from "lucide-react";

export function GlyphSourceLineage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border border-line-strong px-5 py-5">
          <div className="flex items-center gap-2 text-ink-secondary">
            <GitBranch size={16} strokeWidth={2} />
            <span className="text-[13px] font-semibold tracking-[0.08em]">CURRENT LOCAL PRODUCT</span>
          </div>
          <p className="m-0 text-[14.5px] leading-[1.6] text-ink text-pretty">
            A private-first conversion, in active development. Warm-dark visual system, 19-table schema, private
            projects by default. This is the authoritative product for this case study.
          </p>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
          <div className="flex items-center gap-2 text-ink-faint">
            <Globe size={16} strokeWidth={2} />
            <span className="text-[13px] font-semibold tracking-[0.08em]">PUBLIC LINEAGE (SEPARATE)</span>
          </div>
          <p className="m-0 text-[14.5px] leading-[1.6] text-ink-faint text-pretty">
            A separately deployed prototype with a broader, public-by-default schema and different visual system.
            No shared commit history with the current local product. Kept as evolution context only.
          </p>
        </div>
      </div>
      <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        The two lineages share no Git history. Their exact relationship is not asserted here as a single
        chronological story.
      </p>
    </div>
  );
}
