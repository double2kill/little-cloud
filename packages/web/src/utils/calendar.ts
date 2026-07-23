import { RACE_SERIES, type RaceSeries } from "@little-cloud/data";
import { DAYS_IN_WEEK } from "../constants";

export interface CalendarDay {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isRaceDay: boolean;
  seriesList: RaceSeries[];
}

export function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function createCalendarDay(
  date: string,
  day: number,
  isCurrentMonth: boolean,
  todayKey: string,
  raceSeriesListByDate: Map<string, RaceSeries[]>,
): CalendarDay {
  const seriesList = raceSeriesListByDate.get(date) ?? [];
  return {
    date,
    day,
    isCurrentMonth,
    isToday: date === todayKey,
    isRaceDay: seriesList.length > 0,
    seriesList,
  };
}

export function buildCalendarDays(
  year: number,
  month: number,
  raceSeriesListByDate: Map<string, RaceSeries[]>,
  today: Date = new Date(),
): CalendarDay[] {
  const firstDay = new Date(year, month - 1, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const todayKey = formatDateKey(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  );

  const days: CalendarDay[] = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const date = formatDateKey(prevYear, prevMonth, day);
    days.push(
      createCalendarDay(date, day, false, todayKey, raceSeriesListByDate),
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = formatDateKey(year, month, day);
    days.push(
      createCalendarDay(date, day, true, todayKey, raceSeriesListByDate),
    );
  }

  const remaining = DAYS_IN_WEEK - (days.length % DAYS_IN_WEEK);
  if (remaining < DAYS_IN_WEEK) {
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    for (let day = 1; day <= remaining; day++) {
      const date = formatDateKey(nextYear, nextMonth, day);
      days.push(
        createCalendarDay(date, day, false, todayKey, raceSeriesListByDate),
      );
    }
  }

  return days;
}

export function hasHuxiaoSeries(seriesList: RaceSeries[]): boolean {
  return seriesList.includes(RACE_SERIES.HUXIAO);
}

export function hasNonHuxiaoSeries(seriesList: RaceSeries[]): boolean {
  return seriesList.some((series) => series !== RACE_SERIES.HUXIAO);
}

export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  let newMonth = month + delta;
  let newYear = year;

  while (newMonth < 1) {
    newMonth += 12;
    newYear -= 1;
  }
  while (newMonth > 12) {
    newMonth -= 12;
    newYear += 1;
  }

  return { year: newYear, month: newMonth };
}
