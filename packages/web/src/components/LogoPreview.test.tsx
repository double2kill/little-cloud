import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LogoPreview } from "./LogoPreview";
import {
  LOGO_ALT,
  LOGO_CLOSE_LABEL,
  LOGO_VIEW_LABEL,
} from "../constants";

const LOGO_SRC = "/logo.png";

describe("LogoPreview", () => {
  it("should open preview when logo clicked", async () => {
    const user = userEvent.setup();
    render(<LogoPreview src={LOGO_SRC} />);

    await user.click(screen.getByRole("button", { name: LOGO_VIEW_LABEL }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByAltText(LOGO_ALT)).toBeInTheDocument();
  });

  it("should close preview when close button clicked", async () => {
    const user = userEvent.setup();
    render(<LogoPreview src={LOGO_SRC} />);

    await user.click(screen.getByRole("button", { name: LOGO_VIEW_LABEL }));
    await user.click(screen.getByRole("button", { name: LOGO_CLOSE_LABEL }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close preview when escape pressed", async () => {
    const user = userEvent.setup();
    render(<LogoPreview src={LOGO_SRC} />);

    await user.click(screen.getByRole("button", { name: LOGO_VIEW_LABEL }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
