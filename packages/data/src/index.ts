import type { RaceSeries } from "./constants";

export interface RaceEvent {
  date: string;
  title: string;
  replayUrl: string;
  series: RaceSeries;
}

export interface ScheduleData {
  races: RaceEvent[];
}

export { RACE_SERIES, type RaceSeries } from "./constants";
import scheduleJson from "./schedule.json";

export const schedule = scheduleJson as ScheduleData;

export function getRacesByMonth(
  data: ScheduleData,
  year: number,
  month: number
): RaceEvent[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  return data.races.filter((race) => race.date.startsWith(prefix));
}

export function getRaceDates(data: ScheduleData): Set<string> {
  return new Set(data.races.map((race) => race.date));
}

export function getRaceByDate(
  data: ScheduleData,
  date: string
): RaceEvent | undefined {
  return data.races.find((race) => race.date === date);
}

export function getRaceSeriesByDate(
  data: ScheduleData
): Map<string, RaceSeries> {
  return new Map(data.races.map((race) => [race.date, race.series]));
}
