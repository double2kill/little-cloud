import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import {
  HUXIAO_SERIES_LABEL,
  HUXIAO_STAR_MARK,
  LOGO_VIEW_LABEL,
  PAGE_TITLE,
  REPLAY_LINK_LABEL,
  SELECT_DATE_HINT,
} from "./constants";

describe("App", () => {
  it("should render page title when mounted", () => {
    render(<App />);
    expect(screen.getAllByText(PAGE_TITLE)[0]).toBeInTheDocument();
  });

  it("should render logo when mounted", () => {
    render(<App />);
    expect(
      screen.getAllByRole("button", { name: LOGO_VIEW_LABEL })[0],
    ).toBeInTheDocument();
  });

  it("should show race detail when race day selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getAllByText(SELECT_DATE_HINT)[0]).toBeInTheDocument();

    const calendar = screen.getAllByLabelText("小日历")[0];
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
});
