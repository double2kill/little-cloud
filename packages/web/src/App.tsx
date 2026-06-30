import { useMemo, useState } from "react";
import {
  getRaceByDate,
  getRaceSeriesByDate,
  schedule,
} from "@little-cloud/data";
import { Calendar } from "./components/Calendar";
import { LogoPreview } from "./components/LogoPreview";
import { RaceDetail } from "./components/RaceDetail";
import { buildCalendarDays, shiftMonth } from "./utils/calendar";
import logoUrl from "./assets/logo.png";
import { PAGE_SUBTITLE, PAGE_TITLE } from "./constants";
import styles from "./App.module.css";

export function App() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const raceSeriesByDate = useMemo(() => getRaceSeriesByDate(schedule), []);

  const days = useMemo(
    () => buildCalendarDays(year, month, raceSeriesByDate),
    [year, month, raceSeriesByDate],
  );

  const selectedRace = selectedDate
    ? getRaceByDate(schedule, selectedDate)
    : undefined;

  const handlePrevMonth = () => {
    const next = shiftMonth(year, month, -1);
    setYear(next.year);
    setMonth(next.month);
  };

  const handleNextMonth = () => {
    const next = shiftMonth(year, month, 1);
    setYear(next.year);
    setMonth(next.month);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <LogoPreview src={logoUrl} />
        <h1 className={styles.title}>{PAGE_TITLE}</h1>
        <p className={styles.subtitle}>{PAGE_SUBTITLE}</p>
      </header>

      <main className={styles.main}>
        <Calendar
          year={year}
          month={month}
          days={days}
          selectedDate={selectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onSelectDate={setSelectedDate}
        />
        <RaceDetail selectedDate={selectedDate} race={selectedRace} />
      </main>
    </div>
  );
}
