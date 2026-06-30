# Lani 小日历

Lani 的比赛日历，用于查看沪小 / 沪龙赛程、比赛日与 B 站录屏回放。

## 功能

- 月历视图，高亮比赛日
- 沪小（★）与沪龙分色标识
- 点击日期查看比赛详情与回放链接
- 点击 Logo 查看大图
- 移动端友好布局

## 技术栈

- **Monorepo**: pnpm workspace + Lerna
- **Web**: React 19 + Vite + TypeScript
- **Data**: 赛程 JSON + 共享数据包
- **测试**: Vitest + Testing Library

## 项目结构

```
little-cloud/
├── packages/
│   ├── data/          # 赛程数据与查询 API
│   └── web/           # React 前端应用
├── package.json
└── pnpm-workspace.yaml
```

## 快速开始

环境要求：Node.js >= 18，pnpm

```bash
pnpm install
pnpm dev
```

浏览器访问 Vite 开发服务器地址（默认 `http://localhost:5173`）。

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Web 开发服务器 |
| `pnpm build` | 构建所有包 |
| `pnpm test` | 运行所有测试 |
| `pnpm lint` | 类型检查 |

## 更新赛程

编辑 `packages/data/src/schedule.json`，每条记录格式：

```json
{
  "date": "2026-06-20",
  "title": "比赛标题",
  "replayUrl": "https://b23.tv/xxx",
  "series": "huxiao"
}
```

`series` 取值：`huxiao`（沪小）或 `hulong`（沪龙）。

修改后运行 `pnpm test` 确认通过。

## 部署

```bash
pnpm build
```

构建产物位于 `packages/web/dist/`，可部署到任意静态托管服务。
