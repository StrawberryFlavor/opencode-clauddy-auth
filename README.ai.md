# Install & Configure OpenCode with Clauddy Relay Auth

You are an LLM agent.
Your task is to set up **OpenCode** with **opencode-clauddy-auth** plugin using **Clauddy** as the authentication provider.

You MUST follow the steps **in order**. DO NOT skip any step.

---

## Step 0 — Ask for Clauddy API Key (MANDATORY, DO NOT SKIP)

Ask the user **exactly** this (keep the wording natural, but the meaning must be preserved):

> **"你现在有没有 Clauddy 的 API key？"**
>
> - 如果已经有了，请直接发给我
> - 如果还没有，请先从你的中转服务获取 API key
>
> 请告诉我你的情况，我会继续帮你配置。

### Branching rules (IMPORTANT)

### Case A — User HAS a key

- User provides the key (format: `sk-...` or similar).
- Store it temporarily as: `CLAUDDY_API_KEY`.
- Continue to **Step 1**.

### Case B — User DOES NOT have a key

Wait for the user to obtain a key and come back.

**Rules:**
- DO NOT proceed with installation until the user confirms they have obtained a key.
- DO NOT fabricate or guess a key.
- Wait patiently for the user to respond.

Only continue when the user explicitly provides a Clauddy API key.

---

## Step 1 — Check if OpenCode is installed

Run:

```bash
which opencode || command -v opencode
```

### If OpenCode is NOT installed

Guide the user to install OpenCode first:

**Recommended (one-line install):**
```bash
curl -fsSL https://opencode.ai/install | bash
```

**Alternative methods:**

**npm:**
```bash
npm i -g opencode-ai
```

**bun:**
```bash
bun add -g opencode-ai
```

**Homebrew (official tap):**
```bash
brew install anomalyco/tap/opencode
```

**Arch Linux (AUR):**
```bash
paru -S opencode
```

After installation, verify:
```bash
opencode --version
```

### If OpenCode IS installed

Continue to **Step 2**.

---

## Step 2 — Write auth.json (DO NOT use opencode auth login)

**IMPORTANT:** Do NOT run `opencode auth login` — it is an interactive command that will block. Instead, directly edit the auth.json file.

Target path:
- **Linux / macOS:** `~/.local/share/opencode/auth.json`

### 2.1 Ensure directory exists

```bash
mkdir -p ~/.local/share/opencode
```

### 2.2 Read existing auth.json (if exists)

If `auth.json` exists:
- Read and parse it as JSON.
- Preserve all existing providers (openai / anthropic / google / others).
- Only modify or insert the `clauddy` entry.

If it does NOT exist:
- Start from an empty JSON object `{}`.

### 2.3 Write Clauddy entry

Add or update the `clauddy` entry with the user's API key:

```json
{
  "clauddy": {
    "type": "api",
    "key": "<USER_PROVIDED_API_KEY>"
  }
}
```

**Merge rules:**
- If `clauddy` exists → overwrite its `key` field only
- If `clauddy` does not exist → add the entire entry
- **NEVER delete or modify other providers**

After writing, re-read the file to ensure it is valid JSON.

Continue to **Step 3**.

---

## Step 3 — Configure OpenCode to use the plugin

Target path:
- **Global config:** `~/.config/opencode/opencode.json`
- **Project config:** `./opencode.json` (in current directory)

### 3.1 Ensure config directory exists

```bash
mkdir -p ~/.config/opencode
```

### 3.2 Read existing opencode.json (if exists)

If `opencode.json` exists:
- Read and parse it as JSON.
- Preserve all existing configuration.

If it does NOT exist:
- Start with this base structure:
```json
{
  "$schema": "https://opencode.ai/config.json"
}
```

### 3.3 Add plugin to configuration

Ensure the `plugin` array includes `opencode-clauddy-auth`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-clauddy-auth"]
}
```

**Merge rules:**
- If `plugin` array exists → append `"opencode-clauddy-auth"` if not already present
- If `plugin` does not exist → create the array with `["opencode-clauddy-auth"]`
- **NEVER remove existing plugins**

---

## Step 4 — Verify installation and check npm registry

### 4.1 Check if user is using a non-official npm registry

Run this command to detect the npm registry:

```bash
npm config get registry
```

If the output is NOT `https://registry.npmjs.org/` (e.g., shows taobao, cnpm, or other mirrors), **remember to include a warning in your final message**.

### 4.2 Tell the user installation is complete

**If using official npm registry** (https://registry.npmjs.org/):

> "安装完成！请重启 OpenCode 以加载插件。
> 你现在可以使用以下模型：
> - `clauddy/gpt-5.2-codex`
> - `clauddy/gpt-5.2`
> - `clauddy/claude-sonnet-4-5-20250929`
> - `clauddy/claude-opus-4-5-20251101`
> - `clauddy/gemini-3-pro`
>
> 测试命令: `opencode --model clauddy/gpt-5.2-codex`"

**If using a mirror registry** (taobao, cnpm, etc.), add this warning:

> "安装完成！请重启 OpenCode 以加载插件。
> 你现在可以使用以下模型：
> - `clauddy/gpt-5.2-codex`
> - `clauddy/gpt-5.2`
> - `clauddy/claude-sonnet-4-5-20250929`
> - `clauddy/claude-opus-4-5-20251101`
> - `clauddy/gemini-3-pro`
>
> 测试命令: `opencode --model clauddy/gpt-5.2-codex`
>
> ⚠️ **注意**: 检测到你使用的是非官方 npm 源。如果启动 OpenCode 时遇到插件加载失败（如 `BunInstallFailedError`），可能是镜像源尚未同步最新版本。解决方法：
> ```bash
> # 临时使用官方源重新安装
> npm config set registry https://registry.npmjs.org/
> # 重启 OpenCode 后，可以改回原来的源
> ```"

---

## Summary of changes

| File | Description |
|------|-------------|
| `~/.local/share/opencode/auth.json` | Stores Clauddy API key |
| `~/.config/opencode/opencode.json` | Registers the plugin |

---

## Troubleshooting

If the user reports issues:

### "BunInstallFailedError" or plugin fails to load
This is usually caused by npm mirror sync delays. The user's npm registry may not have synced the latest version yet.

Tell the user:
> "这个问题通常是因为你的 npm 镜像源还没有同步最新版本。解决方法：
> ```bash
> # 临时切换到官方源
> npm config set registry https://registry.npmjs.org/
> # 重启 OpenCode
> # 之后可以改回原来的源
> ```"

### "Provider not found: clauddy"
- Verify `opencode.json` contains `"plugin": ["opencode-clauddy-auth"]`
- Ask user to restart OpenCode

### "Authentication failed"
- Verify `auth.json` has correct key format
- Ask user to double-check their relay API key

### "Model not found"
- The plugin auto-injects models on first load
- Ask user to restart OpenCode and try again

---

## Important rules for the AI agent

1. **NEVER skip Step 0** — Always ask for the API key first
2. **NEVER fabricate API keys** — Only use what the user provides
3. **NEVER delete existing config** — Always merge, never overwrite entirely
4. **NEVER run interactive commands** — Do NOT run `opencode auth login`, it will block. Edit files directly instead.
5. **ALWAYS verify file writes** — Re-read after writing to confirm valid JSON
6. **ALWAYS wait for user confirmation** — Don't assume, ask when unclear
7. **ALWAYS check npm registry and warn if using mirrors** — Run `npm config get registry` and warn user about potential sync issues if not using official registry
