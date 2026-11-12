import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownTimer } from "../games/CountdownTimer";
import {
  GAME_TOOL_COUNTDOWN_ID,
  GAME_TOOL_DICE_ID,
  GAME_TOOL_WHEEL_ID,
  GAME_TOOLS,
  GAMES_BACK_HOME_LABEL,
  GAMES_BACK_LABEL,
  GAMES_PAGE_SUBTITLE,
  GAMES_PAGE_TITLE,
} from "../games/constants";
import { DiceRoll } from "../games/DiceRoll";
import { SpinWheel } from "../games/SpinWheel";
import { ROUTE_PATH_HOME } from "../routes";
import styles from "./GamesPage.module.css";

type GameToolId = (typeof GAME_TOOLS)[number]["id"];

function GameTool({ id }: { id: GameToolId }) {
  if (id === GAME_TOOL_WHEEL_ID) {
    return <SpinWheel />;
  }
  if (id === GAME_TOOL_COUNTDOWN_ID) {
    return <CountdownTimer />;
  }
  if (id === GAME_TOOL_DICE_ID) {
    return <DiceRoll />;
  }
  return null;
}

export function GamesPage() {
  const [activeToolId, setActiveToolId] = useState<GameToolId | null>(null);
  const activeTool = GAME_TOOLS.find((tool) => tool.id === activeToolId);

  useEffect(() => {
    document.title = activeTool ? activeTool.title : GAMES_PAGE_TITLE;
  }, [activeTool]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        {activeTool ? (
          <button
            type="button"
            className={styles.back}
            onClick={() => setActiveToolId(null)}
          >
            {GAMES_BACK_LABEL}
          </button>
        ) : null}
        <h1 className={styles.title}>
          {activeTool ? activeTool.title : GAMES_PAGE_TITLE}
        </h1>
        <p className={styles.subtitle}>
          {activeTool ? activeTool.description : GAMES_PAGE_SUBTITLE}
        </p>
      </header>

      {activeTool ? (
        <GameTool id={activeTool.id} />
      ) : (
        <nav className={styles.list} aria-label={GAMES_PAGE_TITLE}>
          {GAME_TOOLS.map((tool) => (
            <button
              key={tool.id}
              type="button"
              className={styles.card}
              aria-label={tool.title}
              onClick={() => setActiveToolId(tool.id)}
            >
              <span className={styles.cardTitle}>{tool.title}</span>
              <span className={styles.cardDesc}>{tool.description}</span>
            </button>
          ))}
        </nav>
      )}

      {activeTool ? null : (
        <Link className={styles.homeLink} to={ROUTE_PATH_HOME}>
          {GAMES_BACK_HOME_LABEL}
        </Link>
      )}
    </div>
  );
}
