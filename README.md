<!--
opencode-clauddy-auth
An OpenCode auth plugin for Clauddy relay

📌 MAINTAINER NOTICE:
Any architecture, feature, or convention changes MUST update:
1. This file (if affecting overall structure)
2. Relevant subdirectory's ARCHITECTURE.md
3. Affected file headers (input/output/pos comments)
-->

<div align="center">

# opencode-clauddy-auth

**OpenCode 的 Clauddy 中转认证插件**

一次登录 → 多模型可用（GPT-5.2、Claude、Gemini）

[![npm version](https://img.shields.io/npm/v/opencode-clauddy-auth?label=npm&style=flat-square)](https://www.npmjs.com/package/opencode-clauddy-auth)
[![npm downloads](https://img.shields.io/npm/dt/opencode-clauddy-auth?style=flat-square)](https://www.npmjs.com/package/opencode-clauddy-auth)
[![license](https://img.shields.io/badge/license-MIT-black?style=flat-square)](#license)

</div>

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     opencode-clauddy-auth                        │
├─────────────────────────────────────────────────────────────────┤
│  index.ts          Plugin entry, auth hook, config injection    │
│  provider.ts       Multi-provider factory (OpenAI/Claude/Gemini)│
├─────────────────────────────────────────────────────────────────┤
│  lib/              Core library modules                          │
│  ├── constants.ts      Global constants & header names          │
│  ├── types.ts          Shared TypeScript interfaces             │
│  ├── logger.ts         Debug/request logging utilities          │
│  ├── prompts/          Codex prompt fetching & bridging         │
│  └── request/          Request transformation & response handling│
├─────────────────────────────────────────────────────────────────┤
│  scripts/          Installation automation                       │
│  └── install-opencode-clauddy.js     postinstall config writer │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Request → OpenCode → Plugin Auth Hook → Route by Model:
  ├── gpt-*/codex-* → Codex API (transform + headers)
  ├── claude-*      → Anthropic API (URL rewrite)
  └── gemini-*      → Gemini API (headers + URL build)
```

---

## 支持的模型

| 模型 ID | 显示名称 | 图片输入 | 适合场景 |
|---------|---------|:-------:|---------|
| `clauddy/gpt-5.2-codex` | GPT-5.2 Codex | ✅ | 日常编程、代码生成 |
| `clauddy/gpt-5.2` | GPT-5.2 | ✅ | 架构设计、逻辑推理 |
| `clauddy/claude-sonnet-4-5-20250929` | Claude Sonnet 4.5 | ✅ | 代码审查、文档查询 |
| `clauddy/claude-opus-4-5-20251101` | Claude Opus 4.5 | ✅ | 复杂任务、深度思考 |
| `clauddy/gemini-3-pro` | Gemini 3 Pro | ✅ | 前端 UI、多模态任务 |

---

## 快速开始

### 🔥 方案一：完整安装（推荐 - 包含 oh-my-opencode）

```
帮我安装配置 opencode-clauddy-auth 和 oh-my-opencode，按照这个说明操作：https://raw.githubusercontent.com/StrawberryFlavor/opencode-clauddy-auth/main/INSTALL-WITH-OMO.md
```

### 📦 方案二：单独安装

```
帮我安装配置 opencode-clauddy-auth，按照这个说明操作：https://raw.githubusercontent.com/StrawberryFlavor/opencode-clauddy-auth/main/README.ai.md
```

<details>
<summary><strong>手动安装</strong></summary>

1. 编辑 `~/.config/opencode/opencode.json`:
```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-clauddy-auth"]
}
```

2. 运行 `opencode auth login` → 选择 Other → 输入 `clauddy` → 输入 API Key

</details>

---

## 使用

```bash
opencode --model clauddy/gpt-5.2-codex
```

> 说明：OpenCode 的 `--model` 格式是 `provider/model`，这里 `clauddy` 是 provider，`gpt-5.2-codex` 才是模型 ID。

---

## 配置中转服务（推荐）

默认路由已指向 `https://claudecode.dpdns.org/api`，也可以用 Claude Code 风格环境变量覆盖：

```bash
echo 'export ANTHROPIC_BASE_URL="https://claudecode.dpdns.org/api"' >> ~/.zshrc
echo 'export ANTHROPIC_AUTH_TOKEN="你的API密钥"' >> ~/.zshrc
source ~/.zshrc
```

> 说明：
> - 设置 `ANTHROPIC_BASE_URL` 后，插件会把请求改写到该中转地址
> - 如果没有配置 `clauddy` 的 auth key（`~/.local/share/opencode/auth.json`），会自动使用 `ANTHROPIC_AUTH_TOKEN` 作为 key

---

## 开发

```bash
git clone https://github.com/StrawberryFlavor/opencode-clauddy-auth.git
cd opencode-clauddy-auth
bun install
bun run build
bun run typecheck
```

---

## File Index

| File | Role | Description |
|------|------|-------------|
| `index.ts` | **Entry** | Plugin main, auth hook, config auto-injection |
| `provider.ts` | **Core** | Multi-provider language model factory |
| `lib/` | **Library** | See [lib/ARCHITECTURE.md](lib/ARCHITECTURE.md) |
| `scripts/` | **Tooling** | See [scripts/ARCHITECTURE.md](scripts/ARCHITECTURE.md) |

---

## License

MIT
