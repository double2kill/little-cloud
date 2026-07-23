import { describe, expect, it } from "vitest";
import crystalSchedule from "./crystal-schedule.json";
import { crystalSchedule as exportedCrystalSchedule, RACE_SERIES } from "./index";
import type { ScheduleData } from "./index";

const fixture = crystalSchedule as ScheduleData;

describe("crystalSchedule", () => {
  it("should export crystal schedule data when module loaded", () => {
    expect(exportedCrystalSchedule).toEqual(fixture);
  });

  it("should have nine races when crystal schedule loaded", () => {
    expect(fixture.races).toHaveLength(9);
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
});
