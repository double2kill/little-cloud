import { useEffect, useMemo, useState } from "react";
import {
  getRacesByDate,
  getRaceSeriesListByDate,
} from "@little-cloud/data";
import { Calendar } from "../components/Calendar";
import { LogoPreview } from "../components/LogoPreview";
import { RaceDetail } from "../components/RaceDetail";
import { buildCalendarDays, shiftMonth } from "../utils/calendar";
import { getBroadcastDay } from "../utils/broadcast-day";
import { CharacterProvider, useCharacter } from "../characters/CharacterContext";
import type { CharacterConfig } from "../characters/types";
import { formatBroadcastDayLabel } from "../constants";
import { restoreFavicon, setFavicon } from "../utils/favicon";
import styles from "./CalendarPage.module.css";

function CalendarPageContent() {
  const {
    pageTitle,
    logoUrl,
    faviconUrl,
    debutDate,
    schedule,
    themeClass,
  } = useCharacter();

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add(themeClass);
    document.title = pageTitle;
    const previousFavicon = faviconUrl ? setFavicon(faviconUrl) : null;
    return () => {
      document.body.classList.remove(themeClass);
      restoreFavicon(previousFavicon);
    };
  }, [themeClass, pageTitle, faviconUrl]);

  const broadcastDay = useMemo(
    () => getBroadcastDay(debutDate),
    [debutDate],
  );

  const raceSeriesListByDate = useMemo(
    () => getRaceSeriesListByDate(schedule),
    [schedule],
  );

  const days = useMemo(
    () => buildCalendarDays(year, month, raceSeriesListByDate),
    [year, month, raceSeriesListByDate],
  );

  const selectedRaces = selectedDate
    ? getRacesByDate(schedule, selectedDate)
    : [];

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
        <h1 className={styles.title}>{pageTitle}</h1>
        <p className={styles.broadcastDay}>
          {formatBroadcastDayLabel(broadcastDay)}
        </p>
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
        <RaceDetail selectedDate={selectedDate} races={selectedRaces} />
      </main>
    </div>
  );
}

interface CalendarPageProps {
  config: CharacterConfig;
}

export function CalendarPage({ config }: CalendarPageProps) {
  return (
    <CharacterProvider config={config}>
      <CalendarPageContent />
    </CharacterProvider>
  );
}
