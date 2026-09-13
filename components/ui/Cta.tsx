import Link from "next/link";
import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

export const ctaClassName =
  "group inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[9px] bg-accent px-[22px] text-[13.5px] font-medium text-accent-cream transition-[background,transform] duration-[220ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-accent-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.985]";
const base = ctaClassName;

export function Cta({
  href,
  children,
  className,
  download,
  ...rest
}: { href: string; children: ReactNode; className?: string } & ComponentProps<"a">) {
  if (download) {
    return (
      <a href={href} className={clsx(base, className)} download={download} {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={clsx(base, className)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={clsx(base, className)} {...rest}>
      {children}
    </a>
  );
}
