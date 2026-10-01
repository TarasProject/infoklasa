@AGENTS.md

## Claude Code

- Do not edit `.agent-log/` or `.claude/hooks/` — they are the observability layer (a hook logs every tool call).
- Open this folder itself as the project: the hooks in `.claude/settings.json` run only when `infoklasa/` is the project root.
