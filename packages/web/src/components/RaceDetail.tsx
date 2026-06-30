import { RACE_SERIES, type RaceEvent } from "@little-cloud/data";
import { BilibiliLink } from "./BilibiliLink";
import styles from "./RaceDetail.module.css";
import {
  EMPTY_STATE_EMOJI,
  HULONG_SERIES_LABEL,
  HUXIAO_SERIES_LABEL,
  HUXIAO_STAR_MARK,
  NO_RACE_EMOJI,
  NO_RACE_HINT,
  RACE_DAY_LABEL,
  REPLAY_LINK_LABEL,
  SELECT_DATE_HINT,
} from "../constants";

interface RaceDetailProps {
  selectedDate: string | null;
  race: RaceEvent | undefined;
}

export function RaceDetail({ selectedDate, race }: RaceDetailProps) {
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

  if (!race) {
    return (
      <section className={styles.detail}>
        <div className={styles.emptyState}>
          <span className={styles.emoji} aria-hidden="true">
            {NO_RACE_EMOJI}
          </span>
          <p className={styles.date}>{selectedDate}</p>
          <p className={styles.hint}>{NO_RACE_HINT}</p>
        </div>
      </section>
    );
  }

  const isHuxiao = race.series === RACE_SERIES.HUXIAO;
  const seriesLabel = isHuxiao
    ? `${HUXIAO_STAR_MARK} ${HUXIAO_SERIES_LABEL}`
    : HULONG_SERIES_LABEL;
  const seriesBadgeClass = isHuxiao ? styles.badgeHuxiao : styles.badgeHulong;

  return (
    <section className={styles.detail}>
      <div className={styles.badges}>
        <span className={seriesBadgeClass}>{seriesLabel}</span>
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
      <p className={styles.date}>{selectedDate}</p>
      <div className={styles.replay}>
        <BilibiliLink url={race.replayUrl} label={REPLAY_LINK_LABEL} />
      </div>
    </section>
  );
}
