import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WORK_STUBS } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(WORK_STUBS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stub = WORK_STUBS[slug];
  if (!stub) return {};
  return {
    title: stub.label,
    description: stub.body,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: `${stub.label} — Deep Chadamiya`, description: stub.body, url: `/work/${slug}` },
  };
}

export default async function WorkCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stub = WORK_STUBS[slug];
  if (!stub) notFound();

  return (
    <section className="pt-[34px] tab:pt-[46px]">
      <Container>
        <div className="flex flex-col items-start gap-[18px] py-10 tab:py-5">
          <SectionLabel>{stub.label}</SectionLabel>
          <h1 className="m-0 text-h1 font-medium tracking-[-0.03em]">
            {stub.title}
          </h1>
          <p className="m-0 max-w-[520px] text-[15px] leading-[1.7] text-ink-muted text-pretty">{stub.body}</p>
          <span className="inline-flex h-[30px] items-center gap-2 rounded-lg border border-dashed border-line-strong px-[13px] text-[12px] font-medium tracking-[0.05em] text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-status" />
            NOT YET BUILT
          </span>
          <Link
            href="/work"
            className="group mt-2 inline-flex items-center gap-2 text-[13.5px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft
              size={15}
              strokeWidth={2}
              className="transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-x-0.5"
            />
            Back to Work
          </Link>
        </div>
      </Container>
    </section>
  );
}
