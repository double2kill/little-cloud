import { afterEach, describe, expect, it } from "vitest";
import {
  applyCrystalPalette,
  clearCrystalPalette,
} from "./apply-crystal-palette";
import {
  CRYSTAL_PALETTE_ID,
  getCrystalPalette,
} from "./crystal-palettes";

describe("applyCrystalPalette", () => {
  afterEach(() => {
    clearCrystalPalette();
  });

  it("should set primary css variable when crystal blue palette applied", () => {
    applyCrystalPalette(getCrystalPalette(CRYSTAL_PALETTE_ID.CRYSTAL_BLUE));
    expect(document.body.style.getPropertyValue("--huxiao")).toBe("#7FC9E8");
  });

  it("should set background css variable when warm rose palette applied", () => {
    applyCrystalPalette(getCrystalPalette(CRYSTAL_PALETTE_ID.WARM_ROSE));
    expect(document.body.style.getPropertyValue("--bg-start")).toBe("#FFF7F5");
  });

  it("should remove css variables when palette cleared", () => {
    applyCrystalPalette(
      getCrystalPalette(CRYSTAL_PALETTE_ID.MOONLIGHT_LILAC),
    );
    clearCrystalPalette();
    expect(document.body.style.getPropertyValue("--text")).toBe("");
  });
});
