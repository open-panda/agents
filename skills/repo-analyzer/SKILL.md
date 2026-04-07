---
name: repo-analyzer
description: Analyze a repository and generate a deep, evidence-backed analysis report covering architecture, tech stack, core functionality, and risks. Use when the user wants a "project analysis", "source code analysis", "codebase review", "architecture analysis", "tech stack analysis", "project overview report", "code audit", or asks to understand an entire project. Also trigger when the user provides a directory path and asks for analysis, review, or understanding of the project.
user-invocable: true
argument-hint: "[source directory path]"
---

# Repo Analyzer

Generate a structured, evidence-backed project analysis report — both a Markdown document and a styled HTML file. The goal is a report that is immediately useful to someone deciding whether to adopt, build on, or contribute to the project.

This skill produces two things a lightweight repo walkthrough does not: **structured output** (tech stack table, execution commands, risk table, commercial viability, module-by-module breakdown) and **architectural depth** — why design decisions were made and what their consequences are, not just what exists.

## When To Use

Use this skill when the user wants to:

- Understand a project's overall architecture and tech stack
- Identify risks, technical debt, or architectural issues
- Get a project overview document for onboarding or review
- Analyze a codebase they are evaluating for adoption or contribution

## Input

The user provides a source code directory path. If not provided, ask.

## Working Style

Move from surface evidence to high-leverage internals.

- Start with top-level docs and manifests before reading implementation files.
- Prefer concrete evidence. Mark inference as inference.
- Explain not just what exists, but **why it matters** architecturally.
- Write like a senior engineer: technically opinionated, calm, precise.
- **Do not restate README prose.** Surface what makes this codebase distinctive.
- Connect every observation to a practical consequence.

## Investigation Workflow

### Phase 1: Project Discovery

Read the highest-value orientation sources first:

