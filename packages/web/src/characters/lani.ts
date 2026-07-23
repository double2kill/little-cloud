import { schedule } from "@little-cloud/data";
import type { CharacterConfig } from "./types";
import logoUrl from "../assets/logo.png";

export const THEME_CLASS_LANI = "theme-lani";

export const LANI_DEBUT_DATE = "2026-06-07";

export const laniConfig: CharacterConfig = {
  id: "lani",
  pageTitle: "Lani 小日历",
  logoAlt: "Lani",
  logoViewLabel: "查看 Lani 大图",
  logoCloseLabel: "关闭大图",
  noRaceHint: "这天没有赛事",
  themeClass: THEME_CLASS_LANI,
  logoUrl,
  debutDate: LANI_DEBUT_DATE,
  schedule,
};
