import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  WHEEL_DEFAULT_OPTIONS,
  WHEEL_IDLE_RESULT,
  WHEEL_OPTIONS_LABEL,
  WHEEL_RESULT_PREFIX,
  WHEEL_SPIN_DURATION_MS,
  WHEEL_SPIN_LABEL,
  WHEEL_TOO_FEW_HINT,
  WHEEL_VISUAL_LABEL,
} from "./constants";
import { SpinWheel } from "./SpinWheel";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("SpinWheel", () => {
  it("should show idle result when mounted", () => {
    render(<SpinWheel />);
    expect(screen.getByRole("status")).toHaveTextContent(WHEEL_IDLE_RESULT);
  });

  it("should show the first option when spin finishes at zero", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    render(<SpinWheel />);

    fireEvent.click(screen.getByRole("button", { name: WHEEL_SPIN_LABEL }));
    expect(screen.getByRole("status")).toHaveTextContent(WHEEL_IDLE_RESULT);
    expect(screen.getByRole("img", { name: WHEEL_VISUAL_LABEL })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(WHEEL_SPIN_DURATION_MS);
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      `${WHEEL_RESULT_PREFIX}${WHEEL_DEFAULT_OPTIONS[0]}`,
    );
  });

  it("should disable spin when fewer than two options", async () => {
    const user = userEvent.setup();
    render(<SpinWheel />);

    const input = screen.getByLabelText(WHEEL_OPTIONS_LABEL, {
      selector: "textarea",
    });
    await user.clear(input);
    await user.type(input, "只有一个");

    expect(screen.getByRole("button", { name: WHEEL_SPIN_LABEL })).toBeDisabled();
    expect(screen.getByText(WHEEL_TOO_FEW_HINT)).toBeInTheDocument();
  });
});
