import { RACE_SERIES } from "@little-cloud/data";
import styles from "./Calendar.module.css";
import { HUXIAO_STAR_MARK, WEEKDAY_LABELS } from "../constants";
import type { CalendarDay } from "../utils/calendar";

interface CalendarProps {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedDate: string | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: string) => void;
}

export function Calendar({
  year,
  month,
  days,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
}: CalendarProps) {
  return (
    <section className={styles.calendar} aria-label="小日历">
      <header className={styles.header}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={onPrevMonth}
          aria-label="上个月"
        >
          ‹
        </button>
        <h2 className={styles.title}>
          {year} 年 {month} 月
        </h2>
        <button
          type="button"
          className={styles.navBtn}
          onClick={onNextMonth}
          aria-label="下个月"
        >
          ›
        </button>
      </header>

      <div className={styles.weekdays}>
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className={styles.weekday}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          const isHuxiao = day.series === RACE_SERIES.HUXIAO;
          const classNames = [
            styles.day,
            !day.isCurrentMonth && styles.otherMonth,
            day.isToday && styles.today,
            isHuxiao && day.isRaceDay && styles.raceDayHuxiao,
            !isHuxiao && day.isRaceDay && styles.raceDayHulong,
            isSelected && styles.selected,
          ]
            .filter(Boolean)
            .join(" ");

          const raceLabel = day.isRaceDay
            ? isHuxiao
              ? ` 沪小比赛日`
              : " 比赛日"
            : "";

          return (
            <button
              key={day.date}
              type="button"
              className={classNames}
              onClick={() => onSelectDate(day.date)}
              aria-label={`${day.date}${raceLabel}`}
              aria-pressed={isSelected}
            >
              <span className={styles.dayNum}>{day.day}</span>
              {day.isRaceDay &&
                (isHuxiao ? (
                  <span className={styles.star} aria-hidden="true">
                    {HUXIAO_STAR_MARK}
                  </span>
                ) : (
                  <span className={styles.dot} aria-hidden="true" />
                ))}
            </button>
          );
        })}
      </div>
    </section>
  );
}
