# Facebook

**Mode**: 🔐 Browser · **Domain**: `facebook.com`

## Commands

| Command | Description |
|---------|-------------|
| `opencli facebook profile` | Get user/page profile info |
| `opencli facebook notifications` | Get recent notifications |
| `opencli facebook feed` | Get news feed posts |
| `opencli facebook search` | Search people, pages, posts |

## Usage Examples

```bash
# View a profile
opencli facebook profile zuck

# Get notifications
opencli facebook notifications --limit 10

# News feed
opencli facebook feed --limit 5

# Search
opencli facebook search "OpenAI" --limit 5

# JSON output
opencli facebook profile zuck -f json
```

## Prerequisites

- Chrome running and **logged into** facebook.com
- [Browser Bridge extension](/guide/browser-bridge) installed
