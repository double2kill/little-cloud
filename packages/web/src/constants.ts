export const WEEKDAY_LABELS = [
  "日",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
] as const;

export const MONTHS_IN_YEAR = 12;

export const DAYS_IN_WEEK = 7;

export const REPLAY_LINK_LABEL = "录屏回放";

export const RACE_DAY_LABEL = "比赛日";

export const HUXIAO_SERIES_LABEL = "沪小";

export const HULONG_SERIES_LABEL = "沪龙";

export const HUASHAN_SERIES_LABEL = "华山论剑";

export const HUXIAO_STAR_MARK = "★";

export const SELECT_DATE_HINT = "点击日期查看详情";

export const EMPTY_STATE_EMOJI = "☁️";

export const NO_RACE_EMOJI = "💤";

export const HOME_PAGE_TITLE = "小日历";

export const HOME_PAGE_SUBTITLE = "选择查看赛程";

export const HOME_CARD_ENTER_LABEL = "进入日历";

export const BROADCAST_DAY_PREFIX = "开播第";

export const BROADCAST_DAY_SUFFIX = "天";

export function formatBroadcastDayLabel(day: number): string {
  return `${BROADCAST_DAY_PREFIX} ${day} ${BROADCAST_DAY_SUFFIX}`;
}
