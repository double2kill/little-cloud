import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import {
  GAME_TOOLS,
  GAMES_BACK_HOME_LABEL,
  GAMES_BACK_LABEL,
  GAMES_PAGE_SUBTITLE,
  GAMES_PAGE_TITLE,
  WHEEL_SPIN_LABEL,
} from "../games/constants";
import { ROUTE_PATH_HOME } from "../routes";
import { GamesPage } from "./GamesPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <GamesPage />
    </MemoryRouter>,
  );
}

describe("GamesPage", () => {
  it("should render tool list when mounted", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: GAMES_PAGE_TITLE }),
    ).toBeInTheDocument();
    expect(screen.getByText(GAMES_PAGE_SUBTITLE)).toBeInTheDocument();
    for (const tool of GAME_TOOLS) {
      expect(screen.getByRole("button", { name: tool.title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", { name: GAMES_BACK_HOME_LABEL }),
    ).toHaveAttribute("href", ROUTE_PATH_HOME);
  });

  it("should show wheel when wheel tool selected", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: GAME_TOOLS[0].title }));

    expect(
      screen.getByRole("heading", { name: GAME_TOOLS[0].title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: WHEEL_SPIN_LABEL }),
    ).toBeInTheDocument();
  });

  it("should show tool list when back clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: GAME_TOOLS[0].title }));
    await user.click(screen.getByRole("button", { name: GAMES_BACK_LABEL }));

    expect(
      screen.getByRole("heading", { name: GAMES_PAGE_TITLE }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: GAME_TOOLS[2].title }),
    ).toBeInTheDocument();
  });
});
