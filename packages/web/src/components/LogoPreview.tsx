import { useEffect, useState } from "react";
import { useCharacter } from "../characters/CharacterContext";
import styles from "./LogoPreview.module.css";

interface LogoPreviewProps {
  src: string;
}

export function LogoPreview({ src }: LogoPreviewProps) {
  const { logoAlt, logoViewLabel, logoCloseLabel } = useCharacter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
        aria-label={logoViewLabel}
      >
        <img className={styles.logo} src={src} alt="" aria-hidden="true" />
      </button>

      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={logoViewLabel}
          onClick={handleClose}
        >
          <button
            type="button"
            className={styles.closeBtn}
            aria-label={logoCloseLabel}
            onClick={handleClose}
          >
            ×
          </button>
          <img
            className={styles.preview}
            src={src}
            alt={logoAlt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
