# Execution Tiers & Orchestration Model

Complete specification of how agents are organized and executed.

---

## Five-Tier Architecture

```
┌─────────────────────────────────────────────────┐
│ Tier 1: Entry Point                             │
│ ├─ Research Agent                               │
│ └─ Single intelligent routing hub               │
└────────────┬────────────────────────────────────┘
             │ Routes to...
┌────────────▼────────────────────────────────────┐
│ Tier 2: Parallel Validation (simultaneous)      │
│ ├─ Lint Agent                                   │
│ ├─ React Agent                                  │
│ └─ API Agent                                    │
└────────────┬────────────────────────────────────┘
             │ All must pass to proceed (GATE)
┌────────────▼────────────────────────────────────┐
│ Tier 3a: Sequential Validation (dependent)      │
│ ├─ Test Agent                                   │
│ └─ Requires Tier 2 to pass                      │
└────────────┬────────────────────────────────────┘
             │ Optional user-selected deep-dives
┌────────────▼────────────────────────────────────┐
│ Tier 3b: Optional Deep-Dive Analysis            │
│ ├─ Architecture Agent (structural review)       │
│ ├─ Performance Agent (optimization analysis)    │
│ └─ Only if explicitly triggered by user         │
└────────────┬────────────────────────────────────┘
             │ Optional, can skip entirely
┌────────────▼────────────────────────────────────┐
│ Tier 4: Implementation & Final                  │
│ ├─ Refactoring Agent (implements improvements) │
│ ├─ Documentation Agent (updates docs)           │
│ └─ Implements findings from earlier tiers       │
└────────────┬────────────────────────────────────┘
             │ With loop-back validation
┌────────────▼────────────────────────────────────┐
│ Post-Deployment: Monitoring & Analysis          │
│ ├─ Technical Debt Agent (summary & roadmap)     │
│ ├─ Package Agent (dependency review)            │
│ └─ Long-term health tracking                    │
└─────────────────────────────────────────────────┘
```

---

## Tier 1: Entry Point

### Purpose

Single intelligent entry point that routes requests to appropriate agents based on analysis of changes.

### Agents

- **Research Agent** - Analyzes code changes, understands context, routes intelligently

### Key Characteristics

