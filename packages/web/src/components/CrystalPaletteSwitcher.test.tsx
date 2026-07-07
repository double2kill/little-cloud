import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  CRYSTAL_PALETTE_ID,
  CRYSTAL_PALETTES,
  type CrystalPaletteId,
} from "../characters/crystal-palettes";
import {
  CrystalPaletteSwitcher,
  PALETTE_SWITCHER_LABEL,
} from "./CrystalPaletteSwitcher";

describe("CrystalPaletteSwitcher", () => {
  it("should render all palette options when mounted", () => {
    render(
      <CrystalPaletteSwitcher
        activeId={CRYSTAL_PALETTE_ID.CRYSTAL_BLUE}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByRole("radiogroup", { name: PALETTE_SWITCHER_LABEL }))
      .toBeInTheDocument();
    for (const palette of CRYSTAL_PALETTES) {
      expect(screen.getByRole("radio", { name: palette.name })).toBeInTheDocument();
    }
  });

  it("should call onSelect when palette option clicked", async () => {
    const user = userEvent.setup();
    let selectedId: CrystalPaletteId = CRYSTAL_PALETTE_ID.CRYSTAL_BLUE;
    render(
      <CrystalPaletteSwitcher
        activeId={selectedId}
        onSelect={(id) => {
          selectedId = id;
        }}
      />,
    );

    await user.click(screen.getByRole("radio", { name: "🌾 奶油杏" }));
    expect(selectedId).toBe(CRYSTAL_PALETTE_ID.CREAM_APRICOT);
  });
});
