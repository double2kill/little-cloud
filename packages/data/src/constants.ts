export const RACE_SERIES = {
  HUXIAO: "huxiao",
  HULONG: "hulong",
  HUASHAN: "huashan",
} as const;

export type RaceSeries = (typeof RACE_SERIES)[keyof typeof RACE_SERIES];

export const RACE_SERIES_PRIORITY: Record<RaceSeries, number> = {
  [RACE_SERIES.HUXIAO]: 0,
  [RACE_SERIES.HULONG]: 1,
  [RACE_SERIES.HUASHAN]: 2,
};

export function compareRaceSeries(a: RaceSeries, b: RaceSeries): number {
  return RACE_SERIES_PRIORITY[a] - RACE_SERIES_PRIORITY[b];
}
