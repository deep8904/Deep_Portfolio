"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ProductBrowserFrame } from "@/components/case-study/ProductBrowserFrame";
import { PhoneBrowserFrame } from "@/components/case-study/PhoneBrowserFrame";

// PhoneBrowserFrame's fixed chrome (top URL bar + bottom nav bar + outer
// device-body padding) doesn't scale with width, so it can be subtracted
// straight from the measured browser frame height to get the image budget.
const PHONE_CHROME_OVERHEAD = 105;
const PHONE_IMAGE_ASPECT = 860 / 1650; // matches remote.png's aspect prop below
const PHONE_DEFAULT_WIDTH = 213;

/**
 * The browser frame's height is fluid (derived from its own width via
 * aspect-ratio), so it changes with viewport width. The phone frame's height
 * used to be pinned by a fixed pixel width, which only matched the browser's
 * height at one specific viewport width and drifted apart everywhere else.
 * This measures the browser frame's actual rendered height and derives the
 * phone's width from it, so the two stay matched at every viewport size.
 */
export function DisplaysRemotePair() {
  const browserWrapRef = useRef<HTMLDivElement>(null);
  const [phoneWidth, setPhoneWidth] = useState(PHONE_DEFAULT_WIDTH);

  useLayoutEffect(() => {
    const frame = browserWrapRef.current?.firstElementChild as HTMLElement | null;
    if (!frame) return;

    const update = () => {
      const imageHeight = frame.getBoundingClientRect().height - PHONE_CHROME_OVERHEAD;
      if (imageHeight > 0) setPhoneWidth(Math.round(imageHeight * PHONE_IMAGE_ASPECT));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="grid items-start gap-8 tab:grid-cols-[1fr_auto]">
      <div ref={browserWrapRef}>
        <ProductBrowserFrame
          src="/work/kramflow/displays.png"
          alt="The KramFlow Displays panel, listing four registered displays (Stage Confidence Monitor, Speaker Ready Room, AV Booth, Lobby Display), all online, with preview and share-link controls"
          caption="Displays: where the Operator sees and manages every connected screen, and generates the no-login share links each one opens with."
          url="kramflow.vercel.app/displays"
          title="Displays"
          aspect="aspect-[2880/1450]"
          dark
        />
      </div>
      <PhoneBrowserFrame
        src="/work/kramflow/remote.png"
        alt="The KramFlow Remote on a phone, showing the current item's countdown and Next/Previous/Hold controls"
        caption="Remote: the sixth surface, a phone-sized version of the console's core controls for an operator who isn't at the laptop."
        url="kramflow.vercel.app/remote"
        width={phoneWidth}
        aspect="aspect-[860/1650]"
        dark
      />
    </div>
  );
}
