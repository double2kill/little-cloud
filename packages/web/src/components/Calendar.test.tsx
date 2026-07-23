import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RACE_SERIES } from "@little-cloud/data";
import { Calendar } from "./Calendar";
import { buildCalendarDays } from "../utils/calendar";

describe("Calendar", () => {
  it("should show multi race markers when date has two series", () => {
    const days = buildCalendarDays(
      2026,
      7,
      new Map([["2026-07-05", [RACE_SERIES.HUXIAO, RACE_SERIES.HULONG]]]),
      new Date("2026-07-01"),
    );
    render(
      <Calendar
        year={2026}
        month={7}
        days={days}
        selectedDate={null}
        onPrevMonth={() => {}}
        onNextMonth={() => {}}
        onSelectDate={() => {}}
      />,
    );

    const dayButton = screen.getByRole("button", {
      name: "2026-07-05 2场比赛日",
    });
    expect(within(dayButton).getByText("2")).toBeInTheDocument();
  });
});
