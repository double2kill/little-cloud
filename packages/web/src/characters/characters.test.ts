import { describe, expect, it } from "vitest";
import {
  crystalConfig,
  CHARACTER_ID_CRYSTAL,
  CRYSTAL_COLOR_PRIMARY,
  CRYSTAL_DEBUT_DATE,
  CRYSTAL_FAVICON_URL,
  THEME_CLASS_CRYSTAL,
} from "./crystal";
import { laniConfig, LANI_DEBUT_DATE, THEME_CLASS_LANI } from "./lani";

describe("laniConfig", () => {
  it("should use lani theme class when config created", () => {
    expect(laniConfig.themeClass).toBe(THEME_CLASS_LANI);
  });

  it("should set lani debut date when config created", () => {
    expect(laniConfig.debutDate).toBe(LANI_DEBUT_DATE);
    expect(LANI_DEBUT_DATE).toBe("2026-06-07");
  });
});

describe("crystalConfig", () => {
  it("should use crystal theme class when config created", () => {
    expect(crystalConfig.themeClass).toBe(THEME_CLASS_CRYSTAL);
  });

  it("should set crystal page title when config created", () => {
    expect(crystalConfig.pageTitle).toBe("小水晶 小日历");
  });

  it("should use crystal character id when config created", () => {
    expect(crystalConfig.id).toBe(CHARACTER_ID_CRYSTAL);
  });

  it("should set crystal favicon url when config created", () => {
    expect(crystalConfig.faviconUrl).toBe(CRYSTAL_FAVICON_URL);
  });

  it("should use moonlight lilac primary color when config created", () => {
    expect(CRYSTAL_COLOR_PRIMARY).toBe("#A89BE8");
  });

  it("should set crystal debut date when config created", () => {
    expect(crystalConfig.debutDate).toBe(CRYSTAL_DEBUT_DATE);
    expect(CRYSTAL_DEBUT_DATE).toBe("2024-02-22");
  });
});
