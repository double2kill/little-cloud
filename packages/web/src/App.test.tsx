import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App, ROUTE_PATH_CRYSTAL, ROUTE_PATH_LANI } from "./App";
import { laniConfig, LANI_DEBUT_DATE } from "./characters/lani";
import {
  crystalConfig,
  CRYSTAL_DEBUT_DATE,
  CRYSTAL_FAVICON_URL,
} from "./characters/crystal";
import {
  formatBroadcastDayLabel,
  HOME_PAGE_TITLE,
  HUXIAO_SERIES_LABEL,
  HUXIAO_STAR_MARK,
  REPLAY_LINK_LABEL,
  SELECT_DATE_HINT,
} from "./constants";
import { getBroadcastDay } from "./utils/broadcast-day";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  it("should render home navigation when mounted at root", () => {
    renderAt("/");
    expect(screen.getByText(HOME_PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(laniConfig.pageTitle)).toBeInTheDocument();
    expect(screen.getByText(crystalConfig.pageTitle)).toBeInTheDocument();
  });

  it("should render lani page title when mounted at lani route", () => {
    renderAt(ROUTE_PATH_LANI);
    expect(screen.getAllByText(laniConfig.pageTitle)[0]).toBeInTheDocument();
  });

  it("should render lani broadcast day when mounted at lani route", () => {
    renderAt(ROUTE_PATH_LANI);
    expect(
      screen.getByText(
        formatBroadcastDayLabel(getBroadcastDay(LANI_DEBUT_DATE)),
      ),
    ).toBeInTheDocument();
  });

  it("should render logo when mounted at lani route", () => {
    renderAt(ROUTE_PATH_LANI);
    expect(
      screen.getAllByRole("button", { name: laniConfig.logoViewLabel })[0],
    ).toBeInTheDocument();
  });

  it("should show race detail when race day selected on lani route", async () => {
    const user = userEvent.setup();
    renderAt(ROUTE_PATH_LANI);

    expect(screen.getAllByText(SELECT_DATE_HINT)[0]).toBeInTheDocument();

    const calendar = screen.getAllByLabelText("小日历")[0];
    await user.click(within(calendar).getByRole("button", { name: "上个月" }));

    const raceDay = within(calendar).getByRole("button", {
      name: /2026-06-20 沪小比赛日/,
    });
    await user.click(raceDay);

    expect(
      screen.getAllByText("沪上小师赛（奇侦妙探） 20260620 完整对局+弹幕版")[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(`${HUXIAO_STAR_MARK} ${HUXIAO_SERIES_LABEL}`)[0],
    ).toBeInTheDocument();
    const replayLink = screen.getAllByRole("link", {
      name: REPLAY_LINK_LABEL,
    })[0];
    expect(replayLink).toHaveAttribute("href", "https://b23.tv/kM7pjYZ");
  });

  it("should render crystal page title when mounted at crystal route", () => {
    renderAt(ROUTE_PATH_CRYSTAL);
    expect(
      screen.getAllByText(crystalConfig.pageTitle)[0],
    ).toBeInTheDocument();
  });

  it("should render crystal broadcast day when mounted at crystal route", () => {
    renderAt(ROUTE_PATH_CRYSTAL);
    expect(
      screen.getByText(
        formatBroadcastDayLabel(getBroadcastDay(CRYSTAL_DEBUT_DATE)),
      ),
    ).toBeInTheDocument();
  });

  it("should apply crystal theme class when mounted at crystal route", () => {
    renderAt(ROUTE_PATH_CRYSTAL);
    expect(document.body.classList.contains(crystalConfig.themeClass)).toBe(
      true,
    );
  });

  it("should set crystal favicon when mounted at crystal route", () => {
    renderAt(ROUTE_PATH_CRYSTAL);
    expect(
      document.querySelector<HTMLLinkElement>('link[rel="icon"]')?.getAttribute(
        "href",
      ),
    ).toBe(CRYSTAL_FAVICON_URL);
  });
});
