---
name: analyze-new-repo
description: Analyze an unfamiliar repository and explain what it does, how it runs, what architectural choices define it, where the important code lives, and what deserves deeper inspection next. Use this whenever a user has just cloned a repo, wants onboarding help, asks for a repo walkthrough, or needs a reliable first-pass architecture analysis.
---

# Analyze New Repo

Produce a reliable repository analysis without pretending certainty where the evidence is thin.

The goal is not to generate a lightweight summary. The goal is to produce a compact, evidence-backed analysis that helps the reader understand:

- what this project is really trying to do
- how it is organized and how it runs
- which design decisions define the repository
- what constraints, risks, and blind spots matter most
- where the architectural center of gravity really is

## When To Use

Use this skill when the user:

- brings in a new repository and wants orientation
- asks what the project does or how it is structured
- wants build, run, or test commands for an unfamiliar codebase
- asks for a repo walkthrough or onboarding summary
- wants a high-confidence first-pass architecture analysis before making changes

Do not use this skill for a narrow one-file question or a known bug in an already-understood codebase.

## Working Style

Move from surface evidence to high-leverage internals.

- Start with repository instructions and top-level docs before reading implementation files.
- Prefer concrete evidence over guesswork.
- Mark inference as inference.
- Compress unimportant details.
- Explain not just what exists, but why it matters.
- Write like a senior engineer or code analyst: technically opinionated, calm, and precise.
- Avoid sounding like an onboarding checklist or a generic repo summary.

## Investigation Workflow

### 1. Establish Repository Context

Read the highest-value orientation sources first:

1. `AGENTS.md`
2. `README*`
3. top-level docs such as `docs/`, `CONTRIBUTING*`, `ARCHITECTURE*`, `CHANGELOG*`
4. recent git history if it exists

Capture:

- stated purpose
- runtime and platform assumptions
- documented build, run, and test commands
- any local rules that affect future changes
- what kind of repository this is: application, library, internal tool, template, skill pack, research repo, infrastructure repo, etc.

### 2. Inspect Repository Conventions and Workflow Signals

Look for contribution and workflow artifacts that reveal how the project is maintained:

- `.github/ISSUE_TEMPLATE/`
- `.github/PULL_REQUEST_TEMPLATE*`
- `CONTRIBUTING*`
- `CODEOWNERS`
- `CODE_OF_CONDUCT*`

Capture only what changes how the repo should be read:

- issue and PR expectations
- testing or release expectations
- ownership clues
- screenshots, migration notes, or eval evidence required in changes

If these files do not exist, say so briefly and move on.

### 3. Map the Surface

Inspect the top-level structure before diving into source.

Identify:

- main application directories
- tests, scripts, docs, assets, config, and CI folders
- dependency manifests
- likely entrypoints
- directories that appear central versus peripheral

If the repository is large, sample representative directories and say that you are sampling.

### 4. Identify Execution Flow

Use docs first, then verify against config files.

Find:

- how the project starts
- how it is built
- how it is tested
- deployment or release hints
- environment assumptions and external services

If commands disagree across files, call that out explicitly.

### 5. Read the Critical Path

Open the central entrypoint and the main modules on the execution path.

For each important module, summarize:

- role
- key inputs and outputs
- main collaborators
- why it matters architecturally

Favor a small number of high-value modules over broad shallow coverage.

### 6. Assess Quality Signals

Look for:

- test organization and obvious coverage shape
- CI or automation
- release flow
- dependency hygiene
- documentation completeness
- maintenance hotspots or tight coupling

Report only what you can actually see.

### 7. Call Out Risks and Unknowns

Be explicit about:

- missing documentation
- unclear runtime assumptions
- fragile setup steps
- test blind spots
- surprising dependencies
- parts that need deeper validation before changes

## Scale Strategy

Adjust depth to repository size instead of pretending every repo deserves the same treatment.

- **Small repos:** read the main files directly and go deeper on the true control path.
- **Medium repos:** inspect the full surface, then choose the 3-5 modules that define execution and architecture.
- **Large repos or monorepos:** explicitly say you are sampling. Start from manifests, workspace config, root docs, CI, and top-level app/package directories before diving into internals.
- If the repo is too large for full coverage, prefer breadth-first orientation plus one or two representative deep reads.

