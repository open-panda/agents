# Style Presets

`--preset X` expands to a type + style combination. Users can override either dimension.

## By Category

### Technical & Engineering

| --preset | Type | Style | Best For |
|----------|------|-------|----------|
| `tech-explainer` | `infographic` | `blueprint` | API docs, system metrics, technical deep-dives |
| `system-design` | `framework` | `blueprint` | Architecture diagrams, system design |
| `architecture` | `framework` | `vector-illustration` | Component relationships, module structure |
| `science-paper` | `infographic` | `scientific` | Research findings, lab results, academic |

### Knowledge & Education

| --preset | Type | Style | Best For |
|----------|------|-------|----------|
| `knowledge-base` | `infographic` | `vector-illustration` | Concept explainers, tutorials, how-to |
| `saas-guide` | `infographic` | `notion` | Product guides, SaaS docs, tool walkthroughs |
| `tutorial` | `flowchart` | `vector-illustration` | Step-by-step tutorials, setup guides |
| `process-flow` | `flowchart` | `notion` | Workflow documentation, onboarding flows |
| `warm-knowledge` | `infographic` | `vector-illustration` (warm palette) | Product showcases, team intros, feature cards, brand content |

### Data & Analysis

| --preset | Type | Style | Best For |
|----------|------|-------|----------|
| `data-report` | `infographic` | `editorial` | Data journalism, metrics reports, dashboards |
| `versus` | `comparison` | `vector-illustration` | Tech comparisons, framework shootouts |
| `business-compare` | `comparison` | `elegant` | Product evaluations, strategy options |

### Narrative & Creative

| --preset | Type | Style | Best For |
|----------|------|-------|----------|
| `storytelling` | `scene` | `warm` | Personal essays, reflections, growth stories |
| `lifestyle` | `scene` | `watercolor` | Travel, wellness, lifestyle, creative |
| `history` | `timeline` | `elegant` | Historical overviews, milestones |
| `evolution` | `timeline` | `warm` | Progress narratives, growth journeys |

### Editorial & Opinion

| --preset | Type | Style | Best For |
|----------|------|-------|----------|
| `opinion-piece` | `scene` | `screen-print` | Op-eds, commentary, critical essays |
| `editorial-poster` | `comparison` | `screen-print` | Debate, contrasting viewpoints |
| `cinematic` | `scene` | `screen-print` | Dramatic narratives, cultural essays |

## Content Type → Preset Recommendations

Use this table during Step 3 to recommend presets based on Step 2 content analysis:

| Content Type (Step 2) | Primary Preset | Alternatives |
|------------------------|----------------|--------------|
| Technical | `tech-explainer` | `system-design`, `architecture` |
| Tutorial | `tutorial` | `process-flow`, `knowledge-base` |
| Methodology / Framework | `system-design` | `architecture`, `process-flow` |
| Data / Metrics | `data-report` | `versus`, `tech-explainer` |
| Comparison / Review | `versus` | `business-compare`, `editorial-poster` |
| Narrative / Personal | `storytelling` | `lifestyle`, `evolution` |
| Opinion / Editorial | `opinion-piece` | `cinematic`, `editorial-poster` |
| Historical / Timeline | `history` | `evolution` |
| Academic / Research | `science-paper` | `tech-explainer`, `data-report` |
| SaaS / Product | `saas-guide` | `knowledge-base`, `process-flow`, `warm-knowledge` |

## Override Examples

- `--preset tech-explainer --style notion` = infographic type with notion style
- `--preset storytelling --type timeline` = timeline type with warm style

Explicit `--type`/`--style` flags always override preset values.
