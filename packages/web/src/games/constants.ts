export const GAMES_PAGE_TITLE = "互动小工具";

export const GAMES_PAGE_SUBTITLE = "直播间互动";

export const GAMES_BACK_HOME_LABEL = "返回首页";

export const GAMES_BACK_LABEL = "返回";

export const GAME_TOOL_WHEEL_ID = "wheel";

export const GAME_TOOL_COUNTDOWN_ID = "countdown";

export const GAME_TOOL_DICE_ID = "dice";

export const GAME_TOOL_WHEEL_TITLE = "幸运转盘";

export const GAME_TOOL_WHEEL_DESC = "从选项里抽一个";

export const GAME_TOOL_COUNTDOWN_TITLE = "倒计时";

export const GAME_TOOL_COUNTDOWN_DESC = "直播计时";

export const GAME_TOOL_DICE_TITLE = "骰子";

export const GAME_TOOL_DICE_DESC = "掷出点数";

export const GAME_TOOLS = [
  {
    id: GAME_TOOL_WHEEL_ID,
    title: GAME_TOOL_WHEEL_TITLE,
    description: GAME_TOOL_WHEEL_DESC,
  },
  {
    id: GAME_TOOL_COUNTDOWN_ID,
    title: GAME_TOOL_COUNTDOWN_TITLE,
    description: GAME_TOOL_COUNTDOWN_DESC,
  },
  {
    id: GAME_TOOL_DICE_ID,
    title: GAME_TOOL_DICE_TITLE,
    description: GAME_TOOL_DICE_DESC,
  },
] as const;

export const WHEEL_SPIN_LABEL = "开始";

export const WHEEL_SPINNING_LABEL = "转动中";

export const WHEEL_OPTIONS_LABEL = "选项";

export const WHEEL_OPTIONS_HINT = "每行一个";

export const WHEEL_VISUAL_LABEL = "转盘";

export const WHEEL_OPTIONS_INPUT_ID = "wheel-options";

export const WHEEL_MIN_OPTIONS = 2;

export const WHEEL_TOO_FEW_HINT = "至少两个选项";

export const WHEEL_IDLE_RESULT = "等待结果";

export const WHEEL_RESULT_PREFIX = "结果：";

export const WHEEL_SPIN_TURNS = 5;

export const WHEEL_SPIN_DURATION_MS = 4000;

export const WHEEL_FULL_CIRCLE_DEGREES = 360;

export const WHEEL_OPTION_SEPARATOR = "\n";

export const RANDOM_UNIT_MAX = 0.999999;

export const WHEEL_DEFAULT_OPTIONS = [
  "唱歌",
  "整活",
  "问答",
  "喝水",
  "再转一次",
  "自由发挥",
] as const;

export const WHEEL_COLORS = [
  "#ff8fa8",
  "#ffd0dc",
  "#8fd4f0",
  "#c9b6ff",
  "#ffe08a",
  "#b8f0d0",
] as const;

export const WHEEL_LABEL_OFFSET_PX = 92;

export const COUNTDOWN_START_LABEL = "开始";

export const COUNTDOWN_PAUSE_LABEL = "暂停";

export const COUNTDOWN_RESET_LABEL = "重置";

export const COUNTDOWN_DONE_LABEL = "时间到";

export const COUNTDOWN_TIMER_LABEL = "剩余时间";

export const COUNTDOWN_TICK_MS = 1000;

export const SECONDS_PER_MINUTE = 60;

export const COUNTDOWN_PAD_LENGTH = 2;

export const COUNTDOWN_PAD_CHAR = "0";

export const COUNTDOWN_DONE_SECONDS = 0;

export const COUNTDOWN_PRESETS = [
  { id: "30s", label: "30 秒", seconds: 30 },
  { id: "60s", label: "1 分钟", seconds: 60 },
  { id: "180s", label: "3 分钟", seconds: 180 },
  { id: "300s", label: "5 分钟", seconds: 300 },
] as const;

export const DICE_ROLL_LABEL = "掷骰子";

export const DICE_RESULT_LABEL = "点数";

export const DICE_IDLE_LABEL = "点击掷骰";

export const DICE_FACES = 6;

export const DICE_FACE_OFFSET = 1;

export const DICE_GLYPHS = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"] as const;
