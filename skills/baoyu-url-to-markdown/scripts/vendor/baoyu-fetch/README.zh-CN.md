# baoyu-fetch

[English](./README.md) | 简体中文 | [更新日志](./CHANGELOG.zh-CN.md) | [English Changelog](./CHANGELOG.md)

`baoyu-fetch` 是一个基于 Chrome CDP 的 Bun CLI。输入 URL，它会输出高质量
`markdown` 或 `json`；命中站点 adapter 时优先消费 API 返回或页面内结构化
数据，未命中时回退到通用 HTML 提取。

## 当前能力

- 通过 Chrome CDP 抓取渲染后的页面内容
- 监听网络请求与响应，按需拉取响应体
- adapter registry，支持按 URL 自动命中站点处理器
- 内置 `x`、`youtube`、`hn` adapters
- 通用 fallback：Defuddle 优先，Readability + HTML to Markdown 回退；`--format markdown` 时会再尝试 `defuddle.md` 兜底
- `stdout` 或 `--output` 输出 `markdown` / `json`
- 可选下载提取出的图片/视频并重写 Markdown 链接
- 提供登录/验证场景下的交互等待模式
- Chrome profile 默认对齐 `baoyu-skills/chrome-profile`

## 安装

```bash
bun install
```

作为包使用时，推荐直接这样运行：

```bash
bunx baoyu-fetch https://example.com
```

也可以全局安装：

```bash
npm install -g baoyu-fetch
```

npm 包发布的是 TypeScript 源码入口，不包含预编译的 `dist`，所以运行时需要
Bun。

## 用法

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

## 主要参数

```bash
baoyu-fetch <url> [options]

Options:
  --output <file>       保存输出内容到文件
  --format <type>       输出格式：markdown | json
  --json                `--format json` 的兼容别名
  --adapter <name>      强制使用指定 adapter（如 x / hn / generic）
  --download-media      下载 adapter 返回的媒体到 ./imgs 和 ./videos，并重写 markdown 链接
  --media-dir <dir>     指定媒体下载根目录；默认使用输出文件所在目录
  --debug-dir <dir>     导出调试信息（html、document.json、network.json）
  --cdp-url <url>       连接现有 Chrome 调试地址
  --browser-path <path> 指定 Chrome 可执行文件
  --chrome-profile-dir <path>
                        指定 Chrome profile 目录。默认使用 BAOYU_CHROME_PROFILE_DIR，
                        否则回退到 baoyu-skills/chrome-profile
  --headless            启动临时 headless Chrome（未连现有实例时）
  --wait-for <mode>     等待模式：interaction | force
  --wait-for-interaction
                        `--wait-for interaction` 的别名
  --wait-for-login      `--wait-for interaction` 的别名
  --interaction-timeout <ms>
                        手动交互等待超时，默认 600000
  --interaction-poll-interval <ms>
                        等待期间的轮询间隔，默认 1500
  --login-timeout <ms>  `--interaction-timeout` 的别名
  --login-poll-interval <ms>
                        `--interaction-poll-interval` 的别名
  --timeout <ms>        页面加载超时，默认 30000
  --help                显示帮助
```

## 设计

核心链路：

1. CLI 解析 URL 和选项
2. 建立 CDP 会话并创建受控 tab
3. 启动 `NetworkJournal` 收集所有请求/响应
4. 由 adapter registry 匹配站点 adapter
5. adapter 返回结构化 `ExtractedDocument`
6. 没命中则走通用 HTML 提取
7. 按请求输出 Markdown，或输出包含 `document` 和 `markdown` 的 JSON

## 开发

```bash
bun run check
bun run test
bun run build
```

## 发版

新增用户可见改动后，先添加一个 changeset：

```bash
bunx changeset
```

把生成的 `.changeset/*.md` 一起合并到 `main` 后，GitHub Actions 会自动创建或
更新 release PR；合并 release PR 之后，会自动发布到 npm。

发布流程不会编译 `dist`，而是直接把 `src/*.ts` 发布出去供 Bun 执行。
