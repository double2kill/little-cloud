import { afterEach, describe, expect, it } from "vitest";
import {
  DEFAULT_FAVICON_URL,
  getFaviconLink,
  restoreFavicon,
  setFavicon,
} from "./favicon";

describe("setFavicon", () => {
  afterEach(() => {
    restoreFavicon(DEFAULT_FAVICON_URL);
  });

  it("should update favicon href when url provided", () => {
    const previousUrl = setFavicon("/crystal-favicon.webp");
    expect(previousUrl).toBe(DEFAULT_FAVICON_URL);
    expect(getFaviconLink()?.getAttribute("href")).toBe(
      "/crystal-favicon.webp",
    );
  });

  it("should restore favicon href when previous url restored", () => {
    const previousUrl = setFavicon("/crystal-favicon.webp");
    restoreFavicon(previousUrl);
    expect(getFaviconLink()?.getAttribute("href")).toBe(DEFAULT_FAVICON_URL);
  });
});
