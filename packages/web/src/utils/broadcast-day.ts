import { formatDateKey } from "./calendar";

export const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getBroadcastDay(
  debutDate: string,
  today: Date = new Date(),
): number {
  const debut = parseDateKey(debutDate);
  const current = parseDateKey(
    formatDateKey(today.getFullYear(), today.getMonth() + 1, today.getDate()),
  );
  return (
    Math.floor((current.getTime() - debut.getTime()) / MS_PER_DAY) + 1
  );
}
