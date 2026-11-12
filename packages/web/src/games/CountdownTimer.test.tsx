import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  COUNTDOWN_DONE_LABEL,
  COUNTDOWN_PRESETS,
  COUNTDOWN_RESET_LABEL,
  COUNTDOWN_START_LABEL,
  COUNTDOWN_TICK_MS,
  COUNTDOWN_TIMER_LABEL,
} from "./constants";
import { formatCountdown } from "./countdown";
import { CountdownTimer } from "./CountdownTimer";

afterEach(() => {
  vi.useRealTimers();
});

describe("CountdownTimer", () => {
  it("should show the first preset when mounted", () => {
    render(<CountdownTimer />);
    expect(screen.getByRole("timer", { name: COUNTDOWN_TIMER_LABEL })).toHaveTextContent(
      formatCountdown(COUNTDOWN_PRESETS[0].seconds),
    );
  });

  it("should show preset duration when another preset selected", async () => {
    const user = userEvent.setup();
    render(<CountdownTimer />);
    const preset = COUNTDOWN_PRESETS[1];

    await user.click(screen.getByRole("button", { name: preset.label }));

    expect(screen.getByRole("timer")).toHaveTextContent(
      formatCountdown(preset.seconds),
    );
  });

  it("should decrease remaining time when one second passes", () => {
    vi.useFakeTimers();
    render(<CountdownTimer />);

    fireEvent.click(screen.getByRole("button", { name: COUNTDOWN_START_LABEL }));
    act(() => {
      vi.advanceTimersByTime(COUNTDOWN_TICK_MS);
    });

    expect(screen.getByRole("timer")).toHaveTextContent(
      formatCountdown(COUNTDOWN_PRESETS[0].seconds - 1),
    );
  });

  it("should show done label when countdown reaches zero", () => {
    vi.useFakeTimers();
    render(<CountdownTimer />);
    const preset = COUNTDOWN_PRESETS[0];

    fireEvent.click(screen.getByRole("button", { name: COUNTDOWN_START_LABEL }));
    act(() => {
      vi.advanceTimersByTime(preset.seconds * COUNTDOWN_TICK_MS);
    });

    expect(screen.getByRole("status")).toHaveTextContent(COUNTDOWN_DONE_LABEL);
    expect(screen.getByRole("timer")).toHaveTextContent(formatCountdown(0));
  });

  it("should restore preset duration when reset clicked", () => {
    vi.useFakeTimers();
    render(<CountdownTimer />);

    fireEvent.click(screen.getByRole("button", { name: COUNTDOWN_START_LABEL }));
    act(() => {
      vi.advanceTimersByTime(COUNTDOWN_TICK_MS);
    });
    fireEvent.click(screen.getByRole("button", { name: COUNTDOWN_RESET_LABEL }));

    expect(screen.getByRole("timer")).toHaveTextContent(
      formatCountdown(COUNTDOWN_PRESETS[0].seconds),
    );
  });
});
