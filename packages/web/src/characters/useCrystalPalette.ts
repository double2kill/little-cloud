import { useCallback, useMemo, useState } from "react";
import {
  CRYSTAL_PALETTE_STORAGE_KEY,
  getCrystalPalette,
  readStoredCrystalPaletteId,
  type CrystalPaletteId,
} from "./crystal-palettes";

export function useCrystalPalette(enabled: boolean) {
  const [paletteId, setPaletteId] = useState<CrystalPaletteId>(
    readStoredCrystalPaletteId,
  );

  const palette = useMemo(() => getCrystalPalette(paletteId), [paletteId]);

  const selectPalette = useCallback(
    (id: CrystalPaletteId) => {
      setPaletteId(id);
      if (enabled) {
        localStorage.setItem(CRYSTAL_PALETTE_STORAGE_KEY, id);
      }
    },
    [enabled],
  );

  return { palette, paletteId, selectPalette };
}
