import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DICE_GLYPHS,
  DICE_IDLE_LABEL,
  DICE_RESULT_LABEL,
  DICE_ROLL_LABEL,
} from "./constants";
import { DiceRoll } from "./DiceRoll";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("DiceRoll", () => {
  it("should show idle label when mounted", () => {
    render(<DiceRoll />);
    expect(screen.getByRole("status", { name: DICE_RESULT_LABEL })).toHaveTextContent(
      DICE_IDLE_LABEL,
    );
  });

  it("should show six when roll is almost one", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    const user = userEvent.setup();
    render(<DiceRoll />);

    await user.click(screen.getByRole("button", { name: DICE_ROLL_LABEL }));

    expect(screen.getByRole("status")).toHaveTextContent(
      DICE_GLYPHS[DICE_GLYPHS.length - 1],
    );
  });
});
