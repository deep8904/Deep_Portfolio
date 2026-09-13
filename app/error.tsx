"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ctaClassName } from "@/components/ui/Cta";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-[34px] tab:pt-[46px]">
      <Container>
        <div className="flex flex-col items-start gap-[18px] py-10 tab:py-5">
          <SectionLabel>Error</SectionLabel>
          <h1 className="m-0 text-h1 font-medium tracking-[-0.03em]">
            Something went wrong.
          </h1>
          <p className="m-0 max-w-[480px] text-[15px] leading-[1.7] text-ink-muted text-pretty">
            This page hit an unexpected error. You can try again, or head back home.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3.5">
            <button type="button" onClick={() => retry()} className={ctaClassName}>
              Try again
            </button>
            <Link
              href="/"
              className="text-[13.5px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
            >
              Go home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
