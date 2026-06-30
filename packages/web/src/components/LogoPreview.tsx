import { useEffect, useState } from "react";
import { LOGO_ALT, LOGO_CLOSE_LABEL, LOGO_VIEW_LABEL } from "../constants";
import styles from "./LogoPreview.module.css";

interface LogoPreviewProps {
  src: string;
}

export function LogoPreview({ src }: LogoPreviewProps) {
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
        aria-label={LOGO_VIEW_LABEL}
      >
        <img className={styles.logo} src={src} alt="" aria-hidden="true" />
      </button>

      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={LOGO_VIEW_LABEL}
          onClick={handleClose}
        >
          <button
            type="button"
            className={styles.closeBtn}
            aria-label={LOGO_CLOSE_LABEL}
            onClick={handleClose}
          >
            ×
          </button>
          <img
            className={styles.preview}
            src={src}
            alt={LOGO_ALT}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
