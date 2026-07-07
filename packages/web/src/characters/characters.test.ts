import { describe, expect, it } from "vitest";
import { crystalConfig, CHARACTER_ID_CRYSTAL, CRYSTAL_FAVICON_URL, THEME_CLASS_CRYSTAL } from "./crystal";
import { laniConfig } from "./lani";
import { THEME_CLASS_LANI } from "./lani";

describe("laniConfig", () => {
  it("should use lani theme class when config created", () => {
    expect(laniConfig.themeClass).toBe(THEME_CLASS_LANI);
  });
});

describe("crystalConfig", () => {
  it("should use crystal theme class when config created", () => {
    expect(crystalConfig.themeClass).toBe(THEME_CLASS_CRYSTAL);
  });

  it("should set crystal page title when config created", () => {
    expect(crystalConfig.pageTitle).toBe("小水晶 小日历");
  });

  it("should enable palette switcher when config created", () => {
    expect(crystalConfig.supportsPaletteSwitcher).toBe(true);
  });

  it("should use crystal character id when config created", () => {
    expect(crystalConfig.id).toBe(CHARACTER_ID_CRYSTAL);
  });

  it("should set crystal favicon url when config created", () => {
    expect(crystalConfig.faviconUrl).toBe(CRYSTAL_FAVICON_URL);
  });
});
