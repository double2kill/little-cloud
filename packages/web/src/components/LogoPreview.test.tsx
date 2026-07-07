import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LogoPreview } from "./LogoPreview";
import { CharacterProvider } from "../characters/CharacterContext";
import { laniConfig } from "../characters/lani";

const LOGO_SRC = "/logo.png";

function renderLogoPreview() {
  return render(
    <CharacterProvider config={laniConfig}>
      <LogoPreview src={LOGO_SRC} />
    </CharacterProvider>,
  );
}

describe("LogoPreview", () => {
  it("should open preview when logo clicked", async () => {
    const user = userEvent.setup();
    renderLogoPreview();

    await user.click(
      screen.getByRole("button", { name: laniConfig.logoViewLabel }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByAltText(laniConfig.logoAlt)).toBeInTheDocument();
  });

  it("should close preview when close button clicked", async () => {
    const user = userEvent.setup();
    renderLogoPreview();

    await user.click(
      screen.getByRole("button", { name: laniConfig.logoViewLabel }),
    );
    await user.click(
      screen.getByRole("button", { name: laniConfig.logoCloseLabel }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close preview when escape pressed", async () => {
    const user = userEvent.setup();
    renderLogoPreview();

    await user.click(
      screen.getByRole("button", { name: laniConfig.logoViewLabel }),
    );
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
