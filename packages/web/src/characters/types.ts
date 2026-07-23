import type { ScheduleData } from "@little-cloud/data";

export interface CharacterConfig {
  id: string;
  pageTitle: string;
  logoAlt: string;
  logoViewLabel: string;
  logoCloseLabel: string;
  noRaceHint: string;
  themeClass: string;
  logoUrl: string;
  faviconUrl?: string;
  debutDate: string;
  schedule: ScheduleData;
}
