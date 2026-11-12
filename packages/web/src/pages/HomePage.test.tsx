import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";
import { HOME_NAV_CHARACTERS } from "../characters/home-characters";
import { HOME_PAGE_SUBTITLE, HOME_PAGE_TITLE } from "../constants";
import { GAMES_PAGE_TITLE } from "../games/constants";
import { ROUTE_PATH_GAMES } from "../routes";

describe("HomePage", () => {
  it("should render home title when mounted", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(HOME_PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(HOME_PAGE_SUBTITLE)).toBeInTheDocument();
  });

  it("should render all character cards when mounted", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    for (const character of HOME_NAV_CHARACTERS) {
      expect(screen.getByText(character.title)).toBeInTheDocument();
    }
  });

  it("should link to games when mounted", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: GAMES_PAGE_TITLE })).toHaveAttribute(
      "href",
      ROUTE_PATH_GAMES,
    );
  });
});
