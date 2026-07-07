import { ROUTE_PATH_CRYSTAL, ROUTE_PATH_LANI } from "../routes";
import {
  CRYSTAL_COLOR_ACCENT_LIGHT,
  CRYSTAL_COLOR_PRIMARY,
  crystalConfig,
} from "./crystal";
import { laniConfig } from "./lani";

export const LANI_CARD_ACCENT = "#FF6B8A";
export const LANI_CARD_ACCENT_LIGHT = "#FF8FA8";

export interface HomeNavCharacter {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  logoUrl: string;
  logoAlt: string;
  accent: string;
  accentLight: string;
}

export const HOME_NAV_CHARACTERS: HomeNavCharacter[] = [
  {
    id: laniConfig.id,
    path: ROUTE_PATH_LANI,
    title: laniConfig.pageTitle,
    subtitle: laniConfig.pageSubtitle,
    logoUrl: laniConfig.logoUrl,
    logoAlt: laniConfig.logoAlt,
    accent: LANI_CARD_ACCENT,
    accentLight: LANI_CARD_ACCENT_LIGHT,
  },
  {
    id: crystalConfig.id,
    path: ROUTE_PATH_CRYSTAL,
    title: crystalConfig.pageTitle,
    subtitle: crystalConfig.pageSubtitle,
    logoUrl: crystalConfig.logoUrl,
    logoAlt: crystalConfig.logoAlt,
    accent: CRYSTAL_COLOR_PRIMARY,
    accentLight: CRYSTAL_COLOR_ACCENT_LIGHT,
  },
];
