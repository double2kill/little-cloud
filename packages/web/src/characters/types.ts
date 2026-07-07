import type { ScheduleData } from "@little-cloud/data";

export interface CharacterConfig {
  id: string;
  pageTitle: string;
  pageSubtitle: string;
  logoAlt: string;
  logoViewLabel: string;
  logoCloseLabel: string;
  noRaceHint: string;
  themeClass: string;
  logoUrl: string;
  faviconUrl?: string;
  schedule: ScheduleData;
  supportsPaletteSwitcher?: boolean;
}
