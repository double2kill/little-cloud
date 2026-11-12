import { describe, expect, it } from "vitest";
import {
  WHEEL_DEFAULT_OPTIONS,
  WHEEL_FULL_CIRCLE_DEGREES,
  WHEEL_SPIN_TURNS,
} from "./constants";
import {
  buildWheelGradient,
  joinWheelOptions,
  nextWheelRotation,
  parseWheelOptions,
  pickWheelIndex,
} from "./wheel";

describe("parseWheelOptions", () => {
  it("should drop blank lines when draft has empty rows", () => {
    expect(parseWheelOptions("唱歌\n\n  整活  \n")).toEqual(["唱歌", "整活"]);
  });
});

describe("joinWheelOptions", () => {
  it("should keep default options when joined and parsed", () => {
    expect(parseWheelOptions(joinWheelOptions(WHEEL_DEFAULT_OPTIONS))).toEqual([
      ...WHEEL_DEFAULT_OPTIONS,
    ]);
  });
});

describe("pickWheelIndex", () => {
  it("should pick the first option when random is zero", () => {
    expect(pickWheelIndex(0, WHEEL_DEFAULT_OPTIONS.length)).toBe(0);
  });

  it("should pick the last option when random is almost one", () => {
    expect(pickWheelIndex(0.999, WHEEL_DEFAULT_OPTIONS.length)).toBe(
      WHEEL_DEFAULT_OPTIONS.length - 1,
    );
  });
});

describe("nextWheelRotation", () => {
  it("should land the first segment at the top when index is zero", () => {
    const optionCount = WHEEL_DEFAULT_OPTIONS.length;
    const rotation = nextWheelRotation(0, 0, optionCount, WHEEL_SPIN_TURNS);
    const segment = WHEEL_FULL_CIRCLE_DEGREES / optionCount;
    const expected =
      WHEEL_SPIN_TURNS * WHEEL_FULL_CIRCLE_DEGREES +
      (WHEEL_FULL_CIRCLE_DEGREES - segment / 2);
    expect(rotation).toBe(expected);
  });

  it("should keep spinning forward when already rotated", () => {
    const next = nextWheelRotation(2130, 0, 6, WHEEL_SPIN_TURNS);
    expect(next).toBeGreaterThan(2130);
  });
});

describe("buildWheelGradient", () => {
  it("should return none when option count is zero", () => {
    expect(buildWheelGradient(0)).toBe("none");
  });

  it("should paint one stop per option when options exist", () => {
    const gradient = buildWheelGradient(2);
    expect(gradient.startsWith("conic-gradient(")).toBe(true);
    expect(gradient).toContain("0deg 180deg");
    expect(gradient).toContain("180deg 360deg");
  });
});
