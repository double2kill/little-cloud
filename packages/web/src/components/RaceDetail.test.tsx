import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RACE_SERIES, type RaceEvent } from "@little-cloud/data";
import { RaceDetail } from "./RaceDetail";
import {
  HULONG_SERIES_LABEL,
  HUXIAO_SERIES_LABEL,
  NO_RACE_HINT,
  REPLAY_LINK_LABEL,
  SELECT_DATE_HINT,
} from "../constants";

const huxiaoFixture: RaceEvent = {
  date: "2026-06-20",
  title: "沪上小师赛（奇侦妙探） 20260620 完整对局+弹幕版",
  replayUrl: "https://b23.tv/kM7pjYZ",
  series: RACE_SERIES.HUXIAO,
};

const hulongFixture: RaceEvent = {
  date: "2026-06-07",
  title: "【沪上龙门赛S2】【20260607】积分赛Day1",
  replayUrl: "https://b23.tv/5JTYXfq",
  series: RACE_SERIES.HULONG,
};

describe("RaceDetail", () => {
  it("should show hint when no date selected", () => {
    render(<RaceDetail selectedDate={null} race={undefined} />);
    expect(screen.getByText(SELECT_DATE_HINT)).toBeInTheDocument();
  });

  it("should show no race hint when date has no race", () => {
    render(<RaceDetail selectedDate="2026-01-01" race={undefined} />);
    expect(screen.getByText(NO_RACE_HINT)).toBeInTheDocument();
  });

  it("should show huxiao badge when race is huxiao series", () => {
    render(<RaceDetail selectedDate="2026-06-20" race={huxiaoFixture} />);
    expect(screen.getByText(`★ ${HUXIAO_SERIES_LABEL}`)).toBeInTheDocument();
  });

  it("should show hulong badge when race is hulong series", () => {
    render(<RaceDetail selectedDate="2026-06-07" race={hulongFixture} />);
    expect(screen.getByText(HULONG_SERIES_LABEL)).toBeInTheDocument();
  });

  it("should show replay link when race selected", () => {
    render(<RaceDetail selectedDate="2026-06-20" race={huxiaoFixture} />);
    const link = screen.getByRole("link", { name: REPLAY_LINK_LABEL });
    expect(link).toHaveAttribute("href", "https://b23.tv/kM7pjYZ");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
