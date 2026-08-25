import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Cta } from "@/components/ui/Cta";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <section className="pt-[34px] tab:pt-[46px]">
      <Container>
        <div className="flex flex-col items-start gap-[18px] py-10 tab:py-5">
          <SectionLabel>404</SectionLabel>
          <h1 className="m-0 text-h1 font-medium tracking-[-0.03em]">
            Page not found.
          </h1>
          <p className="m-0 max-w-[480px] text-[15px] leading-[1.7] text-ink-muted text-pretty">
            The page you’re looking for doesn’t exist, or it may have moved.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <Cta href="/">Home</Cta>
            <Link
              href="/work"
              className="text-[13.5px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
            >
              View Work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
