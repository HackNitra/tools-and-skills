# MCP servers

Hostované MCP servery, ktoré odporúča tím HackNitra pre Claude Code. Každý pridáš cez `claude mcp add`.

| Server | Transport | URL | Install |
|---|---|---|---|
| Linear | http | `https://mcp.linear.app/mcp` | `claude mcp add --transport http linear https://mcp.linear.app/mcp` |
| Slack | http (OAuth) | `https://mcp.slack.com/mcp` | `claude mcp add --transport http slack https://mcp.slack.com/mcp` |

Cez konektory claude.ai sú tiež dostupné: Gmail, Google Calendar, Google Drive, Slack, Claude Docs.
Cez pluginy: Neon (`neon-postgres@neon`), Discord (`discord@claude-plugins-official`).
Prehliadač: rozšírenie Claude in Chrome.

Prihlásenie rieši OAuth pri prvom použití, takže v tomto repozitári nepatria žiadne tokeny ani client ID.
