import { ReactNode } from "react";
import clsx from "clsx";

/**
 * Marks a section for the scroll-triggered fade/rise animation set up in
 * lib/motion.ts (buildRevealScene). Renders fully visible without JS.
 */
export function Reveal({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  return (
    <As data-reveal className={clsx(className)}>
      {children}
    </As>
  );
}
