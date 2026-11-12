import { useEffect, useRef, useState } from "react";
import {
  WHEEL_DEFAULT_OPTIONS,
  WHEEL_IDLE_RESULT,
  WHEEL_MIN_OPTIONS,
  WHEEL_OPTIONS_HINT,
  WHEEL_OPTIONS_INPUT_ID,
  WHEEL_OPTIONS_LABEL,
  WHEEL_RESULT_PREFIX,
  WHEEL_SPIN_DURATION_MS,
  WHEEL_SPIN_LABEL,
  WHEEL_SPIN_TURNS,
  WHEEL_SPINNING_LABEL,
  WHEEL_TOO_FEW_HINT,
  WHEEL_VISUAL_LABEL,
} from "./constants";
import {
  buildWheelGradient,
  joinWheelOptions,
  nextWheelRotation,
  parseWheelOptions,
  pickWheelIndex,
  wheelLabelTransform,
} from "./wheel";
import styles from "./SpinWheel.module.css";

export function SpinWheel() {
  const [draft, setDraft] = useState(joinWheelOptions(WHEEL_DEFAULT_OPTIONS));
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const pendingIndex = useRef<number | null>(null);
  const options = parseWheelOptions(draft);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const canSpin = !spinning && options.length >= WHEEL_MIN_OPTIONS;

  useEffect(() => {
    if (!spinning) {
      return;
    }
    const timer = window.setTimeout(() => {
      const index = pendingIndex.current;
      pendingIndex.current = null;
      setSpinning(false);
      if (index === null) {
        return;
      }
      setResult(optionsRef.current[index] ?? null);
    }, WHEEL_SPIN_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [spinning]);

  function handleDraftChange(value: string) {
    setDraft(value);
    setResult(null);
  }

  function handleSpin() {
    if (!canSpin) {
      return;
    }
    const index = pickWheelIndex(Math.random(), options.length);
    pendingIndex.current = index;
    setResult(null);
    setSpinning(true);
    setRotation((current) =>
      nextWheelRotation(current, index, options.length, WHEEL_SPIN_TURNS),
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.stage}>
        <div className={styles.pointer} />
        <div
          className={styles.wheel}
          role="img"
          aria-label={WHEEL_VISUAL_LABEL}
          style={{
            background: buildWheelGradient(options.length),
            transform: `rotate(${rotation}deg)`,
            transitionDuration: `${WHEEL_SPIN_DURATION_MS}ms`,
          }}
        >
          {options.map((option, index) => (
            <span
              key={`${option}-${index}`}
              className={styles.label}
              style={{ transform: wheelLabelTransform(index, options.length) }}
            >
              {option}
            </span>
          ))}
        </div>
      </div>

      <p className={styles.result} role="status">
        {result ? `${WHEEL_RESULT_PREFIX}${result}` : WHEEL_IDLE_RESULT}
      </p>

      <button
        type="button"
        className={styles.spin}
        disabled={!canSpin}
        onClick={handleSpin}
      >
        {spinning ? WHEEL_SPINNING_LABEL : WHEEL_SPIN_LABEL}
      </button>

      <label className={styles.field} htmlFor={WHEEL_OPTIONS_INPUT_ID}>
        <span className={styles.fieldLabel}>
          {WHEEL_OPTIONS_LABEL}
          <span className={styles.hint}>{WHEEL_OPTIONS_HINT}</span>
        </span>
        <textarea
          id={WHEEL_OPTIONS_INPUT_ID}
          className={styles.input}
          aria-label={WHEEL_OPTIONS_LABEL}
          value={draft}
          disabled={spinning}
          onChange={(event) => handleDraftChange(event.target.value)}
        />
      </label>

      {options.length < WHEEL_MIN_OPTIONS ? (
        <p className={styles.warning}>{WHEEL_TOO_FEW_HINT}</p>
      ) : null}
    </div>
  );
}
