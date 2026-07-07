import { crystalSchedule } from "@little-cloud/data";
import type { CharacterConfig } from "./types";
import logoUrl from "../assets/crystal-logo.jpg";

export const CHARACTER_ID_CRYSTAL = "crystal";

export const CRYSTAL_FAVICON_URL = "/crystal-favicon.webp";

export const THEME_CLASS_CRYSTAL = "theme-crystal";

export const CRYSTAL_COLOR_PRIMARY = "#A89BE8";
export const CRYSTAL_COLOR_ACCENT_LIGHT = "#D8D2F7";

export const crystalConfig: CharacterConfig = {
  id: CHARACTER_ID_CRYSTAL,
  pageTitle: "小水晶 小日历",
  pageSubtitle: "小水晶的比赛日历",
  logoAlt: "小水晶",
  logoViewLabel: "查看小水晶大图",
  logoCloseLabel: "关闭大图",
  noRaceHint: "这天没有赛事",
  themeClass: THEME_CLASS_CRYSTAL,
  logoUrl,
  faviconUrl: CRYSTAL_FAVICON_URL,
  schedule: crystalSchedule,
};
