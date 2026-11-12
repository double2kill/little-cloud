import { describe, expect, it } from "vitest";
import { DICE_FACES, DICE_GLYPHS } from "./constants";
import { diceGlyph, rollDice } from "./dice";

describe("rollDice", () => {
  it("should return one when random is zero", () => {
    expect(rollDice(0, DICE_FACES)).toBe(1);
  });

  it("should return the last face when random is almost one", () => {
    expect(rollDice(0.999, DICE_FACES)).toBe(DICE_FACES);
  });
});

describe("diceGlyph", () => {
  it("should map each face when face is in range", () => {
    expect(diceGlyph(1)).toBe(DICE_GLYPHS[0]);
    expect(diceGlyph(DICE_FACES)).toBe(DICE_GLYPHS[DICE_FACES - 1]);
  });
});
