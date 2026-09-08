# ai-workbench

[![npm version](https://img.shields.io/npm/v/@guojing6/ai-workbench)](https://www.npmjs.com/package/@guojing6/ai-workbench)

`ai-workbench` is a local-first personal workbench plugin for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web.

It adds a task-centered workspace to DSH: calendar, task tree, quick AI intake, execution review, daily planning, reports, knowledge base, ideas, and local task folders.

[中文](#中文) · [English](#english)

---

## 中文

### 这是什么

`ai-workbench` 是一个给 DeepSeek Harness Web 使用的个人工作台插件。它把 DSH 从单纯的 AI 对话工具扩展成一个本地任务系统：

- 用日历和任务树管理要做的事。
- 用快速录入把自然语言、截图或图片转成任务草稿。
- 每个任务可以继续发起 AI 咨询、拆解、执行、复盘等会话。
- 任务文件统一放在本机 `Documents/ai-workbench/tasks` 下。
- 知识库、点子、点子王、日报周报都存储在本机 SQLite 数据库中。

默认数据目录：

```text
Documents/ai-workbench/
├─ workbench.db
└─ tasks/
   └─ <任务ID>/
```

其中 `tasks` 是固定 AI 工作区根目录；快速录入或 AI 会话创建任务时，会在 `tasks/<任务ID>` 下准备该任务的资料夹。会话本身连接到 `tasks` 根工作区，避免每条任务都在 DSH 里变成散乱的工作区。

### 主要功能

**任务与日历**

- 今日、日历、任务列表三种视图。
- 周视图和月视图日历。
- 支持父子任务树，子任务可继续拆分。
- 支持任务标题、Markdown 描述、类型、状态、优先级、截止时间、预计耗时、AI 策略、任务资料夹。
- 支持关键词、状态、优先级、类型组合筛选。
- 支持按截止时间、优先级、创建时间、标题排序。
- 支持任务归档和恢复。
- 子任务全部完成后，父任务可自动聚合完成。

**快速录入**

- 在工作台顶部点击“快速录入”打开输入框。
- 支持输入自然语言任务。
- 支持粘贴图片或拖入图片，适合截图、通知、表格照片、错误页面等内容。
- 支持在快速录入右下角切换模型。
- 快速录入会创建澄清会话，由 AI 补全任务标题、描述、类型、优先级、截止时间等字段。
- AI 只提交待确认草稿，用户确认后才真正写入任务库。

**AI 会话**

- AI 咨询：围绕任务提问、分析、补充建议，不执行任务。
- AI 拆解：生成子任务提案树，确认后写入任务。
- AI 执行：只对 AI 策略为“可执行”的任务开放；AI 完成后提交验收申请，用户验收后任务才完成。
- AI 复盘：已完成任务可生成复盘草稿，确认后写回任务记录。
- AI 智能排序：为今日或日历中任意日期生成执行顺序提案。
- AI 日报/周报：基于任务事件和完成记录生成报告草稿。
- 任务共享记忆：同一任务及其子树下的会话可以沉淀上下文、阶段性结论和决策，后续会话继续使用。

**知识库、点子、点子王**

- 知识库用于保存经验教训、决策、笔记和可复用片段。
- 支持从本地文档读取内容，并让 AI 总结为知识草稿。
- 知识条目可以保存本地文件链接，方便追溯来源。
- 点子模块用于快速记录灵感。
- 点子王用于把多个相关点子聚合成主题集合。
- AI 可以根据点子或点子王头脑风暴，并提交落地任务草稿。

**提醒与报告**

- 任务到期时显示工作台横幅提醒。
- 浏览器授权后可弹出系统桌面通知。
- 支持准时、提前 15 分钟、提前 30 分钟、提前 1 小时、提前 1 天提醒。
- 日报和周报以草稿形式生成，确认后保存。

**字典与设置**

- 设置页可配置默认 AI 工作区。
- 默认工作区为空时自动使用当前用户的 `Documents/ai-workbench/tasks`。
- 旧默认路径 `Documents/aitasks` 会自动迁移到新的默认路径。
- 设置页支持启用或关闭自动创建任务资料夹。
- 设置页支持启用或关闭桌面通知。
- 任务类型、状态、优先级、点子类型由字典驱动，可以新增、编辑、停用；内置项受保护，不可删除。

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
dsh plugin --profile web add @guojing6/ai-workbench
```

从 GitHub 安装：

```sh
dsh plugin --profile web add git+https://github.com/Guojing6/ai-workbench.git
```

如果你的 GitHub 仓库还没有改名，使用当前仓库地址：

```sh
dsh plugin --profile web add git+https://github.com/Guojing6/dsh-personal-workbench.git
```

安装或更新后，重启 `dsh web`，并在浏览器中硬刷新页面。

### 更新

```sh
dsh plugin --profile web remove @guojing6/ai-workbench
dsh plugin --profile web add @guojing6/ai-workbench
```

使用 GitHub 源安装时，把第二行换成对应的 `git+https://...` 地址。

如果更新后快速录入仍提示注入问题，请重启 `dsh web`，再硬刷新浏览器。客户端能力注入需要插件重新加载后才会生效。

### 从源码开发

```sh
git clone https://github.com/Guojing6/dsh-personal-workbench.git
cd dsh-personal-workbench
pnpm install
pnpm check
pnpm test
```

本地开发挂载：

```sh
pnpm build
dsh plugin --profile web add link:/path/to/dsh-personal-workbench
```

常用命令：

```sh
pnpm typecheck
pnpm build
pnpm test
pnpm repair
```

### 数据存储

`ai-workbench` 是本地优先插件，核心数据不上传到第三方服务器。

- 数据库：`Documents/ai-workbench/workbench.db`
- 任务资料：`Documents/ai-workbench/tasks/<任务ID>`
- 知识库、点子、点子王、计划、报告、提醒、任务事件都存储在 SQLite 中。
- 本地文档总结只读取你选择或填写的本机文件路径。
- 工作台接口挂载在 `/api/workbench/*`，并限制为 loopback 访问。

### AI 工作区规则

默认规则如下：

- 插件自动创建 `Documents/ai-workbench`。
- 插件自动创建 `Documents/ai-workbench/tasks`。
- DSH 会话连接到 `tasks` 根工作区。
- 每个任务的文件放在 `tasks/<任务ID>`。
- 快速录入预分配任务 ID，所以澄清阶段也能提前知道任务资料夹路径。

如果设置了自定义默认 AI 工作区，插件会使用你的自定义路径作为根目录。

为了避免会话落到“未分组”或其他工作区，当前版本要求默认 AI 工作区必须注册成功；如果注册失败，快速录入会直接提示错误，不再静默回退。

### AI 工具协议

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

这些工具大多只写入待确认草稿。用户在工作台确认前，AI 不会直接创建子任务、保存报告、写入知识库或完成任务。

### 兼容性

- 当前版本针对 DeepSeek Harness Web `0.1.0-rc.6` 开发和测试。
- 客户端入口依赖 DSH Web 的 DOM 结构和插件客户端注入能力。
- 如果 DSH 升级后侧边栏入口、中心区挂载、模型选择或会话发送异常，需要重新适配。
- 本插件不依赖 `dsh-web-ui`，但保留与相关侧边栏入口的互斥处理。
- 当前定位是单用户本地插件，不提供云同步和多用户权限体系。

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
- [x] 默认数据目录迁移到 `Documents/ai-workbench`
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

`ai-workbench` is a local-first personal workbench plugin for DeepSeek Harness Web.

It adds a practical task system to DSH:

- Calendar and hierarchical task list.
- Quick AI intake from text, pasted images, or dragged images.
- Per-task AI sessions for clarification, consultation, breakdown, execution, and review.
- User acceptance before AI execution marks a task done.
- AI planning, daily reports, weekly reports, knowledge base, ideas, and idea clusters.
- Local task folders under `Documents/ai-workbench/tasks`.

Default local layout:

```text
Documents/ai-workbench/
├─ workbench.db
└─ tasks/
   └─ <taskId>/
```

The DSH session connects to the `tasks` root workspace, while files for each task are stored in `tasks/<taskId>`.

### Install

Requirements:

- DeepSeek Harness Web `0.1.0-rc.6`
- Node.js `^22.19.0` or `>=24.0.0`
- pnpm `>=11.7.0 <12`

Install from npm:

```sh
dsh plugin --profile web add @guojing6/ai-workbench
```

Install from GitHub:

```sh
dsh plugin --profile web add git+https://github.com/Guojing6/ai-workbench.git
```

If the repository has not been renamed on GitHub yet:

```sh
dsh plugin --profile web add git+https://github.com/Guojing6/dsh-personal-workbench.git
```

Restart `dsh web` and hard-refresh the browser after installation or update.

### Development

```sh
git clone https://github.com/Guojing6/dsh-personal-workbench.git
cd dsh-personal-workbench
pnpm install
pnpm check
pnpm test
```

Use a local linked plugin while developing:

```sh
pnpm build
dsh plugin --profile web add link:/path/to/dsh-personal-workbench
```

### Data And Privacy

Core data is stored locally:

- SQLite database: `Documents/ai-workbench/workbench.db`
- Task files: `Documents/ai-workbench/tasks/<taskId>`
- Workbench API: `/api/workbench/*`, loopback only

The plugin does not provide cloud sync. AI sessions use the model providers configured in your DSH environment and may consume tokens.

### Compatibility

- Built for DeepSeek Harness Web `0.1.0-rc.6`.
- Depends on DSH Web client injection for sessions, workspaces, model directories, and UI workspace connection.
- DSH Web upgrades may require selector or runtime API adjustments.

### Roadmap

- [x] Tasks, calendar, quick intake, AI clarification
- [x] Subtasks, AI execution, review, archives
- [x] AI planning, daily and weekly reports
- [x] Recurring tasks and desktop notifications
- [x] Knowledge base, local document summary, ideas, idea clusters
- [x] Quick intake images and model picker
- [ ] Import/export
- [ ] Backup management UI
- [ ] Multi-device sync
- [ ] Drag-and-drop task ordering

### License

MIT. See [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
