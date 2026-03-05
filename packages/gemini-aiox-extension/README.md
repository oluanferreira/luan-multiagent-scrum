# LMAS Gemini CLI Extension

Brings LMAS multi-agent orchestration to Gemini CLI.

## Installation

```bash
gemini extensions install github.com/lmas/lmas-core/packages/gemini-lmas-extension
```

Or manually copy to `~/.gemini/extensions/lmas/`

## Features

### Quick Agent Launcher
Use slash commands for fast activation flow (Codex `$`-like UX):
- `/lmas-menu` - show all quick launch commands
- `/lmas-dev`
- `/lmas-architect`
- `/lmas-qa`
- `/lmas-devops`
- `/lmas-master`
- and other `/lmas-<agent-id>` commands

Each launcher returns a ready-to-send activation prompt plus greeting preview.

### Commands
- `/lmas-status` - Show system status
- `/lmas-agents` - List available agents
- `/lmas-validate` - Validate installation
- `/lmas-menu` - Show quick launch menu
- `/lmas-agent <id>` - Generic launcher by agent id

### Hooks
Automatic integration with LMAS memory and security:
- Session context loading
- Gotchas and patterns injection
- Security validation (blocks secrets)
- Audit logging

## Requirements

- Gemini CLI v0.26.0+
- LMAS Core installed (`npx lmas-core install`)
- Node.js 18+

## Cross-CLI Compatibility

LMAS skills work identically in both Claude Code and Gemini CLI. Same agents, same commands, same format.

## License

MIT
