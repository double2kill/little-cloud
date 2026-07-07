import {
  CRYSTAL_CSS_VARS,
  type CrystalPalette,
} from "./crystal-palettes";

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace("#", "");
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function applyCrystalPalette(palette: CrystalPalette): void {
  const vars: Record<string, string> = {
    "--bg-start": palette.background,
    "--bg-end": palette.light,
    "--surface": rgba(palette.background, 0.82),
    "--surface-hover": rgba(palette.light, 0.55),
    "--text": palette.text,
    "--text-muted": palette.textMuted,
    "--border": rgba(palette.light, 0.8),
    "--glass-border": rgba(palette.light, 0.9),
    "--shadow-soft": `0 8px 32px ${rgba(palette.primary, 0.15)}`,
    "--huxiao": palette.primary,
    "--huxiao-soft": rgba(palette.primary, 0.22),
    "--hulong": palette.hover,
    "--hulong-soft": rgba(palette.light, 0.65),
    "--title-gradient-start": palette.primary,
    "--title-gradient-end": palette.light,
    "--selected-shadow": rgba(palette.primary, 0.3),
    "--glow-primary": rgba(palette.primary, 0.28),
    "--glow-secondary": rgba(palette.light, 0.55),
  };

  for (const [name, value] of Object.entries(vars)) {
    document.body.style.setProperty(name, value);
  }
}

export function clearCrystalPalette(): void {
  for (const name of CRYSTAL_CSS_VARS) {
    document.body.style.removeProperty(name);
  }
}
