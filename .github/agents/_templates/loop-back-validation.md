# Loop-Back Validation Pattern

Used for **Tier 4 agents** that iterate and validate. Example: **Refactoring Agent** modifies code → loops back to **Lint Agent** & **Test Agent** to verify no regressions.

---

## Overview

Loop-back validation creates **iterative cycles** where improvements are made, then validated by earlier agents. This prevents refactoring from introducing bugs or violating code quality rules.

---

## Architecture

```
Refactoring Agent (Tier 4)
    ↓
[Implement refactorings/improvements]
    ↓
╔═══════════════════╗
║  LOOP-BACK GATES  ║
╚═══════════════════╝
    ↓
Lint Agent (re-validate)
    ↓
Test Agent (re-validate)
    ↓
Verification Passed?
    ├─→ YES: Done. Code ready for merge.
    └─→ NO: Fix issues, go back to Lint Agent
```

**Key Characteristics**:

- **Iterative cycles** (not one-way)
- **Validates implementation** against standards
- **Prevents regression** (refactoring breaks things)
- **Loops until passing** (gate-driven)
- **Convergence required** (eventually must pass)

---

## Handoff Configuration

### Refactoring Agent (Source of Loop-Back)

```yaml
handoffs:
  - label: Lint Validation
    agent: Lint Agent
    prompt: "Let's validate the refactored code for linting issues."
    send: false # ← User triggers after changes made

  - label: Testing & Coverage
    agent: Test Agent
    prompt: "Now let's verify tests still pass and coverage is >80%."
    send: false # ← Gates the refactoring
```

### Lint Agent (in Loop-Back Context)

```yaml
# Frontmatter same, but instructions note:

handoffs:
  - label: Component Review (Parallel)
    agent: React Agent
    prompt: "Process the linting."
    send: false

  - label: Testing & Coverage
    agent: Test Agent
    prompt: "Now test the refactored code."
    send: false

  # Note in instructions:
  # "If called from Refactoring Agent, loop back to
  #  Refactoring Agent if issues found for fixing."
```

### Test Agent (in Loop-Back Context)

```yaml
# Terminal handoff in loop-back context:

handoffs:
  - label: Refactoring Complete
    agent: Refactoring Agent
    prompt: "Tests pass. Good to merge the refactored code."
    send: false # ← Confirms successful loop-back

  - label: Fix Issues in Refactoring
    agent: Refactoring Agent
    prompt: "Test failures detected. Back to refactoring for fixes."
    send: false # ← Re-triggers refactoring if needed
```

---

## When to Use Loop-Back Pattern

Use when:

- ✅ Making changes that need **validation** after implementation
- ✅ **Risk of regression** exists (breaking changes possible)
- ✅ Want **safety net** before merge
- ✅ **Iterative improvement** (may need multiple cycles)
- ✅ Early validation rules and tests created before refactoring

**Don't use when**:

- ❌ Changes are trivial (single line edits)
- ❌ No validation tools exist (tests, linting)
- ❌ Linear flow preferred (no iteration)
- ❌ One-way changes only

---

## Example: Component Refactoring Cycle

### Scenario: Upgrading React hooks patterns

**Step 1 - Analysis**: Architecture Agent identifies improvement opportunity

```
"Button component uses deprecated class component pattern"
→ Suggest: Convert to functional component with hooks
```

**Step 2 - Refactoring Agent Makes Changes**

```
Input: Button (class component)
Output: Button (functional component with custom hook)
Modified: 3 files
    - Button.tsx
    - Button.test.tsx
    - useButtonState.ts (new)
```

**Step 3 - Loop-Back: Lint Validation**

```
Lint Agent checks refactored code:
  ✅ Proper imports
  ✅ No unused variables
  ✅ Naming conventions correct
  ✅ TypeScript types complete

Result: PASS → Continue to testing
```

**Step 4 - Loop-Back: Test Validation**

```
Test Agent runs tests on refactored code:
  ✅ Button renders correctly
  ✅ Click handler works
  ✅ Custom hook behaves correctly
  ✅ Coverage: 92% (>80%)

Result: PASS → Refactoring complete
```

**Step 5 - Merge Ready**

```
All loop-backs passed
 → Code ready for merge
 → No regressions detected
```

---

### Failure Scenario: Loop-Back Catches Issues

**Step 1-2**: Same as above

**Step 3 - Loop-Back: Lint Validation**

```
Lint Agent checks refactored code:
  ✅ Imports correct
  ❌ useButtonState hook unused in Button.tsx
  ❌ Missing TypeScript type for new hook

Result: FAIL
  → Report issues to Refactoring Agent
  → Suggestion: Remove unused import, add types
```

**Step 4 - Refactoring Agent Iterates**

```
Fix issues found:
  1. Add type definition: useButtonState: () => ButtonState
  2. Remove unused import of useButtonState (moved to hook file)
  3. Export type ButtonState

Modified: useButtonState.ts
```

**Step 3 - Loop-Back Again: Lint Validation**

```
Lint Agent re-checks:
  ✅ All imports correct
  ✅ Types complete
  ✅ No unused variables

Result: PASS → Continue to testing
```

