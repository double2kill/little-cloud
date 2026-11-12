import { DICE_FACE_OFFSET, DICE_GLYPHS, RANDOM_UNIT_MAX } from "./constants";

export function rollDice(random: number, faces: number): number {
  const scaled = Math.min(Math.max(random, 0), RANDOM_UNIT_MAX);
  return Math.floor(scaled * faces) + DICE_FACE_OFFSET;
}

export function diceGlyph(face: number): string {
  return DICE_GLYPHS[face - DICE_FACE_OFFSET] ?? "";
}
