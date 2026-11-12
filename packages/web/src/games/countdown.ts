import {
  COUNTDOWN_PAD_CHAR,
  COUNTDOWN_PAD_LENGTH,
  SECONDS_PER_MINUTE,
} from "./constants";

export function formatCountdown(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / SECONDS_PER_MINUTE);
  const seconds = safe % SECONDS_PER_MINUTE;
  const minuteText = String(minutes).padStart(
    COUNTDOWN_PAD_LENGTH,
    COUNTDOWN_PAD_CHAR,
  );
  const secondText = String(seconds).padStart(
    COUNTDOWN_PAD_LENGTH,
    COUNTDOWN_PAD_CHAR,
  );
  return `${minuteText}:${secondText}`;
}