**Step 4 - Loop-Back: Test Validation**

```
Test Agent re-runs:
  ✅ All tests pass
  ✅ Coverage: 94%

Result: PASS → Refactoring complete
```

---

## Loop-Back Orchestration

### Decision Tree

```
Refactoring Agent completes changes
         ↓
    "Validate refactoring?"
         ↓
    YES: Send to Lint Agent
         ↓
Lint Agent validates
         ├─→ ✅ PASS: Send to Test Agent
         │         ↓
         │     Test Agent validates
         │         ├─→ ✅ PASS: Done! Ready to merge.
         │         │
         │         └─→ ❌ FAIL: Report to Refactoring
         │                 ↓
         │         Refactoring Agent iterates
         │                 ↓
         │         [Loop back to Lint Agent]
         │
         └─→ ❌ FAIL: Report to Refactoring
                 ↓
         Refactoring Agent iterates
                 ↓
         [Loop back to Lint Agent]
```

### Typical Loop Parameters

| Parameter             | Value            | Notes                   |
| --------------------- | ---------------- | ----------------------- |
| **Max Iterations**    | 3-5              | Prevents infinite loops |
| **Failure Threshold** | 0 critical       | Lint must pass to test  |
| **Test Threshold**    | >80% coverage    | Code quality gates      |
| **Timeout**           | 15 min per agent | Prevent hanging         |

---

## Implementation Checklist

### Before Starting Refactoring

- ✅ Lint tests passing (baseline)
- ✅ Unit tests passing (baseline)
- ✅ >80% coverage (baseline)
- ✅ No critical issues
- ✅ Clear refactoring goal documented

### During Refactoring

- ✅ Make focused changes (single concern)
- ✅ Update tests alongside code
- ✅ Don't skip validation (always loop-back)
- ✅ Track which files changed
- ✅ Document rationale for changes

### Loop-Back Execution

**Lint Agent validates**:

- Code quality (ESLint rules)
- Formatting (Prettier)
- TypeScript types (compiler)
- Import organization

**Test Agent validates**:

- Unit tests pass
- Coverage not decreased
- E2E tests still work
- No snapshot changes unexpected

**Convergence criteria**:

- All linting passed
- All tests passed
- Coverage >= baseline
- No breaking changes detected

---

## Common Issues & Solutions

### Issue: Infinite Loop (Won't Converge)

```
Lint fails repeatedly
  ← Refactoring fixes
    ← Still fails
      ← Endless cycle
```

**Solution**:

- Check for circular dependencies in changes
- Simplify refactoring (smaller scope)
- Verify baseline tests passed before starting
- Manually review Lint/Test reports for conflicts

### Issue: Test Coverage Drops

```
Original coverage: 92%
After refactoring: 78% (< 80% threshold)
```

**Solution**:

- Add tests for new/modified code
- Simplify refactoring to reduce surface area
- Verify tests run against correct code
- Check for dead code removal that broke tests

### Issue: Loop-Back Takes Too Long

```
Lint → Test → Refactor → Lint → Test (repeat 5x)
```

**Solution**:

- Run validation **during** refactoring (not after)
- Use IDE Linting extensions for real-time feedback
- Test incrementally (refactor one function, test, then next)
- Consider smaller refactoring scope

---

## Combined Patterns: Full Workflow

The complete system uses **all patterns together**:

```
Research Agent (Entry) ────────────────────────────────┐
        ↓                                               │
   ┌────┴────────┐ (Tier 2 - PARALLEL)                 │
   ↓      ↓      ↓                                      │
Lint  React   API ─────────────────────────────────────┤
   └────┬────────┘                                      │
   GATE │ (Tier 3a - SEQUENTIAL)                       │
        ↓                                               │
     Test Agent ─────────────────────────────────────────┤
        ├─ Optional Deep-Dive? ─────────────────────────┤
        │  ├─ Architecture? (Tier 3b)                    │
        │  ├─ Performance? (Tier 3b)                     │
        │  └─ Refactoring? ───────────────────────────┐ │
        │         ↓                                    │ │
        │  Refactoring Agent (Tier 4)                 │ │
        │         ↓                                    │ │
        │  LOOP-BACK: Lint Agent ←──────────────────┘ │
        │         ↓                                    │ │
        │  LOOP-BACK: Test Agent ←──────────────────┘ │
        │         ↓ (Until passing)                    │ │
        └─────────┼────────────────────────────────────┤
                  ↓                                      │
          Documentation Agent (Tier 4)                  │
                  ↓                                      │
            Ready to Merge ← ────────────────────────────┘
```

---

## Benefits & Trade-offs

### Benefits ✅

- Safe refactoring (validation prevents regressions)
- Iterative improvement (can fix issues)
- Clear feedback loops (knows what broke)
- Convergence guaranteed (eventually passes or manual intervention)
- Builds confidence before merge

### Trade-offs ⚠️

- Slower (multiple validation cycles)
- Complex orchestration (loops, state tracking)
- Infinite loop risk (needs safeguards)
- Requires solid baseline (must start passing)
- More resource-intensive (repeated validations)