- ✅ Always first agent called
- ✅ Performs initial context gathering
- ✅ Decides which Tier 2/3 agents to trigger
- ✅ No validation itself (routing only)
- ✅ Single point of entry (users don't pick agents)

### When Triggered

- New code changes detected
- Pull request created
- Manual user invocation for analysis

### Output

- Context analysis
- Routing recommendation
- Direction to appropriate tier 2/3 agents

### Example Flow

```
User: "Please review my feature"
  ↓
Research Agent analyzes:
  - Files changed: components/, styles/
  - Type: UI Component + Styling
  → Route to: Lint, React, Test

User: "Check performance of this feature"
  ↓
Research Agent analyzes:
  - Files changed: large bundle additions
  - Type: Bundle-affecting code
  → Route to: Lint, React, API, Performance
```

---

## Tier 2: Parallel Validation

### Purpose

Independent validation streams running simultaneously on different code quality aspects.

### Agents

- **Lint Agent** - Code quality, formatting, syntax
- **React Agent** - React patterns, hooks, accessibility
- **API Agent** - Data fetching, React Query patterns

### Pattern Reference

See: [Parallel Execution Pattern](../_templates/parallel-execution.md)

### Key Characteristics

- ✅ All three run **at the same time**
- ✅ No dependencies between them
- ✅ Each validates **different concerns**
- ✅ All must pass before proceeding
- ✅ Blocks Tier 3a until **GATE** passes

### Gate Condition

```
GATE Passes IF:
  Lint Agent = PASS AND
  React Agent = PASS AND
  API Agent = PASS

OTHERWISE:
  HALT - Report which agents failed
  User fixes issues, re-runs Tier 2
```

### When Triggered

- After Research Agent routes
- Automatically (always runs unless skipped)
- Runs on every code change

### Output

- Three independent validation reports
- Combined findings
- Gate status (pass/fail)

### Typical Duration

5-15 minutes for typical feature

---

## Tier 3a: Sequential Validation

### Purpose

Single validation stage that depends on Tier 2 passing. Tests the code changes.

### Agents

- **Test Agent** - Unit tests, E2E tests, coverage reporting

### Pattern Reference

See: [Sequential Gating Pattern](../_templates/sequential-gating.md)

### Key Characteristics

- ✅ Runs **only if Tier 2 passes** (gate)
- ✅ Writes/updates tests
- ✅ Enforces >80% coverage
- ✅ Single point validation before any optional deep-dives
- ✅ Single sequential step (no parallel)

### Gate Condition

```
Gate Opens IF:
  Tier 2 (Lint + React + API) = ALL PASS

Lock Prevents Entry IF:
  Any Tier 2 agent = FAIL
  → Must rerun Tier 2 first
```

### When Triggered

- After Tier 2 passes
- User choice (can skip optional deep-dives)
- Always runs before anything merges

### Output

- Test execution results
- Coverage report
- E2E test results

### Typical Duration

5-10 minutes for typical feature

---

## Tier 3b: Optional Deep-Dive Analysis

### Purpose

Specialized in-depth analysis on **user request** for specific optimization areas.

### Agents

- **Architecture Agent** - Module structure, dependencies, scalability
- **Performance Agent** - Bundle size, rendering performance, Core Web Vitals
- _Both optional, user-selected_

### Pattern Reference

See: [Optional Deep-Dive Pattern](../_templates/optional-deepdive.md)

### Key Characteristics

- ✅ **Not mandatory** for merge
- ✅ Triggered **only on user request**
- ✅ User can run 0, 1, or 2
- ✅ Can run in **any order** (independent)
- ✅ Can run **in parallel** (no dependencies)
- ✅ Results inform Tier 4 (Refactoring)

### When Triggered

- User explicitly requests deep-dive
- After Tier 3a passes
- Optional - can skip entirely

### Run Options

| Scenario               | Selection         | Time            |
| ---------------------- | ----------------- | --------------- |
| Speed merge            | Skip deep-dives   | 10-20 min total |
| Architecture concerned | Architecture only | 15-25 min total |
| Performance focused    | Performance only  | 15-25 min total |
| Comprehensive review   | Both A + P        | 25-40 min total |

### Output

- Architecture insights or blank (if skipped)
- Performance metrics or blank (if skipped)
- Recommendations prioritized by impact

### Typical Duration

5-10 minutes each (if selected)

---

## Tier 4: Implementation & Final Steps

### Purpose

Implement improvements found in earlier tiers, then validate with loop-back gates.

### Agents

- **Refactoring Agent** - Implements improvements, applies suggestions
- **Documentation Agent** - Updates feature documentation

### Pattern Reference

See: [Loop-Back Validation Pattern](../_templates/loop-back-validation.md)

### Key Characteristics

- ✅ Implements findings from Tier 3a/3b
- ✅ **Loops back** to Lint & Test for validation
- ✅ Iterates until all validations pass
- ✅ Final chance to improve before merge
- ✅ Documentation updates alongside refactoring

### When Triggered

- User selects refactoring option
- Ideas from Tier 3b deep-dives exist
- Always after Tier 3a/3b complete

### Loop-Back Flow

```
Refactoring Agent
  ↓ Makes improvements
  ↓
Lint Agent (validate formatting)
  ├→ PASS: Continue
  └→ FAIL: Back to Refactoring

Test Agent (validate functionality)
  ├→ PASS: Done!
  └→ FAIL: Back to Refactoring
```

### Output

- Refactored code
- Updated documentation
- Loop-back validation results

### Typical Duration

10-20 minutes (includes iterations)

---

## Post-Deployment: Monitoring & Analysis

### Purpose

Long-term health tracking and continuous improvement planning.

### Agents

- **Technical Debt Agent** - Summarizes debt, creates roadmap
- **Package Agent** - Dependency review, security audits

### Key Characteristics

- ✅ Runs **after deployment** (not blocking)
- ✅ Tracks **accumulated debt**
- ✅ Plans **future improvements**
- ✅ Not critical for merge
- ✅ Optional tracking/reporting

### When Triggered

- Post-merge, after code is in main
- Scheduled periodic reviews
- On-demand health checks

### Output

- Technical debt assessment
- Dependency security report
- Improvement roadmap

### Typical Duration

Not time-critical (background work)

---

## Execution Models by Tier

| Tier | Model                 | Pattern                  | Parallel? | Gates?            |
| ---- | --------------------- | ------------------------ | --------- | ----------------- |
| 1    | Entry point           | Single routing           | No        | No                |
| 2    | Parallel validation   | All run simultaneously   | **Yes**   | Gate after        |
| 3a   | Sequential test       | One stage, depends on T2 | No        | Gate before start |
| 3b   | Optional analysis     | User-selected optionals  | Can be    | User choice       |
| 4    | Iterative improvement | Loop-back validation     | No        | Loop until pass   |
| Post | Monitoring            | Background/async         | Possible  | None              |

---

## Decision Tree: User Workflow

```
User submits code for review
        ↓
    Tier 1: Research Agent analyzes context
        ├─→ Routes to Tier 2
        │
Tier 2: Lint + React + API validation (parallel)
        ├─→ All pass? YES → Continue
        │          NO → Stop, fix issues, retry
        │
Tier 3a: Test Agent validates (sequential)
        ├─→ Tests pass? YES → Continue
        │          NO → Stop, fix tests, retry
        │
"Want deeper analysis?"
        ├─→ NO → Skip to Tier 4
        │
        └─→ YES → Which areas?
            ├─→ Architecture → Run Architecture Agent
            ├─→ Performance → Run Performance Agent
            └─→ Both → Run both (parallel)
                ├─→ Done → Continue to Tier 4
                │
Tier 4: Refactoring (optional)
        ├─→ Implement improvements?
        │  ├─→ YES → Loop-back: Lint + Test
        │  │          Until all pass → Continue
        │  └─→ NO → Skip refactoring
        │
        └─→ Documentation Agent updates docs
                ├─→ Done
                │
                ✅ Ready to merge!
```

---

## Tier Combinations (Common Workflows)

### Quick Turnaround

```
T1 (Research) → T2 (Lint/React/API) → T3a (Test) → ✅ Merge
Time: ~15 min
Use: Urgent fixes, trivial changes, hot patches
```

### Standard Feature Complete

```
T1 → T2 → T3a → User chooses T3b (Architecture) → T4 (Refactoring + Docs) → ✅ Merge
Time: ~30 min
Use: Normal feature development, team review
```

### Performance-Critical Feature

```
T1 → T2 → T3a → T3b (Performance) → T4 (Refactoring + Docs) → ✅ Merge
Time: ~30 min
Use: Dashboard, frontend-heavy, bundle-affecting
```

### Comprehensive Review

```
T1 → T2 → T3a → T3b (Architecture + Performance) → T4 (Refactoring + Docs) → ✅ Merge
Time: ~40 min
Use: Major refactors, architectural changes, learning/mentoring
```

### Pre-Deployment Check

```
Code already merged to main
        ↓
Post-Deploy (Tech Debt + Package Agent) → Assess health
Time: ~10 min
Use: Scheduled health checks, quarterly reviews
```

---

## Validation Rules

### Tier Progression Rules

- ✅ Must complete Tier 1 before Tier 2
- ✅ Must complete Tier 2 (all agents) before Tier 3a
- ✅ Must complete Tier 3a before Tier 3b (optional)
- ✅ Can skip Tier 3b entirely (optional)
- ✅ Can revisit any tier if issues found
- ✅ Tier 4 depends on findings from T3a/3b

### Gate Rules

- ✅ **Tier 2 GATE**: All three agents must PASS
- ✅ **Tier 3a GATE**: Tier 2 must PASS
- ✅ **Tier 3b GATE**: User selection only
- ✅ **Tier 4 GATE**: Loop-back loops until PASS or manual stop

### No Shortcuts

- ❌ Cannot skip Tier 1
- ❌ Cannot skip Tier 2
- ❌ Cannot skip Tier 3a
- ❌ CAN skip Tier 3b (optional by design)
- ❌ CAN skip Tier 4 (optional by user choice)

---

## Configuration in Agents

Each agent declares its tier and pattern:

```markdown
**Agent Responsibility**: [Mission]

**Activation Triggers**: [When it runs]

**Execution Model**: [Tier] - [Pattern Name]
Example: "Tier 2 - Parallel Validation"
Example: "Tier 3a - Sequential Gating"
Example: "Tier 3b - Optional Deep-Dive"
```

---

## Monitoring & Health

### Metrics to Track

- **Success rate by tier**: % of code passing each tier
- **Average time per tier**: Duration for typical feature
- **Skip rate for T3b**: How often is deep-dive skipped
- **Regression rate**: Bugs found post-merge
- **Coverage trend**: Is testing coverage improving?

### Health Indicators

- ✅ Good: 95%+ pass Tier 2 on first try
- ✅ Good: 90%+ pass Tier 3a without issues
- ⚠️ Warning: 50%+ skip Tier 3b (might need education)
- ⚠️ Warning: Regressions after merge (T3a tests inadequate)
- ❌ Bad: <70% pass any tier (process needs review)

---

## Future Extensibility

To add new Tier 2 agents:

1. Ensure independent validation (no dependencies)
2. All must pass gate before T3a
3. Runs parallel to Lint/React/API
4. Update parallel execution docs

To add new Tier 3b agents:

1. Keep optional/user-selective
2. Update optional deep-dive guidance
3. Can inform Tier 4 recommendations
4. Clearly document when to use

To add new Tier 4 agents:

1. Must implement findings from earlier
2. Should have loop-back validation
3. Update loop-back validation docs
4. Clear implementation scope
