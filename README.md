# dsh-workbench

[![npm version](https://img.shields.io/npm/v/@guojing6/dsh-workbench)](https://www.npmjs.com/package/@guojing6/dsh-workbench)

`dsh-workbench` is a local-first personal workbench plugin for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web.

It turns DSH into a task-centered AI workspace: calendar, task tree, quick intake, AI clarification, execution review, daily planning, reports, knowledge base, ideas, and local task folders.

[中文](#中文) · [English](#english)

---

## 中文

### 项目简介

`dsh-workbench` 是一个 DeepSeek Harness Web 插件，用来在 DSH 里管理个人任务、AI 会话和本地工作资料。

它适合这样的工作流：

1. 在工作台快速录入一条任务。
2. 让 AI 在官方会话区澄清需求并生成任务草稿。
3. 在工作台确认后保存为正式任务。
4. 后续围绕同一个任务继续做咨询、拆解、执行、复盘、知识沉淀。

所有核心数据默认存储在本机 `Documents/dsh-workbench` 下。

```text
Documents/dsh-workbench/
├─ workbench.db
└─ tasks/
   └─ <任务ID>/
```

`tasks` 是固定 AI 工作区根目录。每个任务会在 `tasks/<任务ID>` 下拥有独立资料夹，用于存放该任务相关文件；AI 会话连接到 `tasks` 根工作区，避免 DSH 侧边栏出现大量零散工作区。

### 功能

**任务管理**

- 今日、日历、任务列表三种视图。
- 周视图和月视图日历。
- 支持父任务、子任务和多层任务树。
- 支持标题、Markdown 描述、类型、状态、优先级、截止时间、预计耗时、AI 策略、任务资料夹。
- 支持关键词、状态、优先级、类型组合筛选。
- 支持按截止时间、优先级、创建时间、标题排序。
- 支持任务归档、恢复和变更记录。
- 子任务全部完成后，父任务可自动完成。

**快速录入**

- 支持文字快速录入。
- 支持粘贴图片或拖入图片，适合通知截图、考试信息、错误截图、表格照片等。
- 支持在快速录入右下角切换模型。
- 自动预分配任务 ID，并准备 `tasks/<任务ID>` 资料夹。
- 创建 AI 澄清会话后，由 AI 调用工具提交待确认任务草稿。

**AI 协作**

- AI 澄清：把自然语言输入整理成结构化任务草稿。
- AI 咨询：围绕任务给建议，不直接执行。
- AI 拆解：生成子任务提案树，用户确认后写入。
- AI 执行：仅对 AI 策略为“可执行”的任务开放；AI 完成后提交验收申请。
- AI 复盘：已完成任务可生成复盘草稿，确认后写回任务。
- AI 智能排序：为今日或日历中的指定日期生成执行顺序提案。
- AI 日报/周报：基于任务事件和完成记录生成报告草稿。
- 任务共享记忆：同一任务及其子树下的 AI 会话可共享上下文、阶段结论和决策。

**知识库与点子**

- 知识库可保存经验教训、决策、笔记和可复用片段。
- 支持读取本地文档，让 AI 总结为知识草稿。
- 知识条目可保存本地文件链接，便于追溯来源。
- 点子模块用于记录灵感。
- 点子王用于把多个相关点子聚合成主题集合。
- AI 可根据点子或点子王继续头脑风暴，并生成落地任务草稿。

**提醒与设置**

- 到期任务会显示工作台横幅提醒。
- 浏览器授权后可弹出系统桌面通知。
- 支持准时、提前 15 分钟、提前 30 分钟、提前 1 小时、提前 1 天提醒。
- 设置页可修改默认 AI 工作区。
- 设置页可启用或关闭自动创建任务资料夹。
- 设置页可启用或关闭桌面通知。
- 任务类型、状态、优先级、点子类型由字典驱动，可新增、编辑、停用；内置项受保护。

### 截图

| 主界面 | 日历 | 任务列表 |
|---|---|---|
| ![主界面](screenshot/%E4%B8%BB%E7%95%8C%E9%9D%A2.PNG) | ![日历](screenshot/%E6%97%A5%E5%8E%86%E9%A1%B5%E9%9D%A2.png) | ![任务列表](screenshot/%E4%BB%BB%E5%8A%A1%E5%88%97%E8%A1%A8%E7%95%8C%E9%9D%A2.png) |

| 知识库 | 点子 | 点子王 |
|---|---|---|
| ![知识库](screenshot/%E7%9F%A5%E8%AF%86%E5%BA%93%E7%95%8C%E9%9D%A2.png) | ![点子](screenshot/%E7%82%B9%E5%AD%90%E7%95%8C%E9%9D%A2.png) | ![点子王](screenshot/%E7%82%B9%E5%AD%90%E7%8E%8B.png) |

### 安装

前置条件：

- DeepSeek Harness Web `0.1.0-rc.6`
- Node.js `^22.19.0` 或 `>=24.0.0`
- pnpm `>=11.7.0 <12`

从 npm 安装：

```sh
dsh plugin --profile web add @guojing6/dsh-workbench
```

从 GitHub 安装：

```sh
dsh plugin --profile web add git+https://github.com/Guojing6/dsh-workbench.git
```

安装或更新后，重启 `dsh web`，并在浏览器中硬刷新页面。

### 开发

```sh
git clone https://github.com/Guojing6/dsh-workbench.git
cd dsh-workbench
pnpm install
pnpm check
pnpm test
```

本地开发挂载：

```sh
pnpm build
dsh plugin --profile web add link:/path/to/dsh-workbench
```

常用命令：

```sh
pnpm typecheck
pnpm build
pnpm test
pnpm repair
```

### 数据存储

默认数据全部放在本机：

- SQLite 数据库：`Documents/dsh-workbench/workbench.db`
- 任务资料夹：`Documents/dsh-workbench/tasks/<任务ID>`
- 工作台 API：`/api/workbench/*`

知识库、点子、点子王、计划、报告、提醒、任务事件都存储在 SQLite 中。本地文档总结只读取用户选择或填写的文件路径。

工作台 API 限制为 loopback 访问，定位为单用户本地插件，不提供云同步和多用户权限体系。

### AI 工具

插件会向 DSH 注册这些工具，供 AI 会话调用：

- `workbench_submit_task`
- `workbench_update_task`
- `workbench_propose_subtasks`
- `workbench_request_completion`
- `workbench_submit_review`
- `workbench_save_task_memory`
- `workbench_propose_daily_plan`
- `workbench_submit_report`
- `workbench_submit_knowledge`
- `workbench_propose_idea_clusters`
- `workbench_submit_idea_tasks`

多数工具只写入待确认草稿。用户在工作台确认前，AI 不会直接创建子任务、保存报告、写入知识库或完成任务。

### 兼容性

- 当前版本针对 DeepSeek Harness Web `0.1.0-rc.6` 开发和测试。
- 客户端入口依赖 DSH Web 的 DOM 结构和客户端注入能力。
- DSH Web 升级后，如侧边栏入口、中心区挂载、模型选择或会话发送异常，需要重新适配。
- 本插件不依赖 `dsh-web-ui`，但保留与相关侧边栏入口的互斥处理。

### 路线图

- [x] 任务、日历、快速录入、AI 澄清
- [x] 子任务拆解、任务会话关联
- [x] AI 执行、用户验收、复盘、归档
- [x] 任务共享记忆
- [x] 今日和日历 AI 智能排序
- [x] 日报、周报
- [x] 重复任务
- [x] 桌面通知
- [x] 知识库和本地文档总结
- [x] 点子、点子王、点子落地任务
- [x] 快速录入图片输入和模型切换
- [ ] 数据导入导出
- [ ] 自动备份管理界面
- [ ] 跨设备同步
- [ ] 任务拖拽排序

### 免责声明

本项目是社区插件，与 DeepSeek 官方无关。安装插件表示你信任该代码会以你的 DSH 用户权限在本机运行。

AI 执行、文档读取、文件写入和本地工作区操作可能消耗模型额度或修改本机文件。建议先阅读代码，在明确任务范围后再启用可执行策略。

### License

MIT. See [LICENSE](./LICENSE).

部分客户端挂载和构建方式参考了开源项目，详见 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。

---

## English

### What Is It

`dsh-workbench` is a local-first personal workbench plugin for DeepSeek Harness Web.

It adds a task-centered AI workspace to DSH:

- Calendar and hierarchical task list.
- Quick intake from text, pasted images, or dragged images.
- AI clarification, consultation, breakdown, execution, and review.
- User acceptance before AI execution marks a task done.
- AI planning, daily reports, weekly reports, knowledge base, ideas, and idea clusters.
- Local task folders under `Documents/dsh-workbench/tasks`.

Default layout:

```text
Documents/dsh-workbench/
├─ workbench.db
└─ tasks/
   └─ <taskId>/
```

DSH sessions connect to the `tasks` root workspace. Files for each task are stored in `tasks/<taskId>`.

### Install

Requirements:

- DeepSeek Harness Web `0.1.0-rc.6`
- Node.js `^22.19.0` or `>=24.0.0`
- pnpm `>=11.7.0 <12`

Install from npm:

```sh
dsh plugin --profile web add @guojing6/dsh-workbench
```

Install from GitHub:

```sh
dsh plugin --profile web add git+https://github.com/Guojing6/dsh-workbench.git
```

Restart `dsh web` and hard-refresh the browser after installation or update.

### Development

```sh
git clone https://github.com/Guojing6/dsh-workbench.git
cd dsh-workbench
pnpm install
pnpm check
pnpm test
```

Use a local linked plugin while developing:

```sh
pnpm build
dsh plugin --profile web add link:/path/to/dsh-workbench
```

### Data And Privacy

Core data is stored locally:

- SQLite database: `Documents/dsh-workbench/workbench.db`
- Task files: `Documents/dsh-workbench/tasks/<taskId>`
- Workbench API: `/api/workbench/*`, loopback only

The plugin does not provide cloud sync. AI sessions use the model providers configured in your DSH environment and may consume tokens.

### Compatibility

- Built for DeepSeek Harness Web `0.1.0-rc.6`.
- Depends on DSH Web client injection for sessions, workspaces, model directories, and UI workspace connection.
- DSH Web upgrades may require selector or runtime API adjustments.

### License

MIT. See [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
