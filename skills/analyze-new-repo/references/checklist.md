# Quick Checklist

- Read `AGENTS.md`, `README*`, and top-level docs before source files.
- Inspect top-level directories, dependency manifests, and likely entrypoints.
- If the repo is large, decide explicitly whether you are doing full coverage or representative sampling.
- For monorepos, identify workspace/package boundaries before describing the repo as one system.
- For monorepos, read root manifests and CI before going deep into packages.
- Find run, build, and test commands in docs and config.
- Check contribution and workflow artifacts: `.github/`, `CONTRIBUTING*`, PR templates, ownership files.
- Open the main entrypoint and 2-5 critical modules on the execution path.
- Let manifests influence reading order (`package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, deployment config).
- Identify the repository's defining constraint or design decision.
- Note visible quality signals: tests, CI, release flow, docs quality, dependency assumptions.
- Call out the most important risks, blind spots, and unknowns.
- Separate confirmed facts from inference.
- Write a short analyst-style report with flexible sectioning, starting with `Repository Thesis` and emphasizing architecture, execution, and practical judgment.
