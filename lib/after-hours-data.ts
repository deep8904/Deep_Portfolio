export type ModeId = "frame" | "play" | "signal" | "lab";

export type ModeMeta = {
  id: ModeId;
  num: string;
  title: string;
  description: string;
};

export const MODES: ModeMeta[] = [
  { id: "frame", num: "01", title: "Frame", description: "Composition, through observation." },
  { id: "play", num: "02", title: "Play", description: "A tiny interaction, built for no practical reason." },
  { id: "signal", num: "03", title: "Signal", description: "Find the path from source to screen." },
  { id: "lab", num: "04", title: "Lab", description: "Small visual and interface experiments." },
];

/**
 * No real values have been provided yet. Leave empty — the section that
 * reads this renders nothing until real entries exist here.
 */
export const CURRENTLY: { label: string; value: string }[] = [];
