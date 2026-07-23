import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RACE_SERIES, type RaceEvent } from "@little-cloud/data";
import { RaceDetail } from "./RaceDetail";
import { CharacterProvider } from "../characters/CharacterContext";
import { laniConfig } from "../characters/lani";
import { crystalConfig } from "../characters/crystal";
import {
  HULONG_SERIES_LABEL,
  HUXIAO_SERIES_LABEL,
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

const sameDayHulongFixture: RaceEvent = {
  date: "2026-07-05",
  title: "【沪上龙门赛S2】【20260705】积分赛Day14",
  replayUrl: "https://b23.tv/WzAwR9o",
  series: RACE_SERIES.HULONG,
};

const sameDayHuxiaoFixture: RaceEvent = {
  date: "2026-07-05",
  title: "沪上小师赛（奇侦妙探） 20260705",
  replayUrl: "https://v.youku.com/v_show/id_XNjUzNzg4MTYyOA==.html",
  series: RACE_SERIES.HUXIAO,
};

function renderRaceDetail(
  props: React.ComponentProps<typeof RaceDetail>,
  config = laniConfig,
) {
  return render(
    <CharacterProvider config={config}>
      <RaceDetail {...props} />
    </CharacterProvider>,
  );
}

describe("RaceDetail", () => {
  it("should show hint when no date selected", () => {
    renderRaceDetail({ selectedDate: null, races: [] });
    expect(screen.getByText(SELECT_DATE_HINT)).toBeInTheDocument();
  });

  it("should show no race hint when date has no race", () => {
    renderRaceDetail({ selectedDate: "2026-01-01", races: [] });
    expect(screen.getByText(laniConfig.noRaceHint)).toBeInTheDocument();
  });

  it("should show crystal no race hint when crystal config used", () => {
    renderRaceDetail(
      { selectedDate: "2026-01-01", races: [] },
      crystalConfig,
    );
    expect(screen.getByText(crystalConfig.noRaceHint)).toBeInTheDocument();
  });

  it("should show huxiao badge when race is huxiao series", () => {
    renderRaceDetail({
      selectedDate: "2026-06-20",
      races: [huxiaoFixture],
    });
    expect(screen.getByText(`★ ${HUXIAO_SERIES_LABEL}`)).toBeInTheDocument();
  });

  it("should show hulong badge when race is hulong series", () => {
    renderRaceDetail({
      selectedDate: "2026-06-07",
      races: [hulongFixture],
    });
    expect(screen.getByText(HULONG_SERIES_LABEL)).toBeInTheDocument();
  });

  it("should show replay link when race selected", () => {
    renderRaceDetail({
      selectedDate: "2026-06-20",
      races: [huxiaoFixture],
    });
    const link = screen.getByRole("link", { name: REPLAY_LINK_LABEL });
    expect(link).toHaveAttribute("href", "https://b23.tv/kM7pjYZ");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should show all races when multiple races on same date", () => {
    renderRaceDetail({
      selectedDate: "2026-07-05",
      races: [sameDayHuxiaoFixture, sameDayHulongFixture],
    });
    expect(screen.getByText(sameDayHulongFixture.title)).toBeInTheDocument();
    expect(screen.getByText(sameDayHuxiaoFixture.title)).toBeInTheDocument();
    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles[0]).toHaveTextContent(sameDayHuxiaoFixture.title);
    expect(titles[1]).toHaveTextContent(sameDayHulongFixture.title);
    expect(screen.getAllByRole("link", { name: REPLAY_LINK_LABEL })).toHaveLength(
      2,
    );
  });
});