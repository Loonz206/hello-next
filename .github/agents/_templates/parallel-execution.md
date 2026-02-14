# Parallel Execution Pattern

Used for **Tier 2 agents** that run simultaneously: **Lint Agent**, **React Agent**, **API Agent**.

---

## Overview

Parallel execution means multiple agents operate on the same code **at the same time**, providing independent validation streams. This is faster than sequential execution and identifies different categories of issues without ordering dependencies.

---

## Architecture

```
Research Agent (Entry)
        ↓
    ┌───┴────┐
    ↓        ↓
Lint Agent   React Agent   API Agent
    ↑        ↑              ↑
    └────┬───┴──────────────┘
         ↓
   Test Agent (Sequential)
```

**Key Characteristics**:

- No dependencies between Lint, React, and API agents
- All run **simultaneously** after entry point decision
- Results collected in **parallel** for faster feedback
- Each agent can pass/fail independently
- Test Agent waits for **all Tier 2 results** before executing

---

## Handoff Configuration

In agent frontmatter:

```yaml
handoffs:
  - label: Component Review (Parallel)
    agent: React Agent
    prompt: "Now let's review the React components and ensure they follow best practices."
    send: false # ← Indicates parallel, non-blocking handoff

  - label: API Pattern Check (Parallel)
    agent: API Agent
    prompt: "Let's verify proper React Query patterns are used."
    send: false # ← Non-blocking

  - label: Testing & Coverage
    agent: Test Agent
    prompt: "Now let's ensure comprehensive test coverage."
    send: false # ← Will wait for all parallel agents before executing
```

**Notes**:

- `send: false` indicates the handoff is available but not automatic
- User chooses which agents to invoke
- Prompt clarifies context being passed

---

## When to Use Parallel Pattern

Use when:

- ✅ Agents validate **independent aspects** (lint vs react patterns vs API logic)
- ✅ No agent depends on another's output
- ✅ **Speed matters** - feedback needed quickly
- ✅ Issues would be discovered regardless of execution order
- ✅ Multiple reviewers analyzing different concerns simultaneously

**Don't use when**:

- ❌ One agent's output feeds into another (use Sequential pattern)
- ❌ Strict ordering needed for correctness
- ❌ Circular dependencies between agents

---

## Example: Code Review Workflow

### Scenario: New feature branch pushed

**Step 1 - Entry**: Research Agent receives code changes

**Step 2 - Parallel Analysis** (all run together):

- **Lint Agent**: Checks code quality, formatting, syntax
- **React Agent**: Validates component patterns, hooks, accessibility
- **API Agent**: Verifies data-fetching, React Query patterns

_Result_: Generate 3 independent reports

**Step 3 - Sequential**: Test Agent runs (after all Tier 2 agents finish)

- Writes/updates tests based on changes
- Verifies >80% coverage
- Runs E2E tests

**Step 4 - Optional Deep-Dive**: User chooses

- Architecture review?
- Performance analysis?
- Both?

---

## Parallel Agent Responsibilities

Each parallel agent should focus on **non-overlapping concerns**:

| Agent           | Concerns                                          | Not Concerned With              |
| --------------- | ------------------------------------------------- | ------------------------------- |
| **Lint Agent**  | Formatting, syntax, imports, code quality rules   | Component logic, API design     |
| **React Agent** | React patterns, hooks, accessibility, performance | Code quality rules, API calls   |
| **API Agent**   | API design, React Query patterns, data handling   | Component rendering, formatting |

---

## Implementation Notes

### No Shared Dependencies

Parallel agents should not reference each other's output:

```typescript
// ❌ WRONG: React Agent depends on Lint Output
IF (lintResultsPass) {
  THEN validateReactPatterns()
}

// ✅ CORRECT: Independent validation
validateReact()
validateLint()
validateAPI()
// All run, collect results, continue if all pass
```

### Combining Results

After all parallel agents complete, the orchestrator (Research Agent) should:

1. **Collect** results from all parallel agents
2. **Merge** findings into comprehensive report
3. **Identify** conflicts (e.g., Lint says remove import, React needs it)
4. **Prioritize** recommendations by severity
5. **Decide** whether to proceed to next stage (Test) or halt

### Communication Pattern

```
[User Code] → Research Agent → Parallel Agents → Orchestrate Results
                                      ↓
                               [3 Independent Reports]
                                      ↓
                               [Merged Findings]
                                      ↓
                    [Proceed to Sequential Stage?]
```

---

## Parallel vs Other Patterns

| Pattern                | Use Case                            | Speed      | Complexity |
| ---------------------- | ----------------------------------- | ---------- | ---------- |
| **Parallel**           | Independent agents, same code       | Fastest ⚡ | Low        |
| **Sequential**         | Dependent agents, one after another | Slower 🐢  | Medium     |
| **Optional Deep-Dive** | User-triggered detailed analysis    | Variable   | Medium     |
| **Loop-Back**          | Iterative fixes + validation        | Slowest    | High       |

---

## Benefits & Trade-offs

### Benefits ✅

- Fast feedback (all checks run at once)
- Multiple perspectives simultaneously
- Catches issues faster in CI/CD
- Natural human code review equivalent (multiple reviewers)
- Easier to parallelize in systems that support it

### Trade-offs ⚠️

- No dependency ordering (need independent agents)
- Results might conflict (linting vs react patterns)
- More reporting complexity (3 reports to read)
- Harder to debug if issues are interdependent
