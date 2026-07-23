import { RACE_SERIES, type RaceEvent } from "@little-cloud/data";
import { BilibiliLink } from "./BilibiliLink";
import styles from "./RaceDetail.module.css";
import { useCharacter } from "../characters/CharacterContext";
import {
  EMPTY_STATE_EMOJI,
  HULONG_SERIES_LABEL,
  HUASHAN_SERIES_LABEL,
  HUXIAO_SERIES_LABEL,
  HUXIAO_STAR_MARK,
  NO_RACE_EMOJI,
  RACE_DAY_LABEL,
  REPLAY_LINK_LABEL,
  SELECT_DATE_HINT,
} from "../constants";

interface RaceDetailProps {
  selectedDate: string | null;
  races: RaceEvent[];
}

function getSeriesLabel(series: RaceEvent["series"]): string {
  if (series === RACE_SERIES.HUXIAO) {
    return `${HUXIAO_STAR_MARK} ${HUXIAO_SERIES_LABEL}`;
  }
  if (series === RACE_SERIES.HUASHAN) {
    return HUASHAN_SERIES_LABEL;
  }
  return HULONG_SERIES_LABEL;
}

function getSeriesBadgeClass(series: RaceEvent["series"]): string {
  return series === RACE_SERIES.HUXIAO
    ? styles.badgeHuxiao
    : styles.badgeHulong;
}

function RaceItem({ race }: { race: RaceEvent }) {
  const isHuxiao = race.series === RACE_SERIES.HUXIAO;

  return (
    <article className={styles.raceItem}>
      <div className={styles.badges}>
        <span className={getSeriesBadgeClass(race.series)}>
          {getSeriesLabel(race.series)}
        </span>
        <span className={styles.raceBadge}>{RACE_DAY_LABEL}</span>
      </div>
      <h3 className={styles.title}>
        {isHuxiao && (
          <span className={styles.star} aria-hidden="true">
            {HUXIAO_STAR_MARK}
          </span>
        )}
        {race.title}
      </h3>
      <div className={styles.replay}>
        <BilibiliLink url={race.replayUrl} label={REPLAY_LINK_LABEL} />
      </div>
    </article>
  );
}

export function RaceDetail({ selectedDate, races }: RaceDetailProps) {
  const { noRaceHint } = useCharacter();

  if (!selectedDate) {
    return (
      <section className={styles.detail}>
        <div className={styles.emptyState}>
          <span className={styles.emoji} aria-hidden="true">
            {EMPTY_STATE_EMOJI}
          </span>
          <p className={styles.hint}>{SELECT_DATE_HINT}</p>
        </div>
      </section>
    );
  }

  if (races.length === 0) {
    return (
      <section className={styles.detail}>
        <div className={styles.emptyState}>
          <span className={styles.emoji} aria-hidden="true">
            {NO_RACE_EMOJI}
          </span>
          <p className={styles.date}>{selectedDate}</p>
          <p className={styles.hint}>{noRaceHint}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.detail}>
      <p className={styles.date}>{selectedDate}</p>
      <div className={styles.raceList}>
        {races.map((race) => (
          <RaceItem key={`${race.date}-${race.series}-${race.title}`} race={race} />
        ))}
      </div>
    </section>
  );
}
