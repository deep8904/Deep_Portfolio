import { ReactNode } from "react";
import clsx from "clsx";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-[1240px] px-5 tab:max-w-[1260px] tab:px-[30px] desk:max-w-[1268px] desk:px-[34px]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tight = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  tight?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={clsx(tight ? "pt-[34px] tab:pt-[46px]" : "pt-[78px] tab:pt-[118px]", className)}>
      <Container>{children}</Container>
    </section>
  );
}
