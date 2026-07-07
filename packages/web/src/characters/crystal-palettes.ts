export const CRYSTAL_PALETTE_STORAGE_KEY = "crystal-palette-id";

export const CRYSTAL_PALETTE_ID = {
  CREAM_APRICOT: "cream-apricot",
  WARM_ROSE: "warm-rose",
  CRYSTAL_BLUE: "crystal-blue",
  MOONLIGHT_LILAC: "moonlight-lilac",
} as const;

export type CrystalPaletteId =
  (typeof CRYSTAL_PALETTE_ID)[keyof typeof CRYSTAL_PALETTE_ID];

export const DEFAULT_CRYSTAL_PALETTE_ID = CRYSTAL_PALETTE_ID.CRYSTAL_BLUE;

export interface CrystalPalette {
  id: CrystalPaletteId;
  name: string;
  primary: string;
  hover: string;
  light: string;
  background: string;
  text: string;
  textMuted: string;
}

export const CRYSTAL_PALETTES: CrystalPalette[] = [
  {
    id: CRYSTAL_PALETTE_ID.CREAM_APRICOT,
    name: "🌾 奶油杏",
    primary: "#C79C7A",
    hover: "#A88568",
    light: "#EADCCB",
    background: "#FFF9F4",
    text: "#554740",
    textMuted: "#8A7D75",
  },
  {
    id: CRYSTAL_PALETTE_ID.WARM_ROSE,
    name: "🌹 暖玫瑰",
    primary: "#D98B8B",
    hover: "#C47878",
    light: "#F0D4D4",
    background: "#FFF7F5",
    text: "#5C4542",
    textMuted: "#9A7F7A",
  },
  {
    id: CRYSTAL_PALETTE_ID.CRYSTAL_BLUE,
    name: "💎 水晶蓝",
    primary: "#7FC9E8",
    hover: "#5FAFD4",
    light: "#BEE8F6",
    background: "#F6FBFE",
    text: "#2D5266",
    textMuted: "#5A7A8A",
  },
  {
    id: CRYSTAL_PALETTE_ID.MOONLIGHT_LILAC,
    name: "🌙 月光紫",
    primary: "#A89BE8",
    hover: "#8478D9",
    light: "#D8D2F7",
    background: "#FAF9FE",
    text: "#4D4670",
    textMuted: "#7A7399",
  },
];

export const CRYSTAL_CSS_VARS = [
  "--bg-start",
  "--bg-end",
  "--surface",
  "--surface-hover",
  "--text",
  "--text-muted",
  "--border",
  "--glass-border",
  "--shadow-soft",
  "--huxiao",
  "--huxiao-soft",
  "--hulong",
  "--hulong-soft",
  "--title-gradient-start",
  "--title-gradient-end",
  "--selected-shadow",
  "--glow-primary",
  "--glow-secondary",
] as const;

export function getCrystalPalette(id: CrystalPaletteId): CrystalPalette {
  const palette = CRYSTAL_PALETTES.find((item) => item.id === id);
  if (!palette) {
    return CRYSTAL_PALETTES[0];
  }
  return palette;
}

export function readStoredCrystalPaletteId(): CrystalPaletteId {
  const stored = localStorage.getItem(CRYSTAL_PALETTE_STORAGE_KEY);
  if (
    stored &&
    CRYSTAL_PALETTES.some((palette) => palette.id === stored)
  ) {
    return stored as CrystalPaletteId;
  }
  return DEFAULT_CRYSTAL_PALETTE_ID;
}
