// src/components/charts/getCreditorColor.js
import { CREDITOR_COLORS } from "./creditorColors";

/**
 * Deterministic hash → color
 * Same creditor name = same color always
 */
const hashToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`; // visually consistent & readable
};

export const getCreditorColor = (creditor) => {
  if (!creditor) return "#9ca3af"; // gray fallback
  return CREDITOR_COLORS[creditor] || hashToColor(creditor);
};
