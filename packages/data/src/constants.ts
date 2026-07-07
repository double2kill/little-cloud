export const RACE_SERIES = {
  HUXIAO: "huxiao",
  HULONG: "hulong",
  HUASHAN: "huashan",
} as const;

export type RaceSeries = (typeof RACE_SERIES)[keyof typeof RACE_SERIES];
