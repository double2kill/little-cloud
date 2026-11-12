import {
  WHEEL_COLORS,
  WHEEL_FULL_CIRCLE_DEGREES,
  WHEEL_LABEL_OFFSET_PX,
  WHEEL_OPTION_SEPARATOR,
  RANDOM_UNIT_MAX,
} from "./constants";

export function parseWheelOptions(draft: string): string[] {
  return draft
    .split(WHEEL_OPTION_SEPARATOR)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function joinWheelOptions(options: readonly string[]): string {
  return options.join(WHEEL_OPTION_SEPARATOR);
}

export function pickWheelIndex(random: number, optionCount: number): number {
  if (optionCount <= 0) {
    return 0;
  }
  const scaled = Math.min(Math.max(random, 0), RANDOM_UNIT_MAX);
  return Math.floor(scaled * optionCount);
}

export function nextWheelRotation(
  currentDegrees: number,
  index: number,
  optionCount: number,
  turns: number,
): number {
  const segment = WHEEL_FULL_CIRCLE_DEGREES / optionCount;
  const center = index * segment + segment / 2;
  const targetMod =
    (WHEEL_FULL_CIRCLE_DEGREES - center) % WHEEL_FULL_CIRCLE_DEGREES;
  const spun =
    currentDegrees -
    (currentDegrees % WHEEL_FULL_CIRCLE_DEGREES) +
    turns * WHEEL_FULL_CIRCLE_DEGREES;
  const next = spun + targetMod;
  if (next <= currentDegrees) {
    return next + WHEEL_FULL_CIRCLE_DEGREES;
  }
  return next;
}

export function buildWheelGradient(optionCount: number): string {
  if (optionCount <= 0) {
    return "none";
  }
  const segment = WHEEL_FULL_CIRCLE_DEGREES / optionCount;
  const stops = Array.from({ length: optionCount }, (_, index) => {
    const color = WHEEL_COLORS[index % WHEEL_COLORS.length];
    const start = index * segment;
    const end = (index + 1) * segment;
    return `${color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export function wheelLabelTransform(index: number, optionCount: number): string {
  const segment = WHEEL_FULL_CIRCLE_DEGREES / optionCount;
  const angle = index * segment + segment / 2;
  return `rotate(${angle}deg) translateY(-${WHEEL_LABEL_OFFSET_PX}px) rotate(-${angle}deg)`;
}
