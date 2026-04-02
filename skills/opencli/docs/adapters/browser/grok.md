# Grok

**Mode**: Default Grok adapter + optional explicit consumer web path · **Domain**: `grok.com`

## Commands

| Command | Description |
|---------|-------------|
| `opencli grok ask` | Keep the default Grok ask behavior |
| `opencli grok ask --web` | Use the explicit grok.com consumer web UI flow |

## Usage Examples

```bash
# Default / compatibility path
opencli grok ask --prompt "Explain quantum computing in simple terms"

# Explicit consumer web path
opencli grok ask --prompt "Explain quantum computing in simple terms" --web

# Best-effort fresh chat on the consumer web path
opencli grok ask --prompt "Hello" --web --new

# Set custom timeout (default: 120s)
opencli grok ask --prompt "Write a long essay" --web --timeout 180
```

### Options

| Option | Description |
|--------|-------------|
| `--prompt` | The message to send (required) |
| `--timeout` | Wait timeout in seconds (default: 120) |
| `--new` | Start a new chat before sending (default: false) |
| `--web` | Opt into the explicit grok.com consumer web flow (default: false) |

## Behavior

- `opencli grok ask` keeps the upstream/default behavior intact.
- `opencli grok ask --web` switches to the newer hardened consumer-web implementation.
- The `--web` path adds stricter composer detection, clearer blocked/session-gated hints, and waits for a stabilized assistant bubble before returning.

## Prerequisites

- The Grok adapter still depends on browser-backed access to `grok.com`
- For `--web`, Chrome should already be running with an authenticated Grok consumer session
- [Browser Bridge extension](/guide/browser-bridge) installed

## Caveats

- `--web` drives the Grok consumer web UI in the browser, not an API.
- It depends on an already-authenticated session and can fail if Grok shows login, challenge, rate-limit, or other session-gating UI.
- It may break when the Grok composer DOM, submit button behavior, or message bubble structure changes.
