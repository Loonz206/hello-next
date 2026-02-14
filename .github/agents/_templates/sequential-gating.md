# Sequential Gating Pattern

Used for **Tier 3a agents** that have strict ordering requirements. Example: **Test Agent** runs **only after** all Tier 2 agents (Lint, React, API) pass.

---

## Overview

Sequential gating enforces **strict execution order** with **pass/fail gates**. An agent can only run if all previous stages are complete and validation passed.

---

## Architecture

```
Tier 2 - Parallel Agents          Tier 3a - Sequential Testing
┌─────────────┐
│ Lint Agent  │
└─────┬───────┘
      │
      ├──→ ✅ PASS
      │
┌─────┴───────┐
│React Agent  │
└─────┬───────┘
      │
      ├──→ ✅ PASS
      │
┌─────┴───────┐
│ API Agent   │
└─────┬───────┘
      │
      ├──→ ✅ PASS
      │
 ┌────▼─────┐
 │   GATE    │  ← Verification point
 └────┬─────┘
      │
  ALL PASS?
  YES: Continue
  NO: Stop & Report
      │
 ┌────▼──────────┐
 │ Test Agent    │
 │ (Only if Tier │
 │  2 passes)    │
 └───────────────┘
```

---

## Handoff Configuration

Tier 2 agents point to Test Agent only on success:

```yaml
# In Lint Agent
handoffs:
  - label: Testing & Coverage
    agent: Test Agent
    prompt: "Linting passed. Now let's ensure comprehensive test coverage."
    send: false  # Optional - user can choose to proceed

# In React Agent
handoffs:
  - label: Test Coverage
    agent: Test Agent
    prompt: "React validation complete. Let's add tests for these components."
    send: false

# In API Agent
handoffs:
  - label: Testing
    agent: Test Agent
    prompt: "API patterns verified. Now comprehensive test coverage."
    send: false
```

**In Test Agent frontmatter**:

```yaml
agents: [
    "Lint Agent",
    "React Agent",
    "API Agent", # Can reference any/all predecessors
    "Architecture Agent",
    "Performance Agent",
  ]
target: vscode
```

---

## Gate Verification Logic

Before Test Agent executes:

```pseudo
IF (Lint Agent result == PASS) AND
   (React Agent result == PASS) AND
   (API Agent result == PASS)
THEN:
  Execute Test Agent
ELSE:
  HALT
  Report: "Prerequisites not satisfied"
  Show: Which agents failed
  Suggest: Rerun Lint/React/API agents
END IF
```

### Implementation

Test Agent instructions should include:

```markdown
## Prerequisites

This agent requires that:

- ✅ **Lint Agent** passed (code formatted, no syntax errors)
- ✅ **React Agent** passed (components follow best practices)
- ✅ **API Agent** passed (data fetching patterns correct)

If any prerequisite failed:

1. Return to that agent
2. Fix issues
3. Run this agent again
```

---

## When to Use Sequential Gating

Use when:

- ✅ Agent depends on **previous agent's output** or **correctness**
- ✅ Writing tests (need code to be valid first)
- ✅ Performance tuning (need build to compile first)
- ✅ **Order matters for correctness**
- ✅ Later stages assume earlier validation passed

**Don't use when**:

- ❌ Agents are truly independent (use Parallel pattern)
- ❌ Order doesn't affect results
- ❌ Later agent doesn't depend on earlier agent's output

---

## Example: Test Suite Development

### Scenario: Feature implementation

**Step 1 - Tier 2 Parallel Agents** (all run):

```
[Feature Code] → Lint + React + API Agents
                       ↓
              [3 Independent Validation Reports]
```

**Results**:

- ✅ Lint: Code formatted correctly
- ✅ React: Components follow rules
- ✅ API: Data fetching correct

**Step 2 - Gate Check**:

```
All Tier 2 passed?
→ YES: Proceed to Test Agent
→ NO: Stop. Fix issues first.
```

**Step 3 - Test Agent Execution**:

```
[Valid Feature Code] → Test Agent
                          ↓
                   [Write/Update Tests]
                          ↓
                   [Check >80% Coverage]
                          ↓
                   [Run E2E Tests]
```

### If Tier 2 Fails

```
Feature Code → Lint Agent → ❌ FAILS (syntax error)
                                ↓
                        [Report violations]
                                ↓
                        [Stop - Test Agent cannot run]
                                ↓
User fixes → Lint Agent → ✅ PASS
                            ↓
                    [Proceed to Test Agent]
```

---

## Sequential Agent Ordering Rules

### Typical Order (based on dependencies)

1. **Tier 1**: Research Agent (routing/entry)
2. **Tier 2**: Lint + React + API (parallel, independent)
3. **Tier 3a**: Test Agent (needs valid code)
4. **Tier 3b**: Architecture / Performance (optional deep-dive)
5. **Tier 4**: Refactoring (implements improvements)
6. **Post**: Technical Debt (summary/roadmap)

### Why This Order?

```
Stage              Depends On              Cannot Proceed If
─────────────────────────────────────────────────────────
Lint              Nothing                  Always runs first (Tier 2)
React             Nothing                  Parallel with Lint/API (Tier 2)
API                Nothing                  Parallel with Lint/React (Tier 2)
Test               Lint + React + API       Code is invalid
Architecture       Nothing (optional)       User discretion
Performance        Nothing (optional)       User discretion
Refactoring        All previous             Improvements need validation
Technical Debt     Summary phase            Post-deployment only
```

---

## Error Handling in Sequential Gates

### When predecessor fails

Test Agent should provide diagnostics:

```markdown
## 🧪 Test Agent - Blocked

**Status**: Cannot proceed (prerequisites failed)

**What Failed**:

- React Agent: 3 component issues
  - Button.tsx: Missing accessibility props
  - Header.tsx: Invalid hook usage

**What To Do**:

1. Run React Agent again
2. Address the 3 issues listed
3. Return to Test Agent

**Quick Links**:

- [React Agent](/#open-agent:react.agent.md)
- [View React Issues](/problems?filter=react)
```

---

## Combining Parallel & Sequential

The full architecture combines both patterns:

```
                    Research Agent (Tier 1)
                            ↓
                    ┌───────┴───────┐
                    ↓       ↓       ↓
            Parallel Agents (Tier 2)
            Lint   React    API
                    ↓       ↓       ↓
                    └───────┬───────┘
                            │
                          GATE
                            │
                    YES: Proceed
                            ↓
                    Test Agent (Tier 3a)
                            ↓
            Optional Deep-Dive (Tier 3b)
            Architecture   Performance
                            ↓
                    Refactoring (Tier 4)
                            ↓
                    Technical Debt (Post)
```

---

## Benefits & Trade-offs

### Benefits ✅

- Guarantees prerequisites met before execution
- Prevents wasted effort (no testing invalid code)
- Clear ordering and dependencies
- Easier error diagnosis (knows what succeeded/failed)
- Mimics real development workflow (fix then test)

### Trade-offs ⚠️

- Slower than parallel (sequential waits)
- More complex orchestration logic
- Earlier agent failures block later agents
- Requires tight coupling between agents
- Less resilient to changes in ordering
