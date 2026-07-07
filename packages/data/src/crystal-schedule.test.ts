import { describe, expect, it } from "vitest";
import crystalSchedule from "./crystal-schedule.json";
import { crystalSchedule as exportedCrystalSchedule, RACE_SERIES } from "./index";
import type { ScheduleData } from "./index";

const fixture = crystalSchedule as ScheduleData;

describe("crystalSchedule", () => {
  it("should export crystal schedule data when module loaded", () => {
    expect(exportedCrystalSchedule).toEqual(fixture);
  });

  it("should have six races when crystal schedule loaded", () => {
    expect(fixture.races).toHaveLength(6);
  });

  it("should include huashan race when crystal schedule loaded", () => {
    const huashanRace = fixture.races.find(
      (race) => race.date === "2026-07-06",
    );
    expect(huashanRace?.series).toBe(RACE_SERIES.HUASHAN);
    expect(huashanRace?.replayUrl).toBe("https://b23.tv/Ou30yVQ");
  });
});
