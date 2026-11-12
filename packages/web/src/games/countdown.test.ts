import { describe, expect, it } from "vitest";
import { COUNTDOWN_PRESETS } from "./constants";
import { formatCountdown } from "./countdown";

describe("formatCountdown", () => {
  it("should pad minutes and seconds when under ten", () => {
    expect(formatCountdown(COUNTDOWN_PRESETS[0].seconds)).toBe("00:30");
  });

  it("should show one minute when seconds reach sixty", () => {
    expect(formatCountdown(COUNTDOWN_PRESETS[1].seconds)).toBe("01:00");
  });

  it("should show zero when seconds are negative", () => {
    expect(formatCountdown(-1)).toBe("00:00");
  });
});
