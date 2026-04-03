# Report Template

Use this as a structure guide, not a rigid fill-in-the-blanks form.

Every report must begin with `Repository Thesis`.
Choose the remaining sections to fit the repository.

Aim for 4-6 total sections.

## Repository Thesis

- State the repository's real purpose in one strong sentence.
- Name the strongest evidence for that reading.
- If useful, explain what this repo is *not*, so the mental model is sharper.
- Surface the main design choice or constraint that defines the rest of the codebase.

## Possible Middle Sections

Choose 2-4 of the following depending on the repository.

### Repository Shape
- Use this when the repo is a monorepo, multi-package workspace, or mixed infrastructure/application repository.
- Separate deployable apps, shared packages, infrastructure, and auxiliary directories.
- Explain which parts are primary and which parts are supporting.

### Execution Model
- Summarize the shortest trustworthy run, build, and test path.
- Note any environment assumptions, external services, or platform constraints.
- Call out disagreements between docs and config if they exist.

### Architectural Center of Gravity
- Identify the modules, files, or directories that actually define the repository.
- Explain why they matter more than the rest of the tree.
- Prefer runtime control flow, ownership boundaries, or modification constraints over file listing.

### Project Conventions
- Capture contribution signals that change how the codebase should be read.
- Mention issue templates, PR templates, contribution guides, ownership files, or local agent instructions if they materially affect interpretation.
- If such files are absent, say so briefly rather than padding the section.

### Quality Signals and Risks
- Describe visible quality signals: tests, CI, release flow, docs quality, dependency discipline.
- Call out the most important risks, blind spots, or fragile assumptions.
- Focus on practical consequences for future changes.

### Distinctive Design Decisions
- Explain the choices that make this repository unusual or opinionated.
- Connect those choices to their consequences for contributors, operators, or readers.
- Use this section when the repository has a strong thesis that would be flattened by a generic summary.

### Unknowns Worth Verifying
- List the highest-value uncertainties that could mislead future work.
- Prefer unknowns that affect implementation safety, architecture understanding, or runtime assumptions.
