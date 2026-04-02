# Instagram

**Mode**: 🔐 Browser · **Domain**: `instagram.com`

## Commands

| Command | Description |
|---------|-------------|
| `opencli instagram profile` | Get user profile info |
| `opencli instagram search` | Search users |
| `opencli instagram user` | Get recent posts from a user |
| `opencli instagram explore` | Discover trending posts |
| `opencli instagram followers` | List user's followers |
| `opencli instagram following` | List user's following |
| `opencli instagram saved` | Get your saved posts |

## Usage Examples

```bash
# View a user's profile
opencli instagram profile nasa

# Search users
opencli instagram search nasa --limit 5

# View a user's recent posts
opencli instagram user nasa --limit 10

# Discover trending posts
opencli instagram explore --limit 20

# List followers/following
opencli instagram followers nasa --limit 20
opencli instagram following nasa --limit 20

# Get your saved posts
opencli instagram saved --limit 10

# JSON output
opencli instagram profile nasa -f json
```

## Prerequisites

- Chrome running and **logged into** instagram.com
- [Browser Bridge extension](/guide/browser-bridge) installed
