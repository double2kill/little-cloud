import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CharacterCard } from "../components/CharacterCard";
import { HOME_NAV_CHARACTERS } from "../characters/home-characters";
import { HOME_PAGE_SUBTITLE, HOME_PAGE_TITLE } from "../constants";
import { GAMES_PAGE_TITLE } from "../games/constants";
import { ROUTE_PATH_GAMES } from "../routes";
import styles from "./HomePage.module.css";

export function HomePage() {
  useEffect(() => {
    document.title = HOME_PAGE_TITLE;
  }, []);

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>{HOME_PAGE_TITLE}</h1>
        <p className={styles.subtitle}>{HOME_PAGE_SUBTITLE}</p>
      </header>

      <nav className={styles.cards} aria-label={HOME_PAGE_TITLE}>
        {HOME_NAV_CHARACTERS.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </nav>

      <Link className={styles.gamesLink} to={ROUTE_PATH_GAMES}>
        {GAMES_PAGE_TITLE}
      </Link>
    </div>
  );
}
