import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";
import { DEFAULT_FAVICON_URL } from "../utils/favicon";

beforeAll(() => {
  if (!document.querySelector('link[rel="icon"]')) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = DEFAULT_FAVICON_URL;
    document.head.appendChild(link);
  }
});

afterEach(() => {
  cleanup();
});
