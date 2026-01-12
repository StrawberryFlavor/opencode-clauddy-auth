/**
 * @file constants.ts
 * @input  -
 * @output Global constants (URLs, header names, provider IDs)
 * @pos    Foundation - imported by most other modules
 *
 * 📌 On change: Update this header + lib/ARCHITECTURE.md
 */

export const PLUGIN_NAME = "opencode-clauddy-auth"
export const PROVIDER_ID = "clauddy"
export const AUTH_METHOD_LABEL = "Clauddy API Key"
export const CODEX_BASE_URL = "https://claudecode.dpdns.org/api"
export const CLAUDDY_ANTHROPIC_BASE_URL = "https://claudecode.dpdns.org/api"
export const CLAUDDY_GEMINI_BASE_URL = "https://claudecode.dpdns.org/api"
export const GEMINI_USER_AGENT = "GeminiCLI/v25.2.1 (darwin; arm64)"
export const GEMINI_API_CLIENT = "google-genai-sdk/1.30.0 gl-node/v25.2.1"
export const GEMINI_PRIVILEGED_USER_ID_ENV = "CLAUDDY_GEMINI_USER_ID"

// Claude/Anthropic relay (compatible with Claude Code style env vars)
export const ANTHROPIC_BASE_URL_ENV = "ANTHROPIC_BASE_URL"
export const ANTHROPIC_AUTH_TOKEN_ENV = "ANTHROPIC_AUTH_TOKEN"
export const CLAUDDY_API_KEY_ENV = "CLAUDDY_API_KEY"
export const USER_AGENT = "codex_cli_rs/0.77.0 (Mac OS 26.2.0; arm64) iTerm.app/3.6.6"
export const ORIGINATOR = "codex_cli_rs"

export const SAVE_RAW_RESPONSE_ENV = "SAVE_RAW_RESPONSE"

export const HEADER_NAMES = {
  AUTHORIZATION: "authorization",
  ORIGINATOR: "originator",
  SESSION_ID: "session_id",
  CONVERSATION_ID: "conversation_id",
  USER_AGENT: "user-agent",
  ACCEPT: "accept",
  CONTENT_TYPE: "content-type",
  OPENAI_BETA: "openai-beta",
  CHATGPT_ACCOUNT_ID: "chatgpt-account-id",
  X_GOOG_API_KEY: "x-goog-api-key",
  X_GOOG_API_CLIENT: "x-goog-api-client",
  X_GEMINI_PRIVILEGED_USER_ID: "x-gemini-api-privileged-user-id",
} as const
