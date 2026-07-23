import { describe, expect, it } from "vitest";
import { getBroadcastDay, parseDateKey } from "./broadcast-day";

describe("parseDateKey", () => {
  it("should parse local date when date key provided", () => {
    const date = parseDateKey("2026-06-07");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(7);
  });
});

describe("getBroadcastDay", () => {
  it("should return 1 when date is debut day", () => {
    expect(getBroadcastDay("2026-06-07", new Date(2026, 5, 7))).toBe(1);
  });

  it("should return day count when date after debut", () => {
    expect(getBroadcastDay("2026-06-07", new Date(2026, 5, 8))).toBe(2);
    expect(getBroadcastDay("2024-02-22", new Date(2024, 1, 23))).toBe(2);
  });

  it("should return zero or negative when date before debut", () => {
    expect(getBroadcastDay("2026-06-07", new Date(2026, 5, 6))).toBe(0);
  });
});
