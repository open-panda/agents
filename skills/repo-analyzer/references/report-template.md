# Report Template

Use this as a structure guide, not a rigid fill-in-the-blanks form.
Every report must begin with **Project Thesis**. Then choose 5-8 sections that fit the project.

**Section opening rule**: Every major section must open with a strong declarative statement before any bullets or tables. Assert the key fact — do not warm up with generic preamble. Bullets and evidence follow the opening sentence.

---

## Project Thesis

[One or two strong sentences that assert the project's real purpose — what problem it solves and for whom. Do not restate the README. Then:]

- Name the strongest evidence for that reading (e.g., the main entry point, the primary data model, a key design doc).
- Surface the main design choice or constraint that defines the rest of the codebase.
- If useful, explain what this project is *not*, so the mental model is sharper.

**Project Metadata**

| Field | Value |
|-------|-------|
| Project Name | [name] |
| Repository | [path or URL] |
| Primary Language | [language] |
| License | [license name + commercial use summary] |
| Analysis Date | [date] |

---

## Repository Shape

[One declarative sentence describing what this repository contains at the top level — e.g., "This is a TypeScript monorepo managing N packages across three functional tiers" or "This is a single-application Node.js service with no workspace structure."]

For monorepos and multi-package repositories, organize packages by role:

**[Tier 1 label, e.g., Deployable Applications]**

| Package | Path | Role |
|---------|------|------|
| [name] | `[path]` | [what it does] |

**[Tier 2 label, e.g., Shared Libraries]**

| Package | Path | Role |
|---------|------|------|
| [name] | `[path]` | [what it does] |

**[Tier 3 label, e.g., Tooling / Config]**

| Package | Path | Role |
|---------|------|------|
| [name] | `[path]` | [what it does] |

If the dependency graph between packages is non-obvious, describe it briefly (text diagram or ordered list showing which packages depend on which).

*Omit this section for single-package or very small projects.*

---

## Tech Stack

[One sentence on the overall technology posture — e.g., "This project is built on a TypeScript-first stack with a clear separation between runtime and tooling concerns."]

Focus on architectural significance, not just enumeration. Explain *why* each choice matters.

| Category | Technology | Version | Architectural Role |
|----------|-----------|---------|-------------------|
| Language | [e.g., TypeScript] | [version] | [why this language, key implications] |
| Framework | [e.g., Next.js] | [version] | [what this enables or constrains] |
| Database | [e.g., PostgreSQL] | [version] | [access pattern, coupling level] |
| Testing | [e.g., Vitest] | [version] | [coverage shape, confidence level] |
| Build | [e.g., Vite] | [version] | [build strategy, performance trade-offs] |
| CI/CD | [e.g., GitHub Actions] | — | [what the pipeline actually validates] |
| Infrastructure | [e.g., Docker + Fly.io] | — | [deployment model, operational complexity] |

**Dependency Observations**: Call out any dependencies that are unusually heavy, potentially abandoned, or architecturally load-bearing. Distinguish convenience wrappers from core dependencies.

---

## Architecture Design

[One sentence establishing the architectural pattern and what it implies — e.g., "The project follows a modular monolith pattern where domain boundaries are enforced by package boundaries, not runtime isolation."]

### Architecture Pattern

Describe the overall pattern (monolith, modular monolith, microservices, serverless, library, CLI, etc.) and explain what that choice costs and enables for this specific project.

### Execution Flow

Summarize the shortest trustworthy run, build, and test path. Note environment assumptions and external service dependencies. If commands across docs/config files disagree, call that out explicitly.

```
Build:  [command]
Run:    [command]
Test:   [command]
Deploy: [command or process]
```

### Layer Structure

Describe how the code is layered. Use a text diagram when it adds clarity:

```
┌─────────────────────────────────┐
│         Presentation Layer       │  [e.g., Next.js pages + API routes]
├─────────────────────────────────┤
│         Business Logic Layer     │  [e.g., services/, use-cases/]
├─────────────────────────────────┤
│         Data Access Layer        │  [e.g., repositories/, prisma/]
├─────────────────────────────────┤
│         Infrastructure Layer     │  [e.g., config, adapters, integrations]
└─────────────────────────────────┘
```

Assess how cleanly these layers are separated in practice — not just how they are organized on disk.

### Data Flow

Describe how a typical request or operation flows through the system, end to end. Focus on the control path that carries the most business value.

---

## Core Modules

[One sentence naming where the real weight of this project lives — e.g., "The architectural center of gravity is the agent runtime loop in `packages/runtime/`, not the CLI entry point that most contributors will encounter first."]

Identify the 3-7 modules, files, or directories that actually define this project — the code everything else serves or depends on. For each module:

### [Module Name] `[path/to/module]`

- **Role**: What it owns or controls
- **Key inputs/outputs**: What it consumes and produces
- **Why it matters**: Architectural consequence of this module's design decisions — what would break or require rethinking if this module changed significantly?

---

## Distinctive Design Decisions

[One sentence capturing the overall design philosophy — e.g., "Several non-obvious choices define how this codebase behaves under extension and change."]

Explain 4-7 choices that make this codebase unusual or opinionated — not the standard stack choices, but the *non-obvious* decisions. For each, connect the decision to its consequence for contributors, operators, or future maintainers.

1. **[Decision name]** — [What was chosen and why it matters. What does this cost? What does it enable? What would change if this decision were reversed?]

2. **[Decision name]** — [...]

3. **[Decision name]** — [...]

---

## Quality Signals & Risks

[One sentence characterizing the overall quality posture — e.g., "Test coverage is present but concentrated in unit tests; integration-level validation of the agent runtime is largely absent."]

Report only what you can actually see. Avoid speculation.

### Testing

| Metric | Status | Observation |
|--------|--------|-------------|
| Test Framework | [name] | |
| Unit Tests | Present / Absent | [coverage shape, key gaps] |
| Integration Tests | Present / Absent | [scope, realism] |
| E2E Tests | Present / Absent | [tool, coverage] |
| Test Quality | Good / Adequate / Poor | [are tests meaningful or just coverage padding?] |

### CI/CD

Describe what the pipeline actually validates. Distinguish a pipeline that builds and ships from one that builds, tests, lints, and audits dependencies.

### Documentation

| Document | Status | Quality |
|----------|--------|---------|
| README | Present / Absent | Good / Adequate / Poor |
| API Docs | Present / Absent | |
| Architecture Docs | Present / Absent | |
| Inline Comments | Adequate / Sparse | |
| Onboarding Guide | Present / Absent | |

### Code Style & Hygiene

Linting, formatting, type checking tools. Note whether the configuration is strict or lenient, and whether it is actually enforced.

### Risk Table

| # | Risk | Severity | Category | Evidence | Impact |
|---|------|----------|----------|----------|--------|
| 1 | [risk description] | High / Medium / Low | [category] | `[file/evidence]` | [practical consequence] |

**Categories:**
- **Security** — authentication, authorization, data exposure, input validation
- **Reliability** — error handling, fault tolerance, data integrity, recovery paths
- **Maintainability** — technical debt, complexity hotspots, tight coupling, test gaps
- **Scalability** — performance bottlenecks, resource limits, concurrency assumptions
- **Operations** — deployment complexity, monitoring gaps, environment assumptions
- **Commercial Viability** — license-based constraints on use, distribution, and modification

### Commercial & Reuse Viability

[One sentence on the license's practical posture for adopters — e.g., "The MIT license imposes no restrictions on commercial use or closed-source embedding."]

Based on the detected license, assess:

- **Commercial use**: Can this project be used in commercial products without restriction?
- **Closed-source embedding**: Can it be incorporated into proprietary software without releasing source?
- **Modification & redistribution**: What obligations apply when distributing modified versions?
- **Secondary development**: Is it safe to build a product on top of this codebase? What are the obligations to downstream users?
- **Patent clauses**: Does the license include patent grants or termination clauses?
- **Attribution requirements**: What notices or credits are required?

If the license is unclear, absent, or non-standard, call that out explicitly as a high risk.

---

## Unknowns Worth Verifying

[One sentence framing what category of uncertainty dominates — e.g., "Several runtime assumptions and operational characteristics cannot be verified from static analysis alone."]

List the highest-value uncertainties that were not resolvable from the code alone — things that could mislead future contributors or adopters if left unverified.

- **[Unknown]** — [Why it matters and what the consequence is of getting it wrong.]
- **[Unknown]** — [...]
- **[Unknown]** — [...]
