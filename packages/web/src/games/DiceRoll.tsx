import { useState } from "react";
import {
  DICE_FACES,
  DICE_IDLE_LABEL,
  DICE_RESULT_LABEL,
  DICE_ROLL_LABEL,
} from "./constants";
import { diceGlyph, rollDice } from "./dice";
import styles from "./DiceRoll.module.css";

export function DiceRoll() {
  const [face, setFace] = useState<number | null>(null);

  function handleRoll() {
    setFace(rollDice(Math.random(), DICE_FACES));
  }

  return (
    <div className={styles.panel}>
      <p className={styles.face} role="status" aria-label={DICE_RESULT_LABEL}>
        {face === null ? DICE_IDLE_LABEL : diceGlyph(face)}
      </p>
      <button type="button" className={styles.roll} onClick={handleRoll}>
        {DICE_ROLL_LABEL}
      </button>
    </div>
  );
}
