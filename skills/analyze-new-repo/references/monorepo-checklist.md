# Monorepo Checklist

Use this when the repository clearly contains multiple packages, applications, or ownership boundaries.

- Confirm that the repo is actually a monorepo by reading workspace manifests, package directories, and CI config.
- Identify and name the major layers:
  - deployable applications
  - shared packages or libraries
  - infrastructure or devops
  - docs, examples, or tooling
- Do not describe the whole repository as one application unless the evidence truly supports that.
- Read root-level manifests and workspace config before reading individual packages deeply.
- Cross-check root scripts with CI workflows to verify what is actually built, tested, and deployed.
- Identify which subprojects are primary and which are supporting.
- Choose only 1-2 high-value subprojects for deep analysis unless the user explicitly asks for exhaustive coverage.
- Call out package boundaries, ownership boundaries, and runtime boundaries separately when they differ.
- Note when test, CI, and deployment flows operate at different layers of the repo.
- Prefer a report structure such as:
  - `Repository Thesis`
  - `Repository Shape`
  - `Execution Model`
  - `Architectural Center of Gravity`
  - `Quality Signals and Risks`
