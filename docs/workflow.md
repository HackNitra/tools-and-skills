# The hackathon workflow

```mermaid
flowchart LR
  A[hackathon-kickoff] --> B[scope-mvp]
  B --> C[build with Claude Code]
  C --> D{halfway?}
  D -- behind --> B
  D -- on track --> E[ship-it]
  E --> F[demo-day-prep]
  F --> G[judge-readme]
  G --> H[pitch-coach]
```

| Phase | Skill or command | Agent |
|---|---|---|
| Plan | `hackathon-kickoff`, `feature-spec` | |
| Set up | `repo-init`, `claude-code-primer` | |
| Build | `/standup`, `debug-fast` | `code-reviewer` |
| Cut | `scope-mvp`, `/cut-scope` | |
| Deploy | `ship-it`, `neon-*` | |
| Finish | `demo-day-prep`, `judge-readme` | `demo-tester` |
| Pitch | `pitch-coach` | `pitch-critic` |

Templates for `CLAUDE.md` and `PLAN.md` are in [`templates/`](../templates).
