import { describe, expect, it } from "vitest";
import crystalSchedule from "./crystal-schedule.json";
import {
  crystalSchedule as exportedCrystalSchedule,
  getRacesByDate,
  RACE_SERIES,
} from "./index";
import type { ScheduleData } from "./index";

const fixture = crystalSchedule as ScheduleData;

const CRYSTAL_HUXIAO_0705_TITLE = "沪上小师赛（奇侦妙探） 20260705";
const CRYSTAL_HUXIAO_0705_URL =
  "https://v.youku.com/v_show/id_XNjUzNzg4MTYyOA==.html";
const CRYSTAL_HUXIAO_0719_TITLE = "沪上小师赛（奇侦妙探） 20260719";
const CRYSTAL_HUXIAO_0719_URL =
  "https://v.youku.com/v_show/id_XNjU0OTkzMDc0MA==.html";

describe("crystalSchedule", () => {
  it("should export crystal schedule data when module loaded", () => {
    expect(exportedCrystalSchedule).toEqual(fixture);
  });

  it("should have eleven races when crystal schedule loaded", () => {
    expect(fixture.races).toHaveLength(11);
  });

  it("should include huashan race when crystal schedule loaded", () => {
    const huashanRace = fixture.races.find(
      (race) => race.date === "2026-07-06",
    );
    expect(huashanRace?.series).toBe(RACE_SERIES.HUASHAN);
    expect(huashanRace?.replayUrl).toBe("https://b23.tv/Ou30yVQ");
  });

  it("should include day17 race when crystal schedule loaded", () => {
    const race = fixture.races.find((item) => item.date === "2026-07-11");
    expect(race?.title).toBe("【沪上龙门赛S2】【20260711】积分赛Day17");
    expect(race?.replayUrl).toBe("https://b23.tv/KXKgwzs");
    expect(race?.series).toBe(RACE_SERIES.HULONG);
  });

  it("should include both races when date has hulong and huxiao", () => {
    const races = getRacesByDate(fixture, "2026-07-05");
    expect(races).toHaveLength(2);
    expect(races.map((race) => race.series)).toEqual([
      RACE_SERIES.HUXIAO,
      RACE_SERIES.HULONG,
    ]);
    expect(races[0].title).toBe(CRYSTAL_HUXIAO_0705_TITLE);
    expect(races[0].replayUrl).toBe(CRYSTAL_HUXIAO_0705_URL);
  });

  it("should include july19 huxiao race when crystal schedule loaded", () => {
    const race = fixture.races.find((item) => item.date === "2026-07-19");
    expect(race?.title).toBe(CRYSTAL_HUXIAO_0719_TITLE);
    expect(race?.replayUrl).toBe(CRYSTAL_HUXIAO_0719_URL);
    expect(race?.series).toBe(RACE_SERIES.HUXIAO);
  });
});
