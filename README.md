# AI Agent Skills

技能集合，涵盖浏览器自动化、内容创作、社交媒体发布、设计质量、飞书办公、Obsidian 笔记等多个领域。

---

## 技能目录

### 🌐 网络 & 内容采集
| 技能 | 说明 |
|------|------|
| `firecrawl` | Firecrawl CLI 总览，定义搜索→抓取→映射→爬取→交互的渐进式工作流，输出 LLM 友好的 Markdown |
| `firecrawl-search` | 网页搜索，返回搜索结果并可选抓取全文内容，支持新闻/图片/分类/时间过滤 |
| `firecrawl-scrape` | 单页抓取，支持 JS 渲染的 SPA、多 URL 并发、多格式输出（markdown/html/截图/链接） |
| `firecrawl-map` | 站点 URL 发现，列出或搜索大型站点中的所有页面，常与 scrape 配合使用 |
| `firecrawl-crawl` | 批量爬取整个站点或子目录，支持深度限制、路径过滤和并发控制 |
| `firecrawl-download` | 整站下载为本地文件（实验性），组合 map + scrape，支持截图和多格式保存 |
| `firecrawl-instruct` | 浏览器交互，在已抓取页面上用自然语言或代码执行点击、表单填写、分页导航等操作 |
| `firecrawl-agent` | AI 自主提取，智能导航复杂站点并返回结构化 JSON 数据，支持自定义 Schema |
| `defuddle` | 从网页提取干净 Markdown 内容，去除广告和导航噪音 |
| `baoyu-url-to-markdown` | 通过 Chrome CDP 抓取任意 URL 并转为 Markdown，内置 X/Twitter、YouTube、Hacker News 等适配器 |
| `baoyu-youtube-transcript` | 下载 YouTube 视频字幕/封面图，支持多语言、翻译、章节和说话人识别 |
| `baoyu-danger-x-to-markdown` | 将 X/Twitter 推文和文章转为带 YAML 元数据的 Markdown（逆向 API，需用户同意） |

### 🖥️ 浏览器自动化
| 技能 | 说明 |
|------|------|
| `agent-browser` | AI 代理浏览器自动化 CLI，支持页面导航、表单填写、按钮点击、截图、数据提取等 |
| `opencli` | 将任意网站或 Electron 应用变成 CLI，复用 Chrome 登录态，零风险，AI 驱动 |

### 🏞️ AI 图像生成
| 技能 | 说明 |
|------|------|
| `baoyu-imagine` | 多后端 AI 图像生成，支持 OpenAI、Google、DashScope、MiniMax、Replicate 等，支持参考图和批量生成 |
| `baoyu-cover-image` | 文章封面图生成，5 维度定制（类型/配色/渲染/文字/氛围），支持多种宽高比 |
| `baoyu-article-illustrator` | 分析文章结构，识别配图位置，按类型×风格二维矩阵生成插图 |
| `baoyu-comic` | 知识漫画生成，支持清线/日漫/写实/水墨/粉笔等多种画风和基调 |
| `baoyu-infographic` | 专业信息图生成，21 种布局类型 × 20 种视觉风格 |
| `baoyu-xhs-images` | 小红书图文系列生成，11 种视觉风格 × 8 种布局，优化社交平台传播 |
| `baoyu-compress-image` | 图片压缩为 WebP/PNG，自动选择最佳压缩工具 |
| `baoyu-danger-gemini-web` | 通过逆向 Gemini Web API 生成图像和文本，支持参考图和多轮对话（需用户同意） |
| `minimax-multimodal-toolkit` | MiniMax 多模态模型工具集，支持语音合成(TTS/声音克隆)、音乐生成、视频生成和图像生成 |
| `editorial-card-screenshot` | 高密度编辑式 HTML 信息卡片生成，瑞士国际风格排版，支持 8 种宽高比（3:4/4:3/1:1/16:9 等），输出 HTML + PNG 截图 |

### 📋 文档处理
| 技能 | 说明 |
|------|------|
| `minimax-docx` | 专业 DOCX 文档创建、编辑和格式化，使用 OpenXML SDK，支持从零创建/填充编辑/模板格式化 |
| `minimax-xlsx` | Excel 电子表格处理，支持创建、读取、分析、编辑和验证 .xlsx/.csv 文件，含公式计算和专业格式化 |
| `minimax-pdf` | PDF 创建与生成，注重视觉质量和设计感，适用于报告、提案、简历等场景 |
| `pptx-generator` | PowerPoint 演示文稿生成、编辑和读取，支持从零创建（封面/目录/内容/分隔/总结页）和编辑现有 PPTX |

