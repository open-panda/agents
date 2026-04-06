---
name: source-code-analysis
description: Analyze a project's source code and generate a comprehensive analysis report covering tech stack, architecture, module dependencies, core functionality, and risks. Use when the user wants a "project analysis", "source code analysis", "codebase review", "architecture analysis", "tech stack analysis", "project overview report", "code audit", or asks to understand an entire project. Also trigger when the user provides a directory path and asks for analysis, review, or understanding of the project.
user-invocable: true
argument-hint: "[source directory path]"
---

# Source Code Analysis

Generate a comprehensive project source code analysis report. The output includes both a Markdown document and a styled HTML file for easy reading and sharing.

## When To Use

Use this skill when the user:

- Wants to understand a project's overall architecture and tech stack
- Needs a full analysis report for a codebase
- Asks for module dependency analysis
- Wants to identify risks, technical debt, or architectural issues
- Needs a project overview document for team onboarding or review
- Provides a source directory and asks "analyze this project"

## Input

The user provides a source code directory path. If not provided, ask the user for the path.

## Investigation Workflow

### Phase 1: Project Discovery

Scan the project root to establish context:

1. **Project metadata**: Read `README*`, `package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`, `pom.xml`, `build.gradle`, `Makefile`, `CMakeLists.txt`, or other build manifests.
2. **Documentation**: Check `docs/`, `ARCHITECTURE*`, `CONTRIBUTING*`, `CHANGELOG*`, `AGENTS.md`.
3. **Git history**: Recent commits, active contributors, commit frequency.
4. **CI/CD**: `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/`, etc.

Capture:
- Project name and stated purpose
- Primary programming language(s)
- Framework and library dependencies
- Build system and tooling

### Phase 2: Tech Stack Identification

Identify the complete technology stack:

1. **Languages**: Detect from file extensions, manifests, and config files.
2. **Frameworks**: Web frameworks, UI frameworks, testing frameworks.
3. **Libraries**: Key dependencies from manifests (not every transitive dependency).
4. **Infrastructure**: Docker, Kubernetes, Terraform, cloud services.
5. **Dev tooling**: Linters, formatters, type checkers, bundlers.
6. **Database/Storage**: ORM configs, migration files, connection strings (do NOT include credentials).

### Phase 3: Architecture Analysis

Map the project's architectural structure:

1. **Architecture pattern**: Monolith, microservices, monorepo, library, CLI tool, etc.
2. **Layer structure**: Presentation, business logic, data access, infrastructure.
3. **Entry points**: Main files, server startup, CLI entry, route definitions.
4. **Module boundaries**: How the code is organized into modules/packages.
5. **Data flow**: How data moves through the system (request lifecycle, event flow).

### Phase 4: Module Dependency Analysis

Analyze how modules relate to each other:

1. **Import graph**: Key dependency relationships between modules.
2. **Coupling assessment**: Tightly coupled vs. loosely coupled modules.
3. **Shared dependencies**: Common utilities, shared types, cross-cutting concerns.
4. **External integrations**: APIs, third-party services, databases.
5. **Circular dependencies**: Identify any circular import patterns.

### Phase 5: Core Functionality Identification

Identify the primary features and capabilities:

1. **Core business logic**: The main value-producing code paths.
2. **API surface**: Public APIs, endpoints, exported interfaces.
3. **Key algorithms**: Important business rules or processing logic.
4. **Configuration system**: How the application is configured.
5. **Extension points**: Plugin systems, hooks, middleware patterns.

### Phase 6: Quality & Risk Assessment

Evaluate code quality signals and risks:

1. **Test coverage shape**: Test organization, types of tests present.
2. **Error handling**: Exception handling patterns, error boundaries.
3. **Security concerns**: Obvious security patterns or anti-patterns (do NOT expose any secrets found).
4. **Technical debt indicators**: TODO/FIXME comments, deprecated code, workarounds.
5. **Scalability concerns**: Bottleneck candidates, resource management.
6. **Documentation gaps**: Missing or outdated documentation.
7. **Dependency risks**: Outdated or unmaintained dependencies.

## Scale Strategy

Adapt depth to project size:

- **Small projects** (< 50 files): Read most files directly, provide detailed analysis.
- **Medium projects** (50-500 files): Inspect full structure, deep-dive into 5-10 key modules.
- **Large projects** (500+ files): Sample representative directories, focus on architectural boundaries and key modules. Explicitly state when sampling.
- **Monorepos**: Identify workspace structure first, then analyze primary packages separately.

## Output

Generate two files in the source directory (or current directory if the source is read-only):

1. `project-analysis.md` - Markdown report
2. `project-analysis.html` - Styled HTML report

If either file already exists, back up as `project-analysis-backup-YYYYMMDD-HHMMSS.md` (or `.html`).

### Report Structure

Use the template in `references/report-template.md` for the Markdown structure.

The report must contain these sections:

1. **Project Overview** - Name, purpose, one-paragraph thesis
2. **Tech Stack** - Languages, frameworks, libraries, infrastructure (as a structured table)
3. **Architecture** - Pattern, layer structure, diagram description
4. **Module Map** - Key modules with roles and dependencies
5. **Core Functionality** - Primary features and code paths
6. **Quality Signals** - Test coverage, CI, documentation quality
7. **Risk Assessment** - Identified risks with severity (High/Medium/Low)
8. **Recommendations** - Prioritized action items

### HTML Generation

After writing the Markdown report, generate the HTML version using the template structure in `references/html-template.html`.

The HTML report must:
- Be a single self-contained file (all CSS inline)
- Use a clean, professional design with good typography
- Include a navigation sidebar for section jumping
- Present tables and data clearly
- Support both light and dark mode viewing
- Be printable with good formatting
- Render well on both desktop and mobile

### Evidence Rules

- Cite concrete file paths for important claims
- Distinguish between confirmed facts and inferences
- Do not invent details that were not verified
- If something cannot be verified, say so directly
- Do NOT include any credentials, API keys, tokens, or secrets in the report

## Writing Quality

The report should read like a professional technical analysis, not a generic summary:

- Be specific and evidence-based
- Explain why architectural decisions matter
- Connect observations to practical consequences
- Prioritize insights that help the reader make decisions
- Use clear technical language without unnecessary jargon
