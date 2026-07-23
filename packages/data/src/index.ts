import {
  compareRaceSeries,
  type RaceSeries,
} from "./constants";

export interface RaceEvent {
  date: string;
  title: string;
  replayUrl: string;
  series: RaceSeries;
}

export interface ScheduleData {
  races: RaceEvent[];
}

export {
  compareRaceSeries,
  RACE_SERIES,
  RACE_SERIES_PRIORITY,
  type RaceSeries,
} from "./constants";
import scheduleJson from "./schedule.json";
import crystalScheduleJson from "./crystal-schedule.json";

export const schedule = scheduleJson as ScheduleData;

export const crystalSchedule = crystalScheduleJson as ScheduleData;

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

export function sortRacesBySeriesPriority(races: RaceEvent[]): RaceEvent[] {
  return [...races].sort((left, right) =>
    compareRaceSeries(left.series, right.series),
  );
}

export function getRaceByDate(
  data: ScheduleData,
  date: string
): RaceEvent | undefined {
  return getRacesByDate(data, date)[0];
}

export function getRacesByDate(
  data: ScheduleData,
  date: string
): RaceEvent[] {
  return sortRacesBySeriesPriority(
    data.races.filter((race) => race.date === date),
  );
}

export function getRaceSeriesByDate(
  data: ScheduleData
): Map<string, RaceSeries> {
  const seriesByDate = new Map<string, RaceSeries>();
  for (const [date, seriesList] of getRaceSeriesListByDate(data)) {
    seriesByDate.set(date, seriesList[0]);
  }
  return seriesByDate;
}

export function getRaceSeriesListByDate(
  data: ScheduleData
): Map<string, RaceSeries[]> {
  const seriesListByDate = new Map<string, RaceSeries[]>();
  for (const race of data.races) {
    const seriesList = seriesListByDate.get(race.date) ?? [];
    if (!seriesList.includes(race.series)) {
      seriesList.push(race.series);
    }
    seriesListByDate.set(race.date, seriesList);
  }
  for (const [date, seriesList] of seriesListByDate) {
    seriesListByDate.set(
      date,
      [...seriesList].sort(compareRaceSeries),
    );
  }
  return seriesListByDate;
}
