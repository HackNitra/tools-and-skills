# Plugins

Pluginy, ktoré odporúča tím HackNitra (inštalácia cez `/plugin`):

| Plugin | Marketplace |
|---|---|
| discord | claude-plugins-official |
| neon-postgres | neon |
| typescript-lsp | claude-plugins-official |
| plugin-dev | claude-plugins-official |
| agent-sdk-dev | claude-plugins-official |
| pr-review-toolkit | claude-plugins-official |
| playground | claude-plugins-official |

## Optional skill plugins

These are catalog options, separate from the installed plugins above. For purposes, alternatives, and overlapping workflows, see the [skills catalog](../skills/README.md).

| Plugin / source | Install inside Claude Code |
|---|---|
| [Superpowers](https://github.com/obra/superpowers) | `/plugin install superpowers@claude-plugins-official` |
| [Matt Pocock's skills](https://github.com/mattpocock/skills) | `/plugin install mattpocock-skills@claude-plugins-official` |

The Matt Pocock plugin installs the full collection. Use the skills catalog's selective installation path instead if you only want a few skills. Avoid installing the same collection through both a plugin and the skills CLI in one agent.