### ✍️ 内容创作 & 翻译
| 技能 | 说明 |
|------|------|
| `baoyu-translate` | 三模式翻译：快速直译、常规（先分析再翻译）、精翻（分析→翻译→审校→润色），支持自定义术语表 |
| `baoyu-format-markdown` | 格式化纯文本或 Markdown，添加标题、摘要、加粗、列表等，含 CJK 排版修正 |
| `baoyu-markdown-to-html` | Markdown 转微信兼容的带主题样式 HTML，支持代码高亮、数学公式、PlantUML、脚注等 |
| `humanizer` | 去除 AI 写作痕迹，检测并修复膨胀修辞、推广用语、破折号过度使用、AI 词汇等 |

### 📱 社交媒体发布
| 技能 | 说明 |
|------|------|
| `baoyu-post-to-wechat` | 发布内容到微信公众号，支持文章和图文模式，API 或浏览器两种方式 |
| `baoyu-post-to-weibo` | 发布微博，支持文字、图片、视频和头条文章，通过真实 Chrome 绕过反爬 |
| `baoyu-post-to-x` | 发布内容到 X/Twitter，支持普通推文（含图片/视频）和长文 Article |

### 🎬 视频 & 演示
| 技能 | 说明 |
|------|------|
| `remotion-best-practices` | Remotion（React 视频创作）最佳实践，涵盖字幕、FFmpeg、音频可视化、动画、转场等 |
| `slidev` | 面向开发者的 Markdown 幻灯片演示工具，支持 Vue 组件、代码高亮、动画和交互 |
| `baoyu-slide-deck` | 从内容生成专业幻灯片图片，支持 16+ 种风格预设，输出 PPTX/PDF |

### 🎨 前端设计 & UX
| 技能 | 说明 |
|------|------|
| `frontend-design` | 生成高品质、有设计感的前端界面代码，避免 AI 模板化审美 |
| `teach-impeccable` | 一次性设置，收集项目设计上下文（目标受众、品牌调性、审美方向）并保存 |
| `critique` | UX 设计评审，含 Nielsen 十大启发式量化评分、人物角色测试和可操作反馈 |
| `audit` | 技术质量检查，涵盖可访问性、性能、主题、响应式和反模式，生成 P0-P3 评分报告 |
| `seo-audit` | SEO 诊断，覆盖技术 SEO、页面优化、内容质量和权威性 |
| `optimize` | UI 性能诊断与优化，涵盖加载速度、渲染、动画、图片和包大小 |
| `normalize` | 审计并重新对齐 UI 到设计系统标准，修复设计偏移和不一致样式 |
| `arrange` | 优化布局、间距和视觉节奏，修复单调网格和弱层次感 |
| `distill` | 极简化设计，去除不必要的复杂度，只留核心要素 |
| `bolder` | 放大保守或平淡的设计，增加视觉冲击力同时保持可用性 |
| `colorize` | 为单色调或缺乏视觉兴趣的界面添加策略性色彩 |
| `quieter` | 降低视觉激进或过度刺激的设计强度，保持精致 |
| `animate` | 为功能增添有目的的动画、微交互和动效 |
| `delight` | 添加愉悦感、个性化和意外惊喜，让界面令人难忘 |
| `typeset` | 改善字体选择、层次、大小、字重和可读性 |
| `polish` | 上线前最终质量检查，修复对齐、间距、一致性和微细节 |
| `adapt` | 响应式设计适配，实现断点、流式布局和触控目标 |
| `harden` | 健壮性提升，改善错误处理、i18n 支持、文本溢出和边界情况 |
| `clarify` | 改善不清晰的 UX 文案、错误消息、微文案和标签 |
| `onboard` | 设计和改善新用户引导流程、空状态和首次体验 |
| `extract` | 提取并整合可复用组件、设计 token 和模式到设计系统 |
| `overdrive` | 突破常规极限的技术实现——着色器、弹簧物理、滚动驱动动画、60fps 动效 |

### 📧 Google Workspace
| 技能 | 说明 |
|------|------|
| `gog` | Google Workspace CLI，支持 Gmail 收发邮件、Calendar 日程管理、Drive 文件搜索、Contacts 联系人、Sheets 读写、Docs 导出，需 OAuth 授权 |