## Monorepo Strategy

If the repository is a monorepo, do not describe it as if it were one application.

First identify the repository shape:

- deployable applications
- shared packages or libraries
- infrastructure or devops directories
- docs, examples, or auxiliary tooling

Then follow these rules:

- Start with root-level manifests, workspace configuration, root README/docs, and CI workflows.
- Use workspace manifests and CI to cross-check what is actually built, tested, and deployed.
- Separate the repository into boundaries before summarizing behavior.
- Identify which subprojects are primary and which are supporting.
- After mapping the full shape, choose only the 1-2 most important subprojects for deeper analysis unless the user explicitly asks for exhaustive coverage.
- Treat deployable apps, shared packages, and infrastructure as different architectural roles, not as peers in a flat list.
- Call out when tests, CI, or deployment operate at different layers than the main application code.

When unsure, prefer a report structure like:

- `Repository Thesis`
- `Repository Shape`
- `Execution Model`
- `Architectural Center of Gravity`
- `Quality Signals and Risks`

Use `references/monorepo-checklist.md` when the repo clearly has multiple packages, apps, or ownership boundaries.

## Stack-Aware Hints

Let dependency manifests influence where you look first.

- `package.json`, workspace files, `turbo.json`, `pnpm-workspace.yaml`: check scripts, workspaces, app/package split, and likely frontend/backend entrypoints.
- `pyproject.toml`, `requirements*.txt`, `uv.lock`: check CLI entrypoints, package metadata, tool config, and Python runtime assumptions.
- `Cargo.toml`: identify binaries vs libraries, workspace members, and feature flags.
- `go.mod`: check module boundaries, `cmd/` directories, and internal package layout.
- `docker-compose*`, `Dockerfile*`, Terraform, Helm, or deployment config: use these as evidence for operational shape, not just packaging.

If the stack is not covered above, use manifest filenames, workspace config, source layout, and CI workflows to infer the same things: entrypoints, package boundaries, build paths, and deployment shape.

These are hints, not a rigid language-specific playbook. Use them to improve reading order and entrypoint detection.

## Output Format

Use the report template in `references/report-template.md` as the structure guide. Use `references/checklist.md` when you need a compact execution checklist before writing. Use `references/monorepo-checklist.md` when the repository is a clear monorepo.

Your output must:

- open with a short section called `Repository Thesis`
- include 4-6 sections total, chosen to fit the repository
- use concrete headings instead of a fixed universal set when the repo warrants it
- always cover: purpose, execution path, key architecture, and risks or quality signals
- prefer flat bullets, but use short paragraphs when a section needs stronger synthesis
- make each bullet do at least two jobs: state a fact and explain its implication

Good section names include:

- `Repository Thesis`
- `Repository Shape`
- `Execution Model`
- `Architectural Center of Gravity`
- `Project Conventions`
- `Quality Signals and Risks`
- `Distinctive Design Decisions`
- `Unknowns Worth Verifying`

Avoid mechanically reusing the same section titles for every repository if the result feels generic.

## Evidence Rules

- Cite concrete file paths for important claims.
- Distinguish clearly between confirmed facts, informed inference, and unknowns.
- Prefer statements tied to a specific file over unsupported summaries.
- Do not invent architecture details that were not verified.
- If you cannot verify something, say so directly.
- Prefer observations that connect evidence to architectural or maintenance consequences.

## Writing Quality Bar

The result should read like a short analyst report, not a lightweight orientation blurb.

Specifically:

- Do not merely restate README prose.
- Do not flatten every repository into the same summary shape.
- Surface the design decisions that make this repository distinctive.
- Highlight what a technically strong reader would actually need to know before changing the code.
- Keep it readable, but do not optimize for brevity so hard that the analysis loses weight.
- Prefer bullets that combine fact + interpretation + implication.
- Keep sentences compact, but allow a little density when the repo deserves it.
- Avoid a mechanically symmetrical report if the repository has one dominant idea.
