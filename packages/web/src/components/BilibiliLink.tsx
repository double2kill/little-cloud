import styles from "./BilibiliLink.module.css";

interface BilibiliLinkProps {
  url: string;
  label: string;
}

export function BilibiliLink({ url, label }: BilibiliLinkProps) {
  return (
    <a
      className={styles.link}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.icon} aria-hidden="true">
        ▶
      </span>
      {label}
    </a>
  );
}