### 💼 飞书/Lark
| 技能 | 说明 |
|------|------|
| `lark-shared` | 飞书 CLI 共享基础：应用配置初始化、认证登录、身份切换、权限管理 |
| `lark-doc` | 云文档：从 Markdown 创建文档、获取/更新内容、上传下载图片文件、搜索云空间 |
| `lark-sheets` | 电子表格：创建表格、读写单元格、追加行数据、查找内容、导出文件 |
| `lark-base` | 多维表格：建表、字段管理、记录读写、视图配置、公式/lookup 字段、数据分析、工作流 |
| `lark-calendar` | 日历与日程管理：查看/搜索/创建/更新日程、管理参会人、查询忙闲和推荐空闲时段 |
| `lark-im` | 即时通讯：收发消息、搜索聊天记录、管理群聊成员、上传下载图片文件 |
| `lark-contact` | 通讯录：查询组织架构、人员信息和搜索员工 |
| `lark-vc` | 视频会议：查询会议记录、获取纪要产物（总结、待办、章节、逐字稿） |
| `lark-minutes` | 妙记：获取基础信息（标题、封面、时长）和 AI 产物（总结、待办、章节），下载音视频 |
| `lark-task` | 任务：创建待办、查看/更新状态、拆分子任务、组织清单、分配成员 |
| `lark-approval` | 审批：审批实例查询/撤回/抄送、审批任务同意/拒绝/转交/查询 |
| `lark-drive` | 云空间：上传/下载文件、创建文件夹、复制/移动/删除、管理评论和权限 |
| `lark-wiki` | 知识库：管理知识空间和文档节点，创建/查询/组织文档和快捷方式 |
| `lark-whiteboard` | 画板：在飞书云文档中绘制架构图、流程图、思维导图、时序图等，支持 DSL 和 Mermaid |
| `lark-mail` | 邮箱：起草/发送/回复/转发/阅读/搜索邮件，管理草稿、文件夹、标签和联系人 |
| `lark-event` | 事件订阅：通过 WebSocket 长连接实时监听飞书事件（消息、通讯录、日历变更等） |
| `lark-openapi-explorer` | 原生 OpenAPI 探索：从官方文档库逐层挖掘未经 CLI 封装的原生 API 接口 |
| `lark-skill-maker` | 创建 lark-cli 的自定义 Skill，将 API 操作封装成可复用技能 |
| `lark-workflow-meeting-summary` | 会议纪要整理工作流：汇总指定时间范围内的会议纪要并生成结构化报告 |
| `lark-workflow-standup-report` | 日程待办摘要：生成指定日期的日程与未完成任务摘要 |

### 📚 Obsidian
| 技能 | 说明 |
|------|------|
| `obsidian-cli` | 命令行操作 Obsidian 笔记库：读写笔记、搜索、管理任务/属性，支持插件开发调试 |
| `obsidian-markdown` | Obsidian 风味 Markdown：wikilink、嵌入、callout、属性等特有语法 |
| `obsidian-bases` | Obsidian Bases（.base 文件）：数据库式视图，支持表格/卡片/列表/地图视图、筛选和公式 |
| `json-canvas` | JSON Canvas（.canvas 文件）：创建和编辑节点、边、分组和连接，用于可视化画布和流程图 |

### 🛠️ 开发 & 最佳实践
| 技能 | 说明 |
|------|------|
| `frontend-dev` | 全栈前端开发，融合高级 UI 设计、电影级动画、AI 媒体资源生成、文案撰写和视觉艺术 |
| `fullstack-dev` | 全栈后端架构和前后端集成指南，适用于构建全栈应用、创建 REST API、脚手架后端服务等 |
| `skill-creator` | 创建新技能、修改/改进现有技能、测量技能性能，支持评估和迭代 |
| `release-skills` | 通用版本发布工作流，自动检测版本文件和变更日志，支持多种项目类型和多语言 Changelog |
| `next-best-practices` | Next.js 最佳实践：文件约定、RSC 边界、数据模式、异步 API、元数据、错误处理等 |
| `vercel-react-best-practices` | Vercel 工程团队的 React/Next.js 性能优化指南，68 条规则，按影响优先级排列 |
| `analyze-new-repo` | 分析陌生仓库：架构解读、代码定位、运行方式、技术选型，快速上手新项目 |
| `find-skills` | 搜索和安装开放技能生态中的技能包，帮助发现可扩展的 Agent 能力 |
