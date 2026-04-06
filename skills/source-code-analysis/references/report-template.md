# Report Template

Use this as the structure guide for the Markdown report output.

## Project Overview

- **Project Name**: [name]
- **Repository**: [path or URL]
- **Primary Language**: [language]
- **Analysis Date**: [date]

[One-paragraph thesis explaining what this project is, what it does, and what design philosophy drives it. Be opinionated and specific.]

## Tech Stack

| Category | Technology | Version | Notes |
|----------|-----------|---------|-------|
| Language | [e.g., TypeScript] | [version] | [role in project] |
| Framework | [e.g., Next.js] | [version] | [why this choice matters] |
| Database | [e.g., PostgreSQL] | [version] | [usage pattern] |
| Testing | [e.g., Jest] | [version] | [coverage shape] |
| Build | [e.g., Webpack] | [version] | [config complexity] |
| CI/CD | [e.g., GitHub Actions] | - | [pipeline description] |
| Infrastructure | [e.g., Docker] | - | [deployment model] |

### Key Dependencies

List the 10-15 most important dependencies with their roles. Not every transitive dependency.

## Architecture

### Architecture Pattern

[Describe the overall pattern: monolith, microservices, modular monolith, serverless, etc.]

### Layer Structure

[Describe how the code is layered. Use a text diagram if helpful:]

```
┌─────────────────────────────────┐
│         Presentation Layer       │
├─────────────────────────────────┤
│         Business Logic Layer     │
├─────────────────────────────────┤
│         Data Access Layer        │
├─────────────────────────────────┤
│         Infrastructure Layer     │
└─────────────────────────────────┘
```

### Entry Points

| Entry Point | File | Purpose |
|------------|------|---------|
| [name] | [path] | [what it starts] |

### Data Flow

[Describe how a typical request or operation flows through the system.]

## Module Map

### Module Overview

| Module | Path | Role | Dependencies | Criticality |
|--------|------|------|-------------|-------------|
| [name] | [path] | [role] | [key deps] | High/Medium/Low |

### Dependency Relationships

[Describe key dependency relationships. Use text diagram if helpful:]

```
ModuleA ──depends on──> ModuleB
ModuleA ──depends on──> ModuleC
ModuleB ──depends on──> ModuleD
```

### Coupling Assessment

- **Tightly Coupled**: [list modules and why]
- **Loosely Coupled**: [list modules and why]
- **Circular Dependencies**: [list if any]

## Core Functionality

### Primary Features

For each core feature:

#### [Feature Name]
- **Purpose**: [what it does]
- **Key Files**: [file paths]
- **Flow**: [how it works]
- **Complexity**: High/Medium/Low

### API Surface

[Document public APIs, endpoints, or exported interfaces if applicable.]

### Configuration System

[How the application is configured: env vars, config files, feature flags, etc.]

## Quality Signals

### Testing

| Metric | Status | Notes |
|--------|--------|-------|
| Test Framework | [name] | |
| Test Organization | [structure] | |
| Unit Tests | Present/Absent | [coverage shape] |
| Integration Tests | Present/Absent | [scope] |
| E2E Tests | Present/Absent | [tool used] |

### CI/CD

[Describe the CI/CD pipeline and what it covers.]

### Documentation

| Document | Status | Quality |
|----------|--------|---------|
| README | Present/Absent | Good/Adequate/Poor |
| API Docs | Present/Absent | |
| Architecture Docs | Present/Absent | |
| Inline Comments | Adequate/Sparse | |

### Code Style

[Linting, formatting, type checking tools and configuration.]

## Risk Assessment

| # | Risk | Severity | Category | Evidence | Impact |
|---|------|----------|----------|----------|--------|
| 1 | [risk description] | High/Medium/Low | [category] | [file/evidence] | [what could go wrong] |

### Category Legend
- **Security**: Authentication, authorization, data exposure
- **Reliability**: Error handling, fault tolerance, data integrity
- **Maintainability**: Technical debt, complexity, coupling
- **Scalability**: Performance bottlenecks, resource limits
- **Operations**: Deployment, monitoring, observability

## Recommendations

### Priority Actions

| Priority | Action | Effort | Impact | Related Risk |
|----------|--------|--------|--------|-------------|
| P0 | [critical action] | [effort] | [impact] | [risk #] |
| P1 | [important action] | [effort] | [impact] | [risk #] |
| P2 | [nice-to-have] | [effort] | [impact] | [risk #] |

### Strengths to Preserve

[List positive patterns and good practices found in the codebase that should be maintained.]