1. `AGENTS.md`, `README*`, top-level docs (`docs/`, `ARCHITECTURE*`, `CONTRIBUTING*`, `CHANGELOG*`)
2. Dependency manifests: `package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `pom.xml`, etc.
3. Recent git history: active contributors, commit frequency, recent change patterns.
4. CI/CD config: `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/`, etc.
5. License file: identify the license — this directly affects commercial use and redistribution.

Capture:
- Project name and stated purpose (but do not just copy-paste the README)
- Primary programming language(s)
- Framework and library dependencies
- Build system and tooling
- License type and its practical implications for commercial use and derivative works

### Phase 2: Tech Stack Identification

Identify the stack with architectural significance, not as a flat list:

1. **Languages**: Detect from file extensions, manifests, config files.
2. **Frameworks**: Web, UI, testing — explain why each choice matters.
3. **Libraries**: Key dependencies from manifests (not every transitive dep); note which are load-bearing vs. convenience.
4. **Infrastructure**: Docker, Kubernetes, Terraform, cloud services.
5. **Dev tooling**: Linters, formatters, type checkers, bundlers.
6. **Database/Storage**: ORM configs, migration files (do NOT include credentials).

### Phase 3: Architecture Design

Map the project's architectural structure and how it actually runs:

1. **Architecture pattern**: Monolith, microservices, modular monolith, monorepo, library, CLI, serverless, etc.
2. **Execution flow**: How the project starts, builds, tests, and deploys. If commands disagree across files, call that out.
3. **Layer structure**: Presentation, business logic, data access, infrastructure — and how cleanly they are separated in practice.
4. **Entry points**: Main files, server startup, CLI entry, route definitions.
5. **Data flow**: How a typical request or operation flows through the system end to end.

### Phase 4: Core Modules

Identify the modules and design decisions that truly define this codebase:

1. **Critical path modules**: The 3-7 modules that own the core behavior. For each: what it does, why it matters, what would break if it changed, and concrete file paths.
2. **Distinctive design decisions**: What makes this codebase unusual or opinionated? Note these here — they become the Distinctive Design Decisions section.
3. **External integrations**: APIs, third-party services, databases — and how tightly the core logic depends on them.
4. **Circular dependencies**: Identify any circular import patterns.

### Phase 5: Core Functionality (Optional)

For projects with complex or non-obvious primary features, go deeper:

1. **Core business logic**: The main value-producing code paths — not just what they do but how they are implemented.
2. **API surface**: Public APIs, endpoints, exported interfaces — assess design quality and consistency.
3. **Configuration system**: How the application is configured and what can be customized.
4. **Extension points**: Plugin systems, hooks, middleware — assess how extensible the project actually is.

Include this phase when the features warrant it. Omit or keep brief for straightforward projects.

### Phase 6: Quality & Risk Assessment

Evaluate code quality signals and risks with practical framing:

1. **Test coverage shape**: Test organization, types present, obvious blind spots.
2. **Error handling**: Exception patterns, error boundaries, failure modes.
3. **Security concerns**: Obvious patterns or anti-patterns (do NOT expose secrets).
4. **Technical debt indicators**: TODO/FIXME comments, deprecated code, workarounds.
5. **Scalability concerns**: Bottleneck candidates, resource management, concurrency assumptions.
6. **Documentation gaps**: Missing or outdated docs that would block contributors.
7. **Dependency risks**: Outdated, unmaintained, or high-risk dependencies.
8. **Commercial & reuse viability**: Can the project be used commercially, embedded in proprietary products, modified and redistributed? Note copyleft obligations, attribution requirements, patent clauses.

## Scale Strategy

Adapt depth to project size:

- **Small** (< 50 files): Read most files directly; provide detailed analysis.
- **Medium** (50–500 files): Inspect full structure; deep-dive into 5–10 key modules.
- **Large** (500+ files): Sample representative directories; focus on architectural boundaries. State when sampling.
- **Monorepos**: Identify workspace structure first, then analyze primary packages separately.

## Output

Generate two files in the source directory (or current directory if the source is read-only):

1. `project-analysis.md` — Markdown report
2. `project-analysis.html` — Styled HTML report

If either file already exists, back up as `project-analysis-backup-YYYYMMDD-HHMMSS.md` (or `.html`).

### Report Structure

Use the template in `references/report-template.md` for the Markdown structure.

The report must contain these sections, in order:

1. **Project Thesis** — Names the project's real purpose and design philosophy. Does not restate the README.
2. **Repository Shape** — Structured map of how the repository is divided. Use tiered tables or a text diagram. Omit for single-package or very small projects.
3. **Tech Stack** — Languages, frameworks, key dependencies — with context on why each matters architecturally.
4. **Architecture Design** — Pattern, layer structure, execution flow, entry points, data flow.
5. **Core Modules** — The 3-7 modules that own the project's core behavior. For each: what it does, why it matters, what concrete files define it. Explain consequence, not just content.
6. **Distinctive Design Decisions** — The 4-7 non-obvious choices that make this codebase unusual. Each must be connected to its consequence.
7. **Quality Signals & Risks** — Test coverage, CI, documentation, dependency hygiene, risk table, and Commercial & Reuse Viability.
8. **Unknowns Worth Verifying** — The highest-value uncertainties that static analysis cannot resolve.

### HTML Generation

After writing the Markdown report, generate the HTML version using the template in `references/html-template.html`.

The HTML report must:
- Be a single self-contained file (all CSS and JS inline)
- Use a clean, professional design with good typography
- Include a navigation sidebar with section jump links
- Present tables and data clearly
- Support manual light/dark mode toggle with a button in the **bottom-left corner of the sidebar**
- The sidebar bottom area should also contain the skill credit and analysis date
- Be printable with good formatting
- Render well on both desktop and mobile
- On mobile: sidebar collapses by default, a hamburger button reveals it, clicking a nav link closes the sidebar automatically

### Evidence Rules

- Cite concrete file paths for important claims
- Distinguish confirmed facts from inferences
- Do not invent details that were not verified
- If something cannot be verified, say so directly
- Do NOT include any credentials, API keys, tokens, or secrets in the report

## Writing Quality

The report should read like a professional technical analyst's assessment:

- **Open every section with a strong declarative statement.** Assert the key fact — do not warm up with generic preamble. Bullets follow to provide evidence.
- **Do not restate README prose.** Surface what makes this codebase distinctive.
- **Make each bullet do at least two jobs: state a fact and explain its implication.**
- Be specific and evidence-based — cite file paths for important claims.
- Explain why architectural decisions matter, not just what they are.
- Prioritize insights that help the reader make real decisions ("should I build on this?", "where is the risk?").
- Keep sentences compact, but allow density where the codebase warrants it.
- Avoid mechanical symmetry — if the repository has one dominant idea, let that shape the report.
- Do NOT include any credentials, API keys, tokens, or secrets in the report.
