import styles from "./Calendar.module.css";
import {
  formatRaceDayAriaLabel,
  HUXIAO_STAR_MARK,
  WEEKDAY_LABELS,
} from "../constants";
import {
  hasHuxiaoSeries,
  hasNonHuxiaoSeries,
  type CalendarDay,
} from "../utils/calendar";

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
          const isHuxiao = hasHuxiaoSeries(day.seriesList);
          const isNonHuxiao = hasNonHuxiaoSeries(day.seriesList);
          const isMultiRace = day.seriesList.length > 1;
          const classNames = [
            styles.day,
            !day.isCurrentMonth && styles.otherMonth,
            day.isToday && styles.today,
            isMultiRace && styles.raceDayMulti,
            !isMultiRace && isHuxiao && styles.raceDayHuxiao,
            !isMultiRace && isNonHuxiao && styles.raceDayHulong,
            isSelected && styles.selected,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={day.date}
              type="button"
              className={classNames}
              onClick={() => onSelectDate(day.date)}
              aria-label={formatRaceDayAriaLabel(
                day.date,
                day.seriesList,
                isHuxiao,
              )}
              aria-pressed={isSelected}
            >
              <span className={styles.dayNum}>{day.day}</span>
              {day.isRaceDay && (
                <span className={styles.markers} aria-hidden="true">
                  {isHuxiao && (
                    <span className={styles.star}>{HUXIAO_STAR_MARK}</span>
                  )}
                  {isNonHuxiao && <span className={styles.dot} />}
                  {isMultiRace && (
                    <span className={styles.count}>{day.seriesList.length}</span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
