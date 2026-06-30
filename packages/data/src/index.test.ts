import { describe, expect, it } from "vitest";
import schedule from "./schedule.json";
import {
  getRaceByDate,
  getRaceDates,
  getRaceSeriesByDate,
  getRacesByMonth,
  RACE_SERIES,
  type ScheduleData,
} from "./index";

const fixture = schedule as ScheduleData;

describe("getRacesByMonth", () => {
  it("should return june races when month is 6", () => {
    const races = getRacesByMonth(fixture, 2026, 6);
    expect(races).toHaveLength(5);
    expect(races[0].title).toBe("【沪上龙门赛S2】【20260607】积分赛Day1");
  });

  it("should return empty array when month has no races", () => {
    const races = getRacesByMonth(fixture, 2026, 1);
    expect(races).toHaveLength(0);
  });
});

describe("getRaceDates", () => {
  it("should return all race dates as set when data loaded", () => {
    const dates = getRaceDates(fixture);
    expect(dates.has("2026-06-20")).toBe(true);
    expect(dates.size).toBe(fixture.races.length);
  });
});

describe("getRaceByDate", () => {
  it("should return race with replay url when date matches", () => {
    const race = getRaceByDate(fixture, "2026-06-15");
    expect(race?.title).toBe("【沪上龙门赛S2】【20260615】积分赛Day5");
    expect(race?.replayUrl).toBe("https://b23.tv/nKrj0P1");
    expect(race?.series).toBe(RACE_SERIES.HULONG);
  });

  it("should return undefined when date has no race", () => {
    const race = getRaceByDate(fixture, "2026-01-01");
    expect(race).toBeUndefined();
  });
});

describe("getRaceSeriesByDate", () => {
  it("should map huxiao date to huxiao series when data loaded", () => {
    const seriesMap = getRaceSeriesByDate(fixture);
    expect(seriesMap.get("2026-06-20")).toBe(RACE_SERIES.HUXIAO);
    expect(seriesMap.get("2026-06-07")).toBe(RACE_SERIES.HULONG);
  });
});
