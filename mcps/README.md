# MCP servers

Hosted MCP servers I use with Claude Code. Add each with `claude mcp add`.

| Server | Transport | URL | Install |
|---|---|---|---|
| Linear | http | `https://mcp.linear.app/mcp` | `claude mcp add --transport http linear https://mcp.linear.app/mcp` |
| Slack | http (OAuth) | `https://mcp.slack.com/mcp` | `claude mcp add --transport http slack https://mcp.slack.com/mcp` |

Also connected through claude.ai connectors: Gmail, Google Calendar, Google Drive, Slack, Claude Docs.
Plugin-provided: Neon (`neon-postgres@neon`), Discord (`discord@claude-plugins-official`).
Browser: Claude in Chrome extension.

Auth is handled by OAuth on first use, so no tokens or client IDs belong in this repo.
