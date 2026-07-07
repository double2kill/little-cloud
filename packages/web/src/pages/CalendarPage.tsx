import { useEffect, useMemo, useState } from "react";
import {
  getRaceByDate,
  getRaceSeriesByDate,
} from "@little-cloud/data";
import { Calendar } from "../components/Calendar";
import { CrystalPaletteSwitcher } from "../components/CrystalPaletteSwitcher";
import { LogoPreview } from "../components/LogoPreview";
import { RaceDetail } from "../components/RaceDetail";
import { buildCalendarDays, shiftMonth } from "../utils/calendar";
import { CharacterProvider, useCharacter } from "../characters/CharacterContext";
import {
  applyCrystalPalette,
  clearCrystalPalette,
} from "../characters/apply-crystal-palette";
import { useCrystalPalette } from "../characters/useCrystalPalette";
import type { CharacterConfig } from "../characters/types";
import { restoreFavicon, setFavicon } from "../utils/favicon";
import styles from "./CalendarPage.module.css";

function CalendarPageContent() {
  const {
    pageTitle,
    pageSubtitle,
    logoUrl,
    faviconUrl,
    schedule,
    themeClass,
    supportsPaletteSwitcher = false,
  } = useCharacter();

  const { palette, paletteId, selectPalette } = useCrystalPalette(
    supportsPaletteSwitcher,
  );

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add(themeClass);
    document.title = pageTitle;
    const previousFavicon = faviconUrl ? setFavicon(faviconUrl) : null;
    if (supportsPaletteSwitcher) {
      applyCrystalPalette(palette);
    }
    return () => {
      document.body.classList.remove(themeClass);
      restoreFavicon(previousFavicon);
      if (supportsPaletteSwitcher) {
        clearCrystalPalette();
      }
    };
  }, [themeClass, pageTitle, faviconUrl, supportsPaletteSwitcher, palette]);

  const raceSeriesByDate = useMemo(
    () => getRaceSeriesByDate(schedule),
    [schedule],
  );

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
        <h1 className={styles.title}>{pageTitle}</h1>
        <p className={styles.subtitle}>{pageSubtitle}</p>
        {supportsPaletteSwitcher && (
          <CrystalPaletteSwitcher
            activeId={paletteId}
            onSelect={selectPalette}
          />
        )}
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
