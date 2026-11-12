import { useEffect, useState } from "react";
import {
  COUNTDOWN_DONE_LABEL,
  COUNTDOWN_DONE_SECONDS,
  COUNTDOWN_PAUSE_LABEL,
  COUNTDOWN_PRESETS,
  COUNTDOWN_RESET_LABEL,
  COUNTDOWN_START_LABEL,
  COUNTDOWN_TICK_MS,
  COUNTDOWN_TIMER_LABEL,
} from "./constants";
import { formatCountdown } from "./countdown";
import styles from "./CountdownTimer.module.css";

export function CountdownTimer() {
  const initialSeconds = COUNTDOWN_PRESETS[0].seconds;
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds);
  const [remaining, setRemaining] = useState<number>(initialSeconds);
  const [running, setRunning] = useState(false);
  const finished = !running && remaining === COUNTDOWN_DONE_SECONDS;

  useEffect(() => {
    if (!running) {
      return;
    }
    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          return COUNTDOWN_DONE_SECONDS;
        }
        return current - 1;
      });
    }, COUNTDOWN_TICK_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (running && remaining === COUNTDOWN_DONE_SECONDS) {
      setRunning(false);
    }
  }, [running, remaining]);

  function selectPreset(seconds: number) {
    if (running) {
      return;
    }
    setTotalSeconds(seconds);
    setRemaining(seconds);
  }

  function toggleRunning() {
    if (remaining === COUNTDOWN_DONE_SECONDS) {
      return;
    }
    setRunning((current) => !current);
  }

  function reset() {
    setRunning(false);
    setRemaining(totalSeconds);
  }

  return (
    <div className={styles.panel}>
      <p className={styles.time} role="timer" aria-label={COUNTDOWN_TIMER_LABEL}>
        {formatCountdown(remaining)}
      </p>
      <p className={styles.status} role="status">
        {finished ? COUNTDOWN_DONE_LABEL : ""}
      </p>
      <div className={styles.presets}>
        {COUNTDOWN_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={styles.preset}
            aria-pressed={preset.seconds === totalSeconds}
            disabled={running}
            onClick={() => selectPreset(preset.seconds)}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primary}
          disabled={remaining === COUNTDOWN_DONE_SECONDS}
          onClick={toggleRunning}
        >
          {running ? COUNTDOWN_PAUSE_LABEL : COUNTDOWN_START_LABEL}
        </button>
        <button type="button" className={styles.secondary} onClick={reset}>
          {COUNTDOWN_RESET_LABEL}
        </button>
      </div>
    </div>
  );
}
