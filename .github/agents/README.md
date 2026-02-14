# Agent Skills & Abstraction Layer

This directory contains **shared skills**, **execution templates**, and **schema definitions** for the agent system. These files reduce duplication across agents while serving as authoritative references for implementation patterns.

---

## Directory Structure

```
_shared/          # Reusable skill modules (embedded in agents via !include())
  ├── quickstart-template.md       # 3-step quick start pattern
  ├── eslint-sonarchecks.md        # ESLint & SonarSource reference
  ├── testing-frameworks.md        # Jest, React Testing Library, Cypress
  ├── npm-commands-reference.md    # Centralized npm script definitions
  └── typescript-strict.md         # TypeScript strict mode patterns

_templates/       # Execution pattern documentation
  ├── parallel-execution.md        # Tier 2: Lint + React + API simultaneous
  ├── sequential-gating.md         # Tier 3a: Test depends on Tier 2
  ├── optional-deepdive.md         # Tier 3b: Architecture/Performance optional
  └── loop-back-validation.md      # Tier 4: Refactoring with validation loops

_schema/          # Frontmatter and execution tier specifications
  ├── agent-frontmatter-schema.yaml  # Standard YAML header structure
  └── execution-tiers.md             # 5-tier architecture definition
```

---

## How to Use These Resources

### Agents Referencing Shared Skills

Agents use `!include()` syntax to embed shared content:

```markdown
## ESLint Configuration

!include(\_shared/eslint-sonarchecks.md)
```

When this syntax is processed:

1. The tool/system reads the included file
2. Embeds its complete content inline
3. Agent readers see unified content (not a link)

**Benefits**:

- ✅ Single source of truth for each skill
- ✅ Easy to update (one file change applies everywhere)
- ✅ Agents remain readable (content presented inline)
- ✅ Reduces file size overhead

### Pattern References

Agents reference patterns for documentation and clarity:

```markdown
**Execution Model**: Tier 2 - Parallel Validation

See: [Parallel Execution Pattern](../_templates/parallel-execution.md)
```

This communicates:

- _What_ execution pattern is used
- _Where_ to learn details
- Links to template documentation

---

## Shared Skills Inventory

### 1. quickstart-template.md

**Purpose**: Standard 3-step quick start format
**Used by**: All 12 agents
**Content**:

- Step 1: Primary action (auto-fix/run)
- Step 2: Verification
- Step 3: Confirmation

**Location of includes**: Each agent has customized Quick Start section

**Embedding example**:

````markdown
## 🚀 QUICK START - DO THIS NOW

### 1. Format Code

```bash
npm run format
```
````

### 2. Verify Compliance

```bash
npm run lint
```

### 3. Confirm

```bash
npm run tsc
```

````

---

### 2. eslint-sonarchecks.md

**Purpose**: ESLint configuration and SonarSource rules reference
**Used by**: Lint Agent, React Agent, Quality Standards Agent
**Size**: ~400 lines (saved per agent: 60-80 lines)
**Content**:
- SonarSource rule categories (83 bugs, 245 code smells)
- ESLint configuration overview
- Common issues & fixes
- Quick reference commands

**Embedding example** (in Lint Agent):
```markdown
### SonarSource Rule Coverage

!include/_shared/eslint-sonarchecks.md)
````

**Note**: Each agent currently duplicates this section. By using `!include()`, update once = update everywhere.

---

### 3. testing-frameworks.md

**Purpose**: Jest, React Testing Library, and Cypress reference
**Used by**: Test Agent, Refactoring Agent
**Size**: ~550 lines (saved per agent: 150-200 lines)
**Content**:

- Jest unit testing patterns
- React Testing Library best practices
- Cypress E2E & accessibility testing
- Coverage standards (>80%)
- Common test patterns

**Embedding example** (in Test Agent):

```markdown
## Testing Frameworks Reference

!include(\_shared/testing-frameworks.md)
```

---

### 4. npm-commands-reference.md

**Purpose**: Centralized npm script definitions
**Used by**: Lint, React, API, Test, Docs, Refactoring Agents
**Size**: ~400 lines (saved per agent: 30-60 lines)
**Content**:

- Format & linting commands
- Testing pipeline commands
- Build & optimization commands
- Type safety commands
- Dependency management commands
- Full workflow references

**Embedding example** (in API Agent):

```markdown
### Common Commands Reference

!include(\_shared/npm-commands-reference.md)
```

---

### 5. typescript-strict.md

**Purpose**: TypeScript strict mode patterns and examples
**Used by**: Lint Agent, React Agent, Quality Standards Agent
**Size**: ~350 lines (saved per agent: 100-150 lines)
**Content**:

- Strict mode configuration
- Type safety patterns
- Common patterns (functions, generics, unions)
- React + TypeScript patterns
- Violation fixes

**Embedding example** (in Lint Agent):

```markdown
## 4. TypeScript Strict Mode

