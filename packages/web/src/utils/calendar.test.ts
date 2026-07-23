import { describe, expect, it } from "vitest";
import { RACE_SERIES } from "@little-cloud/data";
import {
  buildCalendarDays,
  formatDateKey,
  hasHuxiaoSeries,
  hasNonHuxiaoSeries,
  shiftMonth,
} from "./calendar";

describe("formatDateKey", () => {
  it("should pad month and day when single digit", () => {
    expect(formatDateKey(2026, 3, 5)).toBe("2026-03-05");
  });
});

describe("buildCalendarDays", () => {
  it("should mark race dates when date in map", () => {
    const raceSeriesListByDate = new Map([
      ["2026-07-12", [RACE_SERIES.HULONG]],
    ]);
    const days = buildCalendarDays(
      2026,
      7,
      raceSeriesListByDate,
      new Date("2026-07-01"),
    );
    const raceDay = days.find((d) => d.date === "2026-07-12");
    expect(raceDay?.isRaceDay).toBe(true);
    expect(raceDay?.seriesList).toEqual([RACE_SERIES.HULONG]);
  });

  it("should attach huxiao series when date is huxiao race", () => {
    const raceSeriesListByDate = new Map([
      ["2026-06-20", [RACE_SERIES.HUXIAO]],
    ]);
    const days = buildCalendarDays(
      2026,
      6,
      raceSeriesListByDate,
      new Date("2026-06-01"),
    );
    const raceDay = days.find((d) => d.date === "2026-06-20");
    expect(raceDay?.seriesList).toEqual([RACE_SERIES.HUXIAO]);
  });

  it("should keep multiple series when date has two races", () => {
    const raceSeriesListByDate = new Map([
      ["2026-07-05", [RACE_SERIES.HUXIAO, RACE_SERIES.HULONG]],
    ]);
    const days = buildCalendarDays(
      2026,
      7,
      raceSeriesListByDate,
      new Date("2026-07-01"),
    );
    const raceDay = days.find((d) => d.date === "2026-07-05");
    expect(raceDay?.seriesList).toEqual([
      RACE_SERIES.HUXIAO,
      RACE_SERIES.HULONG,
    ]);
    expect(hasHuxiaoSeries(raceDay?.seriesList ?? [])).toBe(true);
    expect(hasNonHuxiaoSeries(raceDay?.seriesList ?? [])).toBe(true);
  });

  it("should mark today when date matches reference", () => {
    const days = buildCalendarDays(2026, 7, new Map(), new Date("2026-07-12"));
    const today = days.find((d) => d.date === "2026-07-12");
    expect(today?.isToday).toBe(true);
  });
});

describe("shiftMonth", () => {
  it("should go to previous year when shifting january backward", () => {
    expect(shiftMonth(2026, 1, -1)).toEqual({ year: 2025, month: 12 });
  });

  it("should go to next year when shifting december forward", () => {
    expect(shiftMonth(2026, 12, 1)).toEqual({ year: 2027, month: 1 });
  });
});
