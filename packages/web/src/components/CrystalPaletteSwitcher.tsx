import type { CSSProperties } from "react";
import {
  CRYSTAL_PALETTES,
  type CrystalPaletteId,
} from "../characters/crystal-palettes";
import styles from "./CrystalPaletteSwitcher.module.css";

export const PALETTE_SWITCHER_LABEL = "色系";

interface CrystalPaletteSwitcherProps {
  activeId: CrystalPaletteId;
  onSelect: (id: CrystalPaletteId) => void;
}

export function CrystalPaletteSwitcher({
  activeId,
  onSelect,
}: CrystalPaletteSwitcherProps) {
  return (
    <div
      className={styles.switcher}
      role="radiogroup"
      aria-label={PALETTE_SWITCHER_LABEL}
    >
      {CRYSTAL_PALETTES.map((palette) => {
        const isActive = palette.id === activeId;
        return (
          <button
            key={palette.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`${styles.option} ${isActive ? styles.active : ""}`}
            onClick={() => onSelect(palette.id)}
            style={
              {
                "--swatch-primary": palette.primary,
                "--swatch-light": palette.light,
              } as CSSProperties
            }
          >
            <span className={styles.swatch} aria-hidden="true" />
            <span className={styles.name}>{palette.name}</span>
          </button>
        );
      })}
    </div>
  );
}
