import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { HOME_CARD_ENTER_LABEL } from "../constants";
import type { HomeNavCharacter } from "../characters/home-characters";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  character: HomeNavCharacter;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const cardStyle = {
    "--card-accent": character.accent,
    "--card-accent-light": character.accentLight,
  } as CSSProperties;

  return (
    <Link
      to={character.path}
      className={styles.card}
      style={cardStyle}
      aria-label={`${HOME_CARD_ENTER_LABEL}：${character.title}`}
    >
      <div className={styles.avatarWrap}>
        <img
          className={styles.avatar}
          src={character.logoUrl}
          alt={character.logoAlt}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{character.title}</h2>
        <span className={styles.enter}>{HOME_CARD_ENTER_LABEL}</span>
      </div>
    </Link>
  );
}
