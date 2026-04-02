# baoyu-fetch

English | [简体中文](./README.zh-CN.md) | [Changelog](./CHANGELOG.md) | [中文更新日志](./CHANGELOG.zh-CN.md)

`baoyu-fetch` is a Bun CLI built on Chrome CDP. Give it a URL and it returns
high-quality `markdown` or `json`. When a site adapter matches, it prefers API
responses or structured page data; otherwise it falls back to generic HTML
extraction.

## Features

- Capture rendered page content through Chrome CDP
- Observe network requests and responses, and fetch bodies when needed
- Adapter registry that auto-selects a handler from the URL
- Built-in adapters for `x`, `youtube`, and `hn`
- Generic fallback: Defuddle first, then Readability + HTML-to-Markdown; when `--format markdown` is requested, it can also fall back to `defuddle.md`
- Print `markdown` / `json` to stdout or save with `--output`
- Optionally download extracted images or videos and rewrite Markdown links
- Optional wait modes for login and verification flows
- Chrome profile defaults to `baoyu-skills/chrome-profile`

## Installation

```bash
bun install
```

For package usage, the quickest option is:

```bash
bunx baoyu-fetch https://example.com
```

You can also install it globally:

```bash
npm install -g baoyu-fetch
```

The npm package ships TypeScript source entrypoints instead of a prebuilt
`dist`, so Bun is required at runtime.

## Usage

```bash
bun run src/cli.ts https://example.com
bunx baoyu-fetch https://example.com
baoyu-fetch https://example.com
baoyu-fetch https://example.com --format markdown --output article.md
baoyu-fetch https://example.com --format markdown --output article.md --download-media
baoyu-fetch https://x.com/jack/status/20 --format json --output article.json
baoyu-fetch https://x.com/jack/status/20 --json
baoyu-fetch https://x.com/jack/status/20 --wait-for interaction
baoyu-fetch https://x.com/jack/status/20 --wait-for force
baoyu-fetch https://x.com/jack/status/20 --chrome-profile-dir ~/Library/Application\\ Support/baoyu-skills/chrome-profile
```

## Options

```bash
baoyu-fetch <url> [options]

Options:
  --output <file>       Save output to file
  --format <type>       Output format: markdown | json
  --json                Alias for --format json
  --adapter <name>      Force an adapter (for example x / hn / generic)
  --download-media      Download adapter-reported media into ./imgs and ./videos, then rewrite markdown links
  --media-dir <dir>     Base directory for downloaded media. Defaults to the output directory
  --debug-dir <dir>     Write debug artifacts (html, document.json, network.json)
  --cdp-url <url>       Reuse an existing Chrome DevTools endpoint
  --browser-path <path> Explicit Chrome binary path
  --chrome-profile-dir <path>
                        Chrome user data dir. Defaults to BAOYU_CHROME_PROFILE_DIR
                        or baoyu-skills/chrome-profile
  --headless            Launch a temporary headless Chrome if needed
  --wait-for <mode>     Wait mode: interaction | force
  --wait-for-interaction
                        Alias for --wait-for interaction
  --wait-for-login      Alias for --wait-for interaction
  --interaction-timeout <ms>
                        Manual interaction timeout. Default: 600000
  --interaction-poll-interval <ms>
                        Poll interval while waiting. Default: 1500
  --login-timeout <ms>  Alias for --interaction-timeout
  --login-poll-interval <ms>
                        Alias for --interaction-poll-interval
  --timeout <ms>        Page load timeout. Default: 30000
  --help                Show help
```

## How It Works

1. The CLI parses the target URL and options.
2. It opens or connects to a Chrome CDP session and creates a controlled tab.
3. `NetworkJournal` records requests and responses.
4. The adapter registry resolves a site-specific adapter when possible.
5. The adapter returns a structured `ExtractedDocument`.
6. If nothing matches, generic HTML extraction runs instead.
7. The result is rendered as Markdown, or returned as JSON with both
   `document` and `markdown`.

## Development

```bash
bun run check
bun run test
bun run build
```

## Release

When you make a user-visible change, add a changeset first:

```bash
bunx changeset
```

After the generated `.changeset/*.md` file lands on `main`, GitHub Actions will
open or update the release PR. Merging that release PR publishes the package to
npm.

The publish flow does not build `dist`; it publishes `src/*.ts` for Bun
execution directly.
