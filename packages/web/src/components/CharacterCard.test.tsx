import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CharacterCard } from "./CharacterCard";
import { HOME_NAV_CHARACTERS } from "../characters/home-characters";
import { HOME_CARD_ENTER_LABEL } from "../constants";
import { ROUTE_PATH_LANI } from "../routes";

describe("CharacterCard", () => {
  it("should render character title when mounted", () => {
    const character = HOME_NAV_CHARACTERS[0];
    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>,
    );
    expect(screen.getByText(character.title)).toBeInTheDocument();
  });

  it("should link to character path when mounted", () => {
    const character = HOME_NAV_CHARACTERS[0];
    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>,
    );
    const link = screen.getByRole("link", {
      name: `${HOME_CARD_ENTER_LABEL}：${character.title}`,
    });
    expect(link).toHaveAttribute("href", ROUTE_PATH_LANI);
  });
});
