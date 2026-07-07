import { describe, expect, it } from "vitest";
import {
  CRYSTAL_PALETTE_ID,
  CRYSTAL_PALETTES,
  DEFAULT_CRYSTAL_PALETTE_ID,
  getCrystalPalette,
} from "./crystal-palettes";

describe("crystalPalettes", () => {
  it("should use crystal blue as default palette when no selection stored", () => {
    expect(DEFAULT_CRYSTAL_PALETTE_ID).toBe(CRYSTAL_PALETTE_ID.CRYSTAL_BLUE);
  });

  it("should return four palettes when palette list loaded", () => {
    expect(CRYSTAL_PALETTES).toHaveLength(4);
  });

  it("should return cream apricot palette when id is cream apricot", () => {
    const palette = getCrystalPalette(CRYSTAL_PALETTE_ID.CREAM_APRICOT);
    expect(palette.name).toBe("🌾 奶油杏");
    expect(palette.primary).toBe("#C79C7A");
    expect(palette.background).toBe("#FFF9F4");
  });

  it("should return warm rose palette when id is warm rose", () => {
    const palette = getCrystalPalette(CRYSTAL_PALETTE_ID.WARM_ROSE);
    expect(palette.primary).toBe("#D98B8B");
    expect(palette.light).toBe("#F0D4D4");
  });

  it("should return crystal blue palette when id is crystal blue", () => {
    const palette = getCrystalPalette(CRYSTAL_PALETTE_ID.CRYSTAL_BLUE);
    expect(palette.primary).toBe("#7FC9E8");
    expect(palette.hover).toBe("#5FAFD4");
    expect(palette.text).toBe("#2D5266");
  });

  it("should return moonlight lilac palette when id is moonlight lilac", () => {
    const palette = getCrystalPalette(CRYSTAL_PALETTE_ID.MOONLIGHT_LILAC);
    expect(palette.primary).toBe("#A89BE8");
    expect(palette.background).toBe("#FAF9FE");
  });
});