!include(\_shared/typescript-strict.md)
```

---

## Template Patterns Inventory

### 1. parallel-execution.md

**For agents**: Lint, React, API (Tier 2)
**Architecture**: All three agents run simultaneously
**Key insight**: No dependencies between agents
**Use case**: Independent validation of different code aspects

---

### 2. sequential-gating.md

**For agents**: Test Agent (Tier 3a)
**Architecture**: Runs only if all Tier 2 agents pass
**Key insight**: Pass/fail gates enforce ordering
**Use case**: Testing depends on code validity

---

### 3. optional-deepdive.md

**For agents**: Architecture Agent, Performance Agent (Tier 3b)
**Architecture**: Triggered only by user request
**Key insight**: Not mandatory for merge
**Use case**: Specialized analysis on demand

---

### 4. loop-back-validation.md

**For agents**: Refactoring Agent (Tier 4)
**Architecture**: Makes changes, then loops back to Lint & Test
**Key insight**: Iterative cycles with validation gates
**Use case**: Implementing improvements safely

---

## Schema Definitions

### agent-frontmatter-schema.yaml

**Purpose**: Standard YAML frontmatter structure for all agents
**Enforces**:

- Consistent field names & types
- Proper agent references
- Handoff structure
- Validation rules

**Key fields**:

- `name`: Agent display name (must end with "Agent")
- `description`: One-liner (max 80 chars)
- `tools`: Always `[search, web/fetch, agent]`
- `agents`: Referenced agents for handoffs
- `handoffs`: Array of outgoing connections

---

### execution-tiers.md

**Purpose**: Complete 5-tier architecture definition
**Defines**:

- Tier 1: Entry (Research Agent)
- Tier 2: Parallel Validation (Lint + React + API)
- Tier 3a: Sequential Testing (depends on Tier 2)
- Tier 3b: Optional Deep-Dives (Architecture/Performance)
- Tier 4: Implementation (Refactoring/Docs)
- Post-Deployment: Monitoring (Tech Debt/Package)

**Specifies**:

- Gate conditions between tiers
- Execution models (parallel vs sequential)
- When each agent triggers
- Typical durations
- Skip/proceed logic

---

## Implementation Roadmap

### Current State

- ✅ All 5 shared skills created
- ✅ All 4 execution templates created
- ✅ All 2 schema files created
- ⏳ Agents updated with `!include()` references (in progress)
- ⏳ sync-continue.js updated for include processing
- ⏳ Documentation updated with references

### Next Steps

To integrate these into agents:

1. **Review agent duplication** - Identify which sections exist in multiple agents
2. **Replace with includes** - Use `!include(_shared/filename.md)` syntax
3. **Verify sync script** - Ensure sync-continue.js handles includes
4. **Test included content** - Confirm final agent files are readable
5. **Update Continue rules** - Sync agents to `.continue/rules/`

### Expected Results

- **File size reduction**: ~25-30% smaller average agent
- **Maintenance improvement**: Update one file = update all agents
- **Consistency increase**: All agents use same patterns
- **Context savings**: When agents are processed, shared content optimized

---

## Contributing New Skills

To add a new shared skill:

1. **Create file** in `.github/agents/_shared/`
2. **Name clearly**: `skill-topic.md`
3. **Include section header**: `# Skill Title`
4. **Document fully**: Complete, self-contained content
5. **Update agents**: Add `!include(_shared/skill-topic.md)` where used
6. **Test sync script**: Verify sync-continue.js processes correctly

---

## Maintenance & Updates

### Updating a Shared Skill

1. Edit the file in `_shared/`
2. Change is **automatically reflected** in all agents using it (when synced)
3. No need to edit individual agents

### Updating Execution Templates

These are **reference documentation** - no code depends on them.

- Update for clarity
- Update when patterns change
- Link from agents for context

### Updating Schema

Schemas define rules for new agents:

- Update when adding new agent types
- Update when changing frontmatter structure
- Validate new agents against schema

---

## Sync with Continue IDE

The `sync-continue.js` script:

1. **Reads all agents** from `.github/agents/`
2. **Processes includes** - Expands any `!include()` directives
3. **Generates rules** - Creates `.continue/rules/` files
4. **Updates config** - Modifies `.continuerc.json`

When you include shared skills:

1. Agent source: Uses `!include()` (smaller)
2. Agent processed: Include expanded into full content
3. Continue rules: Full content written to `.continue/rules/`

This means:

- ✅ Source agents are lean (with includes)
- ✅ Processed agents have full content (includes resolved)
- ✅ Continue rules are complete and standalone

---

## File Size Comparison

### Before Abstraction

```
lint.agent.md:           477 lines
react.agent.md:          523 lines
test.agent.md:           527 lines
api.agent.md:            507 lines
docs.agent.md:           495 lines
refactoring.agent.md:    670 lines
performance.agent.md:    533 lines
architecture.agent.md:   440 lines
package.agent.md:        506 lines
technical-debt.agent.md: 337 lines
quality-standards.agent: 112 lines
research.agent.md:       413 lines
────────────────────────────────
TOTAL:                  5,897 lines
```

### After Abstraction (Estimated)

```
lint.agent.md:           400 lines (-77)
react.agent.md:          440 lines (-83)
test.agent.md:           400 lines (-127)
api.agent.md:            460 lines (-47)
docs.agent.md:           430 lines (-65)
refactoring.agent.md:    580 lines (-90)
performance.agent.md:    490 lines (-43)
architecture.agent.md:   400 lines (-40)
package.agent.md:        460 lines (-46)
technical-debt.agent.md: 310 lines (-27)
quality-standards.agent: 130 lines (+18) [includes headers]
research.agent.md:       413 lines (no change)
────────────────────────────────
TOTAL:                  4,813 lines (-1,084 lines, -18%)

_shared/ directory:      1,800 lines (new shared skills)
_templates/ directory:   1,200 lines (new pattern docs)
_schema/ directory:        600 lines (new specifications)
════════════════════════════════
COMPREHENSIVE TOTAL:    8,413 lines (existing 5,897 + new 2,516)
```

**Net result**:

- Individual agent files: -18% size
- Source+shared total: +43% (but source agents much smaller)
- Context consumption: -15-20% when processing agents (includes not duplicated)

---

## Links & References

- Full architecture: [Execution Tiers](_schema/execution-tiers.md)
- Agent structure: [Frontmatter Schema](_schema/agent-frontmatter-schema.yaml)
- Patterns: [Templates](_templates/README.md) - see subdirectory
- Skills: [Shared Skills](_shared/) - see subdirectory
